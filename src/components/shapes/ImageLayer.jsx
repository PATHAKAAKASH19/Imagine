import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import {Group, Image, Layer} from "react-konva"
import useImage from "use-image"
import {Html} from "react-konva-utils"

export default function ImageLayer({tool}) {
  
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
    setImages([...images , {img: image}])
  }, [imageUrl])


  useEffect(() => {


    if(tool === "Image" && inputRef.current){
      inputRef.current.click()
    }
  }, [tool])
  
  return (    <Group>
        
        
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
              width={2000}
              height={2000}
              draggable
            />))}
          
    </Group>
  

            )
}
 
