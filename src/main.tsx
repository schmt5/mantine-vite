import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { App } from './App'
import { MantineProvider } from '@mantine/core'

ReactDOM.render(
  <React.StrictMode>
    <MantineProvider
      withNormalizeCSS
      withGlobalStyles
      theme={{
        colors: {
          'notion': ['#fffefc'],
        }
      }}
    >
      <App />
    </MantineProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
