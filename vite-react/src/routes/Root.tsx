import {Route, Routes} from 'react-router-dom';
import Counter from "./counter/Counter";
import NotFound from '../shared/components/not-found/NotFound';
import Hello from "./hello/Hello";

export default function Root() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Counter/>}/>
        <Route path="*" element={<NotFound/>}/>
        <Route path="/hello" element={<Hello/>}/>
      </Routes>
    </>
  );
}
