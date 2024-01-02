import { withAuthWrapper } from '@/components/AuthWrapper'
import { DataBlock } from '@/components/common'
import { getAllWallets } from '@/services/Wallet'
import { Button, Image, Text, VStack } from '@chakra-ui/react'
import { CreateWallet } from './components'

interface FinanceFeatureProps {}

const FinanceFeature = ({}: FinanceFeatureProps) => {
  const { data } = getAllWallets()
  return (
    <>
      <DataBlock data={data}>
        {data && data.length === 0 ? (
          <VStack alignContent="center" justifyContent="center" p={48}>
            <Image src="/assets/images/icon-empty-box.png" />
            <Text my={4} fontWeight={600}>
              Let's get you started…
            </Text>
            <CreateWallet />
          </VStack>
        ) : (
          <VStack gap={8}>
            <Image src="/assets/images/icon-empty-transaction.png" w={48} />
            <Button>Create new transaction</Button>
          </VStack>
        )}
      </DataBlock>
    </>
  )
}

export default withAuthWrapper(FinanceFeature)
