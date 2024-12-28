# Next BigMeal - Web Application

## Overview

Next BigMeal is a web application designed for food enthusiasts to create, manage, and share their recipes. It includes features for user authentication without external libraries, session management, and the ability to organize recipes into shopping lists. 
Future enhancements will expand its functionality.

## Features

- **Recipe Management**: Create, edit, and delete recipes with ease.
- **User Authentication**: Secure login and session management without external libraries.
- **Shopping List Integration**: Add recipes or individual ingredients to a shopping list.
- **Responsive Design**: Optimized for use on desktop and mobile devices.

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

## Contribution

We welcome contributions to improve the Next BigMeal project. To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and push the branch.
4. Open a pull request for review.

## Conclusion

Next BigMeal is a versatile platform for managing recipes and meal planning. Its robust session management and user-friendly design make it an ideal tool for food enthusiasts, with scalability to incorporate future enhancements.

