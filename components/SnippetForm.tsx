import React from 'react'
import { useForm } from 'react-hook-form'
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs'
import slug from 'slug'
import { Snippet } from '../types'

type FormData = Pick<Snippet, 'content' | 'title'>

const SnippetForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit = async (formData: FormData) => {
    const { data, error } = await supabaseClient.from('snippets').insert([
      {
        title: formData.title,
        content: formData.content,
        slug: slug(formData.title as string),
      },
    ])

    console.log(data)
  }

  console.log(watch('content')) // watch input value by passing the name of it

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
