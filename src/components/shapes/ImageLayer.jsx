import React from 'react'
import { useState } from 'react'
import {Group, Image, Layer} from "react-konva"
import useImage from "use-image"

export default function ImageLayer() {
  
  const [image, setImage] = useState(null);
  const [img] = useImage(image); // Use the image URL with the useImage hook
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Set the image data URL to state
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };
  return (
    <Group>
      {img && (
            <Image
              image={img}
              x={50}
              y={50}
              width={200}
              height={200}
              draggable
            />
          )}
    </Group>
  )

}

 
