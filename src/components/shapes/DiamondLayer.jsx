import React, { useEffect, useState } from 'react'
import {Layer, Rect, RegularPolygon} from "react-konva"


export default function DiamondLayer({diamonds , tool}) {

 const [drag, setDrag] = useState(false)

 useEffect(() => {


  if(tool === "Drag"){
    setDrag(true)
  }else{
    setDrag(false)
  }
 }, [diamonds, tool])
 
  return (

   
    <Layer>

        {
          
            diamonds.map((diamond, index) => {
              
             return( <RegularPolygon
                key={index}
                x={diamond.x}
                y={diamond.y}
                sides={4}
                radius={diamond.radius}
               fill="pink"
               stroke="black"
               strokeWidth={2}
               draggable={drag}
               
               
              />)

           })
        }

    </Layer>
  )
}
