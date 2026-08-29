import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

const clerkMocks = vi.hoisted(() => ({
  signInAppearance: vi.fn(),
  signUpAppearance: vi.fn(),
}));

vi.mock('@clerk/nextjs', () => ({
  SignIn: ({ appearance }: { appearance: unknown }) => {
    clerkMocks.signInAppearance(appearance);
    return <div data-testid="clerk-sign-in" />;
  },
  SignUp: ({ appearance }: { appearance: unknown }) => {
    clerkMocks.signUpAppearance(appearance);
    return <div data-testid="clerk-sign-up" />;
  },
}));

import SignInPage from '@/app/(auth)/sign-in/page';
import SignUpPage from '@/app/(auth)/sign-up/page';

const expectedFeatures = [
  'AI Architecture Generation',
  'Real-time Collaboration',
  'Instant Spec Generation',
];

const expectSharedMarketingContent = () => {
  expect(screen.getByText('Ghost AI')).toBeDefined();
  expect(
    screen.getByRole('heading', {
      level: 1,
      name: 'Design systems at the speed of thought.',
    }),
  ).toBeDefined();

  for (const feature of expectedFeatures) {
    expect(screen.getByRole('heading', { level: 2, name: feature })).toBeDefined();
  }
};

const expectAuthTheme = (appearanceMock: ReturnType<typeof vi.fn>) => {
  expect(appearanceMock).toHaveBeenCalledOnce();
  expect(appearanceMock.mock.calls[0][0]).toMatchObject({
    variables: {
      colorPrimary: '#00c8d4',
      colorBackground: '#080809',
      colorForeground: '#f0f0f4',
      colorInput: '#111114',
      colorBorder: '#2a2a30',
      borderRadius: '14px',
    },
    elements: {
      card: 'bg-transparent border-0 shadow-none',
      footerActionLink: 'text-[var(--accent-primary)]',
    },
  });
};

describe('authentication pages', () => {
  it('renders sign-in marketing content and a themed Clerk sign-in form', () => {
    render(<SignInPage />);

    expectSharedMarketingContent();
    expect(
      screen.getByRole('heading', { level: 2, name: 'Sign in to GhostArc' }),
    ).toBeDefined();
    expect(screen.getByTestId('clerk-sign-in')).toBeDefined();
    expectAuthTheme(clerkMocks.signInAppearance);
  });

  it('renders sign-up marketing content and a themed Clerk sign-up form', () => {
    render(<SignUpPage />);

    expectSharedMarketingContent();
    expect(
      screen.getByRole('heading', { level: 2, name: 'Create your account' }),
    ).toBeDefined();
    expect(screen.getByTestId('clerk-sign-up')).toBeDefined();
    expectAuthTheme(clerkMocks.signUpAppearance);
  });
});
