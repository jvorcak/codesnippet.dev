import React, { FC, useCallback, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs'
import slug from 'slug'
import { Snippet } from '../types'
import Button from './Button'
import { PlusIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import { Editor } from './Editor'
import { useUser } from '@supabase/supabase-auth-helpers/react'

type FormData = Pick<Snippet, 'content' | 'title'>

const SnippetForm: FC<{
  snippetId?: Snippet['id']
  defaultValues?: FormData
}> = ({ defaultValues, snippetId }) => {
  const [loading, setLoading] = useState(false)
  const { user } = useUser()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues,
  })

  const deleteSnippet = useCallback(async () => {
    await supabaseClient
      .from('snippets')
      .delete()
      .match({ id: snippetId })
      .then(() => {
        router.push('/')
      })
  }, [router, snippetId])

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
          .single()

        if (data?.id) {
          await router.push(`/${data.id}/${data.slug}`)
        }
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
          await router.push(`/${data.id}/${data.slug}`)
        }
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-2">
          <div>
            <label className="block py-2">Title</label>
            <p className="text-center">
              <input
                type="text"
                className="w-full border-2 border-dashed p-2"
                {...register('title', { required: true })}
              />
            </p>
          </div>
          {/* include validation with required or other standard HTML validation rules */}
          <label className="block py-2">Content</label>
          <div className="border-2 border-dashed">
            <Controller
              control={control}
              name="content"
              render={({ field: { onChange, onBlur, value } }) => (
                <Editor onChange={onChange} onBlur={onBlur} value={value} />
              )}
            />
          </div>
        </div>
        {/* errors will return when field validation fails  */}
        {errors.content && <span>This field is required</span>}
        <div className="sticky bottom-0 flex justify-between bg-white p-5 shadow-2xl">
          <Button type="button" kind="danger" onClick={deleteSnippet}>
            Delete
          </Button>
          <Button type="submit" icon={PlusIcon} loading={loading}>
            Submit
          </Button>
        </div>
      </form>
    </div>
  )
}

export default SnippetForm
