import React, { useState, useEffect, forwardRef, useRef, } from 'react';
import { Group, Arrow ,Transformer} from 'react-konva';

const ArrowLayer = ({ tool, transform , saveHistory}, refs ) => {
  
  const { trRef, stageRef} = refs
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
   const pos = e.target.getStage().getRelativePointerPosition();
   setArrows([...arrows, { points: [pos.x, pos.y, pos.x, pos.y] }]);
 };


 const handleArrowMove = (e) => {
   if (!isDrawing.current) return;
   const pos = e.target.getStage().getRelativePointerPosition();
   const newArrows = [...arrows];
   const lastArrow = newArrows[newArrows.length - 1];
   lastArrow.points = [lastArrow.points[0], lastArrow.points[1], pos.x, pos.y];
   newArrows.splice(newArrows.length - 1, 1, lastArrow);
   setArrows(newArrows);
   saveHistory()
 };

 
 const handleArrowUp = () => {
   isDrawing.current = false;

 };



useEffect(() => {
  
  const stage = stageRef.current
  if(tool === "Arrow" && stage){
     




    stage.on("mousedown" , handleArrowDown)
    stage.on("mousemove" , handleArrowMove)
    stage.on("mouseup" , handleArrowUp)
    stage.on("touchstart", handleArrowDown)
    stage.on("touchmove", handleArrowMove)
    stage.on("touchend", handleArrowUp)



    return () => {
      stage.off("mousedown" , handleArrowDown)
      stage.off("mousemove" , handleArrowMove)
      stage.off("mouseup" , handleArrowUp)
      stage.off("touchstart", handleArrowDown)
      stage.off("touchmove", handleArrowMove)
      stage.off("touchend", handleArrowUp)
  
    }
  }


  



} , [tool , isDrawing, arrows])


useEffect(() => {
    
  const stage = stageRef.current
  if(tool === "Eraser" && stageRef.current) {
  
    const handleErase = (e) => {
      
      
    const pos = e.target.getStage().getRelativePointerPosition()

     
    setArrows(shapes => shapes.filter((shape) => {
      const arrow = shape;
      const arrowBounds = {
        x: Math.min(arrow.points[0], arrow.points[2]),
        y: Math.min(arrow.points[1], arrow.points[3]),
        width: Math.max(arrow.points[0], arrow.points[2]) - Math.min(arrow.points[0], arrow.points[2]),
        height: Math.max(arrow.points[1], arrow.points[3]) - Math.min(arrow.points[1], arrow.points[3]),
      };

      const intersects =
      (pos.x > arrowBounds.x + arrowBounds.width ||
        pos.x  < arrowBounds.x ||
        pos.y > arrowBounds.y + arrowBounds.height ||
        pos.y < arrowBounds.y);

    return intersects;
      }))
  }
  
  
    stage.on("mousemove", handleErase)
    stage.on("touchmove", handleErase)
  
    return () => {
      stage.off("mousemove" , handleErase)
      stage.off("mousemove" , handleErase)
    }}
  
  }, [ tool])


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
