import React, { forwardRef, useEffect, useRef, useState} from 'react'
import { Image, Layer, Transformer } from "react-konva"
import useImage from "use-image"
import {Html} from "react-konva-utils"


 function ImageLayer({tool , transform} , trRef) {
  
  const [imageUrl, setImageUrl] = useState(null);
  const [image] = useImage(imageUrl); // Use the image URL with the useImage hook

  const [images, setImages] = useState([])
  const inputRef = useRef(null)
 
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result); // Set the image data URL to state
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }

    
  };

  useEffect(() => {
    if(images){
    setImages([...images , {img: image}])}
  }, [images])


  useEffect(() => {


    if(tool === "Image" && inputRef.current){
      inputRef.current.click()
    }
  }, [tool])
  
  return (   
    
    
    <Layer>
        
        
         <Html>
          <input type='file' accept='image/' onChange={handleFileChange} style={{display: 'none'}} ref={inputRef}/>
         </Html>
      { images.map((image , index) => 
            (
            <Image
              key={index}
              image={image.img}
              x={50}
              y={50}
              width={200}
              height={200}
              draggable
              onClick={transform}
            />))}


          <Transformer
          ref={trRef}
          anchorStyleFunc={ (anchor)  =>{
            anchor.cornerRadius(10);
          }
        }
          rotateEnabled={true}
          resizeEnabled={true}
          scaleEnabled={true}
          skewEnabled={true}
         
          />
          
    </Layer>
  

            )
}

export default forwardRef(ImageLayer)
 
