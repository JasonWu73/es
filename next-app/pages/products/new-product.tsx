import Layout from '@/components/layout/layout';
import Link from 'next/link';
import Form from '@/components/form/form';
import Input from '@/components/form/input';

export default function NewProduct() {
  return (
    <Layout>
      <NewProductForm />

      <div className="text-right mr-6 mt-4">
        <Link
          href="/products"
          className="font-bold text-blue-500 hover:underline"
        >
          Go To Product List
        </Link>
      </div>
    </Layout>
  );
}

function NewProductForm() {
  return (
    <Form>
      <Input title="Title" type="text" />
      <Input title="Description" type="text" />
    </Form>
  );
}
