import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query'
import { MantineProvider,  } from '@mantine/core'
import '@mantine/core/styles.css'
import './index.css'
import { queryClient } from './config/query-client'
import AppRouter from './router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider >
        <AppRouter />
      </MantineProvider>
    </QueryClientProvider>
  </StrictMode>,
)
