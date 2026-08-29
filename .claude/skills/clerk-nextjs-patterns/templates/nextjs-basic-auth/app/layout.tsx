import { ClerkProvider, Show, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'

/**
 * Renders the application's root layout with authentication controls and page content.
 *
 * @param children - The page content rendered below the header
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider>
          <header>
            <Show when="signed-out">
              <SignInButton />
              <SignUpButton />
            </Show>
            <Show when="signed-in">
              <UserButton />
            </Show>
          </header>
          {children}
        </ClerkProvider>
      </body>
    </html>
  )
}
