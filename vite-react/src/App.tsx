import './App.scss';
import Root from './routes/Root';
import {useEffect} from 'react';
import {useAppDispatch} from './store-hooks';
import {reLoginFromCache} from './routes/auth/auth-slice';
import {useLocation, useNavigate} from 'react-router-dom';

export default function App() {
  useReLogin();

  return (
    <div className="app">
      <Root/>
    </div>
  );
};

function useReLogin() {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(
    () => {
      dispatch(reLoginFromCache(() => {
        if (location.pathname === '/login') {
          navigate('/');
          return;
        }

        navigate(location.pathname);
      }));
    },
    []
  );
}
