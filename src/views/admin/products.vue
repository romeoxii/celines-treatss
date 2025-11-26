<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { useAdminStore } from '../../store/admin';
import { supabase } from '../../lib/supabaseClient';
import { showToast } from '../../services/toastServices';
import {
    toggleDeleteProduct,
    deleteProduct,
    toggleUploadModal,
    uploadModal,
    confirmDelete,
    showConfirm,
    selectedProductId,
    options,
    showOptions,
    toggleEditModal,
    editProduct,
    showEditButton,
    showModal,
    editButton,
} from '../../functions/functions';

import addProductsModal from '../../components/addProductsModal.vue';
import { onMounted } from 'vue';
import EditProductsModal from '../../components/editProductsModal.vue';

const adminStore = useAdminStore();

const deleteProductNow = async (productId) => {
    if (!productId) return;

    try {
        const { data, error } = await supabase.from('products').delete().eq('id', productId);

        if (error) throw error;

        showToast('Product deleted', 'success');
        await adminStore.fetchProducts();
        return data;
    } catch (err) {
        showToast(`${err.message}`, 'failed');
    } finally {
        toggleDeleteProduct();
    }
};

// const editProductNow = async (productId) => {
//     if (!productId) return;
// };

onMounted(async () => {
    await adminStore.fetchProducts();
});
</script>
<template>
    <div
        class="flex flex-col space-y-5 min-h-screen w-full p-2 relative text-neutral-700"
        @click.self="showOptions"
    >
        <div
            class="w-full px-3 md:pl-10 py-3 min-h-14 bg-linear-to-br center from-blue-500 to-blue-100 rounded-xl text-white shadow"
        >
            <h1 class="text-3xl">My Products</h1>
        </div>
        <div class="w-full flex items-center justify-end">
            <div class="center relative">
                <button
                    class="flex items-center gap-1 hover:text-black text-sm rounded-xl border border-neutral-200 hover:bg-blue-50 px-2 py-1"
                    @click="showOptions"
                    v-if="!deleteProduct || editButton"
                >
                    Options
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-4 h-4 transition-transform duration-200"
                        :class="options ? 'rotate-180' : ''"
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
                </button>
                <button
                    class="flex items-center gap-1 hover:text-black text-sm rounded-xl border border-neutral-300 hover:bg-blue-50 px-2 py-1"
                    @click="toggleDeleteProduct"
                    v-else
                >
                    Cancel
                </button>
                <div
                    class="min-h-10 flex flex-col justify-center space-y-3 rounded-xl w-36 absolute -bottom-36 z-10 right-2 p-3 bg-white shadow-sm border-[0.1px] border-blue-100 hover"
                    v-if="options"
                >
                    <button
                        class="w-full px-2 py-1 bg-red-200/40 border border-red-400 text-red-400 rounded-lg center gap-1 sm:text-xs text-sm hover:bg-red-100"
                        @click="
                            () => {
                                (toggleDeleteProduct(), showOptions());
                            }
                        "
                    >
                        Delete
                        <span
                            ><svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="lucide lucide-trash text-destructive"
                            >
                                <path d="M3 6h18"></path>
                                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg
                        ></span>
                    </button>
                    <button
                        class="w-full px-2 py-1 bg-blue-200/40 border border-blue-400 text-blue-400 rounded-lg center gap-1 sm:text-xs text-sm hover:bg-blue-100"
                        @click="
                            () => {
                                (showEditButton(), showOptions());
                            }
                        "
                    >
                        Edit product
                        <span
                            ><svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                                class="icon"
                                aria-hidden="true"
                            >
                                <path
                                    d="M2.6687 11.333V8.66699C2.6687 7.74455 2.66841 7.01205 2.71655 6.42285C2.76533 5.82612 2.86699 5.31731 3.10425 4.85156L3.25854 4.57617C3.64272 3.94975 4.19392 3.43995 4.85229 3.10449L5.02905 3.02149C5.44666 2.84233 5.90133 2.75849 6.42358 2.71582C7.01272 2.66769 7.74445 2.66797 8.66675 2.66797H9.16675C9.53393 2.66797 9.83165 2.96586 9.83179 3.33301C9.83179 3.70028 9.53402 3.99805 9.16675 3.99805H8.66675C7.7226 3.99805 7.05438 3.99834 6.53198 4.04102C6.14611 4.07254 5.87277 4.12568 5.65601 4.20313L5.45581 4.28906C5.01645 4.51293 4.64872 4.85345 4.39233 5.27149L4.28979 5.45508C4.16388 5.7022 4.08381 6.01663 4.04175 6.53125C3.99906 7.05373 3.99878 7.7226 3.99878 8.66699V11.333C3.99878 12.2774 3.99906 12.9463 4.04175 13.4688C4.08381 13.9833 4.16389 14.2978 4.28979 14.5449L4.39233 14.7285C4.64871 15.1465 5.01648 15.4871 5.45581 15.7109L5.65601 15.7969C5.87276 15.8743 6.14614 15.9265 6.53198 15.958C7.05439 16.0007 7.72256 16.002 8.66675 16.002H11.3337C12.2779 16.002 12.9461 16.0007 13.4685 15.958C13.9829 15.916 14.2976 15.8367 14.5447 15.7109L14.7292 15.6074C15.147 15.3511 15.4879 14.9841 15.7117 14.5449L15.7976 14.3447C15.8751 14.128 15.9272 13.8546 15.9587 13.4688C16.0014 12.9463 16.0017 12.2774 16.0017 11.333V10.833C16.0018 10.466 16.2997 10.1681 16.6667 10.168C17.0339 10.168 17.3316 10.4659 17.3318 10.833V11.333C17.3318 12.2555 17.3331 12.9879 17.2849 13.5771C17.2422 14.0993 17.1584 14.5541 16.9792 14.9717L16.8962 15.1484C16.5609 15.8066 16.0507 16.3571 15.4246 16.7412L15.1492 16.8955C14.6833 17.1329 14.1739 17.2354 13.5769 17.2842C12.9878 17.3323 12.256 17.332 11.3337 17.332H8.66675C7.74446 17.332 7.01271 17.3323 6.42358 17.2842C5.90135 17.2415 5.44665 17.1577 5.02905 16.9785L4.85229 16.8955C4.19396 16.5601 3.64271 16.0502 3.25854 15.4238L3.10425 15.1484C2.86697 14.6827 2.76534 14.1739 2.71655 13.5771C2.66841 12.9879 2.6687 12.2555 2.6687 11.333ZM13.4646 3.11328C14.4201 2.334 15.8288 2.38969 16.7195 3.28027L16.8865 3.46485C17.6141 4.35685 17.6143 5.64423 16.8865 6.53613L16.7195 6.7207L11.6726 11.7686C11.1373 12.3039 10.4624 12.6746 9.72827 12.8408L9.41089 12.8994L7.59351 13.1582C7.38637 13.1877 7.17701 13.1187 7.02905 12.9707C6.88112 12.8227 6.81199 12.6134 6.84155 12.4063L7.10132 10.5898L7.15991 10.2715C7.3262 9.53749 7.69692 8.86241 8.23218 8.32715L13.2791 3.28027L13.4646 3.11328ZM15.7791 4.2207C15.3753 3.81702 14.7366 3.79124 14.3035 4.14453L14.2195 4.2207L9.17261 9.26856C8.81541 9.62578 8.56774 10.0756 8.45679 10.5654L8.41772 10.7773L8.28296 11.7158L9.22241 11.582L9.43433 11.543C9.92426 11.432 10.3749 11.1844 10.7322 10.8271L15.7791 5.78027L15.8552 5.69629C16.185 5.29194 16.1852 4.708 15.8552 4.30371L15.7791 4.2207Z"
                                ></path></svg
                        ></span>
                    </button>
                    <button
                        class="px-2 py-1 bg-green-200/80 text-green-600 border border-green-400 rounded-lg center gap-1 sm:text-xs text-sm hover:bg-green-100"
                        @click="
                            () => {
                                (toggleUploadModal(), showOptions());
                            }
                        "
                    >
                        Add product
                        <span class=""
                            ><svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="1.5"
                                    d="M17.478 9.011h.022c2.485 0 4.5 2.018 4.5 4.508c0 2.32-1.75 4.232-4 4.481m-.522-8.989q.021-.248.022-.5A5.505 5.505 0 0 0 12 3a5.505 5.505 0 0 0-5.48 5.032m10.958.98a5.5 5.5 0 0 1-1.235 3.005M6.52 8.032A5.006 5.006 0 0 0 2 13.018a5.01 5.01 0 0 0 4 4.91m.52-9.896q.237-.023.48-.023c1.126 0 2.165.373 3 1.002M12 13v8m0-8c-.7 0-2.008 1.994-2.5 2.5M12 13c.7 0 2.008 1.994 2.5 2.5"
                                /></svg
                        ></span>
                    </button>
                </div>
            </div>
        </div>
        <div class="center">
            <div class="w-[95%] sm:w-full h-full center px-2">
                <div
                    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-4"
                >
                    <div
                        class="min-h-44 flex flex-col bg-white rounded-b-xl shadow relative"
                        v-for="product in adminStore.products"
                        :key="product.id"
                    >
                        <img :src="product.image_url" alt="" class="w-full h-44" />
                        <div
                            class="absolute inset-0 h-full w-full bg-neutral-500 opacity-40 rounded-b-xl"
                            v-if="deleteProduct || editProduct"
                        ></div>
                        <div class="p-2 w-full">
                            <h1 class="text-sm">{{ product.name }}</h1>
                            <p class="text-xs text-neutral-600">
                                ₦{{ product.price.toLocaleString() }}
                            </p>
                        </div>
                        <button
                            @click="showConfirm(product.id)"
                            class="text-red-400 bg-red-50 p-1 rounded-full absolute -top-3 -right-3 shadow-lg"
                            v-if="deleteProduct"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="currentColor"
                                class="bi bi-x"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"
                                />
                            </svg>
                        </button>
                        <button
                            @click="toggleEditModal(product.id)"
                            class="h-7 w-7 center p-1 text-blue-400 bg-blue-100 rounded-full absolute -top-3 -right-3 shadow-2xl"
                            v-if="editButton"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                            >
                                <g fill="none" fill-rule="evenodd">
                                    <path
                                        d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"
                                    />
                                    <path
                                        fill="currentColor"
                                        d="M13.896 3.03a2 2 0 0 1 2.701-.117l.127.117l4.243 4.243a2 2 0 0 1 .117 2.7l-.117.128l-10.314 10.314a2 2 0 0 1-1.238.578L9.239 21H4.006a1.01 1.01 0 0 1-1.004-.9l-.006-.11v-5.233a2 2 0 0 1 .467-1.284l.12-.13L13.895 3.03ZM12.17 7.584l-7.174 7.174V19H9.24l7.174-7.174l-4.243-4.243Zm3.14-3.14L13.584 6.17l4.243 4.243l1.726-1.726z"
                                    />
                                </g>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <addProductsModal v-if="uploadModal" class="h-full w-full fixed inset-0" />
        <EditProductsModal v-if="showModal" class="h-full w-full fixed inset-0" />
        <div
            class="center space-y-3 h-full w-full inset-0 fixed z-10 right-2 p-3 bg-black/40"
            v-if="confirmDelete"
            @click.self="showConfirm"
        >
            <div
                class="min-h-10 w-48 bg-white flex flex-col justify-center p-3 shadow-sm border-[0.1px] rounded-xl border-blue-100 hover space-y-3"
            >
                <p class="text-center">Delete this product?</p>
                <button
                    @click="
                        () => {
                            (deleteProductNow(selectedProductId), showConfirm());
                        }
                    "
                    class="px-2 py-1 bg-red-200/50 border border-red-400 text-red-400 rounded-lg sm:text-xs text-sm hover:bg-red-100"
                >
                    Yes
                </button>
                <button
                    @click="toggleDeleteProduct"
                    class="px-2 py-1 bg-blue-200/40 border border-blue-400 text-blue-400 rounded-lg center gap-1 sm:text-xs text-sm hover:bg-blue-100"
                >
                    No
                </button>
            </div>
        </div>
    </div>
</template>
