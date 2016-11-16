
// import {install as offlineInstall} from 'offline-plugin/runtime'
import './app.bootstrap'

if (process.env.NODE_ENV === 'production') {
// offlineInstall()
}

console.log('Current Environment: ', process.env.NODE_ENV)

