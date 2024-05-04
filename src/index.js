import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import reportWebVitals from './reportWebVitals';

//Pages
import Index from './pages/index';
import Login from './pages/login/login';
import App from './pages/app';
import Register from './pages/register/register';
import Video from './pages/video/video';
import Home from './pages/home/home';
import Game from './pages/games/game';

const router = createBrowserRouter([
  {
    path:'/login',
    element: <Login/>,
  },

  {
    path:'/',
    element: <Home/>,
  },

  {
    path:'/game',
    element: <Game/>,
  },

  {
    path:'/app',
    element: <App/>,
  },

  {
    path:'/register',
    element: <Register/>,
  },
  {
    path:"/meets/:id",
    element: <Video/>,
  },
  {
    path:"/video",
    element: <Video/>,
  },
  
])



ReactDOM.createRoot(document.getElementById('root')).render(
  
    <RouterProvider router={router} />
  
)
reportWebVitals();
