import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@clerk/nextjs/server', () => ({
  auth: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}));

import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Page from '@/app/page';

const mockAuthResult = (userId: string | null) => {
  vi.mocked(auth).mockResolvedValue({ userId } as Awaited<ReturnType<typeof auth>>);
};

describe('home page routing', () => {
  beforeEach(() => {
    vi.mocked(auth).mockReset();
    vi.mocked(redirect).mockReset();
  });

  it('redirects an authenticated user to the editor', async () => {
    mockAuthResult('user_123');

    await Page();

    expect(auth).toHaveBeenCalledOnce();
    expect(redirect).toHaveBeenCalledOnce();
    expect(redirect).toHaveBeenCalledWith('/editor');
  });

  it('redirects an unauthenticated visitor to sign in', async () => {
    mockAuthResult(null);

    await Page();

    expect(redirect).toHaveBeenCalledOnce();
    expect(redirect).toHaveBeenCalledWith('/sign-in');
  });

  it('does not attempt a redirect when session resolution fails', async () => {
    const failure = new Error('Clerk unavailable');
    vi.mocked(auth).mockRejectedValue(failure);

    await expect(Page()).rejects.toBe(failure);
    expect(redirect).not.toHaveBeenCalled();
  });
});
