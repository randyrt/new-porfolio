import fs from 'fs';
import path from 'path';

// 1. Fix nav translations in locales
const frPath = path.resolve('src/locales/fr.json');
const enPath = path.resolve('src/locales/en.json');

const fr = JSON.parse(fs.readFileSync(frPath, 'utf8'));
const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));

fr.nav = {
  change_language: "Language",
  change_theme: "Theme"
};

en.nav = {
  change_language: "Language",
  change_theme: "Theme"
};

fs.writeFileSync(frPath, JSON.stringify(fr, null, 2), 'utf8');
fs.writeFileSync(enPath, JSON.stringify(en, null, 2), 'utf8');

// 2. Fix i18n warnings
const i18nPath = path.resolve('src/i18n.ts');
let i18nCode = fs.readFileSync(i18nPath, 'utf8');
if (!i18nCode.includes('warnHtmlMessage: false')) {
  i18nCode = i18nCode.replace('legacy: false,', 'legacy: false,\n  warnHtmlMessage: false,');
  fs.writeFileSync(i18nPath, i18nCode, 'utf8');
}

// 3. Fix unhead usage across all views
const viewsDir = path.resolve('src/views');
const viewsFiles = fs.readdirSync(viewsDir).filter(f => f.endsWith('.vue'));

for (const file of viewsFiles) {
  const filePath = path.join(viewsDir, file);
  let code = fs.readFileSync(filePath, 'utf8');


  if (code.includes('watchEffect(() => {') && code.includes('useHead({')) {
    // Import computed if not already present
    if (!code.includes('computed')) {
      code = code.replace(/import {([^}]+)} from 'vue'/, (match, p1) => {
        return `import { computed, ${p1.trim()} } from 'vue'`;
      });
    }

    const unheadPattern = /watchEffect\(\(\) => \{\s*useHead\(\{\s*title:\s*t\('([^']+)'\),\s*meta:\s*\[\s*\{\s*name:\s*'([^']+)',\s*content:\s*t\('([^']+)'\)\s*\}\s*\]\s*\}\)\s*\}\)/s;

    code = code.replace(unheadPattern, (match, titleKey, metaName, metaContent) => {
      return `useHead({
  title: computed(() => t('${titleKey}')),
  meta: [
    {
      name: '${metaName}',
      content: computed(() => t('${metaContent}'))
    }
  ]
})`;
    });

    fs.writeFileSync(filePath, code, 'utf8');
  }
}

console.log("Fixes applied successfully.");
