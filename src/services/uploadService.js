import { supabase } from '../lib/supabaseClient';
import { ref } from 'vue';
import { showToast } from './toastServices';
// import selectedProductId from '../../functions/functions';

export const capitalizeFirstLetter = (str) => {
    if (typeof str !== 'string' || str.length === 0) {
        return str;
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
};

// Product form reactive variables
export const productName = ref('');
export const productPrice = ref(null);
export const category = ref('');
export const selectedImage = ref(null);
export const previewUrl = ref('');
export const uploading = ref(false);
export const feedback = ref('Choose a file for upload');

// Handle file input change
export const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        selectedImage.value = file;
        feedback.value = file.name;
        previewUrl.value = URL.createObjectURL(file);
    } else {
        selectedImage.value = null;
        feedback.value = 'Choose a file for upload';
        previewUrl.value = '';
    }
};

// Clear form
export const clear = () => {
    selectedImage.value = null;
    previewUrl.value = '';
    feedback.value = 'Choose a file for upload';
    productName.value = '';
    productPrice.value = 0;
    category.value = '';
};

// Upload file and return public URL
export const uploadFile = async (file) => {
    const id = Date.now(); // unique ID
    const fileExt = file.name.split('.').pop();
    const fileName = `${productName.value}-${id}.${fileExt}`;
    const filePath = `images/${fileName}`;

    const { data, error } = await supabase.storage
        .from('product_images')
        .upload(filePath, file, { contentType: file.type });

    if (error) {
        console.log('Upload error:', error);
        throw error;
    }
    console.log('data', data);

    // Construct public URL
    const projectUrl = 'https://lxqpfhlsydjhjacdqvkh.supabase.co';
    const publicUrl = `${projectUrl}/storage/v1/object/public/product_images/${filePath}`;

    return publicUrl;
};

// Trigger file upload
export const uploadFileNow = async () => {
    if (!selectedImage.value) {
        alert('Please select an image');
        return;
    }

    uploading.value = true;
    try {
        const publicUrl = await uploadFile(selectedImage.value);
        previewUrl.value = publicUrl; // optional: use preview for UI
        console.log(previewUrl.value);
        showToast('Product uploaded successfully', 'success');

        // Here: save productName, productPrice, category, and publicUrl to your products table
        const { error } = await supabase.from('products').insert([
            {
                name: productName.value,
                price: productPrice.value,
                image_url: publicUrl,
                category: capitalizeFirstLetter(category.value),
            },
        ]);
        if (error) {
            throw error;
        }
        clear(); // reset form
    } catch (error) {
        showToast(`${error.message}`, 'failed');
    } finally {
        uploading.value = false;
    }
};

export const updating = ref(false);
export async function updateProduct(productId, payload) {
    updating.value = true;
    try {
        const { data, error } = await supabase
            .from('products')
            .update({
                name: payload.name,
                price: payload.price,
                description: payload.description,
                category: payload.category,
                image_url: payload.image_url ?? undefined, // update only
            })
            .eq('id', productId)
            .select();

        if (error) throw error;

        return data[0];
    } catch (err) {
        console.log('Update error:', err.message);
        return err;
    } finally {
        updating.value = false;
    }
}

export const productById = ref(null);

export const getProductById = async (productId) => {
    try {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('id', productId)
            .single();

        if (error) {
            throw error;
        } else {
            productById.value = data;
            console.log(productById.value);
        }
    } catch (error) {
        console.log('get error', error);
    }
};
