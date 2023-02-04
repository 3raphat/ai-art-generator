/* eslint-disable @next/next/no-img-element */
import { Configuration, OpenAIApi } from 'openai'
import { useRef, useState } from 'react'
import mergeImages from 'merge-images-v2'
import ReactToPrint from 'react-to-print'
import Layout from '@/components/Layout'
import {
  Box,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  InputGroup,
  Button,
  Heading,
  Image,
  Skeleton,
  Text,
  Flex,
  Stack,
  Select,
  useToast,
} from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import promptData from '../../promptData.json'
import { RepeatIcon } from '@chakra-ui/icons'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

export default function Home() {
  const options = [
    { name: 'Frame 1', value: '/assets/frame1.png' },
    { name: 'Frame 2', value: '/assets/frame2.png' },
  ]
  const [prompt, setPrompt] = useState('')
  const [image, setImage] = useState('')
  const [loading, setLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState('')
  const [selectedFrame, setSelectedFrame] = useState('/assets/frame1.png')
  const componentRef = useRef()

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)

    const response = await openai.createImage({
      prompt: prompt + ', digital art',
      n: 1,
      size: '256x256', // 1024x1024
      response_format: 'b64_json',
    })
    const data = response.data.data[0].b64_json

    console.log(prompt)

    setImage(convertB64(data))

    // setImage('https://source.unsplash.com/random/1024x1024')

    setLoading(false)
  }

  function convertB64(b64) {
    let b64Data = b64
    return (b64Data = b64Data.replace(/^/, 'data:image/png;base64,'))
  }

  function imageWithFrame(image) {
    mergeImages(
      [
        { src: '/assets/frame1.png', x: 0, y: 0 },
        { src: image, x: 84.69, y: 85.69, width: 1070, height: 1070 },
      ],
      {
        format: 'image/png',
        width: 1240, // a6 size
        height: 1748, // a6 size
      }
    ).then((b64) => {
      setImagePreview(b64)
      console.log('done')
    })
  }

  const toast = useToast()

  function sync() {
    // if (selectedFrame === '') {
    //   return toast({
    //     title: 'Oops!',
    //     description: 'Select a frame first.',
    //     status: 'error',
    //     duration: 3000,
    //     isClosable: true,
    //   })
    // }
    imageWithFrame(image)
  }

  function randomPrompt() {
    setPrompt(promptData[Math.floor(Math.random() * promptData.length)])
  }

  if (image) {
    sync()
  }

  return (
    <Layout py={8}>
      <Box maxW='container.xl' mx='auto'>
        <Heading textAlign='center' fontSize='6xl' fontWeight='extrabold' mb={8} bgGradient='linear(to-r, #f953c6, #a8c0ff)' bgClip='text'>
          AI Art Generator
        </Heading>
        <Formik onSubmit={handleSubmit}>
          <Form>
            <FormControl mb={4}>
              <FormLabel>Prompt</FormLabel>
              <InputGroup gap={2}>
                <Input type='text' value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder='An astronaut ridding a horse...' />
                <Button
                  type='submit'
                  isLoading={loading}
                  isDisabled={prompt === ''}
                  onClick={handleSubmit}
                  variant={prompt === '' ? 'outline' : 'solid'}
                  colorScheme={prompt === '' ? null : 'whatsapp'}
                >
                  Generate
                </Button>
              </InputGroup>
              <FormHelperText>
                Start with a detailed description.
                <Button size='xs' ml={2} fontWeight='bold' color='gray.800' onClick={randomPrompt}>
                  Surprise me
                </Button>
              </FormHelperText>
            </FormControl>
          </Form>
        </Formik>
        {(image || loading) && (
          <Flex justify='space-between'>
            <Skeleton isLoaded={!loading}>
              <Image src={image} alt='' width={512} height={512} fallbackSrc='https://via.placeholder.com/1024' borderRadius='md' />
              <FormControl mt={4}>
                {/* <FormLabel>Frame</FormLabel>
                <InputGroup gap={2}>
                  <Select placeholder='Select frame' onChange={(e) => handleFrameChange(e)}>
                    {options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.name}
                      </option>
                    ))}
                  </Select>
                  <Button leftIcon={<RepeatIcon />} onClick={sync}>
                    Sync
                  </Button>
                  </InputGroup>
                <FormHelperText>
                Select a frame for printing.
                </FormHelperText> */}
                <Button leftIcon={<RepeatIcon />} onClick={sync}>
                  Sync
                </Button>
              </FormControl>
            </Skeleton>
            {imagePreview && !loading && (
              <>
                <Box mt={206}>
                  <Image src='/assets/right-angle-key-100.png' alt='' height={100} />
                </Box>
                <Flex justify='space-between'>
                  <Box>
                    <div className='hidden'>
                      <Image src={imagePreview} alt='' width={1240} ref={componentRef} />
                    </div>
                    <Image src={imagePreview} alt='' height={512} borderRadius='md' />
                    <ReactToPrint
                      trigger={() => (
                        <Button mt={4} w='full' colorScheme='yellow'>
                          Print
                        </Button>
                      )}
                      content={() => componentRef.current}
                    />
                  </Box>
                </Flex>
              </>
            )}
          </Flex>
        )}
      </Box>
    </Layout>
  )
}
