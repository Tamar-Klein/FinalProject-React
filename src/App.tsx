import { RouterProvider } from 'react-router-dom'
import router from './components/router'
import { useDispatch } from 'react-redux'
import Header from './components/header'
import { useEffect } from 'react'
import { getMe } from './services/authenticationApi'
import { setCredentials } from './features/authSlice'

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        dispatch({ type: 'auth/setInitialized' }); 
        return;
      }

      try {
        const response = await getMe();
        if (response) {
          dispatch(setCredentials({ user: response, token })); 
        }
      } catch (error) {
        dispatch({ type: 'auth/setInitialized' });
      }
    };
    initializeAuth();
  }, [dispatch]);

  return (
    <>
      <Header />
      <RouterProvider router={router} />

    </>
  )
}

export default App
