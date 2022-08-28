import React from 'react'
import { GetServerSideProps } from 'next'
import { NextPageWithLayout } from '../_app'
import { Snippet } from '../../types'
import { getServerSidePropsWithSnippet } from '../../helpers/common'
import ImageGridLayout from '../../components/ImageGridLayout'

const Slug: NextPageWithLayout<{
  snippet: Snippet
}> = ({ snippet }) => {
  return <ImageGridLayout snippet={snippet} />
}

export const getServerSideProps: GetServerSideProps =
  getServerSidePropsWithSnippet

export default Slug
