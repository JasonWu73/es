import classes from './EditEvent.module.scss';
import Button from '../../../components/button/Button';
import {useRouteLoaderData, useNavigate} from 'react-router-dom';
import {FormEvent, useRef} from 'react';

export default function EditEvent() {
  const {id, title, description} = useRouteLoaderData('event-detail') as {
    id: number,
    title: string,
    description: string
  };
  const navigate = useNavigate();
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const updatedEvent = {
      id,
      title: titleRef.current!.value.trim(),
      description: descriptionRef.current!.value.trim()
    };

    console.log(updatedEvent);
  }

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" ref={titleRef} defaultValue={title}/>
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <input type="text" id="description" ref={descriptionRef} defaultValue={description}/>
      </div>
      <div>
        <Button type="button" onClick={() => navigate('..', {relative: 'path'})}>Cancel</Button>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
};
