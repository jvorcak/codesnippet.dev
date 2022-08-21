import React, { FC, useCallback, useMemo, useState } from 'react'
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
  useWatch,
} from 'react-hook-form'
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs'
import slug from 'slug'
import { Snippet } from '../types'
import Button from './Button'
import { PlusIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import { Editor } from './Editor'
import { ImageLayoutComponent } from './ImageLayoutComponent'
import { extractCodeSnippets } from '../helpers/common'
import { useAsync } from 'react-use'

export type SnippetFormData = Pick<Snippet, 'content' | 'title' | 'imageLayout'>

const SnippetForm: FC<{
  snippetId?: Snippet['id']
  defaultValues?: SnippetFormData
}> = ({ defaultValues, snippetId }) => {
  const [loading, setLoading] = useState(false)
  // const { user } = useUser()
  const router = useRouter()

  const methods = useForm<SnippetFormData>({
    defaultValues: {
      ...defaultValues,
      // react-hook-form doesn't set default value if the value is null
      imageLayout: defaultValues?.imageLayout ?? [
        {
          i: 'title',
          x: 0,
          y: 2,
          w: 100,
          h: 2,
          content: '',
          lang: '',
        },
      ],
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

  const watchAllFields = watch()

  const { fields, append, prepend, remove, swap, move, insert } =
    useFieldArray<SnippetFormData>({
      control: methods.control,
      name: 'imageLayout',
    })

  const content = useWatch<SnippetFormData>({
    control: methods.control,
    name: 'content',
  })

  const title = useWatch<SnippetFormData>({
    control: methods.control,
    name: 'title',
  }) as string

  const codeSnippets = useAsync(async () => {
    return await extractCodeSnippets(content as string).catch(console.error)
  }, [content])

  const deleteSnippet = useCallback(async () => {
    await supabaseClient
      .from('snippets')
      .delete()
      .match({ id: snippetId })
      .then(() => {
        router.push('/')
      })
  }, [router, snippetId])

  const onSubmit = async (formData: SnippetFormData) => {
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
        {/*<ImageLayoutComponent title={title} />*/}
        {JSON.stringify(watchAllFields)}
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
          {fields.map((field, index) => (
            <textarea
              className="w-full border-2 border-dashed p-2"
              key={field.id} // important to include key with field's id
              {...register(`imageLayout.${index}.content`, {
                required: true,
              })}
            />
          ))}
          <button
            type="button"
            onClick={() =>
              append(
                {
                  lang: 'typescript',
                  content: '',
                  w: 100,
                  h: 2,
                  x: 0,
                  y: 2,
                },
                { shouldFocus: true }
              )
            }
          >
            Insert
          </button>
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
