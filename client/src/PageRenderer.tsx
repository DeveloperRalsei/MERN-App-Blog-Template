import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';

const router = createBrowserRouter([
   {
      path: "/",
      element: <App/>,
      children: [
         {
            path: "/",
            element: <div>test</div>
         },
         {
            path: "*",
            element: <>Sayfa Bulunamadı</>
         }
      ]
   }
])

const Renderer: React.FC = () => {
   return <RouterProvider router={router}/>
}

export default Renderer;