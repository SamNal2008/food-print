import { useState } from "react";
import { getLogMeal } from "../apis/logMeal";
import { EcoscoreGrade, MyFoodPrint, computeMealScore } from "../calculator";
import ecoScoreA from '../assets/eco-score-A.jpg'
import ecoScoreB from '../assets/eco-score-B.jpg'
import ecoScoreC from '../assets/eco-score-C.jpg'
import ecoScoreD from '../assets/eco-score-D.jpg'
import ecoScoreE from '../assets/eco-score-E.jpg'

const getEcoScoreImage = (ecoScoreGrade: EcoscoreGrade) => {
  switch(ecoScoreGrade) {
    case 'a':
      return ecoScoreA
    case 'b':
      return ecoScoreB
    case 'c':
      return ecoScoreC
    case 'd':
      return ecoScoreD
    case 'e':
      return ecoScoreE
    default:
      break
  }
}

interface Props {
  img?: string
}

const Result = ({ score }: { score?: MyFoodPrint }) => {
  if (!score) return null;
  return (
    <div className="App">
      Hello, your meal's Eco Score is: {score.overallScore}
      <br/>
      Here is the list of your ingredients meal : {score.ingredients.map((ingredient, index) => {
        return <li key={index}>{ingredient} : {score.ingredientScores[index]}</li>
      })}
      { score!.overallScore && (
        <img src={getEcoScoreImage(score.overallScore)} alt="eco-score" />
      )}
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