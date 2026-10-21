import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'

import {checkIn, getCheckInInfo} from '../api/checkin'
import {queryKeys} from '../lib/queryKeys'

export function useCheckInInfo(token: string) {
  return useQuery({
    queryKey: queryKeys.checkIn(token),
    queryFn: () => getCheckInInfo(token),
    enabled: !!token,
    retry: false,
  })
}

export function useCheckIn(token: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => checkIn(token),
    onSuccess: () => queryClient.invalidateQueries({queryKey: queryKeys.checkIn(token)}),
  })
}
