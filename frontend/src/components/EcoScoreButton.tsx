
interface Props {
  img: string
}

const EcoScoreButton = ({ img }: Props) => {

  const computeEcoScore = (img: string) => {
    alert(img)
  }

  return (
    <>
      <button onClick={ () => computeEcoScore(img)}>
        Click here to get your meal's Eco Score!
      </button>
    </>
  )
}

export default EcoScoreButton