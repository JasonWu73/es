import {Route, Routes} from 'react-router-dom';
import Home from './home/Home';
import NotFound from '../shared/components/not-found/NotFound';
import Counter from './counter/Counter';
import Hello from "./hello/Hello";

export default function Root() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="*" element={<NotFound/>}/>
        <Route path="/counter" element={<Counter/>}/>
        <Route path="/hello" element={<Hello/>}/>
      </Routes>
    </>
  );
}
