import './globals.css';
import { GlobalProvider } from './context/GlobalContext';
import Loading from './components/Loading';
import Providers from './providers';

export const metadata = {
  title: 'Razec',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <GlobalProvider>
          <Providers>
            <Loading />
            {children}
          </Providers>
        </GlobalProvider>
      </body>
    </html>
  );
}
