'use client'
import { CAREER, LICENSE, OUTPUT, SERVICE, SKILLS } from '@/common/constants/portfolio';
import {
  Flex, Heading, keyframes, List, ListItem, Table, TableContainer, Tbody, Td, Th, Thead, Tr,
  usePrefersReducedMotion, Wrap
} from '@/common/design';
import AccordionComponent from '@/components/portfolio/accordion.component';
import CareerBoxComponent from '@/components/portfolio/career_square.component';
import ServiceCardComponent from '@/components/portfolio/service_card.component';
import SkillCircleComponent from '@/components/portfolio/skill_circle.component';
import SquareBoxComponent from '@/components/portfolio/square_box.component';

const randomFadeUp = keyframes`
  from { opacity: 0;
	transform: translateY(25px); }
  to { opacity: 1;
	transform: translateY(0); }
`

export default function PortfolioScreen() {
  const prefersReducedMotion = usePrefersReducedMotion()
  const animation = prefersReducedMotion
    ? undefined
    : `${randomFadeUp} 1s linear`
  return (
    <Flex flexDirection='column' gap='20px'>
      <Heading size='md'>ポートフォリオ</Heading>
      <Flex flexDirection='column' gap='10px'>
        <Heading size='sm' bg='white' padding='15px 20px' borderRadius='10px'>
          経歴
        </Heading>
        <Wrap justify='center' animation={animation}>
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
        <Heading size='sm' bg='white' padding='15px 20px' borderRadius='10px'>
          スキル
        </Heading>
        <Wrap
          justify='center'
          marginX={{ sm: '10px', lg: '100px' }}
          animation={animation}
        >
          {SKILLS.map((skill, index) => (
            <SkillCircleComponent
              key={index}
              name={skill.name}
              color={skill.color}
              experience={skill.experience}
              remark={skill.remark}
            />
          ))}
        </Wrap>
      </Flex>
      <Flex flexDirection='column' gap='10px'>
        <Heading size='sm' bg='white' padding='15px 20px' borderRadius='10px'>
          開発サービス
        </Heading>
        <ServiceCardComponent />
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
        <Heading size='sm' bg='white' padding='15px 20px' borderRadius='10px'>
          取得資格
        </Heading>
        <List paddingX='20px'>
          {LICENSE.map((license, index) => (
            <ListItem key={index}>{license.name}</ListItem>
          ))}
        </List>
      </Flex>
      <Flex flexDirection='column' gap='10px'>
        <Heading size='sm' bg='white' padding='15px 20px' borderRadius='10px'>
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
