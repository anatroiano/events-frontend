import {ApiError} from '../api/client'

export function getApiErrorMessage(error: unknown, fallback: string) {
  if (error instanceof ApiError && error.message.trim()) return error.message

  return fallback
}
