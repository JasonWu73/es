import {useParams} from 'react-router-dom';

export default function ProductDetail() {
  const {productId} = useParams();

  return (
    <h1>Product Detail - {productId}</h1>
  );
};
