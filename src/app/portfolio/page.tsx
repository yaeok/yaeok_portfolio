'use client'
import {
  CAREER,
  LICENSE,
  OUTPUT,
  SERVICE,
  SKILLS,
} from '@/common/constants/portfolio'
import {
  Box,
  Flex,
  Heading,
  keyframes,
  List,
  ListItem,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  usePrefersReducedMotion,
  Wrap,
} from '@/common/design'
import AccordionComponent from '@/components/portfolio/accordion.component'
import CareerBoxComponent from '@/components/portfolio/career_box.component'
import SquareBoxComponent from '@/components/portfolio/square_box.component'

const randomFadeUp = keyframes`
  from { opacity: 0;
	transform: translateY(50px); }
  to { opacity: 1;
	transform: translateY(0); }
`

export default function PortfolioScreen() {
  const prefersReducedMotion = usePrefersReducedMotion()
  const animation = prefersReducedMotion
    ? undefined
    : `${randomFadeUp} 5s linear`
  return (
    <Flex flexDirection='column' gap='20px'>
      <Heading size='md'>ポートフォリオ</Heading>
      <Flex flexDirection='column' gap='10px'>
        <Heading
          size='sm'
          bg='gray.200'
          padding='15px 20px'
          borderRadius='10px'
        >
          経歴
        </Heading>
        <Wrap justify='center'>
          {CAREER.map((career, index) => (
            <CareerBoxComponent
              title={career.company}
              date={`${career.entry} ~ ${career.leave}`}
              description={career.description}
              key={index}
            />
          ))}
        </Wrap>
      </Flex>
      <Flex flexDirection='column' gap='10px'>
        <Heading
          size='sm'
          bg='gray.200'
          padding='15px 20px'
          borderRadius='10px'
        >
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
      </Flex>
      <Flex flexDirection='column' gap='10px'>
        <Heading
          size='sm'
          bg='gray.200'
          padding='15px 20px'
          borderRadius='10px'
        >
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
      </Flex>
      <Flex flexDirection='column' gap='10px'>
        <Heading
          size='sm'
          bg='gray.200'
          padding='15px 20px'
          borderRadius='10px'
        >
          取得資格
        </Heading>
        <List paddingX='20px'>
          {LICENSE.map((license, index) => (
            <ListItem key={index}>{license.name}</ListItem>
          ))}
        </List>
      </Flex>
      <Flex flexDirection='column' gap='10px'>
        <Heading
          size='sm'
          bg='gray.200'
          padding='15px 20px'
          borderRadius='10px'
        >
          情報発信
        </Heading>
        <Wrap justify='center'>
          {OUTPUT.map((output, index) => (
            <SquareBoxComponent
              title={output.title}
              url={output.link}
              key={index}
            />
          ))}
        </Wrap>
      </Flex>
    </Flex>
  )
}
