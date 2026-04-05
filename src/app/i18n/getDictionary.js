import 'server-only';

const dictionaries = {
    en: () => import('./dictionaries/en.json').then(m => m.default),
    pt: () => import('./dictionaries/pt.json').then(m => m.default),
    es: () => import('./dictionaries/es.json').then(m => m.default),
};

export async function getDictionary(locale) {
    return dictionaries[locale]();
}