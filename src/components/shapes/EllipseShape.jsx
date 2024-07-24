import React from "react";
import { Layer, Ellipse } from "react-konva";

export default function EllipseShape({ ellipses }) {
  return (
    <Layer>
      {ellipses.map((ellipse, index) => {
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
            draggable={true}
          />
        );
      })}
    </Layer>
  );
}
