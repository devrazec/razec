import { notFound } from 'next/navigation';
import { locales } from '../i18n/config';
import { getDictionary } from '../i18n/getDictionary';

import { GlobalProvider } from '../context/GlobalContext';
import Providers from '../providers';

export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = params;

  if (!locales.includes(locale)) notFound();

  const dictionary = await getDictionary(locale);

  return (
    <GlobalProvider translations={dictionary}>
      <Providers>
        {children}
      </Providers>
    </GlobalProvider>
  );
}
