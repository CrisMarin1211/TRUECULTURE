# TRUECULTURE

TRUECULTURE es una plataforma web gamificada para fortalecer y visibilizar la cultura local. Los usuarios participan en eventos, comparten experiencias y recomiendan actividades, desbloqueando niveles, puntos y cupones automáticos. La plataforma incentiva la interacción social y digital, apoya a comercios y eventos culturales y crea una comunidad participativa y reconocida.

---

## 🚀 Objetivos y descripción

- Promover la participación activa en la cultura local.
- Gamificar la experiencia mediante puntos, niveles y recompensas.
- Visibilizar y conectar eventos, actividades y comercios de la comunidad.
- Fomentar colaboraciones entre usuarios y organizadores mediante incentivos.

TRUECULTURE crea una red donde cada interacción suma valor, promoviendo el desarrollo cultural y el reconocimiento de los espacios locales.

---

## 🧩 Instalación de dependencias

Instala todas las dependencias con:

npm install

o
yarn install


## 📁Principales librerías:
- React
- Vite
- Supabase-js
- Material-UI (MUI)
- Emotion (styled, react)
- React Router DOM
- Recharts
- Swiper
- QRCode.react
- html2canvas

---

## 🏗️ Scaffolding & estructura de carpetas

- **public/**: Archivos estáticos (imágenes, favicon, etc.).
- **src/**: Todo el código de la app: componentes, hooks y lógica principal.
- **tsconfig.*.json**: Configuración para TypeScript.
- **package.json**: Gestión de dependencias y scripts.
- **package-lock.json**: Registro exacto de versiones instaladas.
- **README.md**: Documentación principal del Frontend.
- **README_SUPABASE.md**: Documentación backend y lógica de servicios.
- **configs, lint, prettier**: Archivos de configuración y reglas de estilo.

---

## 📦 Comandos útiles

- `npm run dev`: Levanta el servidor local de desarrollo (Vite)
- `npm run build`: Compila el proyecto para producción
- `npm run preview`: Visualiza el build productivo de manera local
- `npm run lint`: Verifica el estilo del código
- `npm run format`: Formatea todos los archivos fuente

---

## 🎯 Funcionalidades principales

- Sistema gamificado de puntos, niveles y cupones.
- Reservas de asientos numerados para eventos.
- Publicación de reseñas y compartidos en redes sociales.
- Referidos y recompensas automáticos por invitar nuevos usuarios.
- Panel de usuario con historial, progreso y recompensas.

---

## ⚙️ Servicios Supabase y funciones automáticas

### Funciones principales de la base de datos

- `awardpoints`: Otorga puntos por acción, actualiza niveles y cupones al usuario.
- `calculateuserlevel`: Calcula el nivel según los puntos acumulados.
- `generatereferralcode`: Genera códigos únicos de referido por usuario.
- `grantlevelcoupon`: Otorga cupones cuando el usuario sube de nivel.
- `initializeeventseats`: Organiza los asientos de eventos numerados.
- `processreferral`: Gestiona acciones de referido y premia a los usuarios.

### Triggers y automatizaciones

- Creación automática de código de referido y cupones de bienvenida al crear perfil.
- Vinculación de perfil a autheticación y registro inicial del usuario.

### Edge Functions (servicios HTTP)

- `process-purchase`: Automatiza pedidos, reserva asientos y cupones.
- `process-review`: Inserta reseñas y otorga puntos adicionales.
- `process-share`: Premia a usuarios por compartir en redes sociales.
- `process-referral`: Administra lógica de referidos y recompensas.

- Todas las funciones y servicios REST están protegidos con autenticación JWT y políticas de acceso avanzadas.

---

## 🌍 Despliegue

Puedes desplegar TRUECULTURE en Vercel, Netlify, VPS o cualquier plataforma Node.js con acceso externo a Supabase. Solo necesitas preparar el build productivo (`npm run build`), configurar tus variables de entorno y conectar el frontend con las credenciales de tu backend en Supabase.

---

## 📚 Recursos y referencias

- [Repositorio TRUECULTURE (GitHub)](https://github.com/CrisMarin1211/TRUECULTURE.git)
- [Presentación visual y detalles (Behance)](https://www.behance.net/gallery/233288171/TRUECULTURE/modules/1338995987)
- [(Versel)](https://www.behance.net/gallery/233288171/TRUECULTURE/modules/1338995987)


¡TRUECULTURE te permite contribuir activamente a la cultura local, ganar recompensas y formar parte de una red colaborativa donde cada experiencia suma y se multiplica!

























































# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
