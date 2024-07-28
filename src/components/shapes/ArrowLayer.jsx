import React, { useState, useEffect, forwardRef} from 'react';
import { Layer, Arrow ,Transformer} from 'react-konva';

const ArrowLayer = ({arrows, tool, transform}, trRef) => {
 
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
            onClick={tool==="Drag" ? transform : null}
           
          />
        ))}


        <Transformer
         ref={trRef}
         rotateEnabled={true}
         resizeEnabled={true}
         scaleEnabled={true}
         skewEnabled={true}
        />
      </Layer>
    );
  
   
  
  
};

export default forwardRef(ArrowLayer);
