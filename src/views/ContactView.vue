<!-- eslint-disable no-undef -->
<script setup>
import { ref } from 'vue';
import { showToast } from '../services/toastServices';

const form = ref(null);
const userEmail = ref('');
const userMessage = ref('');
const loading = ref(false);
const successMessage = ref('');

async function sendEmail() {
    loading.value = true;
    const res = await fetch('https://celines-treatss.vercel.app/api/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_API_NODE_KEY}`,
        },
        body: JSON.stringify({
            from: userEmail.value,
            subject: 'New request',
            message: userMessage.value,
        }),
    });

    const data = await res.json();
    loading.value = false;

    if (data?.success) {
        successMessage.value = 'Message sent!';
        userEmail.value = '';
        userMessage.value = '';
        showToast(`${successMessage.value}`, 'success');
    } else {
        showToast(`${successMessage.value}`, 'failed');
    }
}
</script>
<template>
    <div class="w-full min-h-screen center primary-bg md:px-16 px-2 text-[#424242]">
        <div
            class="center w-full lg:w-[90%] md:p-6 p-3 bg-white shadow rounded-xl lg:mt-20 mt-20 lg:mb-10"
        >
            <div
                class="lg:w-[85%] h-full w-full sm:flex items-center justify-between sm:col-center py-2 lg:space-x-5 gap-4"
            >
                <div
                    class="h-[30%] md:h-full col-center text-center w-full lg:w-[50%] md:mb-0 mb-5"
                >
                    <h1 class="lg:text-4xl text-2xl text-[#3B82F6E6] mb-1 headers">
                        Get in touch with us.
                    </h1>
                    <p class="font-light text-[12px]">
                        <i>If you have any inquires, please use the contact form...</i>
                    </p>
                    <img src="/Images/contact-us.png" alt="contact" class="sm:flex hidden" />
                </div>

                <div class="vertical-line sm:flex hidden"></div>
                <form
                    ref="form"
                    @submit.prevent="sendEmail"
                    class="flex flex-col items-center space-y-5 md:h-[70%] h-[70%] lg:w-[50%] w-full"
                >
                    <div class="col-center w-full h-[88%] space-y-5">
                        <div class="flex flex-col w-full">
                            <label for="userEmail" class="text-sm xl:text-base">Email *</label>
                            <div class="w-full">
                                <input
                                    type="email"
                                    v-model="userEmail"
                                    id="userEmail"
                                    class="w-full"
                                    required
                                />
                            </div>
                        </div>

                        <div class="flex flex-col w-full">
                            <label for="userMessage" class="text-sm xl:text-base">Message *</label>
                            <textarea
                                v-model="userMessage"
                                id="userMessage"
                                required
                                class="resize-none h-24"
                            ></textarea>
                        </div>
                    </div>
                    <div class="w-full flex items-center justify-end py-3 h-[12%]">
                        <button
                            type="submit"
                            class="px-8 py-2 btn-2 rounded-md"
                            :disabled="loading"
                        >
                            {{ loading ? 'Sending...' : 'Submit' }}
                        </button>
                    </div>
                    <p class="text-center w-full">Or contact us through any of our socials:</p>
                    <ul class="flex items-center justify-center gap-5 w-[30%]">
                        <li class="col-center text-sm">
                            <a
                                href="https://wa.me/+2348174700749"
                                aria-label="Chat with Celine's Treats on Whatsapp"
                                class="p-3 rounded-full hover bg-green-200"
                                ><svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="#388E3C"
                                    class="bi bi-whatsapp"
                                    viewBox="0 0 16 16"
                                >
                                    <path
                                        d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"
                                    /></svg
                            ></a>
                            Whatsapp
                        </li>
                        <li class="col-center text-sm">
                            <a
                                href="https://www.tiktok.com/@celinemercy229?_t=ZS-90AgHEckxmK&_r=1"
                                aria-label="Chat with Celine's Treats on Tiktok"
                                class="p-3 rounded-full bg-[#333]"
                                ><svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="#fff"
                                    class="bi bi-tiktok"
                                    viewBox="0 0 16 16"
                                >
                                    <path
                                        d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z"
                                    /></svg
                            ></a>
                            Tiktok
                        </li>
                    </ul>
                </form>
            </div>
        </div>
    </div>
</template>

<style scoped>
.vertical-line {
    border-left: 2px solid #bdd2ff;
}

input,
textarea {
    border: 1px solid #bdd2ff;
    border-radius: 3px;
    outline: 1px solid #bdd2ff;
    padding: 5px;
    font-weight: 300;
}

input:focus,
textarea:focus {
    caret-color: #7183f8;
    outline: none;
    border: 2px solid #bdd2ff;
    border-radius: 7px;
    box-shadow:
        0 0 2px 2px #bdd2ff,
        0 0 2px 2px #7183f855;
}

label {
    font-weight: 300;
    color: black;
    margin-bottom: 2px;
}
</style>
