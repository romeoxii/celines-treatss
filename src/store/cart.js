import { defineStore } from 'pinia';
import { ref, computed, reactive } from 'vue';
import { supabase } from '@/lib/supabaseClient';
import { showToast } from '../services/toastServices';

export const useCartStore = defineStore('cart', () => {
    const userCart = ref([]);
    const loading = ref(false);
    const loadingStates = reactive({});

    // ✅ Fetch user cart from Supabase
    const fetchCart = async (user_id) => {
        try {
            loading.value = true;
            const { data, error } = await supabase.from('carts').select('*').eq('user_id', user_id);

            if (error) throw error;

            userCart.value = data || [];
        } catch (err) {
            console.error('Error fetching cart:', err.message);
        } finally {
            loading.value = false;
        }
    };

    // ✅ Add item (and save to Supabase)
    const addToCart = async (name, price, img, userId, email, qty = 1) => {
        loadingStates.value = true;
        try {
            // Check if this user already has this item in cart
            const { data: existing, error: selectError } = await supabase
                .from('carts')
                .select('*')
                .eq('user_id', userId)
                .eq('item_name', name)
                .single();

            if (selectError && selectError.code !== 'PGRST116') {
                throw selectError;
            }

            if (existing && existing.id) {
                const newQuantity = (existing.quantity || 0) + qty;
                const { error: updateError } = await supabase
                    .from('carts')
                    .update({ quantity: newQuantity })
                    .eq('id', existing.id);

                fetchCart(userId);
                showToast('Cart updated', 'success');
                if (updateError) throw updateError;
            } else {
                // 3) If it doesn't exist, insert new row with quantity = qty
                const { error: insertError } = await supabase
                    .from('carts')
                    .insert([
                        {
                            email,
                            item_name: name,
                            item_price: price,
                            img,
                            user_id: userId,
                            quantity: qty,
                        },
                    ])
                    .select();

                if (insertError) throw insertError;
                fetchCart(userId);

                showToast('Added to cart', 'success');
            }
        } catch (err) {
            console.error('addToCart error:', err);
            showToast(err.message || 'Could not add to cart', 'failed');
            throw err;
        } finally {
            loadingStates.value = false;
        }
    };

    // ✅ Remove item
    const removeItem = async (id) => {
        try {
            await supabase.from('carts').delete().eq('id', id);
            userCart.value = userCart.value.filter((i) => i.id !== id);
            showToast('Item deleted', 'success');
        } catch (err) {
            console.error('Error removing item:', err.message);
        }
    };

    // ✅ Clear cart after payment
    const clearCart = async (user_id) => {
        try {
            await supabase.from('carts').delete().eq('user_id', user_id);
            userCart.value = [];
        } catch (err) {
            console.error('Error clearing cart:', err.message);
        }
    };
    const updateQuantity = async (id, newQuantity) => {
        if (newQuantity < 0) return;
        const { error: error } = await supabase
            .from('carts')
            .update({ quantity: newQuantity })
            .eq('id', id);

        if (error) {
            throw error;
        }
    };
    const total = computed(() =>
        userCart.value.reduce((sum, item) => sum + item.item_price * item.quantity, 0),
    );

    const cartCount = computed(() =>
        userCart.value.reduce((total, item) => total + item.quantity, 0),
    );

    return {
        userCart,
        total,
        loading,
        loadingStates,
        fetchCart,
        addToCart,
        removeItem,
        clearCart,
        cartCount,
        updateQuantity,
    };
});
