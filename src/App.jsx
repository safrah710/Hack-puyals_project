import React from 'react'
import route from './Utils/Approuter';
import { Toaster } from 'react-hot-toast';
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
function App() {
  let router=createBrowserRouter(route)
  return <>
    <RouterProvider router={router}/>
    <Toaster/>
  </>
}

export default App