import {useRouteError} from 'react-router-dom';

export default function ErrorPage() {
  const routeError = useRouteError() as { status: number, data: { error: string } };

  return (
    <div style={{textAlign: 'center', marginTop: '6.4rem'}}>
      <h1>HTTP STATUS CODE: {routeError?.status}</h1>
      <p>Error Message: {routeError?.data?.error}</p>
    </div>
  );
};
