/// <reference types="vite/client" />

declare module '*.css' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.svg' {
  import * as React from 'react'
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>
  const src: string
  export default src
}

declare module '*.svg?react' {
  import * as React from 'react'
  const content: React.FC<React.SVGProps<SVGSVGElement>>
  export default content
}
