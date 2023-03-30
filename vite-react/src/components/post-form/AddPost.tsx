import classes from './AddPost.module.scss';

export default function AddPost() {
  return (
    <form className={classes.post}>
      <div>
        <label htmlFor="title">Post title</label>
        <input type="text" id="title"/>
      </div>
      <div>
        <label htmlFor="body">Post body</label>
        <input type="text" id="body"/>
      </div>
      <div>
        <label htmlFor="userId">Post user ID</label>
        <input type="number" id="userId"/>
      </div>
      <div>
        <button type="submit">Add Post</button>
      </div>
    </form>
  );
}
