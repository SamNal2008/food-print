import { useState } from "react";
import { getLogMeal } from "../apis/logMeal";
import { MyFoodPrint, computeMealScore } from "../calculator";

interface Props {
  img?: string
}

const EcoScoreButton = ({ img }: Props) => {

  const [score, setScore] = useState<MyFoodPrint>();

  const computeEcoScore = async (img?: string) => {
    if (!img) {
      alert('Please upload an image of your meal first!');
      return;
    }
    const logMealResponse = await getLogMeal(img);
    const score = await computeMealScore(logMealResponse);
    console.log('Score: ', score);
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