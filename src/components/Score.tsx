import { Badge } from "@chakra-ui/react"

interface Props {
  score: number
}
const Score = ({score}: Props) => {
  return (
    <Badge>{score}</Badge>
  )
}

export default Score