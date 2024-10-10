### Part 3: Minimal Frontend for the Travel Booking System

In this part, we’ll design a minimal frontend using React or Next.js that includes two separate sections: one for end-users to book flights and manage their bookings, and an admin panel for administrators to manage users, flights, and bookings.

---

### **Frontend Requirements**

1. **Tech Stack**: 
   - Use either **React** or **Next.js** for building the frontend.
   - Use **Axios** or **Fetch API** for making API requests.
   - Implement **React Router** (for React projects) or **Next.js Routing** to manage page navigation.
   - Use **CSS** or **CSS Framework** (e.g., TailwindCSS or Bootstrap) to style the application.
   - For form validation, use a library like **Formik** and **Yup**.

2. **Folder Structure**:
   - Follow a clean folder structure to organize components, pages, services, and styles. For example:
     ```
     src/
     ├── components/
     ├── pages/
     ├── services/
     ├── styles/
     └── App.js or index.js
     ```

---

### **Part 1: User Interface**

This part will be the user-facing side of the application. It should provide users with functionalities to register, log in, search for flights, make bookings, and view their bookings.

#### Pages and Components:

1. **Authentication**:
   - **Register Page**: Users can create an account by providing their name, email, and other details.
   - **Login Page**: Users can log in with their email to access the app.

2. **Dashboard**:
   - **Search Flights**: A search form where users can enter `origin`, `destination`, and date to find available flights.
   - **Flight Listings**: A results page showing available flights based on the search. Each flight result should have a **Book** button.
   - **Book Flight**: A booking form that captures the booking date and flight details. After booking, the user should be able to view their booking in the dashboard.

3. **My Bookings**:
   - A page where users can view all of their bookings with details. Each booking entry should display:
     - Flight details (origin, destination, and date)
     - Booking status
     - Option to **Cancel** the booking (DELETE request).

---

### **Part 2: Admin Panel**

The admin panel will allow the administrator to manage all aspects of the system, including users, flights, and bookings.

#### Pages and Components:

1. **Authentication**:
   - Admin should log in with their email to access the admin panel.

2. **Admin Dashboard**:
   - A main dashboard with navigation options for **Manage Users**, **Manage Flights**, and **Manage Bookings**.

3. **Manage Users**:
   - View a list of all registered users.
   - Each user should have options to **Edit** and **Delete**.
   - **Add User**: Option to create a new user manually.

4. **Manage Flights**:
   - View a list of all flights with details such as `origin`, `destination`, `price`, etc.
   - **Add Flight**: A form to create a new flight.
   - Each flight should have options to **Edit** and **Delete**.

5. **Manage Bookings**:
   - View a list of all bookings.
   - Each booking should have options to **Edit** (change booking status) and **Delete**.
   - Allow admin to filter bookings by user or by flight for easier data management.

---

### **API Integration**

1. For both **User Interface** and **Admin Panel**, integrate the backend APIs to handle each action:
   - Use `POST /api/users/register` and `POST /api/users/login` for user authentication.
   - Use `GET /api/flights?origin=&destination=` to retrieve flights based on the user’s search.
   - Use `POST /api/bookings` to make a booking.
   - Use `GET /api/bookings` and `DELETE /api/bookings/:id` for the My Bookings page.
   - Use `GET`, `POST`, `PATCH`, and `DELETE` APIs for **Manage Users**, **Manage Flights**, and **Manage Bookings** pages in the Admin Panel.

2. **Handle Loading and Error States**:
   - Use loading spinners or indicators while data is being fetched.
   - Display meaningful error messages when requests fail (e.g., “Failed to load flights,” “Booking could not be canceled,” etc.).

