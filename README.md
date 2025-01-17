# Bookmark Project - Frontend

This is the frontend for the Bookmark Project, built with **Next.js** and **Tailwind CSS**. The project provides a user-friendly interface for users to save, view, and manage their bookmarks on a news website.

## Features

- **Bookmarking Articles**: Users can easily save articles as bookmarks.
- **View Bookmarks**: Bookmarked articles are displayed in a dedicated section.
- **User Authentication**: Secure user login and registration (optional).
- **Responsive Design**: Fully responsive for both desktop and mobile views.
- **Modern Tech Stack**: Built with **Next.js** (React Framework) and styled with **Tailwind CSS** for a modern, flexible UI.
- **Efficient Performance**: Server-side rendering with Next.js ensures fast page loads.

## Technologies Used

- **Next.js**: A React framework for building server-side rendered web applications.
- **Tailwind CSS**: A utility-first CSS framework for designing custom user interfaces.
- **React**: JavaScript library for building user interfaces.
- **Axios**: For making API requests to the backend to save and fetch bookmarks.

## Installation

Follow the steps below to set up the project locally on your machine.

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**

### Getting Started

1. Clone the repository:
   git clone https://github.com/yourusername/bookmark-project-frontend.git
   cd bookmark-project-frontend
2. Install dependencies:
   Using npm: npm install
   Using yarn: yarn install
3. Run the development server:
   Using npm: npm run dev
   Using yarn: yarn dev
4. Open your browser and go to http://localhost:3000 to view the app.

### Project Structure

src/app/: Contains all the pages for the application.
page.tsx: Home page, displays singin/signup page.
dashboard/add: Page that displays all books you can add bookmark.
dashboard/library: Page that displays all bookmarked books, you can also edit and delete books.
src/components/: Contains reusable UI components.
src/config: Contains utility functions for making crud operation to the backend.
src/data: Contains data for navigation.
src/lib: Contains utility functions for interacting with the backend.
src/respository: Contains repositories for interacting with the backend.
src/types: Contains interfaces and types for all data types.
styles/: Contains Tailwind CSS styles and configurations.
globals.css: Global styles applied across the application.
__fixtures__: Containes mock datas for test.
__mocks__: Containes mock functions of backend calls.
__test__: Containes test suites and test cases.
