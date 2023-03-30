import classes from './PostList.module.scss';

export default function PostList() {
  return (
    <div className={classes.posts}>
      <ul>
        <li>
          <h2>sunt aut facere repellat provident occaecati excepturi optio reprehenderit</h2>
          <p>quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto</p>
        </li>
        <li>
          <h2>ea molestias quasi exercitationem repellat qui ipsa sit aut</h2>
          <p>est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla</p>
        </li>
      </ul>
    </div>
  );
}
