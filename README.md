# Project Name : _Next Blog - A Blogging website_

## Project Requirements : https://docs.google.com/document/d/1BmkQilfhFTLDeF_KOWKThBV8iATvSHfon93pMuk8hd4/edit?tab=t.0

## Live Link - https://your-next-blog.netlify.app/

**Project Description :** This project is a modern, fully-responsive blog website built using **React**, **Firebase**, and **MongoDB**. The website offers a dynamic user experience with features like **email/password authentication**, **wish-list management**, and **commenting on blog posts**. Users can browse blogs, add them to their wish-list, and comment on posts. Admins can manage blog posts, including adding, updating, and deleting content.

## Key Features :

- **Responsive Design**: Works seamlessly across mobile, tablet, and desktop devices.
- **User Authentication**: Includes both email/password authentication and additional login options (e.g., Google).
- **Dynamic Blog Listings**: Blogs can be filtered by category and searched by title.
- **Wishlist**: Users can save favorite blogs to their wishlist and view them later.
- **Comment System**: Users can comment on blogs (excluding their own).
- **Admin Controls**: Admins can manage and update blog posts.
- **User-Friendly Interface**: An organised and responsive design for both desktop and mobile, ensuring a smooth experience on any device.

## Technologies Used:

- **React**: Building the user interface with reusable components.
- **Tailwind CSS & DaisyUI**: Styling the website with a modern, responsive design and pre-styled components.
- **React Router**: Enabling seamless navigation across different pages.
- **React Awesome Components**: Adding interactive UI elements for an engaging user experience.
- **React Icons**: Enhancing visuals with a variety of scalable icons.
- **Context API**: Managing global state efficiently across the application.
- **Firebase Authentication**: Used firebase authentication for register and login. Used firebase google authentication also.
- **MongoDB**: MongoDB as the database to store review data and other informations.
- **React Icons**: To add scalable vector icons to the user interface.
- **React Toastify**: For displaying toast notifications (e.g., for subscription confirmations).
- **React Sweet Alert**: For creating alert pop-ups with customizable styles and messages.
- **Axios**: For making HTTP requests to fetch and submit data from the server.
- **Framer Motion**: For adding animations to elements on the home page.
- **JWT Authentication**: Secure access control for private routes.

## React Fundamental and Advanced Concepts Used

1.  **JSX (JavaScript XML)**: Enables writing HTML-like syntax directly within JavaScript, making the UI more readable and declarative.
2.  **Components**: Modular, reusable components that define different parts of the app, such as product cards, navigation bars, and the footer.
3.  **Props**: Passes data from parent to child components, allowing customisation and dynamic content for different sections of the app.
4.  **State Management**: Manages data within components (e.g., user inputs, product lists, and cart items) and updates the UI when state changes.
5.  **Event Handling**: Manages user interactions like clicks and form submissions, enhancing interactivity.
6.  **Conditional Rendering**: Dynamically displays components based on specific conditions, such as displaying loading indicators or product details based on availability.
7.  **Lists and Keys**: Efficiently renders lists of items (like products) with unique keys for optimised rendering and identification.
8.  **Context API**: Provides a way to share global state across multiple components, avoiding prop drilling (useful for shared data like user authentication and cart data).
9.  **React Router**:

    - **useLocation**: Retrieves the current location object, helpful for conditional rendering based on the current route or page.
    - **useNavigate**: Allows programmatic navigation between pages (e.g., redirecting to the checkout page after adding items to the cart).
    - **useLoaderData** (if using React Router v6): Fetches data for a particular route before rendering, ensuring that essential data is loaded ahead of time.

10. **Lifecycle Methods with Hooks**: Utilize `useEffect` to handle side effects such as data fetching, updating the DOM, or subscribing to external events.

11. **Axios**: A promise-based HTTP client used for making API requests to interact with the server and fetch or send data. Axios is used for getting blog data, posting user comments, and handling authentication-related requests. It simplifies the process of handling HTTP requests and responses, making it more efficient and scalable.

### Data Handling and Management

1.  **Context API**: Manages global state for data like user authentication and shopping cart, accessible across components.
2.  **Local Storage**: Local storage used for locally store some users information for the best user experience.

## NPM Package used

Here’s the installation command for all the npm packages used in your project:

`npm install react-toastify sweetalert2 react-icons framer-motion`
This command will install the following packages:

- **react-toastify**: For displaying toast notifications.
- **sweetalert2**: For creating customizable pop-up alerts.
- **react-icons**: For adding customizable icons.
- **framer-motion**: For adding animations and transitions.

## Contributor

- **Name** - Syed Meehdi Hasan
- **Email** - syedmehedi34@gmail.com
