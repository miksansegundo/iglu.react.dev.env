
import '!style-loader!css-loader!postcss-loader!./css/global.css'

import * as React from 'react'
import * as ReactDOM from 'react-dom'

import Root from './components/Root'

ReactDOM.render(
  <Root />,
  document.getElementById('root')
)
