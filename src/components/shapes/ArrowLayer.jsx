import React, { useState, useEffect, forwardRef, useRef} from 'react';
import { Group, Arrow ,Transformer} from 'react-konva';

const ArrowLayer = ({arrows, tool, transform, setArrows}, trRef) => {
 
  const [drag , setDrag] = useState(false)
 

  useEffect(() => {
    if(tool==="Drag") {
      setDrag(true)
    }else{
      setDrag(false)
    }
  } , [arrows, tool])

 





    return (
      <Group >
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
            ref={arrowRef}
          />
        ))}


        <Transformer
         anchorStyleFunc={ (anchor)  =>{
                  
          anchor.cornerRadius(10);}}
         ref={trRef}
         rotateEnabled={true}
         resizeEnabled={true}
         scaleEnabled={true}
         skewEnabled={true}
        />
      </Group>
    );
  
   
  
  
};

export default forwardRef(ArrowLayer);
