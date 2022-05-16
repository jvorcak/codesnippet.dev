import React, { ReactElement, useCallback } from 'react'
import Layout, { ThemeContext, THEMES } from '../components/Layout'
import SnippetForm from '../components/SnippetForm'
import { NextPageWithLayout } from './_app'
import TopMenu from '../components/TopMenu'

const New: NextPageWithLayout = () => <SnippetForm />

New.getLayout = function getLayout(page: ReactElement) {
  const theme = THEMES['default']
  return (
    <ThemeContext.Provider value={theme}>
      <TopMenu theme={theme} />
      <div className="m-10 mx-auto w-[1200px] rounded-md">
        <SnippetForm />
      </div>
    </ThemeContext.Provider>
  )
}

export default New
