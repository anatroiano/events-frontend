export type DownloadResult = 'ready' | 'pending'

export async function downloadCertificate(id: string): Promise<DownloadResult> {
    const res = await fetch(`/api-cert/certificates/${encodeURIComponent(id)}/download`)

    if (res.status === 202) return 'pending'
    if (!res.ok) throw new Error('Erro ao baixar o certificado')

    const blob = await res.blob()
    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = `certificado-${id}.pdf`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)

    return 'ready'
}