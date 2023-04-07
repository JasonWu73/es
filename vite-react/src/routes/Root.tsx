import Nav, {NavRoute} from "../shared/components/nav/Nav";
import {Route, Routes} from "react-router-dom";
import Counter from "./counter/Counter";
import NotFound from '../shared/components/not-found/NotFound';
import Hello from "./hello/Hello";

const ROUTES = [
  {
    to: "/",
    name: "Home"
  },
  {
    to: "/hello",
    name: "Hello"
  }
] as NavRoute[];

export default function Root() {
  return (
    <>
      <Nav routes={ROUTES}/>
      <Routes>
        <Route path="/" element={<Counter/>}/>
        <Route path="*" element={<NotFound/>}/>
        <Route path="/hello" element={<Hello/>}/>
      </Routes>
    </>
  );
}
