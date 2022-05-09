import React, { FC, ReactChild, ReactElement, ReactNode } from 'react'
import TopMenu from './TopMenu'
import classNames from 'classnames'

type ThemeName = 'django' | 'default'

export type Theme = {
  background: string
  logo: string
  colors: {
    primary: string
  }
}

const THEMES: Record<ThemeName, Theme> = {
  django: {
    background: 'bg-[url("/webscope.svg")] bg-fixed',
    logo: 'text-[#166e4d]',
    colors: {
      primary: 'bg-[#166e4d] hover:bg-[#092E20]',
    },
  },
  default: {
    background: 'bg-gradient-to-r from-cyan-500 to-blue-500',
    logo: 'text-blue-500',
    colors: {
      primary: 'bg-blue-500',
    },
  },
}

export const ThemeContext = React.createContext<Theme>(THEMES.default)

const Layout: FC<{
  children: ReactChild | ReactChild[]
  theme?: ThemeName
  actions?: ReactChild | ReactChild[]
}> = ({ children, theme: themeName, actions }) => {
  const theme = THEMES[themeName ?? 'default']
  return (
    <ThemeContext.Provider value={theme}>
      <div className={classNames('min-h-full', theme?.background)}>
        <TopMenu theme={theme} />
        <div className="m-10 mx-auto grid max-w-5xl rounded-md sm:grid-cols-[100px_1fr_100px]">
          <div />
          <div className="mb-10 bg-white">{children}</div>
          <nav className="space-y-1 px-2" aria-label="Sidebar">
            {actions}
          </nav>
        </div>
      </div>
    </ThemeContext.Provider>
  )
}

export default Layout
