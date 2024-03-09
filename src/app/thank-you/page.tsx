import React from 'react';
import './styles.scss';
import Image from 'next/image';
import { getServerSideUser } from '@/libs/payload.utils';
import { cookies } from 'next/headers';
import { getPayloadClient } from '@/get-payload';
import { notFound, redirect } from 'next/navigation';
import { Product, ProductFile, User } from '@/payload-types';
import { PRODUCT_CATEGORIES } from '@/config';
import { formatPrice } from '../../hooks/generalHooks';
import Link from 'next/link';
import PaymentStatus from '@/components/PaymentStatus';

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
}
const ThankYouPage = async ({ searchParams }: Props) => {
  const orderId = searchParams.orderId;
  const nextCookies = cookies();

  const { user } = await getServerSideUser(nextCookies);
  const payload = await getPayloadClient();

  const { docs: orders } = await payload.find({
    collection: 'orders',
    depth: 2,
    where: {
      id: {
        equals: orderId,
      },
    },
  });

  const [order] = orders;

  if (!order) return notFound();

  const orderUserId = typeof order.user === 'string' ? order.user : order.user.id;

  if (orderUserId !== user?.id) {
    return redirect(`/sign-in?origin=thank-you?orderId=${order.id}`);
  }

  const products = order.products as Product[];
  console.log(products);
  const orderTotal = products.reduce((total, product) => {
    return total + product.price;
  }, 0);
  return (
    <div className="thank-you-page">
      <div className="image-container">
        <Image src={'/checkout-thank-you.jpg'} alt="Thank you Image" fill />
      </div>
      <h2 style={{ textAlign: 'center', color: 'var(--primary)' }}>Thank for Ordering</h2>
      {order._isPaid ? (
        <p style={{ opacity: 0.7, textAlign: 'center' }}>
          Your order was processed and your assets are available to download below, we have sent your receipt and your
          order Detail to {typeof order.user !== 'string' ? <span>{order.user.email}</span> : null}
        </p>
      ) : (
        <p style={{ opacity: 0.7, textAlign: 'center' }}>
          We appreciate your order, and we are currently processing it. So hang tight and we will send you confirmation
          very soon!
        </p>
      )}
      <div className="order">
        <div className="order-nr">
          <p style={{ opacity: 0.7, fontSize: 14 }}>Order Nr.</p>
          <p style={{ fontSize: 14 }}>{order.id}</p>
        </div>
        <div className="products">
          {(order.products as Product[]).map((product) => {
            const label = PRODUCT_CATEGORIES.find(({ value }) => value === product.category)?.label;
            const downloadUrl = (product.product_files as ProductFile).url as string;
            const { image } = product.images[0];
            return (
              <div className="product">
                {typeof image !== 'string' && image.url ? (
                  <div className="image">
                    <Image fill src={image.url} alt="Product-Image" />
                  </div>
                ) : null}
                <div className="components">
                  <div className="component">
                    <p style={{ opacity: 0.7, minWidth: '150px' }}>Category:</p>
                    <p>{label}</p>
                  </div>
                  {order._isPaid ? (
                    <a href={downloadUrl} download={product.name}>
                      Download Asset
                    </a>
                  ) : null}
                  <div className="component">
                    <p style={{ opacity: 0.7, minWidth: '150px' }}>Price:</p>
                    <p>{product.price}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="subtotal">
          <p style={{ opacity: 0.7, minWidth: '150px' }}>Subtotal:</p>
          <p>{orderTotal}</p>
        </div>
        <div className="subtotal">
          <p style={{ opacity: 0.7, minWidth: '150px' }}> Transaction fee:</p>
          <p>{1}</p>
        </div>
        <div className="subtotal">
          <p style={{ opacity: 0.7, minWidth: '150px' }}>Total:</p>
          <p>{1 + orderTotal}</p>
        </div>
        <PaymentStatus isPaid={order._isPaid} orderEmail={(order.user as User).email} orderId={order.id} />
        <Link style={{ opacity: 0.7, padding: '10px', textAlign: 'right' }} href={'/products'}>
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default ThankYouPage;
