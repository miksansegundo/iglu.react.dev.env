import * as React from "react"
const styles = require('./styles.css')

export interface RootProps { compiler: string; framework: string }

export class Root extends React.Component<RootProps, {}> {
  render() {
    return (
      <div className={styles.root}>
        <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>
      </div>
    )
  }
}