import Link from 'next/link'
import React, { FC } from 'react'
import { Icon as IconType } from '@heroicons'
import { CheckCircleIcon, RefreshIcon } from '@heroicons/react/solid'
import classNames from 'classnames'

type ButtonProps = {
  icon?: IconType
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
}) => {
  const Icon = loading ? RefreshIcon : icon

  const element = (
    <Component
      href={href}
      type={type}
      className="cursor-pointer inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
