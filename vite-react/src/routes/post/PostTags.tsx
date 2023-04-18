import {Tag} from 'antd';

export default function PostTags({tags}: { tags: string[] }) {
  return (
    <>
      {tags.map(tag =>
        <Tag key={tag} color={getPostTagColor(tag)}>
          {tag.charAt(0).toUpperCase() + tag.slice(1)}
        </Tag>)}
    </>
  );
}

export function getPostTagColor(tag: string) {
  return tag.length > 6 ? 'geekblue' : 'volcano';
}
