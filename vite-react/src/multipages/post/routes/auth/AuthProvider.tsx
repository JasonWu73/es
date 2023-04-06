import {createContext, ReactNode, useContext, useState} from 'react';
import {fakeAuthProvider} from './auth';

interface Props {
  children: ReactNode;
}

interface AuthContextType {
  username: string;
  login: (username: string, callback: VoidFunction) => void;
  logout: (callback: VoidFunction) => void;
}

const AuthContext = createContext<AuthContextType>(null!);

export default function AuthProvider({children}: Props) {
  const [username, setUsername] = useState('');

  function login(username: string, callback: VoidFunction) {
    return fakeAuthProvider.login(() => {
      setUsername(username);
      callback();
    });
  }

  function logout(callback: VoidFunction) {
    return fakeAuthProvider.logout(() => {
      setUsername('');
      callback();
    });
  }

  return (
    <AuthContext.Provider
      value={
        {username, login, logout}
      }
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
