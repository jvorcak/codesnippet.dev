import React, { FC } from 'react'
import { useController, useFormContext } from 'react-hook-form'
import GridLayout from 'react-grid-layout'
import CodeEditor from './CodeEditor'
import styles from '../pages/[id]/image.module.css'
import { SnippetFormData } from './SnippetForm'
import ImageGridLayout from './ImageGridLayout'

export const ImageLayoutComponent: FC<{
  title?: string
}> = ({ title }) => {
  const { control, watch } = useFormContext<SnippetFormData>()

  const codes = watch('codes')
  const themeName = watch('themeName')

  const {
    field: { onChange, value },
  } = useController({
    name: 'imageLayout',
    control,
    rules: { required: true },
  })

  return (
    <ImageGridLayout
      snippet={{
        imageLayout: value,
        title,
        codes,
        themeName,
      }}
      onLayoutChange={onChange}
    />
  )
}
