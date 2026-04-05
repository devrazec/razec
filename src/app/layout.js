import './globals.css';

export const metadata = {
  title: 'Fluentor - Intelligent Tutoring Platform',
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
