import React, { FC } from 'react'
import { useController, useFormContext } from 'react-hook-form'
import GridLayout from 'react-grid-layout'
import CodeEditor from './CodeEditor'
import classNames from 'classnames'
import styles from '../pages/[id]/image.module.css'

export const ImageLayoutComponent: FC<{
  title?: string
}> = ({ title }) => {
  const { control } = useFormContext()
  const {
    field: { onChange, onBlur, name, value, ref },
    fieldState: { invalid, isTouched, isDirty },
    formState: { touchedFields, dirtyFields },
  } = useController({
    name: 'imageLayout',
    control,
    rules: { required: true },
    defaultValue: [
      { i: 'title', x: 0, y: 2, w: 100, h: 2 },
      { i: 'code-1', x: 57, y: 9, w: 40, h: 8, minW: 20, minH: 4 },
    ],
  })

  return (
    <GridLayout
      className={classNames('layout bg-yellow-100', styles.django)}
      layout={value}
      cols={100}
      rowHeight={27}
      maxRows={25}
      width={1200}
      style={{ height: 675, maxHeight: 675 }}
      compactType={null}
      isBounded={true}
      onLayoutChange={onChange}
    >
      <div key="title" className="border-2 border-dashed border-gray-100">
        {title}
      </div>
      <div key="code-0">
        <CodeEditor snippet={'adskjfl asdjf asdfasd\nadsfsadfasdfasd\n'} />
      </div>
      <div key="code-1">
        <CodeEditor snippet={'adskjfl asdjf asdfasd\nadsfsadfasdfasd\n'} />
      </div>
      <div key="code-2">
        <CodeEditor snippet={'adskjfl asdjf asdfasd\nadsfsadfasdfasd\n'} />
      </div>
    </GridLayout>
  )
}
