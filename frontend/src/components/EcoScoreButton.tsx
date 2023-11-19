import { useState } from "react";
import { getLogMeal } from "../apis/logMeal";
import { MyFoodPrint, computeMealScore } from "../calculator";

interface Props {
  img?: string
}

const Result = ({ score }: { score?: MyFoodPrint }) => {
  if (!score) return null;
  return (
    <div>
      Hello, your meal's Eco Score is: {score.overallScore}
      <br/>
      Here is the list of your ingredients meal : {score.ingredients.map((ingredient, index) => {
        return <li key={index}>{ingredient} : {score.ingredientScores[index]}</li>
      })}
    </div>
  )
}

const EcoScoreButton = ({ img }: Props) => {

  const [score, setScore] = useState<MyFoodPrint>();

  const computeEcoScore = async (img?: string) => {
    if (!img) {
      alert('Please upload an image of your meal first!');
      return;
    }
    const logMealResponse = await getLogMeal(img);
    const tmpScore = await computeMealScore(logMealResponse);
    setScore(tmpScore);
    console.log('Score: ', score);
  }

  return (
    <div className="App">
      <button onClick={ () => computeEcoScore(img)}>
        Click here to get your meal's Eco Score!
      </button>
      <Result score={score} />
    </div>
  )
}

export default EcoScoreButton