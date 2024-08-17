import React, { useEffect, useState , forwardRef, useRef} from 'react'
import { Group, RegularPolygon, Transformer} from "react-konva"


 function DiamondLayer({tool, transform}, refs) {

 const { trRef, stageRef} = refs
 const [drag, setDrag] = useState(false)
 const [diamonds, setDiamonds] = useState([])

 const isDrawing = useRef(false);
 

 useEffect(() => {

  if(tool === "Drag"){
    setDrag(true)
  }else{
    setDrag(false)
  }

 }, [diamonds, tool])


 




 const handleDiamondDown = (e) => {
   isDrawing.current = true
   const pos = e.target.getStage().getRelativePointerPosition()
   setDiamonds([...diamonds, {x: pos.x, y: pos.y, radius: 0  }])
};


const handleDiamondMove = (e) => {
  if(!isDrawing.current ){
    return
  }

  const pos = e.target.getStage().getRelativePointerPosition()
  let lastDiamond = diamonds[diamonds.length -1]
  lastDiamond.radius = Math.sqrt(Math.pow(pos.x - lastDiamond.x , 2) + Math.pow(pos.y - lastDiamond.y, 2))
  diamonds.splice(diamonds.length -1 , 1 , lastDiamond)
  setDiamonds(diamonds.concat())
};



const handleDiamondUp = () => {
  isDrawing.current = false; 
};





useEffect(() => {
  
  const stage = stageRef.current
  if(tool === "Diamond" && stage){
     




    stage.on("mousedown" , handleDiamondDown)
    stage.on("mousemove" , handleDiamondMove)
    stage.on("mouseup" , handleDiamondUp)
    stage.on("touchstart", handleDiamondDown)
    stage.on("touchmove", handleDiamondMove)
    stage.on("touchend", handleDiamondUp)

    return () => {
      stage.off("mousedown" , handleDiamondDown)
      stage.off("mousemove" , handleDiamondMove)
      stage.off("mouseup" , handleDiamondUp)
      stage.off("touchstart", handleDiamondDown)
      stage.off("touchmove", handleDiamondMove)
      stage.off("touchend", handleDiamondUp)
  
    }
  }

} , [tool , isDrawing, diamonds])


useEffect(() => {
  
  const stage = stageRef.current
  if(tool === "Eraser" && stageRef.current) {
   
   
    const handleErase = (e) => {
     
    const pos = e.target.getStage().getRelativePointerPosition()

     
    setDiamonds(shapes => shapes.filter((shape) => {
      const diamond = shape;
      const intersects = (
        pos.x > diamond.x + diamond.radius ||
        pos.x < diamond.x - diamond.radius ||
        pos.y > diamond.y + diamond.radius ||
        pos.y < diamond.y - diamond.radius
      );

      return intersects;
    }
    
    ))
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

        {diamonds.map((diamond, index) => {
              return(
            <RegularPolygon
                key={index}
                x={diamond.x}
                y={diamond.y}
                sides={4}

                radius={diamond.radius}
                fill="pink"
                stroke="black"
                strokeWidth={2}
                draggable={drag}
                onClick={tool==="Drag" ? transform: null}
               
             /> 
        )})}

            <Transformer
                anchorStyleFunc={ (anchor)  =>{
                   anchor.cornerRadius(10);
                 }
                }
                ref={trRef}
                rotateEnabled={true}
                resizeEnabled={true}
                scaleEnabled={true}
                skewEnabled={true}

                boundBoxFunc = { (oldBox, newBox) => {
                  newBox.width = Math.max(30, newBox.width);
                  return newBox;
                }}
            />
    </Group>
  )
}


export default forwardRef(DiamondLayer)