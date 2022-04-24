import { FC, ReactChild, ReactNode } from 'react'
import TopMenu from './TopMenu'
import classNames from 'classnames'

type ThemeName = 'django'

type Theme = {
  background: string
}

const THEMES: Record<ThemeName, Theme> = {
  django: {
    background: 'bg-gradient-to-r from-green-600 to-green-800',
  },
}

const Layout: FC<{
  children: ReactChild | ReactChild[]
  theme?: ThemeName
  actions?: ReactChild | ReactChild[]
}> = ({ children, theme: themeName, actions }) => {
  const theme = themeName ? THEMES[themeName] : undefined
  return (
    <div className={classNames('min-h-full', theme?.background)}>
      <TopMenu />
      <div className="prose m-10 mx-auto grid max-w-7xl rounded-md sm:grid-cols-[100px_1fr_100px]">
        <div />
        <main className="mb-10 bg-white  sm:px-6">{children}</main>
        <nav className="space-y-1 px-2" aria-label="Sidebar">
          {actions}
        </nav>
      </div>
    </div>
  )
}

export default Layout
