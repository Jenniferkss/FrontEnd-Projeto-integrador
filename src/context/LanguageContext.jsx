/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useMemo, useState } from 'react';
import en from './locales/en.json';
import pt from './locales/pt.json';

const LanguageContext = createContext(null);

function defaultSelectField(obj, field, lang) {
    if (!obj) return undefined;

    // Try object field first
    if (Object.prototype.hasOwnProperty.call(obj, field)) {
        const val = obj[field];
        if (val !== undefined && val !== null) {
            if (typeof val === 'object' && !Array.isArray(val)) {
                if (Object.prototype.hasOwnProperty.call(val, lang)) return val[lang];
                if (Object.prototype.hasOwnProperty.call(val, 'en')) return val['en'];
                if (Object.prototype.hasOwnProperty.call(val, 'pt')) return val['pt'];
            } else if (val !== '') {
                return val;
            }
        }
    }

    const candidates = [
        `${field}_${lang}`,
        `${field}${lang === 'en' ? 'En' : 'Pt'}`,
        `${field}${lang === 'en' ? 'EN' : 'PT'}`,
        `${field}_pt`,
        `${field}_en`,
        `${field}`,
    ];

    for (const key of candidates) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const val = obj[key];
            if (val !== undefined && val !== null && val !== '') return val;
        }
    }

    const prefixMatch = field.match(/^[a-z]+/i);
    if (prefixMatch) {
        const prefix = prefixMatch[0].toLowerCase();
        const objKeys = Object.keys(obj);
        const suffixes = [lang === 'en' ? 'En' : 'Pt', lang === 'en' ? 'EN' : 'PT', lang, lang.toLowerCase(), `_${lang}`];
        for (const s of suffixes) {
            const candidate = `${prefix}${s}`;
            if (Object.prototype.hasOwnProperty.call(obj, candidate)) {
                const val = obj[candidate];
                if (val !== undefined && val !== null && val !== '') return val;
            }
        }

        for (const k of objKeys) {
            const kl = k.toLowerCase();
            if (!kl.startsWith(prefix)) continue;
            if (kl.includes('en') || kl.includes('pt') || kl.includes('_en') || kl.includes('_pt')) {
                const val = obj[k];
                if (val !== undefined && val !== null && val !== '') {
                    if ((lang === 'en' && kl.includes('en')) || (lang === 'pt' && kl.includes('pt'))) return val;
                }
            }
        }
    }

    return undefined;
}

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState('pt');

    const dictionaries = { en, pt };

    const t = (key) => {
        const dict = dictionaries[language] || {};
        return dict[key] ?? key;
    };

    const selectField = (obj, field) => defaultSelectField(obj, field, language);
    const mapFields = (obj, schema = {}) => {
        if (!obj || typeof obj !== 'object') return {};
        const out = {};
        const lang = language;

        const prioritize = (cands) => {
            if (!Array.isArray(cands)) return cands;
            const lc = String(lang).toLowerCase();
            const score = (s) => {
                const sl = String(s).toLowerCase();
                let sc = 0;
                if (sl.includes(lc)) sc += 2;
                if (sl.endsWith(lc)) sc += 3;
                if (sl.includes('_' + lc)) sc += 3;
                return sc;
            };
            return cands.slice().sort((a, b) => score(b) - score(a));
        };

        for (const key of Object.keys(schema)) {
            const candidates = prioritize(schema[key]);
            let found;
            for (const cand of candidates) {
                const val = selectField(obj, cand);
                if (val !== undefined && val !== null && val !== '') {
                    found = val;
                    break;
                }
            }
            out[key] = found;
        }
        return out;
    };

    const value = useMemo(
        () => ({
            language,
            setLanguage,
            isPortuguese: language === 'pt',
            isEnglish: language === 'en',
            t,
            selectField,
            mapFields,
        }),
        [language]
    );

    return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) throw new Error('useLanguage must be used within a LanguageProvider.');
    return context;
}
