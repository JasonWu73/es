import {Link, useParams} from 'react-router-dom';
import {usePageTitle} from '../../../hooks/use-page-title';

export default function ProductDetail() {
  const {productId} = useParams();

  usePageTitle(`Product Detail ${productId}`);

  return (
    <>
      <h1>Product Detail - {productId}</h1>
      <p><Link to=".." relative="path">Back</Link></p>
    </>
  );
};
