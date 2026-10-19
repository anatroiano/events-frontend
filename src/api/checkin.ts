import {request} from './client'
import type {CheckinInfo} from '../types/checkin'

export const getCheckinInfo = (token: string) =>
    request<CheckinInfo>(`/checkin/${encodeURIComponent(token)}`)

export const checkIn = (token: string) =>
    request<void>(`/checkin/${encodeURIComponent(token)}`, {method: 'POST'})