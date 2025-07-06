'use client'

import { useEffect, useState } from 'react'

type AlertProps = {
  message: string
  type: 'success' | 'error' | 'info' | 'warning'
}

export default function Alert({ message, type }: AlertProps) {
  const [show, setShow] = useState(true)

  useEffect(() => {
    setShow(true)
    const timer = setTimeout(() => {
      setShow(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [message])

  if (!show) return null
  const getAlertClass = (type: AlertProps['type']) => {
    switch (type) {
      case 'success':
        return 'alert-success'
      case 'error':
        return 'alert-error'
      case 'info':
        return 'alert-info'
      case 'warning':
        return 'alert-warning'
      default:
        return 'alert-info'
    }
  }

  return (
    <div role="alert" className={`alert ${getAlertClass(type)} w-full`}>
      <span>{message}</span>
    </div>
  )
}
