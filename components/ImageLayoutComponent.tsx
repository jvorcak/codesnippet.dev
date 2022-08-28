import React, { FC } from 'react'
import { useController, useFormContext } from 'react-hook-form'
import { SnippetFormData } from './SnippetForm'
import ImageGridLayout from './ImageGridLayout'

export const ImageLayoutComponent: FC = () => {
  const { control, watch } = useFormContext<SnippetFormData>()

  const snippet = watch()

  const {
    field: { onChange },
  } = useController({
    name: 'imageLayout',
    control,
    rules: { required: true },
  })

  return <ImageGridLayout snippet={snippet} onLayoutChange={onChange} />
}
