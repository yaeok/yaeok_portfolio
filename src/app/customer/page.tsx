'use client'

import NextLink from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { CUSTOMER_LIST } from '@/common/constants/path'
import {
  Button,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@/common/design'
import { CustomerGet } from '@/common/models/customer.type'
import Loading from '@/components/loading.component'
import { getAllCustomers, updateCountUp } from '@/lib/firebase/apis/customer'

export default function CustomerListScreen() {
  const router = useRouter()
  const [customers, setCustomers] = useState<CustomerGet[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  useEffect(() => {
    const fetch = async () => {
      await getAllCustomers().then((res) => setCustomers(res))
      setLoading(false)
    }
    fetch()
  }, [])

  const onClickCountUp = (value: CustomerGet) => {
    setCustomers((state) =>
      state.map((customer) =>
        customer.id === value.id
          ? { ...customer, counter: customer.counter + 1 }
          : customer
      )
    )
    updateCountUp({ id: value.id, afterCounter: value.counter + 1 })
  }
  return loading ? (
    <Loading />
  ) : (
    <Flex flexDirection='column' padding='10px'>
      <Flex paddingY='10px' justifyContent='end'>
        <Button as={NextLink} href={CUSTOMER_LIST.post}>
          新規登録
        </Button>
      </Flex>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th padding='5px 5px'>姓</Th>
              <Th padding='5px 5px'>名</Th>
              <Th padding='5px 5px'>性別</Th>
              <Th padding='5px 5px'>Email</Th>
              <Th padding='5px 5px'>電話番号</Th>
              <Th padding='5px 5px'>会社</Th>
              <Th padding='5px 5px'>回数</Th>
              <Th padding='5px 5px'>備考</Th>
              <Th />
              <Th />
            </Tr>
          </Thead>
          <Tbody>
            {customers.map((customer) => (
              <Tr key={customer.id}>
                <Td padding='5px 2px' fontSize='sm'>
                  {customer.lastName}
                </Td>
                <Td padding='5px 2px' fontSize='sm'>
                  {customer.firstName}
                </Td>
                <Td padding='5px 2px' fontSize='sm'>
                  {customer.gender}
                </Td>
                <Td padding='5px 2px' fontSize='sm'>
                  {customer.email}
                </Td>
                <Td padding='5px 2px' fontSize='sm'>
                  {customer.phoneNumber}
                </Td>
                <Td padding='5px 2px' fontSize='sm'>
                  {customer.company}
                </Td>
                <Td padding='5px 2px' fontSize='sm'>
                  {customer.counter}
                </Td>
                <Td padding='5px 2px' fontSize='sm'>
                  {customer.content === '' ? '特になし' : customer.content}
                </Td>
                <Td padding='5px' textAlign='center'>
                  <Button
                    variant='unstyled'
                    padding='10px'
                    bg='orange.100'
                    _hover={{ bg: 'orange.200' }}
                    onClick={() => router.push('table_form/put')}
                  >
                    更新
                  </Button>
                </Td>
                <Td padding='5px' textAlign='center'>
                  <Button
                    variant='unstyled'
                    padding='10px'
                    bg='green.100'
                    _hover={{ bg: 'green.200' }}
                    onClick={() => onClickCountUp(customer)}
                  >
                    来店
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  )
}
