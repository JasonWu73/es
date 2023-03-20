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

const AuthContext = createContext({
  loggedIn: false,
  login: (_: string, _2: string) => {
  },
  logout: () => {
  }
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: Props) {
  const [loggedIn, setLoggedIn] = useState(false);

  useAutoLogin(setLoggedIn);

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        login: (username: string, password: string) =>
          handleLogin(username, password, setLoggedIn),
        logout: () => handleLogout(setLoggedIn)
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function handleLogout(setLoggedIn: Dispatch<SetStateAction<boolean>>) {
  localStorage.removeItem(LOGGED_KEY);
  setLoggedIn(false);
}

function handleLogin(
  username: string,
  password: string,
  setLoggedIn: Dispatch<SetStateAction<boolean>>
) {
  if (username === PRESET_USERNAME && password === PRESET_PASSWORD) {
    localStorage.setItem(LOGGED_KEY, LOGGED_IN);
    setLoggedIn(true);
    return;
  }

  alert('WRONG USERNAME OR PASSWORD');
}

function useAutoLogin(setIsLoggedIn: Dispatch<SetStateAction<boolean>>) {
  useEffect(() => {
    const loggedStatus = localStorage.getItem(LOGGED_KEY);
    if (loggedStatus === LOGGED_IN) {
      setIsLoggedIn(true);
    }
  }, []);
}

interface Props {
  children: ReactNode;
}
