import classes from './EditEvent.module.scss';
import Button from '../../../components/button/Button';
import {useRouteLoaderData, useNavigate, useSubmit, json, redirect} from 'react-router-dom';
import {FormEvent, useRef} from 'react';
import {sendRequest} from '../../../hooks/use-http';

export default function EditEvent() {
  const {title, description} = useRouteLoaderData('event-detail') as {
    id: number,
    title: string,
    description: string
  };
  const navigate = useNavigate();
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const submit = useSubmit();

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const formData = new FormData();
    formData.set('title', titleRef.current!.value.trim());
    formData.set('description', descriptionRef.current!.value.trim());

    submit(
      formData,
      {
        method: 'put'
      }
    );
  }

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" ref={titleRef} defaultValue={title}/>
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <input type="text" id="description" name="description" ref={descriptionRef} defaultValue={description}/>
      </div>
      <div>
        <Button type="button" onClick={() => navigate('..', {relative: 'path'})}>Cancel</Button>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
};

export async function actionUpdateEvent({request, params}: { request: Request, params: any }) {
  const formData = await request.formData();

  const [data, error] = await sendRequest({
    method: 'put',
    url: `https://dummyjson.com/products/${params.eventId}`,
    data: {
      title: formData.get('title'),
      description: formData.get('description')
    }
  });

  if (error) {
    throw json(
      {
        error: error
      },
      {status: 400}
    );
  }

  console.log('updated event: ', data);
  return redirect('/events');
}
