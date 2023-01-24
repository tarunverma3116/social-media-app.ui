import api from "api/axios"
import { useMutation, useQueryClient } from "react-query"

type OTPResponse = {
  hash: string
  message: string
}

interface ISendOTP {
  email: string
  otpMethod: "email" | "sms"
}

const useForgetSendOTP = () => {
  const queryClient = useQueryClient()

  return useMutation(
    async ({ email, otpMethod }: ISendOTP) => {
      const sendOTPResponse = await api.post("/users/forgot/password/otp", {
        email,
        otpMethod,
      })
      return sendOTPResponse.data as OTPResponse
    },
    {
      onSuccess: (otpResponse, vars) => {
        queryClient.setQueryData("OTPTYPE", vars.otpMethod)
      },
    }
  )
}

export default useForgetSendOTP