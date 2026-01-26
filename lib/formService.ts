import { supabase } from './supabaseClient'

/* ---------- FORMS ---------- */

export async function createAdminForm(
  title: string,
  description: string,
  adminId: string
) {
  const { data, error } = await supabase
    .from('erp_forms')
    .insert({ title, description, created_by: adminId })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function fetchAllAdminForms() {
  const { data, error } = await supabase
    .from('erp_forms')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export async function updateAdminForm(
  formId: string,
  title: string,
  description: string
) {
  const { error } = await supabase
    .from('erp_forms')
    .update({ title, description })
    .eq('id', formId)

  if (error) throw error
}

export async function deleteAdminForm(formId: string) {
  const { error } = await supabase
    .from('erp_forms')
    .delete()
    .eq('id', formId)

    //Also delete associated fields and responses
  await supabase.from('erp_form_fields').delete().eq('form_id', formId)
  await supabase.from('erp_form_responses').delete().eq('form_id', formId)

  if (error) throw error
}

/* ---------- RESPONSES ---------- */

export async function fetchFormResponses(formId: string) {
  const { data, error } = await supabase
    .from('erp_form_responses')
    .select('*')
    .eq('form_id', formId)
    .order('submitted_at', { ascending: false })

  if (error) throw error
  return data
}

/* ---------- FORM FIELDS ---------- */

export async function addFormField(
  formId: string,
  label: string,
  fieldType: 'text' | 'textarea' | 'number' | 'select',
  required: boolean,
  options?: string[]
) {
  const { data, error } = await supabase
    .from('erp_form_fields')
    .insert({
      form_id: formId,
      label,
      field_type: fieldType,
      required,
      options: options || null,
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function fetchFormFields(formId: string) {
  const { data, error } = await supabase
    .from('erp_form_fields')
    .select('*')
    .eq('form_id', formId)
    .order('created_at')

  if (error) throw error
  return data
}

export async function deleteFormField(fieldId: string) {
  const { error } = await supabase
    .from('erp_form_fields')
    .delete()
    .eq('id', fieldId)

  if (error) throw error
}


/* ---------- SUBMIT FORM RESPONSE ---------- */


/* ---------- FETCH FORMS ---------- */
export async function fetchAvailableForms() {
  const { data, error } = await supabase
    .from('erp_forms')
    .select('id, title, description')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

/* ---------- FETCH FORM + FIELDS ---------- */
export async function fetchFormWithFields(formId: string) {
  const { data: form, error: formError } = await supabase
    .from('erp_forms')
    .select('*')
    .eq('id', formId)
    .single()

  if (formError) throw formError

  const { data: fields, error: fieldError } = await supabase
    .from('erp_form_fields')
    .select('*')
    .eq('form_id', formId)
    .order('created_at')

  if (fieldError) throw fieldError

  return { form, fields }
}

/* ---------- SUBMIT RESPONSE ---------- */
export async function submitFormResponse(
  formId: string,
  studentId: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  response: Record<string, any>
) {
  const { error } = await supabase
    .from('erp_form_responses')
    .insert({
      form_id: formId,
      student_id: studentId,
      response,
    })

  if (error) throw error
}
