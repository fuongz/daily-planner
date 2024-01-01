import { Box, Spinner } from '@chakra-ui/react'

export interface DataBlockProps {
  children: React.ReactNode
  data: any
}

export function DataBlock({ data, children }: DataBlockProps) {
  return (
    <>
      {typeof data === 'undefined' ? (
        <Box p={32} display="flex" justifyContent="center" alignItems="center">
          <Spinner size="lg" thickness="4px" speed="0.75s" emptyColor="purple.100" color="purple.500" />
        </Box>
      ) : (
        children
      )}
    </>
  )
}
