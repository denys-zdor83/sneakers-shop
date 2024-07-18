# Sneakers Shop

Welcome to the Sneakers Shop, an internet-based storefront specializing in the sale of sneakers. This project is an example of writing an application using the Vue JavaScript library, as well as other related technologies for creating websites.

## Features

The Sneakers Shop offers several key features, including:

- **Product Viewing:** Browse all available sneakers.
- **Sorting:** Sort sneakers by name and price for easy navigation.
- **Search Functionality:** Quickly find sneakers with a robust search feature.
- **Favorites:** Save your favorite products for later viewing.
- **Shopping Cart:** Add products to a cart and proceed to checkout.
- **Responsive Design:** Fully adaptive interface for mobile devices.

## Technologies Used

This project is crafted using a variety of modern web development tools and practices:

- **Framework:** Built with Vue.js 3 utilizing the Composition API approach for reactive components.
- **Routing:** Vue Router for navigation between pages.
- **Styling:** Tailwind CSS for utility-first styling.
- **Type Safety:** TypeScript for static type checking.
- **Internationalization:** Vue I18n for multilanguage support.
- **Build Tool:** Vite for an optimized frontend tooling experience.
- **Backend:** Utilizes [Mocky](https://mokky.dev/) for backend simulation.

## Installation

To set up the Sneaker Shop locally, follow these steps:
Verysion of Node.js used in the project - v18.16.0

1. Clone the repository to your local machine.
2. Install the necessary npm dependencies by running:
   ```
   npm install
   ```
3. The primary branch for active development is 'main'
4. To start the project, launch it using the command:
   ```
   npm run dev
   ```
5. To run a bundle building, launch a following command:
   ```
   npm run build
   ```

## To maintain a clean and consistent codebase, please follow the import order outlined below in all files:

1. Framework Imports: Import core modules and components from the framework or library you're using (e.g., React, Vue, Angular).
2. Third-Party Libraries: Import external libraries or packages.
3. Internal Components: Import your project's internal components or utilities.
4. Styles: Import CSS or SASS/LESS styles.
5. Images imports.
6. Typescript: Types, interfaces, all types descriptions.
7. Other Assets: Import other assets such as JSON files, functions helpers, state managment selectors and actions.