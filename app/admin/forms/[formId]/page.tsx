'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function FormResponsesPage() {
  const params = useParams()
  const formId = params.formId as string

  const [fieldsMap, setFieldsMap] = useState<Record<string, string>>({})
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [responses, setResponses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!formId) return

    async function loadData() {
      /* Load fields */
      const { data: fields } = await supabase
        .from('erp_form_fields')
        .select('id, label')
        .eq('form_id', formId)

      const map: Record<string, string> = {}
      fields?.forEach(f => (map[f.id] = f.label))
      setFieldsMap(map)

      /* Load responses (NO JOIN) */
      const { data, error } = await supabase
        .from('erp_form_responses')
        .select('id, student_name, response, submitted_at')
        .eq('form_id', formId)
        .order('submitted_at', { ascending: false })

      if (error) {
        console.error(error)
        alert('Failed to load responses')
        return
      }

      setResponses(data || [])
      setLoading(false)
    }

    loadData()
  }, [formId])

  if (loading) return <p>Loading responses...</p>

  if (responses.length === 0) {
    return <p>No responses yet.</p>
  }

  return (
    <div>
      <h2>Form Responses</h2>

      {responses.map(res => (
        <div key={res.id} className="response-card">
          <h4>Student: {res.student_name}</h4>

          <table>
            <tbody>
              {Object.entries(res.response).map(
                ([fieldId, value]) => (
                  <tr key={fieldId}>
                    <td>
                      <strong>
                        {fieldsMap[fieldId] || 'Unknown'}
                      </strong>
                    </td>
                    <td>{String(value)}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>

          <small>
            Submitted:{' '}
            {new Date(res.submitted_at).toLocaleString()}
          </small>
        </div>
      ))}
    </div>
  )
}
