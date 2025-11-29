import { supabase } from '@/lib/supabaseClient';
import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useAdminStore = defineStore('admin', () => {
    const profiles = ref([]);
    const products = ref([]);
    const allOrders = ref([]);

    const loadingProfiles = ref(false);
    const loadingProducts = ref(false);
    const loadingOrders = ref(false);
    const error = ref(null);

    const fetchProfiles = async () => {
        loadingProfiles.value = true;
        error.value = null;

        try {
            const { data, error: e } = await supabase.from('profiles').select('*');
            if (e) throw e;

            profiles.value = data;
        } catch (err) {
            error.value = err;
            throw err;
        } finally {
            loadingProfiles.value = false;
        }
    };

    const fetchProducts = async () => {
        loadingProducts.value = true;
        error.value = null;

        try {
            const { data, error: e } = await supabase.from('products').select('*');
            if (e) throw e;
            await new Promise((resolve) => setTimeout(resolve, 1000));

            products.value = data;
        } catch (err) {
            error.value = err;
            throw err;
        } finally {
            loadingProducts.value = false;
        }
    };

    const fetchOrders = async () => {
        loadingOrders.value = true;
        error.value = null;

        try {
            const { data, error: e } = await supabase.from('orders').select('*');
            if (e) throw e;
            await new Promise((resolve) => setTimeout(resolve, 1000));

            allOrders.value = data.map((o) => ({
                ...o,
                showDetails: false,
                updating: false,
            }));
        } catch (err) {
            error.value = err;
            throw err;
        } finally {
            loadingOrders.value = false;
        }
    };

    const fetchPending = async () => {
        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .eq('delivery_status', 'Pending');

        console.log('Pending:', data);
        if (error) console.error(error);
    };

    const loadingAll = ref(false);
    const fetchAll = async () => {
        loadingAll.value = true;
        error.value = null;

        // Delay 2 seconds before fetching
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const results = await Promise.allSettled([
            fetchProfiles(),
            fetchProducts(),
            fetchOrders(),
            fetchPending(),
        ]);

        loadingAll.value = false;

        const failed = results.some((r) => r.status === 'rejected');

        if (!failed) {
            console.log('Dashboard fully loaded!');
        } else {
            console.log('Some data failed to load. Check your network or policies.');
        }

        return results;
    };

    const totalRevenue = computed(() => {
        const sum = allOrders.value.reduce((acc, item) => acc + (item.total_amount || 0), 0);
        return sum;
    });

    const pending = computed(() => allOrders.value.filter((o) => o.delivery_status === 'Pending'));

    const completed = computed(() =>
        allOrders.value.filter((o) => o.delivery_status === 'Delivered'),
    );

    const ordersCount = computed(() => allOrders.value.length);
    const productsCount = computed(() => products.value.length);
    const profilesCount = computed(() => profiles.value.length);

    const updateDeliveryStatus = async (orderId, newStatus) => {
        const order = allOrders.value.find((o) => o.id === orderId);
        if (order) {
            console.log(order);
            order.updating = true;
        }

        // try block
        try {
            const { error: e } = await supabase
                .from('orders')
                .update({ delivery_status: newStatus })
                .eq('id', orderId);

            if (e) throw e;

            if (order) {
                order.delivery_status = newStatus;
                order.updating = false;
            }

            return true;
        } catch (err) {
            if (order) order.updating = false;
            console.error(err);
            return false;
        }
    };

    return {
        // state
        profiles,
        products,
        allOrders,

        // computed
        totalRevenue,
        pending,
        completed,
        ordersCount,
        productsCount,
        profilesCount,

        // actions
        fetchProfiles,
        fetchProducts,
        fetchOrders,
        fetchPending,
        fetchAll,
        loadingOrders,
        loadingProducts,
        loadingAll,
        updateDeliveryStatus,
    };
});
