import * as React from 'react'

export interface RootProps { compiler: string; framework: string }

export default function Greeting (props) {
  return (
    <h1>Hello from {props.compiler} and {props.framework}!!</h1>
  )
}

