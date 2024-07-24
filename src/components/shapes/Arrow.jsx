import React, { useRef, useState } from 'react';
import { Layer, Arrow } from 'react-konva';

const ArrowShape = ({arrows, line = false}) => {
 
 

 


  if(line) {
    return (
      <Layer >
        {arrows.map((arrow, index) => (
          <Arrow
            key={index}
            points={arrow.points}
            pointerLength={0}
            pointerWidth={0}
            stroke="black"
            strokeWidth={1}
            fill="black"
            draggable={true}
          />
        ))}
      </Layer>
    );
  }
   
  return (
    <Layer >
      {arrows.map((arrow, index) => (
        <Arrow
          key={index}
          points={arrow.points}
          pointerLength={10}
          pointerWidth={10}
          stroke="black"
          strokeWidth={4}
          fill="black"
          draggable={true}
        />
      ))}
    </Layer>
  )
};

export default ArrowShape;
