import classes from './PostFetcher.module.scss';

export default function PostFetcher() {
  return (
    <div className={classes.fetcher}>
      <button>Fetch Posts</button>
    </div>
  );
}
