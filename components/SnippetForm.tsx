import React, { FC, useCallback, useState } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs'
import slug from 'slug'
import { Snippet } from '../types'
import Button from './Button'
import { PlusIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import { Editor } from './Editor'
// import { useUser } from '@supabase/supabase-auth-helpers/react'
import { ImageLayoutComponent } from './ImageLayoutComponent'

type FormData = Pick<Snippet, 'content' | 'title' | 'imageLayout'>

const SnippetForm: FC<{
  snippetId?: Snippet['id']
  defaultValues?: FormData
}> = ({ defaultValues, snippetId }) => {
  const [loading, setLoading] = useState(false)
  // const { user } = useUser()
  const router = useRouter()

  const methods = useForm<FormData>({
    defaultValues: {
      ...defaultValues,
      // react-hook-form doesn't set defautl value if the value is null
      imageLayout:
        defaultValues?.imageLayout === null
          ? undefined
          : defaultValues?.imageLayout,
      content: defaultValues?.content ?? new Array(10).join('\n'),
    },
  })

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = methods

  const values = watch()
  console.log(values)

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
      const { data, error } = await supabaseClient
        .from('snippets')
        .upsert({
          id: snippetId,
          title: formData.title,
          content: formData.content,
          slug: slug(formData.title as string),
          updated_at: new Date(),
          imageLayout: formData.imageLayout,
        })
        .single()

      if (data?.id) {
        await fetch(`/api/image/${data.id}`)
        await router.push(`/${data.id}/${data.slug}`)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ImageLayoutComponent title={values.title} />
        {JSON.stringify({ imageLayout: values.imageLayout })}
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
    </FormProvider>
  )
}

export default SnippetForm
