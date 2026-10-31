import { supabase } from "./supabase";

export const signUpUser = async (email, password) => {
  return await supabase.auth.signUp({ email, password });
};

export const logInUser = async (email, password) => {
  return await supabase.auth.signInWithPassword({ email, password });
};

export const logOutUser = async () => {
  return await supabase.auth.signOut();
};