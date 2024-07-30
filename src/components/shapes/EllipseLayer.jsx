
import React, { useEffect, useState, forwardRef} from "react";
import { Ellipse, Transformer, Group } from "react-konva";


function EllipseLayer({ ellipses, tool , transform}, trRef) {

  const [drag , setDrag] = useState(false)
 


  useEffect(() => {
    if(tool==="Drag") {
      setDrag(true)
     
    }else{
      setDrag(false)
    }
  } , [ellipses, tool])


  
  
  return (
    <Group>
      {   ellipses.map((ellipse, index) => {
        return (
          <Ellipse

            key={index}
            x={ellipse.x}
            y={ellipse.y}
            radiusX={ellipse.radiusX}
            radiusY={ellipse.radiusY}
            fill="skyblue"
            stroke="black"
            strokeWidth={2}
            draggable={drag}
            onClick={tool==="Drag" ? transform : null}
          />
        );
      })}

      <Transformer
       anchorStyleFunc={ (anchor)  =>{
                   anchor.cornerRadius(10);}
                  }
       ref={trRef}
       rotateEnabled={true}
       resizeEnabled={true}
       scaleEnabled={true}
       skewEnabled={true}
      />
    </Group>
  );

}



export default forwardRef(EllipseLayer)