import {Link, Route, Routes} from "react-router-dom";
import Nav from "../shared/components/nav/Nav";
import Hello from "./hello/Hello";
import Home from "./home/Home";

export default function Root() {
  return (
    <>
      <Nav>
        <ul>
          <li className="active"><Link to="/">Home</Link></li>
          <li><Link to="/hello">Hello</Link></li>
        </ul>
      </Nav>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/hello" element={<Hello/>}/>
      </Routes>
    </>
  );
}
