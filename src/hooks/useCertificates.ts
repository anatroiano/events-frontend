import {useMutation} from '@tanstack/react-query'

import {downloadCertificate} from '../api/certificates'

export function useDownloadCertificate(id: string) {
  return useMutation({mutationFn: () => downloadCertificate(id)})
}
