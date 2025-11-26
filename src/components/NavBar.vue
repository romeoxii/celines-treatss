<script setup>
import { openClose, switchIcon } from '@/functions/functions';
import IconHam from '/public/icons/IconHam.vue';
import IconX from '/public/icons/IconX.vue';
import HamMenu from './HamMenu.vue';
import { useCartStore } from '../store/cart';
import { inject, onMounted } from 'vue';

const auth = inject('auth');
const user = auth.user;
const cartStore = useCartStore();

onMounted(() => {
    cartStore.fetchCart(user.value.id);
});
</script>

<template>
    <div
        class="w-full md:min-h-8 min-h-10 py-2 center shadow-lg font-kanit fixed top-0 z-99 bg-[#f4f4f4]"
    >
        <div class="flex items-center lg:justify-evenly justify-between space-x-5 w-full px-4">
            <button class="h-full w-5 sm:hidden flex z-90" @click="switchIcon">
                <Transition name="fade" mode="out-in">
                    <component :is="!openClose ? IconHam : IconX" />
                </Transition>
            </button>
            <HamMenu :class="openClose ? 'h-screen' : 'h-0'" />

            <h2 class="">
                <RouterLink to="/" class="logo-link">
                    <img src="/Images/celines-treats-logo.svg" alt="Celine\'s Treats" class="h-8" />
                </RouterLink>
            </h2>

            <ul class="sm:flex items-center md:space-x-5 hidden">
                <li class="">
                    <RouterLink to="/" class="px-3 py-1 text-sm main-nav">Home</RouterLink>
                </li>
                <li>
                    <RouterLink to="/shop" class="px-3 py-1 text-sm main-nav">Shop</RouterLink>
                </li>
                <li>
                    <RouterLink to="/contact" class="px-3 py-1 text-sm main-nav"
                        >Contact</RouterLink
                    >
                </li>
            </ul>
            <ul v-if="user" class="sm:flex hidden items-center gap-6">
                <RouterLink to="/cart" class="hover flex ites-center relative cart"
                    >Cart
                    <span class="hover:text-black/50"
                        ><svg
                            width="24"
                            height="20"
                            viewBox="0 0 24 20"
                            fill="currentcolor"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M10.974 17.9841C10.974 19.0977 10.0716 20 8.95805 20C7.84447 20 6.94214 19.0977 6.94214 17.9841C6.94214 16.8705 7.84447 15.9682 8.95805 15.9682C10.0716 15.9682 10.974 16.8705 10.974 17.9841Z"
                                fill="var(--color-header-icons, --color-accent)"
                            ></path>
                            <path
                                d="M19.1436 17.9841C19.1436 19.0977 18.2413 20 17.1277 20C16.0141 20 15.1118 19.0977 15.1118 17.9841C15.1118 16.8705 16.0141 15.9682 17.1277 15.9682C18.2413 15.9682 19.1436 16.8705 19.1436 17.9841Z"
                                fill="var(--color-header-icons, --color-accent)"
                            ></path>
                            <path
                                d="M22.0614 3.12997H9.51503V5.25199H20.7352L19.462 10.6631C19.3843 11.0141 19.1896 11.3286 18.9102 11.555C18.6307 11.7815 18.283 11.9065 17.9235 11.9098H9.22325C8.859 11.9122 8.50518 11.79 8.22003 11.5631C7.93536 11.3362 7.73689 11.0184 7.65826 10.6631L5.43015 0.822281C5.37615 0.588291 5.24447 0.379879 5.05643 0.230674C4.86885 0.0809966 4.63581 0 4.39566 0H0.947388V2.12202H3.54686L5.5893 11.1406C5.77166 11.9662 6.23206 12.7037 6.89377 13.2304C7.55548 13.7566 8.37776 14.0399 9.22325 14.0323H17.9235C18.7643 14.0342 19.5804 13.7481 20.2369 13.2223C20.8934 12.6966 21.3495 11.9619 21.5309 11.1411L23.0959 4.43018C23.1689 4.11519 23.0936 3.78363 22.8923 3.53069C22.6909 3.27776 22.385 3.12997 22.0614 3.12997Z"
                                fill="var(--color-header-icons, --color-accent)"
                            ></path></svg
                    ></span>
                    <span
                        class="w-4 h-4 text-xs absolute -top-2 -right-2 bg-[#333] rounded-full center text-white"
                        >{{ cartStore.cartCount }}</span
                    ></RouterLink
                >
                <RouterLink to="/orders" class="nav text-black hover center text-[1em]"
                    >My Orders</RouterLink
                >
            </ul>
            <ul v-if="user" class="flex sm:hidden items-center gap-6">
                <RouterLink to="/cart" class="hover flex ites-center relative cart"
                    >Cart
                    <span class="hover:text-black/50"
                        ><svg
                            width="24"
                            height="20"
                            viewBox="0 0 24 20"
                            fill="currentcolor"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M10.974 17.9841C10.974 19.0977 10.0716 20 8.95805 20C7.84447 20 6.94214 19.0977 6.94214 17.9841C6.94214 16.8705 7.84447 15.9682 8.95805 15.9682C10.0716 15.9682 10.974 16.8705 10.974 17.9841Z"
                                fill="var(--color-header-icons, --color-accent)"
                            ></path>
                            <path
                                d="M19.1436 17.9841C19.1436 19.0977 18.2413 20 17.1277 20C16.0141 20 15.1118 19.0977 15.1118 17.9841C15.1118 16.8705 16.0141 15.9682 17.1277 15.9682C18.2413 15.9682 19.1436 16.8705 19.1436 17.9841Z"
                                fill="var(--color-header-icons, --color-accent)"
                            ></path>
                            <path
                                d="M22.0614 3.12997H9.51503V5.25199H20.7352L19.462 10.6631C19.3843 11.0141 19.1896 11.3286 18.9102 11.555C18.6307 11.7815 18.283 11.9065 17.9235 11.9098H9.22325C8.859 11.9122 8.50518 11.79 8.22003 11.5631C7.93536 11.3362 7.73689 11.0184 7.65826 10.6631L5.43015 0.822281C5.37615 0.588291 5.24447 0.379879 5.05643 0.230674C4.86885 0.0809966 4.63581 0 4.39566 0H0.947388V2.12202H3.54686L5.5893 11.1406C5.77166 11.9662 6.23206 12.7037 6.89377 13.2304C7.55548 13.7566 8.37776 14.0399 9.22325 14.0323H17.9235C18.7643 14.0342 19.5804 13.7481 20.2369 13.2223C20.8934 12.6966 21.3495 11.9619 21.5309 11.1411L23.0959 4.43018C23.1689 4.11519 23.0936 3.78363 22.8923 3.53069C22.6909 3.27776 22.385 3.12997 22.0614 3.12997Z"
                                fill="var(--color-header-icons, --color-accent)"
                            ></path></svg
                    ></span>
                    <span
                        class="w-4 h-4 text-xs absolute -top-2 -right-2 bg-[#333] rounded-full center text-white"
                        >{{ cartStore.cartCount }}</span
                    ></RouterLink
                >
            </ul>

            <RouterLink to="/auth" class="nav" v-else><i>Login/Signup</i></RouterLink>

            <button
                class="hidden md:flex py-2 px-3 rounded-xl text-white bg-[#3b83f6e5] hover:bg-blue-400 hover:text-[#333] hover text-sm"
                @click="auth.logout()"
                v-if="user"
            >
                Logout
            </button>
        </div>
    </div>
</template>

<style scoped>
.logo-link img {
    transition: opacity 0.2s ease;
}

.logo-link:hover img {
    opacity: 0.7;
}

.bg-none {
    background-color: none;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: rotatex(45deg);
}

.fade-enter-active,
.fade-leave- {
    transition: all 0.7s ease-in-out 0.3s;
}
</style>
