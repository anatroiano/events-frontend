import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import {checkIn, getCheckinInfo} from '../api/checkin'

export const useCheckinInfo = (token: string) =>
    useQuery({
        queryKey: ['checkin', token],
        queryFn: () => getCheckinInfo(token),
        enabled: !!token,
        retry: false,
    })

export const useCheckIn = (token: string) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: () => checkIn(token),
        onSuccess: () =>
            queryClient.invalidateQueries({queryKey: ['checkin', token]}),
    })
}