import React, { FC } from 'react'
import { useController, useFieldArray, useFormContext } from 'react-hook-form'
import GridLayout from 'react-grid-layout'
import CodeEditor from './CodeEditor'
import classNames from 'classnames'
import styles from '../pages/[id]/image.module.css'
import { SnippetFormData } from './SnippetForm'

export const ImageLayoutComponent: FC<{
  title?: string
}> = ({ title }) => {
  const { control } = useFormContext<SnippetFormData>()
  const { fields } = useFieldArray<SnippetFormData>({
    control: control,
    name: 'imageLayout',
  })
  const {
    field: { onChange, onBlur, name, value, ref },
    fieldState: { invalid, isTouched, isDirty },
    formState: { touchedFields, dirtyFields },
  } = useController({
    name: 'imageLayout',
    control,
    rules: { required: true },
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
      {fields.map((field, index) => (
        <div key="code-0">
          <CodeEditor snippet={''} />
        </div>
      ))}
    </GridLayout>
  )
}
