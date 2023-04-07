import './App.scss';
import Root from './routes/Root';
import AuthProvider from './routes/auth/AuthProvider';

export default function App() {
  return (
    <div className="app">
      <h1>React Router</h1>

      <AuthProvider>
        <Root/>
      </AuthProvider>
    </div>
  );
}
