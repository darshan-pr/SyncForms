import { supabase } from "./supabaseClient";

/*-----Student Authentication Services-----*/

export async function registerStudentAccount(
  email: string,
  password: string,
  fullName: string
) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) throw error

  await supabase.from('profiles').insert({
    id: data.user?.id,
    full_name: fullName,
    role: 'student',
  })

  return data
}

export async function loginStudentAccount(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw error

  if (!data.user) throw new Error('Login failed')

  //Check if the user is a student
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', data.user.id)
    .single()

  if (profile?.role !== 'student') {
    throw new Error('Access denied: Students only')
  }

  return data
}

export async function logoutStudentAccount() {
  const { error } = await supabase.auth.signOut()

  if (error) throw error
}

/*-----End of Student Authentication Services-----*/

/*----Login Admin Authentication Services-----*/

export async function loginAdminAccount(
  email: string,
  password: string
) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw error

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', data.user.id)
    .single()

  if (profile?.role !== 'admin') {
    throw new Error('Access denied: Admins only')
  }

  return data
}

export async function logoutAdminAccount() {
  const { error } = await supabase.auth.signOut()

  if (error) throw error
}

/*----End of Admin Authentication Services-----*/