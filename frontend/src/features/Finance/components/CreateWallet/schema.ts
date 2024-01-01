import * as Yup from 'yup'
import { FI_WALLET_TYPES, FI_WALLET_CURRENCIES } from '@/constants/fi-wallet'

export const formSchema = Yup.object().shape({
  type: Yup.string().oneOf(FI_WALLET_TYPES),
  name: Yup.string().required(),
  currency: Yup.string().required().oneOf(FI_WALLET_CURRENCIES),
  status: Yup.boolean(),
})

export const transform = (formData: any) => {
  return {
    ...formData,
    status: formData.status === true ? -1 : 1,
  }
}
