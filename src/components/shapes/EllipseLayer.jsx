
import React, { useEffect, useState, forwardRef} from "react";
import { Layer, Ellipse, Transformer } from "react-konva";


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
    <Layer>
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
       ref={trRef}
       rotateEnabled={true}
       resizeEnabled={true}
       scaleEnabled={true}
       skewEnabled={true}
      />
    </Layer>
  );

}



export default forwardRef(EllipseLayer)