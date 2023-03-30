import classes from './AddPost.module.scss';
import { AddedPost } from '../../model/post';
import { FormEvent, useRef } from 'react';

interface Props {
  onAdd: (post: AddedPost) => void;
}

export default function AddPost({ onAdd }: Props) {
  const titleRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLInputElement>(null);
  const userIdRef = useRef<HTMLInputElement>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onAdd({
      userId: +userIdRef.current!.value,
      title: titleRef.current!.value.trim(),
      body: bodyRef.current!.value.trim()
    });
  }

  return (
    <form onSubmit={handleSubmit} className={classes.post}>
      <div>
        <label htmlFor="title">Post title</label>
        <input ref={titleRef} type="text" id="title"/>
      </div>
      <div>
        <label htmlFor="body">Post body</label>
        <input ref={bodyRef} type="text" id="body"/>
      </div>
      <div>
        <label htmlFor="userId">Post user ID</label>
        <input ref={userIdRef} type="number" id="userId"/>
      </div>
      <div>
        <button type="submit">Add Post</button>
      </div>
    </form>
  );
}
