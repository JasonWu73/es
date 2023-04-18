import classes from './EditEvent.module.scss';
import Button from '../../../components/button/Button';
import {
  useRouteLoaderData,
  useNavigate,
  useSubmit,
  json,
  redirect,
  useNavigation,
  useActionData
} from 'react-router-dom';
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
  const navigation = useNavigation();
  const errors = useActionData() as { title?: string, description?: string };

  const isSubmitting = navigation.state === 'submitting';

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
        {errors?.title && <span>{errors.title}</span>}
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <input type="text" id="description" name="description" ref={descriptionRef} defaultValue={description}/>
        {errors?.description && <span>{errors.description}</span>}
      </div>
      <div>
        <Button type="button" onClick={() => navigate('..')} disabled={isSubmitting}>Cancel</Button>
        <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Submit'}</Button>
      </div>
    </form>
  );
};

export async function updateEvent({params, request}: { params: any, request: Request }) {
  const formData = await request.formData();
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const errors: { title?: string, description?: string } = {};

  if (title.length <= 0) {
    errors.title = 'Title must not be empty';
  }

  if (description.length <= 0) {
    errors.description = 'Description must not be empty';
  }

  if (Object.keys(errors).length) return errors;

  const [data, error] = await sendRequest({
    method: 'put',
    url: `https://dummyjson.com/products/${params.eventId}`,
    data: {title, description}
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
