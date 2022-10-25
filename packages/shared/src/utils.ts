type Extra = { [key: string]: any } | null
type Response = { errors: any; ok: boolean; extra: Extra }

export const getError = (error: Error): Response => {
  try {
    return { errors: JSON.parse(error.message), ok: false, extra: null }
  } catch {
    return { errors: { detail: error.message }, ok: false, extra: null }
  }
}

const _success = { errors: { detail: null }, ok: true, extra: null }
export const getSuccess = (extra?: Extra): Response => (extra ? { ..._success, extra } : _success)
