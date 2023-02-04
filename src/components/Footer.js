import { Center, Text, VStack } from '@chakra-ui/react'

const Footer = () => {
  return (
    <Center w='full' bg='gray.50' py={4}>
      <VStack spacing={1}>
        <Text fontWeight='semibold'>AI Generated Art</Text>
        <Text fontSize='sm'>SK Computer Club</Text>
      </VStack>
    </Center>
  )
}

export default Footer
