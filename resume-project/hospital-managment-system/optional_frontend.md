## Part 3: Hospital Management System Frontend

### **Frontend Overview**
The frontend will consist of two primary sections:

1. **User Interface**: 
   - To be used by patients for managing their appointments.
   - Key features:
     - Patient login and registration by email.
     - Appointment booking with available doctors.
     - Viewing upcoming and past appointments.
     - Profile management.

2. **Admin Panel**:
   - To be used by hospital administrators for managing patients, doctors, and appointments.
   - Key features:
     - View, create, update, and delete patients, doctors, and appointments.
     - Dashboard with statistics on appointments (e.g., total appointments, by status).
     - Filter and search functionalities for quick data retrieval.

---

### **1. User Interface**

**Pages & Features:**

- **Login and Registration Page**:
  - **Description**: Allows patients to log in or register.
  - **Functionality**:
    - `POST /api/patients/`: Registration of new patients.
    - Authentication for logging in (using email for now).

- **Dashboard**:
  - **Description**: Displays a patient dashboard with options for booking and viewing appointments.
  - **Components**:
    - **Book Appointment**:
      - Lists all doctors with the ability to filter by specialty.
      - Allows patients to select a doctor, date, and time for booking an appointment.
      - API Call: `POST /api/appointments/` to create a new appointment.
    - **View Appointments**:
      - Displays a list of upcoming and past appointments.
      - Filter by appointment status (e.g., Scheduled, Completed, Canceled).
      - Pagination for appointment lists.
      - API Call: `GET /api/appointments?patientId={patientId}`.

- **Profile Page**:
  - **Description**: Displays and allows the patient to update their profile information.
  - **Functionality**:
    - View and edit profile details such as name, contact information, etc.
    - API Call: `PATCH /api/patients/:id` to update patient details.

---

### **2. Admin Panel**

**Pages & Features:**
- **Admin Dashboard**:
  - **Description**: Displays general statistics and access to various management features.
  - **Components**:
    - **Patient Management**:
      - View, create, update, and delete patients.
      - API Calls:
        - `GET /api/patients/` for retrieving patients with pagination.
        - `POST /api/patients/` for adding a new patient.
        - `PATCH /api/patients/:id` for updating patient information.
        - `DELETE /api/patients/:id` for removing a patient.
    - **Doctor Management**:
      - View, create, update, and delete doctors.
      - Filter doctors by specialty.
      - API Calls:
        - `GET /api/doctors/` for retrieving all doctors with pagination.
        - `POST /api/doctors/` for adding a new doctor.
        - `PATCH /api/doctors/:id` for updating doctor information.
        - `DELETE /api/doctors/:id` for removing a doctor.
    - **Appointment Management**:
      - View, update status, and delete appointments.
      - API Calls:
        - `GET /api/appointments/` to retrieve appointments with filters and pagination.
        - `PATCH /api/appointments/:id` for updating appointment status.
        - `DELETE /api/appointments/:id` to cancel or delete an appointment.
      - **Appointment Statistics**:
        - View appointment counts by status (Scheduled, Completed, Canceled).
        - API Call: `GET /api/appointments/statistics` to get statistical data on appointments.
  
---

### **Technical Requirements and Considerations**

- **UI Framework**: 
  - Use **React** for creating a single-page application with a structured component-based approach.
  - **Next.js** can be used if server-side rendering is required, but the basic setup can focus on client-side rendering for now.

- **State Management**:
  - Use **Context API** or **Redux** for managing global state (user authentication, selected appointment data, etc.).

- **API Integration**:
  - Utilize **Axios** or **Fetch API** for making HTTP requests to backend endpoints.
  - Each page component will handle its own API requests and update the relevant parts of the UI accordingly.

- **Routing**:
  - **React Router** can be used for navigating between pages.
  - Pages will include routes for login, registration, dashboard, profile, and admin panel.

- **Design and Styling**:
  - Use **CSS Modules** or **styled-components** for styling.
  - **Material UI**,  **Bootstrap** and **TwilindCSS** can provide pre-styled components and layout structures, reducing design effort and ensuring responsive layouts.
