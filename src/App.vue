<script setup>
import { RouterView } from 'vue-router';
import { ref, onMounted, provide } from 'vue';
import userProvider from './components/provider/userProvider.vue';
import Toast from './components/Toast.vue';
import { supabase } from './lib/supabaseClient';
import { useCartStore } from '@/store/cart';
// import { useAdminStore } from './store/admin';

// const adminStore = useAdminStore();

const user = ref(null);

onMounted(async () => {
    const cartStore = useCartStore();

    const { data } = await supabase.auth.getSession();
    if (data.session) {
        user.value = data.session.user;
        console.log(user.value);
        cartStore.fetchCart(user.value.id);
    }

    supabase.auth.onAuthStateChange((event, session) => {
        user.value = session?.user || null;
    });
});

provide('auth', { user });
</script>

<template>
    <Toast class="z-101" />
    <div class="font-kanit">
        <userProvider> <RouterView class="z-10" /></userProvider>
    </div>
</template>

<style scoped></style>
