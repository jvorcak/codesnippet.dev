import React, { FC } from 'react'
import { useForm } from 'react-hook-form'
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs'
import slug from 'slug'
import { Snippet } from '../types'

type FormData = Pick<Snippet, 'content' | 'title'>

const SnippetForm: FC<{
  snippetId?: Snippet['id']
  defaultValues: FormData
}> = ({ defaultValues, snippetId }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues,
  })

  const onSubmit = async (formData: FormData) => {
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
      console.log({
        data,
        error,
      })
    } else {
      const { data, error } = await supabaseClient.from('snippets').insert([
        {
          title: formData.title,
          content: formData.content,
          slug: slug(formData.title as string),
        },
      ])
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
        <textarea {...register('content', { required: true })} />
        {/* errors will return when field validation fails  */}
        {errors.content && <span>This field is required</span>}
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default SnippetForm
