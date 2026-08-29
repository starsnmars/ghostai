import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

const clerkMocks = vi.hoisted(() => ({
  appearance: vi.fn(),
}));

vi.mock('@clerk/nextjs', () => ({
  UserButton: ({ appearance }: { appearance: unknown }) => {
    clerkMocks.appearance(appearance);
    return <div data-testid="user-button" />;
  },
}));

import { EditorNavbar } from '@/components/editor/editor-navbar';

describe('EditorNavbar', () => {
  it('labels the toggle for closing an open sidebar and handles activation', () => {
    const onSidebarToggle = vi.fn();
    render(
      <EditorNavbar
        isSidebarOpen
        onSidebarToggle={onSidebarToggle}
      />,
    );

    const toggle = screen.getByRole('button', {
      name: 'Close projects sidebar',
    });
    expect(toggle.getAttribute('title')).toBe('Close projects sidebar');

    fireEvent.click(toggle);

    expect(onSidebarToggle).toHaveBeenCalledOnce();
  });

  it('labels the toggle for opening a closed sidebar', () => {
    render(
      <EditorNavbar
        isSidebarOpen={false}
        onSidebarToggle={vi.fn()}
      />,
    );

    const toggle = screen.getByRole('button', {
      name: 'Open projects sidebar',
    });
    expect(toggle.getAttribute('title')).toBe('Open projects sidebar');
  });

  it('renders the Clerk user menu with editor-theme styling', () => {
    render(
      <EditorNavbar
        isSidebarOpen
        onSidebarToggle={vi.fn()}
      />,
    );

    expect(screen.getByTestId('user-button')).toBeDefined();
    expect(clerkMocks.appearance).toHaveBeenLastCalledWith({
      elements: {
        avatarBox: 'h-8 w-8',
        userButtonPopoverCard:
          'border border-[var(--border-default)] bg-[var(--bg-surface)] text-[var(--text-primary)]',
        userButtonPopoverActionButton:
          'text-[var(--text-primary)] hover:bg-[var(--bg-subtle)]',
        userButtonPopoverActionButtonText: 'text-[var(--text-primary)]',
      },
    });
  });
});
