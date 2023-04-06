import classes from './Nav.module.scss';
import {Link, Route, Routes} from 'react-router-dom';
import Home from '../../home/Home';
import Hello from '../../hello/Hello';

export default function Nav() {
  return (
    <>
      <nav className={classes.nav}>
        <ul>
          <li className={classes.active}><Link to="/">Home</Link></li>
          <li><Link to="/hello">Hello</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/hello" element={<Hello/>}/>
      </Routes>
    </>
  );
}
