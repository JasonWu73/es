import './App.scss';
import Card from './components/card/Card';
import PostsApp from './app/posts/PostsApp';
import CounterApp from './app/counter/CounterApp';

export default function App() {
  return (
    <div className="app">
      <Card>
        <CounterApp/>
        <PostsApp/>
      </Card>
    </div>
  );
};
