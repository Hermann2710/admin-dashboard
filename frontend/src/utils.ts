import { AxiosError } from "axios"

export function getErrorMessage(error: unknown) {
  if (error instanceof AxiosError) {
    return `${error.response?.data.message}`
  } else if (error instanceof Error) {
    return error.message
  } else {
    return String(error)
  }
}
