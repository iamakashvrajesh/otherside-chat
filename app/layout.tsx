import type { Metadata } from 'next';
import { Fraunces, Inter, JetBrains_Mono } from 'next/font/google';
import { ComposerProvider } from '@/components/composer/ComposerContext';
import PostComposerModal from '@/components/composer/PostComposerModal';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'OtherSide — Get answers from the other side',
  description:
    'Anonymous relationship Q&A. Real questions, honest answers, gender-tagged perspectives.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${jetbrains.variable}`}
    >
      <body>
        <ComposerProvider>
          {children}
          <PostComposerModal />
        </ComposerProvider>
      </body>
    </html>
  );
}