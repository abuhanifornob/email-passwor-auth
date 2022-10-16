import logo from './logo.svg';
import './App.css';
import {getAuth} from 'firebase/auth'
import app from './firebase/firebase.int';
import ReactBootstrapForm from './components/ReactBootstrapForm';
import BootstrapRegisterForm from './components/BootstrapRegisterForm';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from './layouts/Main';
import BoortStrapLoginForm from './components/BoortStrapLoginForm';

const auth=getAuth(app);
function App() {
  const router=createBrowserRouter([
    {
      path:"/",
      element:<Main></Main>,
      children:[{
        path:'/',
       element:<BootstrapRegisterForm></BootstrapRegisterForm>
      },
      {
        path:'/register',
        element:<BootstrapRegisterForm></BootstrapRegisterForm>
      },{
        path:'/login',
        element:<BoortStrapLoginForm></BoortStrapLoginForm>
        
      }

    ],
    }
  ]);

  return (
    <div className="">
     <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
