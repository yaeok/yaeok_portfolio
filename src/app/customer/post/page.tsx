'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import {
  Button,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
  useToast,
} from '@/common/design'
import { CustomerForm } from '@/common/models/customer.type'
import CustomerPostFormComponent from '@/components/customer_form/customer_post_form'
import { registerCustomer } from '@/lib/firebase/apis/customer'

export default function CustomerPostScreen() {
  const router = useRouter()
  const toast = useToast()
  const [customers, setCustomers] = useState<CustomerForm[]>([
    {
      formId: 1,
      lastName: '',
      firstName: '',
      gender: 0,
      email: '',
      phoneNumber: '',
      company: '',
      content: '',
    },
  ])
  const handleValueChange = (value: CustomerForm) => {
    setCustomers((state) =>
      state.map((customer) =>
        customer.formId === value.formId ? { ...customer, ...value } : customer
      )
    )
  }
  const onClickPlus = () => {
    setCustomers([
      ...customers,
      {
        formId: customers.length + 1,
        lastName: '',
        firstName: '',
        gender: 0,
        email: '',
        phoneNumber: '',
        company: '',
        content: '',
      },
    ])
  }
  const onClickMinus = () => {
    if (customers.length === 1) return
    setCustomers(customers.slice(0, customers.length - 1))
  }
  const onClickAllRegister = () => {
    registerCustomer(customers).then(() => {
      toast({
        title: '登録完了',
        description: '顧客情報を登録しました。',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      router.back()
    })
  }
  return (
    <Flex flexDirection='column' padding='10px'>
      <Flex paddingY='10px' justifyContent='end'>
        <Button onClick={() => onClickAllRegister()}>全て登録する</Button>
      </Flex>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th />
              <Th padding='5px 5px'>姓</Th>
              <Th padding='5px 5px'>名</Th>
              <Th padding='5px 5px'>性別</Th>
              <Th padding='5px 5px'>Email</Th>
              <Th padding='5px 5px'>電話番号</Th>
              <Th padding='5px 5px'>会社</Th>
              <Th padding='5px 5px'>備考</Th>
            </Tr>
          </Thead>
          <Tbody>
            {customers.map((value, index) => (
              <CustomerPostFormComponent
                key={index}
                formId={customers.length}
                handleValueChange={handleValueChange}
              />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Flex
        flexDirection='row'
        justifyContent='space-between'
        gap='10px'
        paddingTop='10px'
      >
        <Button
          width='100%'
          bg='blue.400'
          _hover={{ background: 'blue.500' }}
          onClick={() => onClickPlus()}
        >
          +
        </Button>
        <Button
          width='100%'
          bg='red.400'
          _hover={{ background: 'red.500' }}
          onClick={() => onClickMinus()}
        >
          -
        </Button>
      </Flex>
    </Flex>
  )
}
