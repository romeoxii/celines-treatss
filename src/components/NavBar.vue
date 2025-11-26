<script setup>
import { openClose, switchIcon, openDropDown, dropDown } from '@/functions/functions';
import IconHam from '/public/icons/IconHam.vue';
import IconX from '/public/icons/IconX.vue';
import HamMenu from './HamMenu.vue';
import { useCartStore } from '../store/cart';
import { inject, onMounted, ref } from 'vue';
import { supabase } from '../lib/supabaseClient';

const admin = ref(null);
const auth = inject('auth');
const user = auth.user;
const cartStore = useCartStore();

onMounted(() => {
    cartStore.fetchCart(user.value.id);
});

onMounted(async () => {
    const { data, error } = await supabase.rpc('is_admin_products');
    console.log('is admin?', data, 'error', error);
    admin.value = data;
});
</script>

<template>
    <div
        class="w-full md:min-h-8 min-h-10 py-2 center shadow-lg font-kanit fixed top-0 z-99 bg-[#f4f4f4]"
    >
        <div class="flex items-center justify-between space-x-5 w-full sm:w-[85%] lg:w-[80%] px-4">
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
            <button
                v-if="user"
                class="hidden sm:flex items-center gap-1 group rounded-lg text-sm bg-blue-400/95 text-white hover:bg-blue-400/90 hover:text-neutral-50 px-2 py-1 relative"
                @mouseenter="dropDown = true"
                @mouseleave="dropDown = false"
                @click="openDropDown()"
            >
                Menu

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-4 h-4 transition-transform duration-200"
                    :class="dropDown ? 'rotate-180' : ''"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
                <div
                    class="hidden sm:flex flex-col items-center min-h-10 w-38 absolute -bottom-38 rounded-lg z-10 right-2 bg-white shadow-sm border-[0.1px] border-blue-100 hover"
                    v-if="dropDown"
                >
                    <li
                        class="flex items-center gap-6 justify-center w-full py-2 pt-3 rounded-t-lg border-b border-zinc-200 text-neutral-700 hover:bg-neutral-100"
                    >
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
                    </li>
                    <RouterLink
                        to="/orders"
                        class="w-full py-2 hidden sm:flex items-center justify-center gap-1 text-neutral-700 hover:bg-neutral-100 text-sm border-b border-zinc-200"
                        >Orders
                        <span
                            ><svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                            >
                                <g fill="none">
                                    <path
                                        d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"
                                    />
                                    <path
                                        fill="currentColor"
                                        d="M16 3a3 3 0 0 1 2.995 2.824L19 6v10h.75c.647 0 1.18.492 1.244 1.122l.006.128V19a3 3 0 0 1-2.824 2.995L18 22H8a3 3 0 0 1-2.995-2.824L5 19V9H3.25a1.25 1.25 0 0 1-1.244-1.122L2 7.75V6a3 3 0 0 1 2.824-2.995L5 3zm0 2H7v14a1 1 0 1 0 2 0v-1.75c0-.69.56-1.25 1.25-1.25H17V6a1 1 0 0 0-1-1m3 13h-8v1c0 .35-.06.687-.17 1H18a1 1 0 0 0 1-1zm-7-6a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2zm2-4a1 1 0 1 1 0 2h-4a1 1 0 0 1 0-2zM5 5a1 1 0 0 0-.993.883L4 6v1h1z"
                                    />
                                </g></svg></span
                    ></RouterLink>
                    <RouterLink
                        v-if="admin"
                        to="/admin"
                        class="w-full py-2 hidden sm:flex gap-1 items-center justify-center text-neutral-700 hover:bg-neutral-100 text-sm border-b border-zinc-200"
                        >Admin dashboard
                        <span
                            ><svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                class="shrink-0"
                            >
                                <g fill="none" fill-rule="evenodd">
                                    <path
                                        d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"
                                    ></path>
                                    <path
                                        fill="currentColor"
                                        d="M13.228 2.688a2 2 0 0 0-2.456 0l-8.384 6.52C1.636 9.795 2.05 11 3.003 11H4v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8h.997c.952 0 1.368-1.205.615-1.791zM13 19v-6a1 1 0 0 0-2 0v6H6v-8.99c0-.317-.146-.6-.375-.785L12 4.267l6.375 4.958a1 1 0 0 0-.375.785V19z"
                                    ></path>
                                </g></svg></span
                    ></RouterLink>
                    <button
                        class="w-full center gap-2 py-2 text-neutral-700 hover:bg-neutral-100 text-sm rounded-b-lg"
                        @click="auth.logout()"
                        v-if="user"
                    >
                        Logout
                        <span
                            ><svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                            >
                                <g fill="none">
                                    <path
                                        d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"
                                    />
                                    <path
                                        fill="currentColor"
                                        d="M12 3a1 1 0 0 1 .117 1.993L12 5H7a1 1 0 0 0-.993.883L6 6v12a1 1 0 0 0 .883.993L7 19h4.5a1 1 0 0 1 .117 1.993L11.5 21H7a3 3 0 0 1-2.995-2.824L4 18V6a3 3 0 0 1 2.824-2.995L7 3zm5.707 5.464l2.828 2.829a1 1 0 0 1 0 1.414l-2.828 2.829a1 1 0 1 1-1.414-1.415L17.414 13H12a1 1 0 1 1 0-2h5.414l-1.121-1.121a1 1 0 0 1 1.414-1.415"
                                    />
                                </g></svg
                        ></span>
                    </button>
                </div>
            </button>
            <li class="sm:hidden flex items-center gap-6" v-if="user">
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
            </li>

            <RouterLink
                to="/auth"
                class="bg-blue-400 text-white hover:bg-blue-400/70 hover:text-neutral-200 px-2 py-1 rounded-lg"
                v-else
                ><i>Get started</i></RouterLink
            >
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
