'use client'
import { useState } from 'react'

import { Checkbox, Input, Select, Td, Tr } from '@/common/design'
import { CustomerForm } from '@/common/models/customer.type'

export default function CustomerPostFormComponent(props: {
  handleValueChange: (value: CustomerForm) => void
  formId: number
}) {
  const [customer, setCustomer] = useState<CustomerForm>({
    formId: props.formId,
    lastName: '',
    firstName: '',
    gender: 0,
    email: '',
    phoneNumber: '',
    company: '',
    content: '',
  })
  const handleInputChange = () => {
    props.handleValueChange(customer)
  }
  return (
    <Tr>
      <Td>{customer.formId}</Td>
      <Td padding='5px'>
        <Input
          placeholder='姓'
          onChange={(e) => {
            setCustomer((state) => ({ ...state, lastName: e.target.value }))
            handleInputChange()
          }}
        />
      </Td>
      <Td padding='5px'>
        <Input
          placeholder='名'
          onChange={(e) => {
            setCustomer((state) => ({ ...state, firstName: e.target.value }))
            handleInputChange()
          }}
        />
      </Td>
      <Td padding='5px'>
        <Select
          onChange={(e) => {
            setCustomer((state) => ({
              ...state,
              gender: Number.parseInt(e.target.value),
            }))
            handleInputChange()
          }}
        >
          <option value={0}>男性</option>
          <option value={1}>女性</option>
          <option value={2}>その他</option>
        </Select>
      </Td>
      <Td padding='5px'>
        <Input
          placeholder='メール'
          onChange={(e) => {
            setCustomer((state) => ({ ...state, email: e.target.value }))
            handleInputChange()
          }}
        />
      </Td>
      <Td padding='5px'>
        <Input
          placeholder='電話'
          onChange={(e) => {
            setCustomer((state) => ({
              ...state,
              phoneNumber: e.target.value,
            }))
            handleInputChange()
          }}
        />
      </Td>
      <Td padding='5px'>
        <Input
          placeholder='会社'
          onChange={(e) => {
            setCustomer((state) => ({
              ...state,
              company: e.target.value,
            }))
            handleInputChange()
          }}
        />
      </Td>
      <Td padding='5px'>
        <Input
          placeholder='備考'
          onChange={(e) => {
            setCustomer((state) => ({
              ...state,
              content: e.target.value,
            }))
            handleInputChange()
          }}
        />
      </Td>
    </Tr>
  )
}
