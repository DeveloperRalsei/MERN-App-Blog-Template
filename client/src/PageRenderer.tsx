import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import { UserManagement } from './pages/UserManagement';
import Home from './pages/Home';
import Blogs from './pages/Blogs';

const router = createBrowserRouter([
   {
      path: "/",
      element: <App/>,
      children: [
         {
            path: "/",
            element: <Home/>
         },
         {
            path: "/blogs",
            element: <Blogs/>
         },
         {
            path: "/account/:id",
            element: <UserManagement/>
         },
         {
            path: "*",
            element: <>Sayfa Bulunamadı</>
         },
      ]
   }
])

const Renderer: React.FC = () => {
   return <RouterProvider router={router}/>
}

export default Renderer;