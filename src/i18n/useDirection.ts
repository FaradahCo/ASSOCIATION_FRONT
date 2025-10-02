import { useEffect } from 'react';
import i18n from './index';

export function useDirection() {
  useEffect(() => {
    const applyDir = () => {
      const lang = i18n.language || 'en';
      const dir = lang === 'ar' ? 'rtl' : 'ltr';
      const html = document.documentElement;
      html.setAttribute('dir', dir);
      html.setAttribute('lang', lang);
    };

    applyDir();
    i18n.on('languageChanged', applyDir);
    return () => {
      i18n.off('languageChanged', applyDir);
    };
  }, []);
}

