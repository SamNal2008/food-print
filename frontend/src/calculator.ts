import axios from 'axios';
import { LogMealResponse } from './apis/logMeal';


const OPEN_FOOD_FACTS_API = 'https://world.openfoodfacts.org/api/v2/search';
const OPEN_FOOD_FACTS_FIELDS = ['count', 'product_name', 'product_name_en', 'ecoscore_grade', 'ecoscore_score', 'co2_total', 'values'];

export type EcoscoreGrade = 'a' | 'b' | 'c' | 'd' | 'e';

const isWorstGrade = (baseGrade: EcoscoreGrade, targetGrade: EcoscoreGrade) => {
    const grades = ['a', 'b', 'c', 'd', 'e'];
    return grades.indexOf(baseGrade) < grades.indexOf(targetGrade);
}

export interface MyFoodPrint {
    ingredients: string[],
    ingredientScores: EcoscoreGrade[],
    overallScore: EcoscoreGrade
}

interface Product {
    ecoscore_grade: EcoscoreGrade,
    ecoscore_score: number,
    product_name: string,
    product_name_en: string,
}

interface OpenFoodResponse {
    count: number,
    page: number,
    page_size: number,
    products: Product[]
}

const getOverallScore = (ingredientScores: EcoscoreGrade[]) => {
    return ingredientScores.reduce((worstScore, score) => {
        return isWorstGrade(worstScore, score) ? score : worstScore;
    }, 'a');
}

export const computeMealScore = async (logMealResponse: LogMealResponse): Promise<MyFoodPrint> => {
    const ingredients = getIngredientList(logMealResponse);
    const ingredientScores = await getIngredientScores(ingredients);
    return {
        ingredients,
        ingredientScores,
        overallScore: getOverallScore(ingredientScores)
    };
}

const getIngredientList = (logMealResponse: LogMealResponse) => {
    return logMealResponse.segmentation_results[0].recognition_results[0].subclasses.map((subClass) => subClass.name);
}

const getIngredientScores = async (ingredients: string[]): Promise<EcoscoreGrade[]> => {
    const res: EcoscoreGrade[] = [];
    for (const ingredient of ingredients) {
        const avg = await computeAverageScoreFor(ingredient);
        res.push(avg);
    }
    return res;
}

const computeAverageScoreFor = async (ingredient: string): Promise<EcoscoreGrade> => {
    const openFoodResponse = await fetchScoreForIngredient(ingredient);
    let res: EcoscoreGrade = 'a';
    openFoodResponse.products.forEach((product) => {
        if (isWorstGrade(res, product.ecoscore_grade)) {
            res = product.ecoscore_grade;
        }
    });
    return res;
};

const fetchScoreForIngredient = async (ingredient: string): Promise<OpenFoodResponse> => {
    const res = await axios.get(OPEN_FOOD_FACTS_API, {
        params: {
            categories_tags: ingredient,
            fields: OPEN_FOOD_FACTS_FIELDS.join(','),
            json: true
        }
    });
    return res.data;
}