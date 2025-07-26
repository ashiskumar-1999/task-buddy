import '@/styles/globals.css';
import { Providers } from './providers';

export const metadata = {
  title: 'Task-Buddy',
  description: 'Manage your tasks efficiently with TaskBuddy.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
