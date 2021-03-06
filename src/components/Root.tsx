import * as React from 'react'
const styles = require('./styles.css')
import Greeting from './Greeting'

/* export class Root extends React.Component<RootProps, {}> {
  render() {
    return (
      <div className={styles.root}>
        <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>
      </div>
    )
  }
} */

export default function Root() {
  return (
    <div className={styles.root}>
      <Greeting compiler="TypeScript" framework="React.js"></Greeting>
    </div>
  )
}
