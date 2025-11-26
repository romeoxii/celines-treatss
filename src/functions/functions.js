import { ref } from 'vue';

export const openClose = ref(false);

export const switchIcon = () => {
    openClose.value = !openClose.value;
};

export const sideNav = ref(false);
export const openSideNav = () => {
    sideNav.value = !sideNav.value;
    console.log(sideNav.value);
};

export const isMobile = ref(window.innerWidth < 640); // sm breakpoint

// Listen for window resize to auto-expand/collapse
export const handleResize = () => {
    isMobile.value = window.innerWidth < 640;
    if (!isMobile.value) sideNav.value = true; // auto expand on sm+
};

export const editButton = ref(false);
export const showModal = ref(false);
export const uploadModal = ref(false);
export const options = ref(false);
// confirm delete modal
export const confirmDelete = ref(false);

export const selectedProductId = ref(null);

export const deleteProduct = ref(false);
export const editProduct = ref(false);

export const toggleDeleteProduct = () => {
    deleteProduct.value = !deleteProduct.value;
    editButton.value = false;
};

export const toggleUploadModal = () => {
    uploadModal.value = !uploadModal.value;
    console.log(uploadModal.value);
};

//delete or upload option
export const showOptions = () => {
    options.value = !options.value;
};

export const showConfirm = (id) => {
    selectedProductId.value = id;
    console.log(selectedProductId.value);
    confirmDelete.value = !confirmDelete.value;
    showOptions();
    toggleDeleteProduct();
};

export const toggleEditProduct = () => {
    editProduct.value = !editProduct.value;
    deleteProduct.value = false;
};

export const showEditButton = () => {
    editButton.value = !editButton.value;
};

export const toggleEditModal = (id) => {
    selectedProductId.value = id;
    showModal.value = !showModal.value;
    editButton.value = false;
    console.log(editButton.value);
};

export const dropDown = ref(false);
export const openDropDown = () => {
    dropDown.value = !dropDown.value;
};
