import { ClerkProvider, Show, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'

/**
 * Renders the application root with Clerk authentication context and account controls.
 *
 * @param children - The page content rendered below the authentication header
 * @returns The root HTML document containing the application content
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
