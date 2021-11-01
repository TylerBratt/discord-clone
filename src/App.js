import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import Login from './components/Login';
import { selectUser } from './features/userSlice'
import { auth } from './components/firebase';
import { login, logout } from './features/userSlice'

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if(authUser) {
        //user logged in
        dispatch(
          login({
          uid: authUser.uid,
          photo: authUser.photoURL,
          email: authUser.email,
          displayName: authUser.displayName
        }))
      } else {
        //no user
        dispatch(logout());
      }
    })
  },[dispatch])

  return (
    <div className="app">
      {user ? (
        <>
          <Sidebar />
          <Chat />
        </>
  ): (
    <Login />
  )}
    </div>
  );
}

export default App;
