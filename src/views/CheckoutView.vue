<script setup>
import { inject, onMounted, ref } from 'vue';
import { initiatePayment } from '@/services/paystackServices';
import { useRoute } from 'vue-router';
import { supabase } from '@/lib/supabaseClient';
import LoadingIcon from '../../public/icons/LoadingIcon.vue';
import { useCartStore } from '../store/cart';
import { showToast } from '../services/toastServices';

const cartStore = useCartStore();
const auth = inject('auth');
const user = auth.user;
const route = useRoute();
const reference = route.params.ref;
const checking = ref(false);
const agreedToTerms = ref(false);

const getRef = async () => {
    const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('reference', reference)
        .single();
    if (error) console.log('error', error);
    else return data;
};

onMounted(async () => {
    await cartStore.fetchCart(user.value.id);
    getRef();
});

const handleCheckout = async () => {
    if (!agreedToTerms.value) {
        showToast('Please agree to the terms and conditions before checking out.', 'failed');
        return;
    }

    checking.value = true;

    try {
        const data = await initiatePayment(
            user.value.id,
            user.value.email,
            cartStore.total,
            cartStore.userCart,
            'pending',
        );

        if (data) {
            console.log('data init', data);
            const response = await fetch('/api/paystack', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: user.value.email,
                    amount: cartStore.total * 100, // in kobo
                    reference: data.reference, // correct reference
                    callback_url: 'https://celines-treatss.vercel.app/payment-success',
                }),
            });
            console.log('res', response);

            const paystackResponse = await response.json();
            console.log('response', paystackResponse.data);

            if (paystackResponse?.data?.authorization_url) {
                window.location.href = paystackResponse.data.authorization_url;
            } else {
                console.error('Paystack init failed:', paystackResponse);
            }
        }
    } catch (err) {
        console.error('Error starting payment:', err);
    } finally {
        checking.value = false;
    }
};
</script>

<template>
    <div class="min-h-screen w-full center md:bg-[#f3f8ff] bg-[#f5f9fe]">
        <div class="flex items-center justify-center md:flex-row flex-col h-full w-full">
            <div
                class="flex flex-col md:items-end items-center gap-3 md:w-1/2 w-full border-r border-r-zinc-200 md:py-30 pt-10 sm:px-10 md:px-5 lg:px-10 px-5 md:min-h-screen"
            >
                <div class="flex flex-col space-y-5 h-full w-full lg:w-[80%] py-10 px-3">
                    <h2 class="text-xl">Checkout</h2>
                    <div class="flex flex-col h-full w-full pt-3 space-y-5">
                        <div class="flex flex-col">
                            <label for="fullName" class="text-gray-700 text-sm"
                                >Full name <span class="text-red-400">*</span></label
                            >
                            <input
                                type="text"
                                id="fullName"
                                :value="user.user_metadata.name"
                                class="w-full outline-none border py-1 px-2 rounded-md border-gray-400"
                                placeholder="Enter full name"
                            />
                        </div>
                        <div class="flex flex-col">
                            <label for="email" class="text-gray-700 text-sm"
                                >Email address <span class="text-red-400">*</span></label
                            >
                            <input
                                :value="user.email"
                                type="email"
                                id="email"
                                class="w-full outline-none border py-1 px-2 rounded-md border-gray-400"
                                placeholder="Enter email address"
                            />
                        </div>
                        <div class="flex flex-col">
                            <label for="phone" class="text-gray-700 text-sm"
                                >Phone number <span class="text-red-400">*</span></label
                            >
                            <input
                                type="text"
                                :value="user.user_metadata.phone"
                                id="phone"
                                class="w-full outline-none border py-1 px-2 rounded-md border-gray-400"
                                placeholder="Enter phone number"
                            />
                        </div>
                        <div class="w-full flex items-center gap-2">
                            <input
                                type="checkbox"
                                name="agreedToTerms"
                                v-model="agreedToTerms"
                                id="checked"
                                class="checked:border checked:border-blue-200"
                            />
                            <p class="text-xs text-gray-700">
                                I have read and agree to the Terms and Conditions.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div
                class="flex flex-col md:items-start items-center gap-3 md:w-1/2 w-full md:py-28 lg:px-10 py-10 px-5 md:min-h-screen bg-blue-50"
            >
                <div
                    class="flex flex-col space-y-5 h-full lg:w-[80%] xl:w-[70%] w-full md:py-10 py-5 px-3"
                >
                    <h2 class="text-xl">Review your cart</h2>
                    <div class="" v-for="items in cartStore.userCart" :key="items.id">
                        <div class="flex items-center gap-5">
                            <img
                                :src="items.img"
                                alt="img"
                                class="h-12 w-12 rounded-lg border border-gray-400"
                            />
                            <div class="">
                                <p class="flex flex-col text-sm mb-1">
                                    {{ items.item_name }}
                                    <span class="text-[10px] font-light"
                                        >x{{ items.quantity }}</span
                                    >
                                </p>
                                <p class="text-xs font-light">
                                    ₦{{ items.item_price.toLocaleString() }}
                                </p>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div class="w-full flex flex-col justify-center text-xs space-y-1">
                        <div class="flex items-center justify-between w-full">
                            <p class="text-gray-400">Subtotal</p>
                            <p>₦{{ cartStore.total }}</p>
                        </div>
                        <div class="flex items-center justify-between w-full">
                            <p class="text-gray-400">Shipping</p>
                            <p>₦0</p>
                        </div>
                        <div class="flex items-center justify-between w-full">
                            <p>Total</p>
                            <p>₦{{ cartStore.total }}</p>
                        </div>
                    </div>

                    <button
                        class="w-full rounded-md p-2 btn-1 hover"
                        @click="handleCheckout()"
                        v-if="!checking"
                    >
                        Pay Now
                    </button>
                    <button
                        class="w-full rounded-md p-2 btn-1 hover flex items-center justify-center"
                        v-else
                    >
                        <LoadingIcon />
                    </button>
                    <div class="flex flex-col w-full">
                        <p class="flex items-center text-sm">Secure Checkout</p>
                        <p class="font-light text-xs">
                            Ensuring your financial and personal details are secure during every
                            transaction
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
input::placeholder {
    opacity: 0.7;
    padding: 2px;
    font-size: small;
}
</style>
