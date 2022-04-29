import Link from 'next/link'
import React, { FC, MouseEventHandler, useContext } from 'react'
import { Icon as IconType } from '@heroicons'
import { RefreshIcon } from '@heroicons/react/solid'
import classNames from 'classnames'
import { ThemeContext } from './Layout'

type ButtonProps = {
  icon?: IconType
  onClick?: MouseEventHandler
  kind?: 'primary' | 'danger'
} & (
  | {
      type: 'button' | 'submit'
      as?: 'button'
      href?: never
      nextLink?: never
      loading?: boolean
    }
  | {
      type?: never
      as: 'a'
      href: string
      nextLink?: boolean
      loading?: never
    }
)

const Button: FC<ButtonProps> = ({
  children,
  type,
  href,
  nextLink = false,
  loading,
  as: Component = 'button',
  icon,
  onClick,
  kind = 'primary',
}) => {
  const theme = useContext(ThemeContext)

  const Icon = loading ? RefreshIcon : icon

  const element = (
    <Component
      href={href}
      type={type}
      onClick={onClick}
      className={classNames(
        'inline-flex cursor-pointer items-center rounded border border-transparent px-2.5 py-1.5 text-xs font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2',
        {
          [theme.colors.primary]: kind === 'primary',
          'bg-red-600': kind === 'danger',
        }
      )}
    >
      {Icon && (
        <Icon
          className={classNames('-ml-0.5 mr-2 h-4 w-4', {
            'animate-spin': loading,
          })}
          aria-hidden="true"
        />
      )}
      {children}
    </Component>
  )
  return nextLink ? (
    <Link passHref href={href as string}>
      {element}
    </Link>
  ) : (
    element
  )
}

export default Button
