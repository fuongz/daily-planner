import { withAuthWrapper } from '@/components/AuthWrapper'
import { DataBlock } from '@/components/common'
import { Button, Image, Text, VStack } from '@chakra-ui/react'
import { CreateWallet } from './components'
import { getAllTransactions, getAllWallets } from '@/services'
import { CreateTransaction } from './components/CreateTransaction'

interface FinanceFeatureProps {}

const FinanceFeature = ({}: FinanceFeatureProps) => {
  const { data: transactions } = getAllTransactions()
  const { data: wallets } = getAllWallets()
  console.log('transactions', transactions)

  return (
    <>
      <DataBlock data={wallets}>
        {wallets && wallets.length === 0 ? (
          <VStack alignContent="center" justifyContent="center" p={48}>
            <Image src="/assets/images/icon-empty-box.png" />
            <Text my={4} fontWeight={600}>
              Let's get you started...
            </Text>
            <CreateWallet />
          </VStack>
        ) : (
          <DataBlock data={transactions}>
            {transactions && transactions.length === 0 ? (
              <VStack gap={8}>
                <Image src="/assets/images/icon-empty-transaction.png" w={48} />
                <CreateTransaction />
              </VStack>
            ) : (
              <>List of transactions</>
            )}
          </DataBlock>
        )}
      </DataBlock>
    </>
  )
}

export default withAuthWrapper(FinanceFeature)
