import Link from 'next/link'

import {
  CAREER,
  LICENSE,
  OUTPUT,
  SERVICE,
  SKILLS,
} from '@/common/constants/portfolio'
import {
  Flex,
  Heading,
  List,
  ListItem,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@/common/design'
import AccordionComponent from '@/components/portfolio/accordion.component'

export default function PortfolioScreen() {
  return (
    <Flex flexDirection='column' gap='10px'>
      <Heading size='md'>ポートフォリオ</Heading>
      <Heading size='sm' bg='gray.200' padding='15px 20px' borderRadius='10px'>
        開発経験
      </Heading>
      <TableContainer>
        <Table variant='simple'>
          <Thead bg='white'>
            <Tr>
              <Th>社名</Th>
              <Th>年月日</Th>
              <Th>内容</Th>
            </Tr>
          </Thead>
          <Tbody>
            {CAREER.map((career, index) => (
              <Tr key={index}>
                <Td>{career.company}</Td>
                <Td>
                  {career.entry} ~ {career.leave}
                </Td>
                <Td>
                  {career.description.split('\n').map((value, index) => {
                    return <p key={index}>{value}</p>
                  })}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Heading size='sm' bg='gray.200' padding='15px 20px' borderRadius='10px'>
        スキル
      </Heading>
      <TableContainer>
        <Table variant='simple'>
          <Thead bg='white'>
            <Tr>
              <Th>言語・スキル</Th>
              <Th>経験歴</Th>
              <Th>実務経験有無</Th>
              <Th>備考</Th>
            </Tr>
          </Thead>
          <Tbody>
            {SKILLS.map((skill, index) => (
              <Tr key={index}>
                <Td>{skill.name}</Td>
                <Td>{skill.experience}</Td>
                <Td>{skill.isExperience ? '有' : '無'}</Td>
                <Td overflowWrap='break-word'>{skill.remark}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Heading size='sm' bg='gray.200' padding='15px 20px' borderRadius='10px'>
        開発サービス
      </Heading>
      <List>
        {SERVICE.map((service, index) => (
          <ListItem key={index}>
            <AccordionComponent
              title={service.title}
              link={service.link}
              devlang={service.devlang}
              description={service.description}
            />
          </ListItem>
        ))}
      </List>
      <Heading size='sm' bg='gray.200' padding='15px 20px' borderRadius='10px'>
        取得資格
      </Heading>
      <List paddingX='20px'>
        {LICENSE.map((license, index) => (
          <ListItem key={index}>{license.name}</ListItem>
        ))}
      </List>
      <Heading size='sm' bg='gray.200' padding='15px 20px' borderRadius='10px'>
        情報発信
      </Heading>
      <List paddingX='20px'>
        {OUTPUT.map((output, index) => (
          <ListItem key={index}>
            <Link href={output.link} target='_blank'>
              {output.title}
            </Link>
          </ListItem>
        ))}
      </List>
    </Flex>
  )
}
