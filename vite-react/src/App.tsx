import './App.scss';
import BackwardCounter from './components/counter/BackwardCounter';
import ForwardCounter from './components/counter/ForwardCounter';

export default function App() {
  return (
    <div className="app">
      <ForwardCounter/>
      <BackwardCounter/>
    </div>
  );
};
