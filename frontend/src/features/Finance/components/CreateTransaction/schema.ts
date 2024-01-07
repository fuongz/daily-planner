import * as Yup from 'yup'
import { FI_WALLET_TYPES, FI_WALLET_CURRENCIES } from '@/constants/fi-wallet'

export const formSchema = Yup.object().shape({
  amount: Yup.number().moreThan(0).required(),
  status: Yup.boolean(),
})

export const transform = (formData: any) => {
  return {
    ...formData,
    status: formData.status === true ? -1 : 1,
  }
}
