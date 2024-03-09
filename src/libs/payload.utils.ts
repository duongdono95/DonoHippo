import { User } from '../payload-types';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { NextRequest } from 'next/server';

export const getServerSideUser = async (cookies: NextRequest['cookies'] | ReadonlyRequestCookies) => {
  const token = cookies.get('payload-token')?.value;

  const meRes = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/me`, {
    headers: {
      Authorization: `JWT ${token}`,
    },
  });
  const fethcedUser = await meRes.json();
  if (!fethcedUser) {
    console.error('Expected JSON response, got:', fethcedUser);
    return { user: null };
  }

  const { user } = fethcedUser as {
    user: User | null;
  };

  return { user };
};
