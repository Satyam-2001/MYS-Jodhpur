import React from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, ScrollRestoration } from 'react-router-dom';
import router from './routes'
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './services/http'
import { Provider } from 'react-redux'
import store from './store'


import './index.css'
import { ColorModeProvider } from './theme';
import { SocketProvider } from './context/SocketProvider';

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <SocketProvider>
        <ColorModeProvider>
          <RouterProvider router={router} >
            {/* <ScrollRestoration
              getKey={(location, matches) => {
                return location.pathname;
              }}
            /> */}
          </RouterProvider>
        </ColorModeProvider>
      </SocketProvider>
    </Provider>
  </QueryClientProvider>
);