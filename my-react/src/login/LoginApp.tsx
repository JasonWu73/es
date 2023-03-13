import { useState } from 'react';
import MainHeader from './main-header/MainHeader';
import Login from './login/Login';
import Home from './home/Home';

function LoginApp() {
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);

  const loginHandler = (username: string, password: string) => {
    if (username === 'wxj' && password === '123') {
      setIsLoggedIn(true);
      return;
    }

    alert('WRONG USERNAME OR PASSWORD');
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
  };

  return (
    <>
      <MainHeader isLoggedIn={isLoggedIn} onLogout={logoutHandler}/>
      {isLoggedIn ? <Home/> : <Login onLogin={loginHandler}/>}
    </>
  );
}

export default LoginApp;
