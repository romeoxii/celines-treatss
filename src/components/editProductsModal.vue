<script setup>
import { onMounted } from 'vue';
import { selectedProductId, toggleEditModal } from '../functions/functions';
import { updating, updateProduct, getProductById, productById } from '../services/uploadService';
import { selectedImage, previewUrl, handleFileChange } from '../services/uploadService';
import { showToast } from '../services/toastServices';
import { uploadFile } from '../services/uploadService';

// Fetch product on mount
onMounted(async () => {
    await getProductById(selectedProductId.value);
});

// Submit handler
const handleUpdateSubmit = async () => {
    if (!productById.value) return;

    try {
        let image_url = productById.value.image_url; // default: current image
        if (selectedImage.value) {
            // upload new image if changed
            try {
                image_url = await uploadFile(selectedImage.value);
            } catch (err) {
                showToast('Image upload failed', 'failed');
                return err;
            }
        }

        const payload = {
            name: productById.value.name,
            price: productById.value.price,
            category: productById.value.category,
            image_url,
        };
        const updated = await updateProduct(selectedProductId.value, payload);
        if (updated) {
            showToast('Product updated successfully', 'success');
            toggleEditModal(selectedProductId.value);
        } else {
            showToast('Update failed', 'failed');
        }
    } catch (err) {
        console.log('error', err);
    }
};
</script>

<template>
    <div
        class="center w-full min-h-screen p-4 bg-black/50"
        @click.self="toggleEditModal(selectedProductId)"
    >
        <form
            class="min-h-96 sm:w-[50%] w-full lg:w-[40%] xl:w-[25%] bg-white rounded-xl p-5 space-y-5"
            @submit.prevent="handleUpdateSubmit"
            v-if="productById"
        >
            <!-- Image preview -->
            <div
                class="h-52 w-full primary-bg rounded-xl border-2 border-dashed border-blue-100 col-center relative"
            >
                <img
                    v-if="previewUrl || productById.image_url"
                    :src="previewUrl || productById.image_url"
                    alt="Product Image"
                    class="h-full w-full object-cover rounded-xl opacity-70"
                />
                <input
                    type="file"
                    accept="image/png, image/jpeg, image/webp"
                    class="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                    @change="handleFileChange"
                />
            </div>

            <p class="text-neutral-400 text-xs w-full text-center">
                (click on image to update if needed)
            </p>
            <!-- Product Inputs -->
            <div class="flex flex-col w-full min-h-10 space-y-4">
                <div class="flex flex-col w-full space-y-1">
                    <label class="text-sm text-neutral-600" for="productName">Name *</label>
                    <input
                        type="text"
                        id="productName"
                        v-model="productById.name"
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
                            v-model="productById.price"
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
                        v-model="productById.category"
                        required
                        placeholder="product category"
                        class="text-sm text-neutral-600 outline-none border-2 border-blue-100 rounded-lg p-2"
                    />
                </div>

                <!-- Submit Button -->
                <button
                    type="submit"
                    class="px-3 py-2 bg-blue-400 hover:opacity-80 text-white rounded-xl"
                    :disabled="updating"
                >
                    {{ updating ? 'Updating...' : 'Update product' }}
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
