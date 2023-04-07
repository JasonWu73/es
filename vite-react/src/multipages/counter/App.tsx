import './App.scss';
import Counter from './features/counter/Counter';
import Card from '../../shared/components/card/Card';

export default function App() {
  return (
    <div className="app">
      <h1>React Redux</h1>
      <Card>
        <Counter/>
      </Card>
    </div>
  );
}
