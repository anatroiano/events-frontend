import type {CheckInInfo} from '../types/checkin'
import {request} from './client'

export const getCheckInInfo = (token: string) =>
  request<CheckInInfo>(`/checkin/${encodeURIComponent(token)}`)

export const checkIn = (token: string) =>
  request<void>(`/checkin/${encodeURIComponent(token)}`, {method: 'POST'})
