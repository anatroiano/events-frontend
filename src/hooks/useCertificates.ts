import {useMutation, useQuery} from '@tanstack/react-query'

import {downloadCertificate, getCertificate} from '../api/certificates'
import {queryKeys} from '../lib/queryKeys'

export function useCertificate(id: string) {
  return useQuery({
    queryKey: queryKeys.certificate(id),
    queryFn: () => getCertificate(id),
    enabled: !!id,
  })
}

export function useDownloadCertificate(id: string) {
  return useMutation({mutationFn: () => downloadCertificate(id)})
}
