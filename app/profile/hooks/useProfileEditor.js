import { useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function useProfileEditor() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const updateProfile = async ({ name, email, password }) => {
    setLoading(true);
    setMessage(null);

    const updates = {};
    if (email) updates.email = email;
    if (password) updates.password = password;
    if (name) updates.data = { name }; 

    const { data, error } = await supabase.auth.updateUser(updates);

    if (error) {
      setMessage({ type: 'error', text: error.message });
    } else {
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    }
    
    setLoading(false);
    return { data, error };
  };

  return { updateProfile, loading, message };
}