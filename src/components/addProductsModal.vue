<script setup>
import { toggleUploadModal } from '../functions/functions';
import {
    productName,
    productPrice,
    selectedImage,
    category,
    feedback,
    previewUrl,
    uploading,
    handleFileChange,
    clear,
    uploadFileNow,
} from '../services/uploadService';

import { useAdminStore } from '../store/admin';
const adminStore = useAdminStore();

// Wrapper to handle form submit
const handleUploadSubmit = async () => {
    if (!selectedImage.value) {
        alert('Please select an image');
        return;
    }

    await uploadFileNow(); // handles file upload, DB insert, toasts, and clearing
    await adminStore.fetchProducts();
    toggleUploadModal(); // close modal after success
};
</script>

<template>
    <div class="center w-full min-h-screen p-4 bg-black/50" @click.self="toggleUploadModal">
        <form
            class="min-h-96 sm:w-[50%] w-full lg:w-[40%] xl:w-[25%] bg-white rounded-xl p-5 space-y-5"
            @submit.prevent="handleUploadSubmit"
        >
            <div
                class="min-h-32 w-full primary-bg rounded-xl border-2 border-dashed border-blue-100 col-center relative"
            >
                <!-- Image Preview -->
                <img
                    v-if="previewUrl"
                    :src="previewUrl"
                    alt="Preview"
                    class="h-full w-full absolute inset-0"
                />

                <!-- Upload Icon + Label -->
                <span v-else>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="35"
                        height="35"
                        viewBox="0 0 24 24"
                    >
                        <path
                            fill="none"
                            stroke="#525252"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1.5"
                            d="M17.478 9.011h.022c2.485 0 4.5 2.018 4.5 4.508c0 2.32-1.75 4.232-4 4.481m-.522-8.989q.021-.248.022-.5A5.505 5.505 0 0 0 12 3a5.505 5.505 0 0 0-5.48 5.032m10.958.98a5.5 5.5 0 0 1-1.235 3.005M6.52 8.032A5.006 5.006 0 0 0 2 13.018a5.01 5.01 0 0 0 4 4.91m.52-9.896q.237-.023.48-.023c1.126 0 2.165.373 3 1.002M12 13v8m0-8c-.7 0-2.008 1.994-2.5 2.5M12 13c.7 0 2.008 1.994 2.5 2.5"
                        />
                    </svg>
                </span>

                <label
                    for="fileInput"
                    class="text-sm text-neutral-600 absolute bottom-2 px-2 rounded"
                >
                    {{ feedback }}
                </label>

                <input
                    type="file"
                    accept="image/png, image/jpeg, image/webp"
                    id="fileInput"
                    @change="handleFileChange"
                    class="absolute inset-0 h-full w-full opacity-0 cursor-pointer"
                />

                <!-- Clear Button -->
                <button
                    type="button"
                    class="text-red-400 bg-red-100 p-1 rounded-full absolute -top-3 -right-3 shadow-lg"
                    v-if="previewUrl"
                    @click.prevent="clear"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                    >
                        <path
                            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"
                        />
                    </svg>
                </button>
            </div>

            <!-- Product Inputs -->
            <div class="flex flex-col w-full min-h-10 space-y-4">
                <div class="flex flex-col w-full space-y-1">
                    <label class="text-sm text-neutral-600" for="productName">Name *</label>
                    <input
                        type="text"
                        id="productName"
                        v-model="productName"
                        placeholder="product name"
                        required
                        class="text-sm text-neutral-600 outline-none border-2 border-blue-100 rounded-lg p-2"
                    />
                </div>
                <div class="flex flex-col w-full space-y-1">
                    <label class="text-sm text-neutral-600" for="productPrice">Price *</label>
                    <div class="relative w-full">
                        <input
                            type="number"
                            id="productPrice"
                            v-model="productPrice"
                            placeholder="product price"
                            required
                            class="text-sm text-neutral-600 outline-none border-2 border-blue-100 rounded-lg p-2 pl-5 w-full"
                        />
                        <span class="absolute left-2 top-[46%] -translate-y-1/2 text-gray-400"
                            >$</span
                        >
                    </div>
                </div>
                <div class="flex flex-col w-full space-y-1">
                    <label class="text-sm text-neutral-600" for="category">Category *</label>
                    <input
                        type="text"
                        id="category"
                        v-model="category"
                        required
                        placeholder="product category"
                        class="text-sm text-neutral-600 outline-none border-2 border-blue-100 rounded-lg p-2"
                    />
                </div>

                <!-- Submit Button -->
                <button
                    type="submit"
                    class="px-3 py-2 bg-blue-400 hover:opacity-80 text-white rounded-xl"
                    :disabled="uploading"
                >
                    {{ uploading ? 'Uploading...' : 'Add product' }}
                </button>
            </div>
        </form>
    </div>
</template>

<style scoped>
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>
