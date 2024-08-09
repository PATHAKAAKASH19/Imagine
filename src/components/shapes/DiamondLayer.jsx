import React, { useEffect, useState , forwardRef, useImperativeHandle, useRef} from 'react'
import { Group, RegularPolygon, Transformer} from "react-konva"


 function DiamondLayer({tool, transform}, refs) {

 const {diamondRef, trRef} = refs
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


useImperativeHandle(diamondRef, () => ({
  
  handleDiamondDown,
  handleDiamondMove,
  handleDiamondUp
  
}))

 
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