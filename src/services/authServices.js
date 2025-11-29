import { supabase } from '../lib/supabaseClient';
import { ref } from 'vue';

export const userName = ref('');

export const userEmail = ref('');

export const userPhone = ref(null);

export const userPassword = ref('');

export const signUpUser = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: 'https://celines-treatss.vercel.app/auth',
            data: {
                name: userName.value,
                phone: userPhone.value,
            },
        },
    });
    if (error) throw error;

    return { user: data.user, session: data.session };
};

export const signinUser = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) throw error;

    return { data, error };
};

export const insertProfiles = async (id, name, phone, email) => {
    const { data, error } = await supabase
        .from('profiles')
        .insert([
            {
                id,
                name,
                phone,
                email,
            },
        ])
        .select();
    if (error) throw error;
    return { data, error };
};
