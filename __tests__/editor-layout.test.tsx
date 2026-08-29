import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@/components/editor/editor-navbar', () => ({
  EditorNavbar: ({
    isSidebarOpen,
    onSidebarToggle,
  }: {
    isSidebarOpen: boolean;
    onSidebarToggle: () => void;
  }) => (
    <button onClick={onSidebarToggle} type="button">
      {isSidebarOpen ? 'Navbar: open' : 'Navbar: closed'}
    </button>
  ),
}));

vi.mock('@/components/editor/project-sidebar', () => ({
  ProjectSidebar: ({
    isOpen,
    onClose,
  }: {
    isOpen: boolean;
    onClose: () => void;
  }) => (
    <button onClick={onClose} type="button">
      {isOpen ? 'Sidebar: open' : 'Sidebar: closed'}
    </button>
  ),
}));

import EditorLayout from '@/app/editor/layout';

describe('EditorLayout', () => {
  it('starts with the project sidebar open and preserves page content', () => {
    render(
      <EditorLayout>
        <p>Editor content</p>
      </EditorLayout>,
    );

    expect(screen.getByRole('button', { name: 'Navbar: open' })).toBeDefined();
    expect(screen.getByRole('button', { name: 'Sidebar: open' })).toBeDefined();
    expect(screen.getByText('Editor content')).toBeDefined();
  });

  it('toggles the sidebar closed and open from the navbar', () => {
    render(<EditorLayout>content</EditorLayout>);

    fireEvent.click(screen.getByRole('button', { name: 'Navbar: open' }));
    expect(screen.getByRole('button', { name: 'Navbar: closed' })).toBeDefined();
    expect(screen.getByRole('button', { name: 'Sidebar: closed' })).toBeDefined();

    fireEvent.click(screen.getByRole('button', { name: 'Navbar: closed' }));
    expect(screen.getByRole('button', { name: 'Sidebar: open' })).toBeDefined();
  });

  it('closes the sidebar from its own close control', () => {
    render(<EditorLayout>content</EditorLayout>);

    fireEvent.click(screen.getByRole('button', { name: 'Sidebar: open' }));

    expect(screen.getByRole('button', { name: 'Navbar: closed' })).toBeDefined();
    expect(screen.getByRole('button', { name: 'Sidebar: closed' })).toBeDefined();
  });
});
