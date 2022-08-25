import React, { FC, useCallback, useEffect, useMemo, useState } from 'react'
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
  useWatch,
} from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs'
import slug from 'slug'
import { Snippet } from '../types'
import Button from './Button'
import { PlusIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import { Editor } from './Editor'
import { ImageLayoutComponent } from './ImageLayoutComponent'

export type SnippetFormData = Pick<
  Snippet,
  'content' | 'title' | 'imageLayout' | 'codes'
>

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
        },
      ],
      content: defaultValues?.content ?? '',
    },
  })

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = methods

  const imageLayout = watch('imageLayout')
  const codes = watch('codes')

  // useEffect(() => {
  //   // this hook is called if and only if you add or remove a code item
  //   const ids = codes?.map(({ i }) => i) ?? []
  //   ids.push('title')
  //
  //   console.log(ids)
  // }, [codes])

  const { append: appendLayoutItem } = useFieldArray<SnippetFormData>({
    control: methods.control,
    name: 'imageLayout',
  })

  const { fields, append, prepend, remove, swap, move, insert } =
    useFieldArray<SnippetFormData>({
      control: methods.control,
      name: 'codes',
    })

  const title = useWatch<SnippetFormData>({
    control: methods.control,
    name: 'title',
  }) as string

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
          codes: formData.codes,
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
        <ImageLayoutComponent title={title} />
        {JSON.stringify(imageLayout)}
        <hr />
        {JSON.stringify(codes)}
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
            <div key={index} className="bg-red-200 p-10">
              ID:{' '}
              <input
                className="w-full border-2 border-dashed p-2"
                {...register(`codes.${index}.i`, {
                  required: true,
                })}
              />
              Content:{' '}
              <textarea
                className="w-full border-2 border-dashed p-2"
                {...register(`codes.${index}.content`, {
                  required: true,
                })}
              />
              <button
                onClick={() => {
                  console.log(imageLayout)
                  remove(index)
                }}
              >
                X
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => {
              const newId = uuidv4()
              append(
                {
                  i: newId,
                  lang: 'typescript',
                  content: '',
                },
                { shouldFocus: true }
              )
              appendLayoutItem({
                i: newId,
                x: 0,
                y: 2,
                w: 100,
                h: 2,
              })
            }}
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
