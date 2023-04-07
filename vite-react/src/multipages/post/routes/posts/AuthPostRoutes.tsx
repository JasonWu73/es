import RequireAuth from '../auth/RequireAuth';
import PostRoutes from './PostRoutes';

export default function AuthPostRoutes() {
  return (
    <>
      <RequireAuth>
        <PostRoutes/>
      </RequireAuth>
    </>
  );
}
