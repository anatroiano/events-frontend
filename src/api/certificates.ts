import type {CertificateInfo} from '../types/certificate'
import {createApiError, request} from './client'

export const getCertificate = (id: string) =>
  request<CertificateInfo>(`/certificates/${encodeURIComponent(id)}`, {baseUrl: '/api-cert'})

export type DownloadResult = 'ready' | 'pending'

export async function downloadCertificate(id: string): Promise<DownloadResult> {
  const response = await fetch(`/api-cert/certificates/${encodeURIComponent(id)}/download`)

  if (response.status === 202) return 'pending'
  if (!response.ok) throw await createApiError(response)

  const blob = await response.blob()
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')

  try {
    link.href = url
    link.download = `certificado-${id}.pdf`
    document.body.appendChild(link)
    link.click()
  } finally {
    link.remove()
    URL.revokeObjectURL(url)
  }

  return 'ready'
}
