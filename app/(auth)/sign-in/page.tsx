import { SignIn } from '@clerk/nextjs';
import { Zap, Share2, FileText } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'AI Architecture Generation',
    description:
      'Describe your system, AI maps it to nodes and edges on a live canvas.',
  },
  {
    icon: Share2,
    title: 'Real-time Collaboration',
    description:
      'Live cursors, presence indicators, and shared node editing across your team.',
  },
  {
    icon: FileText,
    title: 'Instant Spec Generation',
    description:
      'Export a complete Markdown technical spec directly from the canvas graph.',
  },
];

/**
 * Renders the responsive Ghost AI sign-in page with product highlights and a customized Clerk sign-in form.
 */
export default function SignInPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)]">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
        <aside className="flex flex-col justify-center border-r border-[var(--border-default)] bg-[var(--bg-base)] px-6 py-10 sm:px-8 lg:px-14">
          <div className="mb-12 flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-[var(--accent-primary)] shadow-[0_0_25px_rgba(0,200,212,0.3)]" />
            <span className="text-lg font-medium tracking-tight text-[var(--text-primary)]">
              Ghost AI
            </span>
          </div>

          <div className="max-w-[640px]">
            <h1 className="max-w-[460px] text-4xl font-medium leading-[0.97] tracking-[-0.06em] text-[var(--text-primary)] sm:text-5xl lg:text-[4.2rem]">
              Design systems at the
              <span className="block">speed of thought.</span>
            </h1>

            <p className="mt-6 max-w-[540px] text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
              Describe your architecture in plain English. Ghost AI maps it to a shared
              canvas your whole team can refine in real time.
            </p>
          </div>

          <div className="mt-12 space-y-8">
            {features.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex items-start gap-4">
                <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-subtle)] text-[var(--accent-primary)]">
                  <Icon className="h-4 w-4" strokeWidth={2.2} />
                </div>
                <div className="max-w-[440px]">
                  <h2 className="text-xl font-medium tracking-[-0.02em] text-[var(--text-primary)]">
                    {title}
                  </h2>
                  <p className="mt-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </aside>

        <main className="flex items-center justify-center bg-[var(--bg-base)] px-5 py-10 sm:px-8 lg:px-10">
          <div className="w-full max-w-[460px] rounded-[28px] border border-[var(--border-default)] bg-[var(--bg-surface)] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] sm:p-8">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[var(--text-primary)]">
                Sign in to GhostArc
              </h2>
              <p className="mt-2 text-[var(--text-secondary)]">
                Welcome back! Please sign in to continue
              </p>
            </div>

            <SignIn
              appearance={{
                variables: {
                  colorPrimary: '#00c8d4',
                  colorBackground: '#080809',
                  colorForeground: '#f0f0f4',
                  colorMutedForeground: '#c0c0cc',
                  colorInput: '#111114',
                  colorInputForeground: '#f0f0f4',
                  colorBorder: '#2a2a30',
                  borderRadius: '14px',
                },
                elements: {
                  card: 'bg-transparent border-0 shadow-none',
                  formButtonPrimary:
                    'bg-[var(--accent-primary)] text-[var(--bg-base)] hover:opacity-90 rounded-xl font-semibold',
                  formButtonSecondary:
                    'border border-[var(--border-default)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] rounded-xl',
                  socialButtonsBlockButton:
                    'border border-[var(--border-default)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] rounded-xl',
                  formFieldInput:
                    'bg-[var(--bg-subtle)] border border-[var(--border-default)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] rounded-xl',
                  formFieldLabel: 'text-[var(--text-primary)]',
                  dividerLine: 'bg-[var(--border-default)]',
                  dividerText: 'text-[var(--text-muted)]',
                  footerActionLink: 'text-[var(--accent-primary)]',
                  headerTitle: 'text-[var(--text-primary)]',
                  headerSubtitle: 'text-[var(--text-secondary)]',
                },
              }}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

