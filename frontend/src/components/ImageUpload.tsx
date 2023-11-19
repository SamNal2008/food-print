import { useState } from "react";
import EcoScoreButton from "./EcoScoreButton";

const ImageUpload = () => {
  const [image, setImage] = useState<string>();
  
  const handleChange = (e: any) => {
    console.log(e.target.files);
    setImage(URL.createObjectURL(e.target.files[0]));
    console.log('image: ', image)
  }

  return (
    <div className="App">
        <h2>Please upload an Image of your meal:</h2>
        <input type="file" onChange={handleChange} />
        <div>
          <img src={image} alt="uploaded element" width={500} height={500}/>
        </div>
        <EcoScoreButton img={image as string}/>
    </div>
  );
}

export default ImageUpload
