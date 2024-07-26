import React, { useState, useEffect} from 'react';
import { Layer, Arrow } from 'react-konva';

const ArrowLayer = ({arrows, tool}) => {
 
  const [drag , setDrag] = useState(false)


  useEffect(() => {
    if(tool==="Drag") {
      setDrag(true)
    }else{
      setDrag(false)
    }
  } , [arrows, tool])

 



    return (
      <Layer >
        {arrows.map((arrow, index) => (
          <Arrow
            key={index}
            points={arrow.points}
            pointerLength={10}
            pointerWidth={20}
            stroke="black"
            strokeWidth={5}
            fill="black"
            draggable={drag}
          />
        ))}
      </Layer>
    );
  
   
  
  
};

export default ArrowLayer;
