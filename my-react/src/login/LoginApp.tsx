import { useEffect, useState } from 'react';
import MainHeader from './main-header/MainHeader';
import Login from './login/Login';
import Home from './home/Home';

const LOGGED_KEY = 'isLoggedIn';
const LOGGED_IN = '1';

export default function LoginApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedStatus = localStorage.getItem(LOGGED_KEY);
    if (loggedStatus === LOGGED_IN) {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (username: string, password: string) => {
    if (username === 'wxj' && password === '123') {
      localStorage.setItem(LOGGED_KEY, LOGGED_IN);
      setIsLoggedIn(true);
      return;
    }

    alert('WRONG USERNAME OR PASSWORD');
  };

  const logoutHandler = () => {
    localStorage.removeItem(LOGGED_KEY);
    setIsLoggedIn(false);
  };

  return (
    <>
      <MainHeader isLoggedIn={isLoggedIn} onLogout={logoutHandler}/>
      {isLoggedIn ? <Home/> : <Login onLogin={loginHandler}/>}
    </>
  );
}
