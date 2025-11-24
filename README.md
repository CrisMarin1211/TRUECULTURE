# TRUECULTURE

TRUECULTURE is a gamified web platform designed to strengthen and showcase local culture. Users participate in events, share experiences, and recommend activities, unlocking levels, points, and automatic coupons. The platform encourages both social and digital interaction, supports local businesses and cultural events, and builds an active, recognized community.

---

## 🚀 Goals & Description

- Promote active participation in local culture.
- Gamify the experience with points, levels, and rewards.
- Showcase and connect community events, activities, and businesses.
- Foster collaborations between users and organizers through incentives.

TRUECULTURE creates a network where each interaction adds value, promoting cultural development and recognition of local venues.

---

## 🧩 Installing Dependencies

Install all dependencies with:

npm install
or
yarn install


## 📁 Main Libraries

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

## 🏗️ Scaffolding & Folder Structure

- **public/**: Static files (images, favicon, etc.).
- **src/**: All app code: components, hooks, and core logic.
- **tsconfig.*.json**: TypeScript configuration.
- **package.json**: Dependency and script management.
- **package-lock.json**: Exact record of installed versions.
- **README.md**: Main frontend documentation.
- **README_SUPABASE.md**: Backend and service logic docs.
- **configs, lint, prettier**: Configuration and style rules.

---

## 📦 Useful Commands

- `npm run dev`: Starts the local development server (Vite)
- `npm run build`: Builds the project for production
- `npm run preview`: Locally previews the production build
- `npm run lint`: Checks code style
- `npm run format`: Formats all source files

---

## 🎯 Main Features

- Gamified system with points, levels, and coupons.
- Numbered seat reservations for events.
- Publication of reviews and social sharing.
- Automatic referrals and rewards for inviting new users.
- User dashboard with history, progress, and rewards.

---

## ⚙️ Supabase Services & Automated Functions

### Main Database Functions

- `awardpoints`: Grants points for actions, updates user levels and coupons.
- `calculateuserlevel`: Calculates level based on accumulated points.
- `generatereferralcode`: Generates unique referral codes per user.
- `grantlevelcoupon`: Grants coupons as users level up.
- `initializeeventseats`: Arranges numbered event seats.
- `processreferral`: Manages referral actions and user rewards.

### Triggers & Automation

- Automatic creation of referral code and welcome coupons upon profile creation.
- Profile linked to authentication and initial user registration.

### Edge Functions (HTTP Services)

- `process-purchase`: Automates orders, seat reservations, and coupons.
- `process-review`: Inserts reviews and awards extra points.
- `process-share`: Rewards users for social sharing.
- `process-referral`: Handles referral logic and rewards.

All REST functions and services are secured with JWT authentication and advanced access policies.

---

## 🌍 Deployment

You can deploy TRUECULTURE on Vercel, Netlify, VPS, or any Node.js platform with external access to Supabase. Just prepare the production build (`npm run build`), configure your environment variables, and connect the frontend with your backend credentials in Supabase.

---

## 📚 Resources & References

- [Visual presentation and details (Behance)](https://www.behance.net/gallery/233288171/TRUECULTURE/modules/1338995987)
- [Versel](https://www.behance.net/gallery/233288171/TRUECULTURE/modules/1338995987)

TRUECULTURE lets you actively contribute to local culture, earn rewards, and become part of a collaborative network where each experience adds value and multiplies!
