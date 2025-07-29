import React from "react"

export default function Button({
  children,
  className = "",
  ...props
}: React.PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>>) {
  return (
    <button
      className={`px-4 py-2 rounded text-sm font-medium ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
