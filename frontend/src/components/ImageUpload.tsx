import { useState } from "react";
import EcoScoreButton from "./EcoScoreButton";
import { LogMealResponse, getLogMeal } from "../apis/logMeal";

const ImageUpload = () => {
  const [image, setImage] = useState<string>();
  const [img, setImg] = useState<string>();

  const handleChange = async (e: any) => {
    console.log(e.target.files);
    setImage(URL.createObjectURL(e.target.files[0]));
    console.log('image: ', image);
    setImg(e.target.files[0]);
  }

  return (
    <div className="App">
        <h2>Please upload an Image of your meal:</h2>
        <input type="file" onChange={handleChange} />
        { image && (
          <div className="App">
            <img src={image} alt="uploaded element" width={500} height={500}/>
          </div>
        )}
        { image && (
          <EcoScoreButton img={image as string}/>
        )}
    </div>
  );
}

export default ImageUpload
