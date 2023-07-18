import { SERVICE, SKILLS } from '@/common/constants/portfolio'
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
              <Th width='200px'>年月日</Th>
              <Th>内容</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>2022/04</Td>
              <Td>テスト</Td>
            </Tr>
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
      <List>
        <ListItem>Python 3 エンジニア認定基礎試験</ListItem>
        <ListItem>Salesforce 認定アドミニストレーター</ListItem>
        <ListItem>Salesforce 認定 Platform デベロッパー</ListItem>
      </List>
      <Heading size='sm' bg='gray.200' padding='15px 20px' borderRadius='10px'>
        情報発信
      </Heading>
      <List>
        <ListItem>Github</ListItem>
        <ListItem>Qiita</ListItem>
        <ListItem>zenn</ListItem>
      </List>
    </Flex>
  )
}
