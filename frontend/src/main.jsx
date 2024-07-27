import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter,createRoutesFromElements,
  Route,RouterProvider
} from 'react-router-dom'
import store from './store';
import {Provider} from 'react-redux'
import App from './App.jsx'
import'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import PrivateRoute from './components/PrivateRoute.jsx';
import HomeScreen from './screens/HomeScreen.jsx'
import LoginScreen from './screens/LoginScreen.jsx'
import RegisterScreen from './screens/RegisterScreen.jsx'
import ProfileScreen from './screens/ProfileScreen.jsx'
import AdminLoginScreen from './screens/AdminLoginScreen.jsx';
import AdminDashboard from './screens/AdminDashboard.jsx';
import AdminRoute from './components/AdminRoute.jsx';
import CreateUserScreen from './screens/CreateUserScreen.jsx';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route  path='/login' element={<LoginScreen />} />
      <Route  path='/register' element={<RegisterScreen />} />
      <Route path='' element={<PrivateRoute />}>
      <Route  path='/profile' element={<ProfileScreen />} />
      </Route>
      <Route path='/admin/login' element={<AdminLoginScreen />} />
      <Route path='/admin' element={<AdminRoute />}>
        <Route index  element={<AdminDashboard />} />
        <Route path='createuser' element={<CreateUserScreen />} />
      </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
  </ Provider>
)
