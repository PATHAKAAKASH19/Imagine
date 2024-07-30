import React from 'react'
import { Layer, Text } from 'react-konva'

export default function TextLayer({texts}) {
  return (
    <Layer>
       {
        texts.map((t,index) => {
           return (
              <Text
              key={index}
               x={t.x}
               y={t.y}
               text={`${t.text}`}
               fontSize = {18}
               fontFamily= 'Calibri'
               fill= '#555'
               width= {300}
               padding={0}
               align={'center'}
              />
           )
        })
       }

       
    </Layer>
  )
}
