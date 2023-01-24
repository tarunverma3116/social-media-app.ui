import api from "api/axios"
import { useMutation, useQueryClient } from "react-query"

type ForgetPWResponse = {}

interface IForgetPW {
  email: string
  newPassword: string
  otpMethod: "email" | "sms"
  emailOtp: number
  phoneOtp: number
}

const useForgetPWMutation = () => {
  const queryClient = useQueryClient()

  return useMutation(async (payload: IForgetPW) => {
    const forgetPWResponse = await api.put("/users/forgot/password", payload)
    return forgetPWResponse.data as ForgetPWResponse
  })
}

export default useForgetPWMutation