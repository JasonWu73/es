import classes from './PostFetcher.module.scss';

interface Props {
  onFetch: () => void;
}

export default function PostFetcher({ onFetch }: Props) {
  return (
    <div className={classes.fetcher}>
      <button onClick={onFetch}>Fetch Posts</button>
    </div>
  );
}
