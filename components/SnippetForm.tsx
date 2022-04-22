import React, { FC, useState } from 'react'
import {Controller, useForm } from 'react-hook-form'
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs'
import slug from 'slug'
import { Snippet } from '../types'
import Button from './Button'
import { PlusIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import { Editor } from './Editor'

type FormData = Pick<Snippet, 'content' | 'title'>

const SnippetForm: FC<{
  snippetId?: Snippet['id']
  defaultValues?: FormData
}> = ({ defaultValues, snippetId }) => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues,
  })

  const onSubmit = async (formData: FormData) => {
    setLoading(true)
    try {
      if (snippetId) {
        const { data, error } = await supabaseClient
          .from('snippets')
          .update({
            title: formData.title,
            content: formData.content,
            slug: slug(formData.title as string),
          })
          .match({
            id: snippetId,
          })
      } else {
        const { data, error } = await supabaseClient
          .from('snippets')
          .insert([
            {
              title: formData.title,
              content: formData.content,
              slug: slug(formData.title as string),
            },
          ])
          .single()
        if (data?.id) {
          router.push(`/${data.id}/${data.slug}`)
        }
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      New
      <form onSubmit={handleSubmit(onSubmit)}>
        Title
        <input type="text" {...register('title', { required: true })} />
        {/* include validation with required or other standard HTML validation rules */}
        Content:
        <Controller
          control={control}
          name="content"
          render={({field: {onChange, onBlur, value}}) => <Editor onChange={onChange} onBlur={onBlur} value={value}/>}
        />
        {/* errors will return when field validation fails  */}
        {errors.content && <span>This field is required</span>}
        <Button type="submit" icon={PlusIcon} loading={loading}>
          Submit
        </Button>
      </form>
    </div>
  )
}

export default SnippetForm
