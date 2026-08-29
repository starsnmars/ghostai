import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ghost AI",
  description: "Collaborative design and development environment powered by AI",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: '#00c8d4',
          colorBackground: '#080809',
          colorForeground: '#f0f0f4',
          colorMutedForeground: '#c0c0cc',
          colorInput: '#111114',
          colorInputForeground: '#f0f0f4',
          colorBorder: '#2a2a30',
          colorSuccess: '#34d399',
          borderRadius: '14px',
        },
        elements: {
          card: "bg-[var(--bg-base)] border border-[var(--border-default)] shadow-none rounded-[28px]",
          formButtonPrimary:
            "bg-[var(--accent-primary)] text-[var(--bg-base)] hover:opacity-90 rounded-xl font-semibold",
          formButtonSecondary:
            "border border-[var(--border-default)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] rounded-xl",
          socialButtonsBlockButton:
            "border border-[var(--border-default)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] rounded-xl",
          formFieldInput:
            "bg-[var(--bg-surface)] border border-[var(--border-default)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] rounded-xl",
          formFieldLabel: "text-[var(--text-secondary)]",
          headerTitle: "text-[var(--text-primary)]",
          headerSubtitle: "text-[var(--text-secondary)]",
          footerActionLink: "text-[var(--accent-primary)] hover:text-[var(--accent-primary)]",
          dividerLine: "bg-[var(--border-default)]",
          dividerText: "text-[var(--text-muted)]",
        },
      }}
    >
      <html
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      >
        <body className="min-h-full flex flex-col bg-[var(--bg-base)] text-[var(--text-primary)]">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
