import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import { UserManagement } from './pages/UserManagement';
import Home from './pages/Home';
import Blogs from './pages/Blogs';
import NotFound from './pages/NotFound';
import Panel, { BlogList } from './pages/Panel';
import HomePanel from './pages/Panel/HomePanel';

const router = createBrowserRouter([
   {
      path: "panel",
      element: <Panel />,
      children: [
         {
            path: "",
            element: <HomePanel/>
         },
         {
            path: "blogs",
            element: <BlogList/>
         },
         {
            path: "*",
            element: <>No Page</>
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