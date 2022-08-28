import React from 'react'
import { Stage, Layer, Text } from 'react-konva'

const Kanva = () => {
  return (
    <Stage width={500} height={500}>
      <Layer>
        <Text text="Try click on rect" />
      </Layer>
    </Stage>
  )
}

export default Kanva
