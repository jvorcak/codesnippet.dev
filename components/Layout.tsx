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

export const THEMES: Record<ThemeName, Theme> = {
  default: {
    background: 'bg-gray-200',
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
  className?: string
}> = ({ children, className, theme: themeName, actions }) => {
  const theme = THEMES['default']
  return (
    <ThemeContext.Provider value={theme}>
      <div className={classNames('min-h-full', className)}>
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
