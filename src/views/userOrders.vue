<script setup>
import { inject } from 'vue';
import { orders, getOrders } from '../services/orderServices';
import statusPill from '../components/statusPill.vue';
import { onMounted } from 'vue';

const auth = inject('auth');
const user = auth.user;
const capitalizeFirstLetter = (str) => {
    if (typeof str !== 'string' || str.length === 0) {
        return str;
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
};

const toggle = (order) => {
    order.showDetails = !order.showDetails;
};

onMounted(async () => {
    await getOrders(user.value.id);
});
</script>

<template>
    <div class="col-center w-full primary-bg pt-12 space-y-10">
        <div
            class="center relative h-40 w-full col-center text-white bg-cover"
            style="background-image: url('/ImagesWebp/bg-img.webp')"
        >
            <div class="inset-0 absolute bg-black/30 z-10"></div>
            <div class="col-center z-50">
                <h1 class="text-6xl">My Orders</h1>
            </div>
        </div>
        <div class="flex flex-col w-full min-h-[640px] p-4" v-if="orders.length > 0">
            <div class="min-h-10 w-full bg-white border border-gray-200 shadow rounded-xl">
                <h2 class="text-2xl p-4 text-center">Your Order History</h2>
                <hr />
                <div class="sm:flex items-center justify-between w-full p-3 hidden">
                    <p class="w-52 text-center text-xs lg:text-sm">Orders</p>
                    <p class="w-52 text-center text-xs lg:text-sm">Amount</p>
                    <p class="w-52 text-center text-xs lg:text-sm">Status</p>
                    <p class="w-52 text-center text-xs lg:text-sm">Date</p>
                </div>

                <div
                    v-for="order in orders"
                    :key="order.id"
                    class="mb-2 bg-white shadow-sm overflow-hidden"
                >
                    <!-- Header (always visible) -->
                    <div
                        class="sm:hidden flex justify-between items-center px-3 py-2 cursor-pointer md:cursor-default"
                        @click="toggle(order)"
                    >
                        <p class="text-sm font-medium truncate">{{ order.id }}</p>

                        <!-- Dropdown Arrow (mobile only) -->
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

                    <!-- Expanded Details (mobile only) -->
                    <transition name="slide">
                        <div v-if="order.showDetails" class="px-4 pb-3 text-xs sm:hidden space-y-1">
                            <p>
                                <span class="text-[14px]">Amount:</span> ₦{{
                                    order.total_amount.toLocaleString()
                                }}
                            </p>
                            <p class="flex items-center gap-1">
                                <span class="text-[14px]">Status:</span>
                                <statusPill :status="capitalizeFirstLetter(order.status)" />
                            </p>
                            <p><span class="text-[14px]">Date: </span>{{ order.created_at }}</p>
                        </div>
                    </transition>

                    <!-- Full row view for medium+ screens -->
                    <div
                        class="hidden sm:flex items-center justify-between py-2 px-3 text-xs lg:text-sm"
                    >
                        <p class="w-52 text-center truncate">{{ order.id }}</p>
                        <p class="w-52 text-center">₦{{ order.total_amount.toLocaleString() }}</p>
                        <p class="w-52 text-center">
                            <statusPill :status="capitalizeFirstLetter(order.status)" />
                        </p>
                        <p class="w-52 text-center">{{ order.created_at }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="w-full col-center min-h-[379px] text-center px-4" v-else>
            <p>No orders yet — check out our store to place your first order.</p>
            <button class="center border-b gap-1 text-neutral-700 hover hover:text-neutral-600">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentcolor"
                    class="bi bi-arrow-left"
                    viewBox="0 0 16 16"
                >
                    <path
                        fill-rule="evenodd"
                        d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
                    />
                </svg>
                <RouterLink to="/shop">Shop</RouterLink>
            </button>
        </div>
    </div>
</template>

<style scoped>
hr {
    color: #dddddd;
}

.slide-enter-active,
.slide-leave-active {
    transition: all 0.3s ease;
    overflow: hidden;
}
.slide-enter-from,
.slide-leave-to {
    max-height: 0;
    opacity: 0;
}
.slide-enter-to,
.slide-leave-from {
    max-height: 100px;
    opacity: 1;
}
</style>
