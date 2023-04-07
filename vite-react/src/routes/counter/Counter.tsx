import {usePageTitle} from '../../shared/hooks/use-page-title';

export default function Counter() {
  usePageTitle('Redux Counter');

  return (
    <h1>Redux Counter</h1>
  );
}
