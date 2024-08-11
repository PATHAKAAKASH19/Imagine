import React, { useState, useEffect, forwardRef, useRef, useImperativeHandle} from 'react';
import { Group, Arrow ,Transformer} from 'react-konva';

const ArrowLayer = ({ tool, transform, stageRef}, refs ) => {
  
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



const isPointInArrow = (point, arrow) => {

  const { points } = arrow;
  const [x1, y1, x2, y2] = points;

 
  const distanceToLine = (x1, y1, x2, y2, px, py) => {
    const lineLength = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    if (lineLength === 0) return Math.sqrt((px - x1) ** 2 + (py - y1) ** 2);
    const t = ((px - x1) * (x2 - x1) + (py - y1) * (y2 - y1)) / lineLength ** 2;
    const tx = t < 0 ? x1 : t > 1 ? x2 : x1 + t * (x2 - x1);
    const ty = t < 0 ? y1 : t > 1 ? y2 : y1 + t * (y2 - y1);
    return Math.sqrt((px - tx) ** 2 + (py - ty) ** 2);
  };

  const distance = distanceToLine(x1, y1, x2, y2, point.x, point.y);
  return distance <= arrow.strokeWidth() / 2;
};

 useEffect(() => {

   const stage = stageRef.current

   if(tool === "Eraser") {
   const handleErase = (e) => {
    const pos = e.target.getStage().getRelativePointerPosition()

    setArrows(shapes => shapes.filter(shape => {
      const arrow = shape
      return !isPointInArrow(pos, arrow)
    }))

   }
   stage.on("mouseover", handleErase)

   return () => {
    stage.off("mouseover", handleErase)
   }}

  }, [tool])



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
