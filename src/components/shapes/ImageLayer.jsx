import React from 'react'
import { useState } from 'react'
import {Image, Layer} from "react-konva"
import {Html} from "react-konva-utils"

export default function ImageLayer({tool}) {
  
  const [images, setImages] = useState([])

  const handleFileUpload = (e) => {
      const file = e.target.files[0]
      if(file){
        const reader = new FileReader()
        reader.onload = (event) => {
          const img = new window.Image()
          img.src = event.target.result
          img.onload = () => {
            setImages([...images, { src:img, width:img.width ,height:img.height}])
          }

          reader.readAsDataURL(file)
        }
      }
  } 


  {tool==="Image" ?  (
   <Layer>
    <Html
      divProps={{
        style: {
          position: 'absolute',
          top: 10,
          left: 10,
        },
      }}
    > 
      <input type="file" accept='image/' onChang={handleFileUpload} placeholder='askkkkjjhgfg' />
    </Html>
      { images && images.map((image, index) => {
       
       return (<Image
        key={index}
         image={image.src}
         x={20}
         y={20}
         width={image.width}
         height={image.height}
         draggable={true}
        
        />
      )})}
   </Layer>
  ): null}
}
