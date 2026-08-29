import { render, screen } from '@testing-library/react';
import type { ReactElement } from 'react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('next/font/google', () => ({
  Geist: () => ({ variable: 'mock-geist-sans' }),
  Geist_Mono: () => ({ variable: 'mock-geist-mono' }),
}));

vi.mock('@clerk/nextjs', () => ({
  ClerkProvider: ({ children }: { children: ReactElement }) => children,
}));

import EditorPage from '@/app/editor/page';
import RootLayout, { metadata } from '@/app/layout';

describe('static application layouts', () => {
  it('renders the editor empty state', () => {
    render(<EditorPage />);

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Welcome to Ghost AI Editor',
      }),
    ).toBeDefined();
    expect(screen.getByText('Create your first project to get started')).toBeDefined();
  });

  it('defines Ghost AI metadata', () => {
    expect(metadata).toEqual({
      title: 'Ghost AI',
      description: 'Collaborative design and development environment powered by AI',
    });
  });

  it('wraps page content in the themed Clerk provider and document shell', () => {
    const content = <main>Page content</main>;
    const provider = RootLayout({ children: content, params: Promise.resolve({}) });
    const html = provider.props.children as ReactElement<{
      children: ReactElement<{ children: ReactElement }>;
      className: string;
      lang: string;
    }>;
    const body = html.props.children;

    expect(provider.props.appearance.variables).toMatchObject({
      colorPrimary: '#00c8d4',
      colorBackground: '#080809',
      colorSuccess: '#34d399',
      borderRadius: '14px',
    });
    expect(html.props.lang).toBe('en');
    expect(html.props.className).toContain('mock-geist-sans');
    expect(html.props.className).toContain('mock-geist-mono');
    expect(body.props.children).toBe(content);
  });
});
