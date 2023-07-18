'use client'
import NextLink from 'next/link'

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Tag,
  Text,
} from '@/common/design'

type Props = {
  link: string
  title: string
  devlang: string
  description: string
}

export default function AccordionComponent(props: Props) {
  return (
    <Accordion allowToggle>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as='span' flex='1' textAlign='left'>
              {props.title}
              <Tag colorScheme='green' marginLeft='10px'>
                {props.devlang}
              </Tag>
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel paddingBottom='4px'>
          <Flex flexDirection='column' gap='5px' width='100%'>
            <Text>{props.description}</Text>
            <Button
              as={NextLink}
              bg='orange.300'
              _hover={{ bg: 'orange.200' }}
              href={props.link}
            >
              サービスへ移動する
            </Button>
          </Flex>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}
