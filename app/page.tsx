import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

/**
 * Redirects authenticated users to the editor and unauthenticated users to sign-in.
 */
export default async function Page() {
  const { userId } = await auth();

  redirect(userId ? '/editor' : '/sign-in');
}
