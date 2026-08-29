import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { ProjectSidebar } from '@/components/editor/project-sidebar';

describe('ProjectSidebar', () => {
  it('is visible and shows the personal-projects empty state by default', () => {
    const { container } = render(
      <ProjectSidebar isOpen onClose={vi.fn()} />,
    );

    const sidebar = container.querySelector('aside');
    expect(sidebar?.getAttribute('aria-hidden')).toBe('false');
    expect(sidebar?.className).toContain('translate-x-0');
    expect(screen.getByText('No projects yet')).toBeDefined();
    expect(screen.getByRole('button', { name: 'New Project' })).toBeDefined();
  });

  it('marks the closed sidebar hidden and translates it off-screen', () => {
    const { container } = render(
      <ProjectSidebar isOpen={false} onClose={vi.fn()} />,
    );

    const sidebar = container.querySelector('aside');
    expect(sidebar?.getAttribute('aria-hidden')).toBe('true');
    expect(sidebar?.className).toContain('-translate-x-full');
    expect(sidebar?.className).not.toContain('translate-x-0');
  });

  it('calls onClose from the accessible close control', () => {
    const onClose = vi.fn();
    render(<ProjectSidebar isOpen onClose={onClose} />);

    fireEvent.click(
      screen.getByRole('button', { name: 'Close projects sidebar' }),
    );

    expect(onClose).toHaveBeenCalledOnce();
  });

  it('switches to the shared-projects empty state', () => {
    render(<ProjectSidebar isOpen onClose={vi.fn()} />);

    fireEvent.click(screen.getByRole('tab', { name: 'Shared' }));

    expect(screen.getByText('No shared projects yet')).toBeDefined();
    expect(
      screen.getByRole('tab', { name: 'Shared' }).getAttribute('aria-selected'),
    ).toBe('true');
  });
});
