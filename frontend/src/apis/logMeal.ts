import axios from 'axios';


const API_KEY = process.env.REACT_APP_LOG_MEAL_API_KEY ?? 'd6acad11026edbd212d2bba6ccb5894f182a971f';
const LOG_MEAL_API_URL = 'https://api.logmeal.es/v2/image/segmentation/complete/v1.0?language=eng';

interface FoodFamily {
    id: number,
    name: string,
    prob: number
};

interface FoodType {
    id: number,
    name: string
}

interface RecognitionResult {
    id: number,
    foodFamily: FoodFamily[],
    foodType: FoodType,
    name: string,
    prob: number,
    subclasses: RecognitionResult[]
}

interface SegmentationResult {
    food_item_position: number,
    recognition_results: RecognitionResult[],
}


export interface LogMealResponse {
    foodFamily: FoodFamily[],
    foodType: FoodType,
    imageId: number,
    occasion: 'breakfast' | 'lunch' | 'dinner' | 'snack',
    segmentation_results: SegmentationResult[],
}


export const getLogMeal = async (image: string) => {
    console.log(image);
    try {
        const formData = new FormData();
        formData.append('image', image);
        const response = await axios.post(LOG_MEAL_API_URL, formData, {
            headers: {
            Authorization: `Bearer ${API_KEY}`,
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json'
        }});
        console.log(response.data);
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
}