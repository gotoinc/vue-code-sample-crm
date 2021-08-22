import store from '../store';
import ru from '@/locales/ru.json';
import en from '@/locales/en.json';

const locales = {
    'ru-RU': ru,
    'en-EN': en
}

export default function localizeFilter(key) {
    const locale = store.state.info.info.locale || 'en-EN';
    return locales[locale][key] || `[Localize error]: ${key} not found`
}