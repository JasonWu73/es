import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState
} from 'react';

const LOGGED_KEY = 'isLoggedIn';
const LOGGED_IN = '1';
const PRESET_USERNAME = 'wxj';
const PRESET_PASSWORD = '111';

const AuthContext = createContext<{
  loggedIn: boolean,
  onLogin: (username: string, password: string) => void,
  onLogout: () => void
}>({
  loggedIn: false,
  onLogin() {
  },
  onLogout() {
  }
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: Props) {
  const [loggedIn, setLoggedIn] = useState(false);

  useAutoLogin(setLoggedIn);

  function handleLogout() {
    localStorage.removeItem(LOGGED_KEY);
    setLoggedIn(false);
  }

  function handleLogin(username: string, password: string) {
    if (username === PRESET_USERNAME && password === PRESET_PASSWORD) {
      localStorage.setItem(LOGGED_KEY, LOGGED_IN);
      setLoggedIn(true);
      return;
    }

    alert('WRONG USERNAME OR PASSWORD');
  }

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        onLogin: (username: string, password: string) =>
          handleLogin(username, password),
        onLogout: () => handleLogout()
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAutoLogin(setIsLoggedIn: Dispatch<SetStateAction<boolean>>) {
  useEffect(() => {
    const loggedStatus = localStorage.getItem(LOGGED_KEY);
    if (loggedStatus === LOGGED_IN) {
      setIsLoggedIn(true);
    }
  }, [setIsLoggedIn]);
}

interface Props {
  children: ReactNode;
}
