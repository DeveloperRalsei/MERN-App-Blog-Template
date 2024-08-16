import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import { UserManagement } from './pages/UserManagement';
import Home from './pages/Home';
import Blogs from './pages/Blogs';
import NotFound from './pages/NotFound';
import Panel, { UploadBlog } from './pages/Panel';

const router = createBrowserRouter([
   {
      path: "panel",
      element: <Panel />,
      children: [
         {
            path: "",
            element: <>Home Panel Page</>
         },
         {
            path: "blogs",
            element: <UploadBlog/>
         }
      ]
   },
   {
      path: "",
      element: <App />,
      children: [
         {
            path: "",
            element: <Home />
         },
         {
            path: "home",
            element: <Home />
         },
         {
            path: "blogs",
            element: <Blogs />
         },
         {
            path: "account/",
            element: <UserManagement />
         },
         {
            path: "account/:accountId",
            element: <UserManagement />
         },
         {
            path: "*",
            element: <NotFound />
         },
      ]
   },
]);

const Renderer: React.FC = () => {
   return <RouterProvider router={router} />;
};

export default Renderer;