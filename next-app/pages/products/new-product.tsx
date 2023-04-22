import Layout from '@/components/layout/layout';
import Form from '@/components/form/form';
import Input from '@/components/form/input';
import Button from '@/components/button/Button';
import { router } from 'next/client';
import Head from 'next/head';
import React from 'react';

export default function NewProduct() {
  return (
    <Layout>
      <Head>
        <title>Add Product</title>
      </Head>

      <NewProductForm />
    </Layout>
  );
}

function NewProductForm() {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Input title="Title" type="text" />
      <Input title="Description" type="text" />
      <div className="text-right mr-4">
        <Button
          onClick={() => router.push('/products')}
          className="mr-1"
        >
          Cancel
        </Button>
        <Button type="primary">Submit</Button>
      </div>
    </Form>
  );
}
