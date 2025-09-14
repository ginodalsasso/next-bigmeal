# Next BigMeal - Web Application

## Overview

Next BigMeal is a web application designed for food enthusiasts to create, manage, and share their recipes but also for making ShoppingLists using your recipes. It includes features for user authentication using nextAuth, and the ability to organize recipes into shopping lists. 
Future enhancements will expand its functionality.

## Features

- **Recipe Management**: Create, edit, and delete recipes with ease.
- **User Authentication**: Secure login and session management using nextAuth.
- **Shopping List Integration**: Add recipes or individual ingredients to a shopping list.
- **Search Bar**: Quickly find recipes or ingredients via full-text search.
- **Pagination**: Display large sets of data (e.g., recipes) in manageable chunks with pagination.
- **Responsive Design**: Optimized for use on desktop and mobile devices.
- **Server-Side Rendering (SSR)**: Most `GET` methods use SSR for improved SEO and faster initial load.
- **Progressive Web App (PWA)**: Install the app on your device for an app-like experience, offline support, and faster loading.
- **Extensibility**: Built with future features in mind, allowing for seamless updates.

## Technologies Used

- **Framework**: Next.js.
- **Database**: MongoDB.
- **ORM**: Prisma.
- **Styling**: Tailwind and CSS.
- **Deployment**: Vercel for hosting at the moment.

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

4. Set up environment variables by creating a `.env` file in the root directory and adding the following:
   ```env
   DATABASE_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/<database>?retryWrites=true&w=majority
   SESSION_SECRET=<your-secret>
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Access the application at `http://localhost:3000`.


## Conclusion

Next BigMeal is a versatile platform for managing recipes and meal planning. Its robust session management and user-friendly design make it an ideal tool for food enthusiasts, with scalability to incorporate future enhancements.

![Frame 76](https://github.com/user-attachments/assets/b7bd10a2-af43-42a7-9e40-6b58dbabf878)
![Frame 77](https://github.com/user-attachments/assets/e74252bf-8971-414d-a611-7f598e7eb842)
![Frame 78](https://github.com/user-attachments/assets/13671d09-f81f-4469-9d4d-94ad39df9f09)
![Frame 79](https://github.com/user-attachments/assets/3fae0901-fe94-4a30-97cb-3accabf25e6e)
