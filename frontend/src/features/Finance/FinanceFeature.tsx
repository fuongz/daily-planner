import { withAuthWrapper } from '@/components/AuthWrapper'
import { DataBlock } from '@/components/common'
import { getAllWallets } from '@/services/Wallet'
import { Image, Select, VStack } from '@chakra-ui/react'
import { CreateWallet } from './components'
import { IWallet } from '@/types/wallet'

interface FinanceFeatureProps {}

const FinanceFeature = ({}: FinanceFeatureProps) => {
  const { data } = getAllWallets()
  return (
    <>
      <DataBlock data={data}>
        {data && data.length === 0 ? (
          <VStack alignContent="center" justifyContent="center" p={48}>
            <Image src="/assets/images/icon-empty-box.png" mb={8} />
            <CreateWallet />
          </VStack>
        ) : (
          <Select w={100} mt={4}>
            {data &&
              data.map((wallet: IWallet) => (
                <option key={wallet._id} value={wallet._id}>
                  {wallet.name}
                </option>
              ))}
          </Select>
        )}
      </DataBlock>
    </>
  )
}

export default withAuthWrapper(FinanceFeature)
