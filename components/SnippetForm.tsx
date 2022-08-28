import React, { FC, useCallback, useEffect, useState } from 'react'
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
import { TrashIcon } from '@heroicons/react/solid'
import { contentToHTML } from '../helpers/common'
import dynamic from 'next/dynamic'

const Kanva = dynamic(() => import('./Kanva'), {
  ssr: false,
})

export type SnippetFormData = Pick<
  Snippet,
  'content' | 'title' | 'imageLayout' | 'codes' | 'themeName'
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

  const content = watch('content')
  const codes = watch('codes')
  const formData = watch()

  const [htmlPreview, setHTMLPreview] = useState()

  useEffect(() => {
    contentToHTML(content, codes).then((result) => {
      setHTMLPreview(result)
    })
  }, [formData])

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
          html: htmlPreview,
          themeName: formData.themeName,
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
        <Kanva />
        <div className="grid min-h-screen max-w-full grid-cols-[1fr_1200px] gap-5 p-4">
          <div>
            <div className="p-2">
              <div className="col-span-6">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <input
                  {...register('title', { required: true })}
                  type="text"
                  name="title"
                  id="title"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                />
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="themeName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Theme
                </label>
                <div className="mt-1">
                  <select
                    {...register('themeName', { required: true })}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="django">Django</option>
                    <option value="default">Default</option>
                    <option value="triangle">Triangle</option>
                  </select>
                </div>
              </div>

              {fields.map((field, index) => (
                <div key={index} className="my-4 rounded-md bg-gray-100 p-4">
                  <div className="col-span-6">
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Title
                    </label>
                    <input
                      {...register(`codes.${index}.title`, {
                        required: true,
                      })}
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                    />
                  </div>
                  <div className="mt-2 sm:col-span-6">
                    <label
                      htmlFor="about"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Content
                    </label>
                    <div className="mt-1">
                      <textarea
                        rows={3}
                        className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        {...register(`codes.${index}.content`, {
                          required: true,
                        })}
                      />
                    </div>
                  </div>

                  <div className="mt-2 text-right">
                    <Button
                      kind="danger"
                      onClick={() => {
                        remove(index)
                      }}
                      icon={TrashIcon}
                    >
                      Remove Snippet
                    </Button>
                  </div>
                </div>
              ))}
              <Button
                icon={PlusIcon}
                onClick={() => {
                  const newId = uuidv4()
                  append(
                    {
                      i: newId,
                      lang: 'typescript',
                      slug: '',
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
                Insert New Snippet
              </Button>
              {/* include validation with required or other standard HTML validation rules */}
              <label className="block py-2">Content</label>
              <div className="rounded-md border border-gray-300 p-1">
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
          </div>
          <div>
            <ImageLayoutComponent title={title} />
            <article className="prose prose-slate mx-auto pt-10">
              <h1 className="py-10 text-center">{title}</h1>
              <div dangerouslySetInnerHTML={{ __html: htmlPreview }} />
            </article>
          </div>
        </div>

        <div className="sticky bottom-0 flex justify-between border-t bg-white p-5">
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
