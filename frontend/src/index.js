import React from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import router from './routes'
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './services/http'
import { Provider } from 'react-redux'
import store from './store'


import './index.css'
import { ColorModeProvider } from './theme';

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <ColorModeProvider>
        <RouterProvider router={router} />
      </ColorModeProvider>
    </Provider>
  </QueryClientProvider>
);