## Part 1: API Requirements for Pet Care Booking System

### **User Management**

#### **1. Create User**
- **POST** `/api/users/`
  - **Description**: Register a new user for the pet care system.
  - **Body**:
    ```json
    {
      "first_name": "string",
      "last_name": "string",
      "email": "string",
      "password": "string",
      "phone": "number",
      "role": "UserRole", // Enum values: ['PetHuman', 'Sitter', 'Admin']
      "city": "string"
    }
    ```
  - **Response**: Newly created user details.

#### **2. Get Users**
- **GET** `/api/users/`
  - **Description**: Retrieve all users with pagination.
  - **Query Params**:
    - `page`: Number, optional, for pagination (default: 1).
    - `limit`: Number, optional, for pagination (default: 10).
    - `role`: (optional) Filter by user role (e.g., 'Sitter', 'PetHuman', 'Admin').
  - **Response**: List of users with pagination details.

#### **3. Get User by ID**
- **GET** `/api/users/:user_id`
  - **Description**: Retrieve a specific user by their ID.
  - **Response**: User details.

#### **4. Update User**
- **PATCH** `/api/users/:user_id`
  - **Description**: Update user profile information.
  - **Body**:
    ```json
    {
      "first_name": "string",
      "last_name": "string",
      "phone": "number",
      "city": "string"
    }
    ```
  - **Response**: Updated user details.

#### **5. Delete User**
- **DELETE** `/api/users/:user_id`
  - **Description**: Remove a user account.
  - **Response**: Status message indicating successful deletion.

---

### **Pet Human Management**

#### **1. Create Pet Human**
- **POST** `/api/pet_humans/`
  - **Description**: Register a new pet owner (Pet Human) with pet details.
  - **Body**:
    ```json
    {
      "user_id": "integer",
      "number_of_pets": "integer",
      "pets_type": "PetType", // Enum values: ['Dog', 'Cat', 'Bird', etc.]
      "medical_notes": "string"
    }
    ```
  - **Response**: Newly created pet human details.

#### **2. Get Pet Humans**
- **GET** `/api/pet_humans/`
  - **Description**: Retrieve all pet humans with pagination.
  - **Query Params**:
    - `page`: Number, optional, for pagination (default: 1).
    - `limit`: Number, optional, for pagination (default: 10).
    - `pets_type`: (optional) Filter by pet type.
  - **Response**: List of pet humans with pagination details.

#### **3. Get Pet Human by ID**
- **GET** `/api/pet_humans/:pet_human_id`
  - **Description**: Retrieve a specific pet human by their ID.
  - **Response**: Pet human details.

#### **4. Update Pet Human**
- **PATCH** `/api/pet_humans/:pet_human_id`
  - **Description**: Update pet human details.
  - **Body**:
    ```json
    {
      "number_of_pets": "integer",
      "pets_type": "PetType",
      "medical_notes": "string"
    }
    ```
  - **Response**: Updated pet human details.

#### **5. Delete Pet Human**
- **DELETE** `/api/pet_humans/:pet_human_id`
  - **Description**: Remove a pet human profile.
  - **Response**: Status message indicating successful deletion.

---

### **Sitter Management**

#### **1. Create Sitter**
- **POST** `/api/sitters/`
  - **Description**: Register a new sitter with their service details.
  - **Body**:
    ```json
    {
      "user_id": "integer",
      "bio": "string",
      "services_offered": "ServiceType", // Enum of services like 'Pet Sitting', 'Walking', etc.
      "is_available": "boolean",
      "rate_per_hour": "number"
    }
    ```
  - **Response**: Newly created sitter details.

#### **2. Get Sitters**
- **GET** `/api/sitters/`
  - **Description**: Retrieve all sitters with pagination and filtering.
  - **Query Params**:
    - `page`: Number, optional, for pagination (default: 1).
    - `limit`: Number, optional, for pagination (default: 10).
    - `services_offered`: (optional) Filter sitters by services offered.
    - `is_available`: (optional) Filter by availability status.
  - **Response**: List of sitters with pagination and any applied filters.

#### **3. Get Sitter by ID**
- **GET** `/api/sitters/:sitter_id`
  - **Description**: Retrieve details of a specific sitter.
  - **Response**: Sitter details.

#### **4. Update Sitter**
- **PATCH** `/api/sitters/:sitter_id`
  - **Description**: Update sitter details.
  - **Body**:
    ```json
    {
      "bio": "string",
      "services_offered": "ServiceType",
      "is_available": "boolean",
      "rate_per_hour": "number"
    }
    ```
  - **Response**: Updated sitter details.

#### **5. Delete Sitter**
- **DELETE** `/api/sitters/:sitter_id`
  - **Description**: Remove a sitter profile.
  - **Response**: Status message indicating successful deletion.

---

### **Booking Management**

#### **1. Create Booking**
- **POST** `/api/bookings/`
  - **Description**: Book a sitter for pet care services.
  - **Body**:
    ```json
    {
      "pet_human_id": "integer",
      "sitter_id": "integer",
      "service_type": "ServiceType",
      "booking_month": "string",
      "booking_days": "string", // List or comma-separated string of days
      "total_hours": "number"
    }
    ```
  - **Response**: Details of the created booking, including calculated total price.

#### **2. Get Bookings**
- **GET** `/api/bookings/`
  - **Description**: Retrieve all bookings with filtering and pagination.
  - **Query Params**:
    - `page`: Number, optional, for pagination (default: 1).
    - `limit`: Number, optional, for pagination (default: 10).
    - `status`: (optional) Filter by booking status (e.g., 'Pending', 'Confirmed', 'Completed').
  - **Response**: List of bookings with pagination and any applied filters.

#### **3. Get Booking by ID**
- **GET** `/api/bookings/:booking_id`
  - **Description**: Retrieve details of a specific booking.
  - **Response**: Booking details, including sitter and pet human information.

#### **4. Update Booking Status**
- **PATCH** `/api/bookings/:booking_id/status`
  - **Description**: Update the status of a booking (e.g., "Pending", "Confirmed", "Completed").
  - **Body**:
    ```json
    {
      "status": "BookingStatus" // Enum values: ['Pending', 'Confirmed', 'Completed', etc.]
    }
    ```
  - **Response**: Updated booking details with new status.

#### **5. Update Booking Review**
- **PATCH** `/api/bookings/:booking_id/review`
  - **Description**: Add or update a review for a completed booking.
  - **Body**:
    ```json
    {
      "review": "string"
    }
    ```
  - **Response**: Updated booking details with new review.

#### **6. Delete Booking**
- **DELETE** `/api/bookings/:booking_id`
  - **Description**: Cancel or remove a booking.
  - **Response**: Status message indicating successful deletion.

---

### **Sitter Statistics**

#### **1. Get Sitter Statistics**
- **GET** `/api/sitters/:sitter_id/statistics`
  - **Description**: Retrieve statistics for a sitter, including total bookings, ratings, and average rating.
  - **Response**:
    ```json
    {
      "totalBookings": 20,
      "totalHours": 120,
      "averageRating": 4.7,
      "statusBreakdown": {
        "Pending": 2,
        "Confirmed": 15,
        "Completed": 3
      }
    }
    ```
