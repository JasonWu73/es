import {usePageTitle} from '../../../hooks/use-page-title';
import {NavLink} from 'react-router-dom';

const PRODUCTS = [
  {id: 'p1', title: 'Product 1'},
  {id: 'p2', title: 'Product 2'},
  {id: 'p3', title: 'Product 3'}
];

export default function ProductList() {
  usePageTitle('Product List');

  return (
    <>
      <h1>Product List</h1>
      <ul>
        {
          PRODUCTS.map(product =>
            <li><NavLink to={`/products/${product.id}`}>{product.title}</NavLink></li>
          )
        }
      </ul>
    </>
  );
};
