import { Space } from '../hooks/useSpaces'
import { Card, CardBody, Heading, Image } from '@chakra-ui/react'

interface Props {
  space: Space
}
const SpaceCard = ({space}: Props) => {
  return (
    <Card borderRadius={10} overflow="hidden">
      {/* <Image src='' */}
      <CardBody>
        <Heading fontSize="2xl">{space.spacename}</Heading>
      </CardBody>
    </Card>
  )
}

export default SpaceCard