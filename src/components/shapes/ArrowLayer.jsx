import React, { useState, useEffect, forwardRef, useRef, useImperativeHandle} from 'react';
import { Group, Arrow ,Transformer} from 'react-konva';

const ArrowLayer = ({ tool, transform}, refs ) => {
  
  const {arrowRef, trRef} = refs
  const [drag , setDrag] = useState(false)
  const [arrows, setArrows] = useState([])
 
  const isDrawing = useRef(false);
  
   
 

  useEffect(() => {
    if(tool==="Drag") {
      setDrag(true)
    }else{
      setDrag(false)
    }
  } , [arrows, tool])

 
 

  
  const handleArrowDown = (e) => {
  
   isDrawing.current = true;
   const pos = e.target.getStage().getPointerPosition();
   setArrows([...arrows, { points: [pos.x, pos.y, pos.x, pos.y] }]);
 };


 const handleArrowMove = (e) => {
   if (!isDrawing.current) return;
   const pos = e.target.getStage().getPointerPosition();
   const newArrows = [...arrows];
   const lastArrow = newArrows[newArrows.length - 1];
   lastArrow.points = [lastArrow.points[0], lastArrow.points[1], pos.x, pos.y];
   newArrows.splice(newArrows.length - 1, 1, lastArrow);
   setArrows(newArrows);
 };

 
 
 const handleArrowUp = () => {
   isDrawing.current = false;
 };


 // To expose function to the parent component 

 useImperativeHandle(arrowRef,() => ({

 
  handleArrowDown,
  handleArrowMove,
  handleArrowUp,
  
 
 }))




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
            onClick={tool==="Drag" ? transform: null}
            
          />
        ))}


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
  
   
  
  
};

export default forwardRef(ArrowLayer);
