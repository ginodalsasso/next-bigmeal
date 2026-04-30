# Next BigMeal - Web Application

## Overview

Next BigMeal is a web application designed for food enthusiasts to create, manage, and share their recipes but also for making ShoppingLists using your recipes. It includes features for user authentication using nextAuth, and the ability to organize recipes into shopping lists. 

## Features

- **Recipe Management**: Create, edit, and delete recipes with steps, ingredients, prep/cook times, and categories.
- **AI Recipe Import**: Convert a URL, raw text, or an image (JPEG, PNG, GIF, WebP) into a structured recipe automatically using local LLMs (Gemini flash for images, Gemma for text/URL via Ollama).
- **User Authentication**: Secure login with NextAuth.js v5 — Credentials, Google OAuth, and GitHub OAuth. Argon2 password hashing, rate-limited login (5 attempts/hour), and role-based access (`PENDING | APPROVED | REJECTED | BLOCKED`).
- **Fuzzy Search**: Client-side fuzzy search powered by Fuse.js across meals, ingredients, and household products, with a server-side index endpoint and per-query DB fallback.
- **Favorites**: Like/unlike meals and access a personal favorites list.
- **Shopping List Integration**: Add recipes or individual ingredients and household products to a shopping list.
- **Pagination**: Display large sets of data in manageable chunks.
- **Responsive Design**: Mobile-first, optimized for desktop and mobile.
- **Server-Side Rendering (SSR)**: Most `GET` routes use SSR for improved SEO and faster initial load.
- **Progressive Web App (PWA)**: Installable, offline support via service worker, and Web Push notifications (VAPID).
- **Email Verification & Password Reset**: Account confirmation and forgotten-password flows via SMTP (Gmail).

## Technologies Used

- **Framework**: Next.js.
- **Database**: MongoDB Atlas.
- **ORM**: Prisma.
- **Auth**: NextAuth.js, Argon2.
- **AI**: Ollama — Gemma 3 (text/URL), Gemini flash (image).
- **Search**: Fuse.js (client-side fuzzy search).
- **Styling**: Tailwind CSS, shadcn/ui.
- **PWA**: offline page.
- **Deployment**: Vercel.

## Objectives

- Provide a user-friendly platform for recipe management and also avoid anoying task to look for food every weeks :D 
- Enable easy addition of recipes to shopping lists for streamlined meal planning.
- Implement secure session-based user authentication.

## Setup and Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ginodalsasso/next-bigmeal.git
   ```

2. Navigate to the project directory:
   ```bash
   cd next-bigmeal
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up environment variables by creating a `.env` file in the root directory:
   ```env
   DATABASE_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/<database>?retryWrites=true&w=majority
   SESSION_SECRET=<32-byte-base64>
   NEXTAUTH_SECRET=<32-byte-base64>
   API_URL=http://localhost:3000
   EMAIL_USER=<gmail>
   EMAIL_PASS=<gmail-app-password>
   AUTH_GITHUB_ID=
   AUTH_GITHUB_SECRET=
   AUTH_GOOGLE_ID=
   AUTH_GOOGLE_SECRET=
   JWT_SECRET=<64-char>
   NEXT_PUBLIC_VAPID_PUBLIC_KEY=
   VAPID_PRIVATE_KEY=
   OLLAMA_BASE_URL=http://localhost:11434
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Access the application at `http://localhost:3000`.


## Conclusion

Next BigMeal is a versatile platform for managing recipes and meal planning. Its robust session management and user-friendly design make it an ideal tool for food enthusiasts, with scalability to incorporate future enhancements.

![Frame 76](https://github.com/user-attachments/assets/8a327032-0dce-4919-bf40-352d94fcd189)