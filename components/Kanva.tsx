import React, { useEffect } from 'react'
import Konva from 'konva'

const Kanva = () => {
  useEffect(() => {
    const stage = new Konva.Stage({
      container: 'container',
      width: 1200,
      height: 675,
    })

    const layer = new Konva.Layer()
    stage.add(layer)

    const text = new Konva.Text({
      x: stage.width() / 2,
      y: 15,
      text: 'Simple Text',
      fontSize: 30,
      fontFamily: 'Calibri',
      fill: 'green',
      draggable: true,
    })
    layer.add(text)
  }, [])
  return <div id="container"></div>
}

export default Kanva
