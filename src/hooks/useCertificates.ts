import {useMutation} from '@tanstack/react-query'
import {downloadCertificate} from '../api/certificates'

export const useDownloadCertificate = (id: string) =>
    useMutation({mutationFn: () => downloadCertificate(id)})