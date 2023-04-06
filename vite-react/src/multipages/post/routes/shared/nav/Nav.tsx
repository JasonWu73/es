import classes from './Nav.module.scss';
import {Link, Route, Routes} from 'react-router-dom';
import Home from '../../home/Home';
import PostList from '../../posts/PostList';
import SimpleInput from '../../form/SimpleInput';

export default function Nav() {
  return (
    <>
      <nav className={classes.nav}>
        <ul>
          <li className={classes.active}><Link to="/">Home</Link></li>
          <li><Link to="/posts">Posts</Link></li>
          <li><Link to="/simple-input">Simple Input Form</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/posts" element={<PostList/>}/>
        <Route path="/simple-input" element={<SimpleInput/>}/>
      </Routes>
    </>
  );
}
