
import angular from 'angular'
import mocks from 'angular-mocks'
import uiRouter from 'angular-ui-router'
import uiBootstrap from 'angular-ui-bootstrap'

let context = require.context('../src/app', true, /\.spec\.js/)

context.keys().forEach(context)
