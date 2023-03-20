import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import MainHeader from './main-header/MainHeader';
import Login from './login/Login';
import Home from './home/Home';

const LOGGED_KEY = 'isLoggedIn';
const LOGGED_IN = '1';

function useAutoLogin(setIsLoggedIn: Dispatch<SetStateAction<boolean>>) {
  useEffect(() => {
    const loggedStatus = localStorage.getItem(LOGGED_KEY);
    if (loggedStatus === LOGGED_IN) {
      setIsLoggedIn(true);
    }
  }, []);
}

export default function LoginApp() {
  const [loggedIn, setLoggedIn] = useState(false);

  useAutoLogin(setLoggedIn);

  function handleLogin(username: string, password: string) {
    if (username === 'wxj' && password === '123') {
      localStorage.setItem(LOGGED_KEY, LOGGED_IN);
      setLoggedIn(true);
      return;
    }

    alert('WRONG USERNAME OR PASSWORD');
  }

  const handleLogout = () => {
    localStorage.removeItem(LOGGED_KEY);
    setLoggedIn(false);
  };

  return (
    <>
      <MainHeader loggedIn={loggedIn} onLogout={handleLogout}/>
      {loggedIn ? <Home/> : <Login onLogin={handleLogin}/>}
    </>
  );
}
