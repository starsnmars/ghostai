import { beforeEach, describe, expect, it, vi } from 'vitest';

const clerkMocks = vi.hoisted(() => ({
  isPublicRoute: vi.fn(),
  protect: vi.fn(),
}));

vi.mock('@clerk/nextjs/server', () => ({
  clerkMiddleware: vi.fn(
    (handler: (auth: unknown, request: unknown) => Promise<void>) => handler,
  ),
  createRouteMatcher: vi.fn(() => clerkMocks.isPublicRoute),
}));

import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import proxy, { config } from '@/proxy';

interface TestAuth {
  protect: () => Promise<void>;
}

type TestProxy = (auth: TestAuth, request: { url: string }) => Promise<void>;

const runProxy = proxy as unknown as TestProxy;

describe('authentication proxy', () => {
  beforeEach(() => {
    clerkMocks.isPublicRoute.mockReset();
    clerkMocks.protect.mockReset();
  });

  it('declares sign-in and sign-up paths, including their nested Clerk routes, as public', () => {
    expect(createRouteMatcher).toHaveBeenCalledOnce();
    expect(createRouteMatcher).toHaveBeenCalledWith([
      '/sign-in(.*)',
      '/sign-up(.*)',
    ]);
    expect(clerkMiddleware).toHaveBeenCalledOnce();
  });

  it.each(['/sign-in', '/sign-in/sso-callback', '/sign-up', '/sign-up/verify']) (
    'does not protect public auth route %s',
    async (url) => {
      clerkMocks.isPublicRoute.mockReturnValue(true);

      await runProxy({ protect: clerkMocks.protect }, { url });

      expect(clerkMocks.isPublicRoute).toHaveBeenCalledWith({ url });
      expect(clerkMocks.protect).not.toHaveBeenCalled();
    },
  );

  it.each(['/editor', '/api/projects', '/trpc/project.list']) (
    'protects non-public route %s',
    async (url) => {
      clerkMocks.isPublicRoute.mockReturnValue(false);

      await runProxy({ protect: clerkMocks.protect }, { url });

      expect(clerkMocks.protect).toHaveBeenCalledOnce();
    },
  );

  it('waits for protection and propagates an authentication failure', async () => {
    const failure = new Error('unauthenticated');
    clerkMocks.isPublicRoute.mockReturnValue(false);
    clerkMocks.protect.mockRejectedValue(failure);

    await expect(
      runProxy({ protect: clerkMocks.protect }, { url: '/editor' }),
    ).rejects.toBe(failure);
  });

  it('runs on page routes and API-like routes while excluding static assets', () => {
    expect(config).toEqual({
      matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
    });
  });
});
