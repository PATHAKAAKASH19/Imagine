import React, { useEffect, useState } from "react";
import { Layer, Ellipse } from "react-konva";

export default function EllipseLayer({ ellipses, tool }) {

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
          />
        );
      })}
    </Layer>
  );
}
