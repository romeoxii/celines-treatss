<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { useAdminStore } from '../../store/admin';
import statusPill from '../../components/statusPill.vue';
import adminGrids from '../../components/adminGrids.vue';

import loadingScreen from '../../components/loadingScreen.vue';
import { onMounted } from 'vue';

const adminStore = useAdminStore();

const capitalizeFirstLetter = (str) => {
    if (typeof str !== 'string' || str.length === 0) {
        return str;
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
};

const dashOrders = adminStore.allOrders.splice(0, 5);

const toggle = (order) => {
    order.showDetails = !order.showDetails;
};

onMounted(async () => {
    await adminStore.fetchAll();
    await adminStore.fetchOrders();
});
</script>

<template>
    <div class="w-full min-h-screen flex flex-col flex-1 p-3 space-y-5">
        <div class="h-full w-full center" v-if="adminStore.loadingAll"><loadingScreen /></div>
        <div class="w-full h-full flex flex-col flex-1 space-y-5 overflow-auto" v-else>
            <div
                class="w-full px-3 md:pl-10 py-3 min-h-34 bg-linear-to-br flex items-center justify-between from-blue-500 to-blue-100 rounded-xl text-white shadow"
            >
                <div>
                    <h1 class="sm:text-5xl text-3xl">Hi, Admin</h1>
                    <p class="text-xs">Welcome back to celine's treats dashboard.</p>
                </div>
                <div class="h-full">
                    <img src="/Images/Welcome-rafiki.svg" alt="" class="h-full" />
                </div>
            </div>

            <div class="w-full center font-sans">
                <adminGrids />
            </div>

            <div class="w-full min-h-10">
                <div class="flex flex-col w-full" v-if="dashOrders.length > 0">
                    <div class="min-h-10 w-full bg-white shadow rounded-xl">
                        <div class="w-full p-3 border-b border-gray-200">
                            <p class="text-center text-sm">Orders History</p>
                        </div>
                        <div
                            class="sm:flex items-center justify-between w-full p-3 hidden border-b border-gray-200"
                        >
                            <p class="w-52 text-center text-xs lg:text-sm">Orders</p>
                            <p class="w-52 text-center text-xs lg:text-sm">Amount</p>
                            <p class="w-52 text-center text-xs lg:text-sm">Status</p>
                            <p class="w-52 text-center text-xs lg:text-sm">Date</p>
                        </div>
                        <div
                            v-for="order in dashOrders"
                            :key="order.id"
                            class="mb-2 bg-white shadow-sm w-full"
                        >
                            <!-- Mobile accordion -->
                            <div
                                class="sm:hidden flex justify-between items-center px-3 py-2 cursor-pointer md:cursor-default"
                                @click="toggle(order)"
                            >
                                <p class="text-sm font-medium truncate">{{ order.id }}</p>

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="w-4 h-4 transition-transform duration-200 md:hidden"
                                    :class="{ 'rotate-180': order.showDetails }"
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
                            </div>

                            <transition name="slide">
                                <div
                                    v-if="order.showDetails"
                                    class="px-4 pb-3 text-xs sm:hidden space-y-1"
                                >
                                    <p class="">
                                        <span class="text-[14px]">Status: </span>
                                        <statusPill :status="capitalizeFirstLetter(order.status)" />
                                    </p>
                                    <p>
                                        <span class="text-[14px]">Amount:</span>
                                        ₦{{ order.total_amount.toLocaleString() }}
                                    </p>
                                </div>
                            </transition>

                            <!-- Desktop row -->
                            <div
                                class="hidden sm:grid grid-cols-4 items-center py-2 px-3 text-xs lg:text-sm gap-2"
                            >
                                <p class="text-center truncate">{{ order.id }}</p>
                                <p class="text-center truncate">
                                    ₦{{ order.total_amount.toLocaleString() }}
                                </p>
                                <p class="text-center">
                                    <statusPill :status="capitalizeFirstLetter(order.status)" />
                                </p>
                                <p class="text-center truncate">{{ order.created_at }}</p>
                            </div>
                        </div>
                        <RouterLink
                            class="flex center w-full gap-1 p-1 text-neutral-700 hover:text-black"
                            to="/admin/Orders"
                            ><span
                                ><svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill=""
                                    class="bi bi-arrow-left"
                                    viewBox="0 0 16 16"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
                                    /></svg></span
                            ><i>view all orders</i>
                        </RouterLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
h1 {
    font-weight: 500;
}
h2 {
    color: #4c4c4c;
}
</style>
