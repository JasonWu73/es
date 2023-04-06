import Nav, {NavRoute} from "../shared/components/nav/Nav";
import {Route, Routes} from "react-router-dom";
import Hello from "./hello/Hello";
import Home from "./home/Home";
import NotFound from '../shared/components/not-found/NotFound';

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
        <Route path="/" element={<Home/>}/>
        <Route path="/hello" element={<Hello/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </>
  );
}
