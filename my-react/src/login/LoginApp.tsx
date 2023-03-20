import React from 'react';
import MainHeader from './main-header/MainHeader';
import Login from './login/Login';
import Home from './home/Home';
import { AuthProvider, useAuth } from './AuthContext';

export default function LoginApp() {
  return (
    <AuthProvider>
      <MainHeader/>
      <Main/>;
    </AuthProvider>
  );
};

function Main() {
  const { loggedIn } = useAuth();

  return (
    <>
      {loggedIn ? <Home/> : <Login/>}
    </>
  );
}
