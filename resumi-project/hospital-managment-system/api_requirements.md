### API Requirements for Hospital Management System

#### Microservices:
1. **/api/patients** - For managing patients.
2. **/api/doctors** - For managing doctors.
3. **/api/appointments** - For managing appointments.

Each **GET** endpoint will support pagination using `page` and `limit` as query parameters, and some endpoints include filtering options.

---

### **Patient Service** - `/api/patients`

1. **GET /api/patients/**  
   - **Description**: Retrieve all patients with pagination.
   - **Query Params**:
     - `page`: Number, optional, for pagination (default: 1).
     - `limit`: Number, optional, for pagination (default: 10).
     - `age`: Number, optional, to filter patients by age.
     - `gender`: String, optional, to filter by gender.
   - **Response**:
     ```json
     {
       "patients": [
         {
           "id": "string",
           "name": "string",
           "age": "number",
           "gender": "string",
           "contactInfo": {
             "phone": "string",
             "email": "string"
           }
         }
       ],
       "total": "number",
       "page": "number",
       "limit": "number"
     }
     ```

2. **GET /api/patients/:id**  
   - **Description**: Retrieve a specific patient by ID.
   - **Response**:
     ```json
     {
       "id": "string",
       "name": "string",
       "age": "number",
       "gender": "string",
       "contactInfo": {
         "phone": "string",
         "email": "string"
       }
     }
     ```

3. **POST /api/patients/**  
   - **Description**: Create a new patient.
   - **Request Body**:
     ```json
     {
       "name": "string",
       "age": "number",
       "gender": "string",
       "contactInfo": {
         "phone": "string",
         "email": "string"
       }
     }
     ```
   - **Response**:
     ```json
     {
       "id": "string",
       "name": "string",
       "age": "number",
       "gender": "string",
       "contactInfo": {
         "phone": "string",
         "email": "string"
       },
       "createdAt": "date"
     }
     ```

4. **PATCH /api/patients/:id**  
   - **Description**: Update a patient’s details.
   - **Request Body**:
     ```json
     {
       "name": "string",
       "age": "number",
       "gender": "string",
       "contactInfo": {
         "phone": "string",
         "email": "string"
       }
     }
     ```
   - **Response**: Same as the response for `GET /api/patients/:id` with updated details.

5. **DELETE /api/patients/:id**  
   - **Description**: Delete a patient by ID.
   - **Response**:
     ```json
     {
       "message": "Patient deleted successfully."
     }
     ```

---

### **Doctor Service** - `/api/doctors`

1. **GET /api/doctors/**  
   - **Description**: Retrieve all doctors with pagination.
   - **Query Params**:
     - `page`: Number, optional, for pagination (default: 1).
     - `limit`: Number, optional, for pagination (default: 10).
     - `specialty`: String, optional, to filter doctors by specialty.
   - **Response**:
     ```json
     {
       "doctors": [
         {
           "id": "string",
           "name": "string",
           "specialty": "string",
           "contactInfo": {
             "phone": "string",
             "email": "string"
           }
         }
       ],
       "total": "number",
       "page": "number",
       "limit": "number"
     }
     ```

2. **GET /api/doctors/:id**  
   - **Description**: Retrieve a specific doctor by ID.
   - **Response**:
     ```json
     {
       "id": "string",
       "name": "string",
       "specialty": "string",
       "contactInfo": {
         "phone": "string",
         "email": "string"
       }
     }
     ```

3. **POST /api/doctors/**  
   - **Description**: Add a new doctor.
   - **Request Body**:
     ```json
     {
       "name": "string",
       "specialty": "string",
       "contactInfo": {
         "phone": "string",
         "email": "string"
       }
     }
     ```
   - **Response**:
     ```json
     {
       "id": "string",
       "name": "string",
       "specialty": "string",
       "contactInfo": {
         "phone": "string",
         "email": "string"
       },
       "createdAt": "date"
     }
     ```

4. **PATCH /api/doctors/:id**  
   - **Description**: Update a doctor’s details.
   - **Request Body**: Same as `POST /api/doctors/`.
   - **Response**: Same as the response for `GET /api/doctors/:id` with updated details.

5. **DELETE /api/doctors/:id**  
   - **Description**: Delete a doctor by ID.
   - **Response**:
     ```json
     {
       "message": "Doctor deleted successfully."
     }
     ```

---

### **Appointment Service** - `/api/appointments`

1. **GET /api/appointments/**  
   - **Description**: Retrieve all appointments with pagination.
   - **Query Params**:
     - `page`: Number, optional, for pagination (default: 1).
     - `limit`: Number, optional, for pagination (default: 10).
     - `status`: String, optional, to filter appointments by status.
     - `doctorId`: String, optional, to filter appointments by doctor.
     - `patientId`: String, optional, to filter appointments by patient.
   - **Response**:
     ```json
     {
       "appointments": [
         {
           "id": "string",
           "patientId": "string",
           "doctorId": "string",
           "appointmentDate": "date",
           "status": "string"
         }
       ],
       "total": "number",
       "page": "number",
       "limit": "number"
     }
     ```

2. **GET /api/appointments/:id**  
   - **Description**: Retrieve a specific appointment by ID.
   - **Response**:
     ```json
     {
       "id": "string",
       "patientId": "string",
       "doctorId": "string",
       "appointmentDate": "date",
       "status": "string"
     }
     ```

3. **POST /api/appointments/**  
   - **Description**: Create a new appointment.
   - **Request Body**:
     ```json
     {
       "patientId": "string",
       "doctorId": "string",
       "appointmentDate": "date",
       "status": "string" // e.g., "Scheduled", "Completed", "Canceled"
     }
     ```
   - **Response**:
     ```json
     {
       "id": "string",
       "patientId": "string",
       "doctorId": "string",
       "appointmentDate": "date",
       "status": "string",
       "createdAt": "date"
     }
     ```

4. **PATCH /api/appointments/:id**  
   - **Description**: Update the status of an appointment.
   - **Request Body**:
     ```json
     {
       "status": "string" // e.g., "Scheduled", "Completed", "Canceled"
     }
     ```
   - **Response**: Same as the response for `GET /api/appointments/:id` with updated status.

5. **DELETE /api/appointments/:id**  
   - **Description**: Delete an appointment by ID.
   - **Response**:
     ```json
     {
       "message": "Appointment deleted successfully."
     }
     ```

6. **GET /api/appointments/statistics**  
   - **Description**: Get a summary of appointment statistics by status.
   - **Response Example**:
     ```json
     {
       "totalAppointments": 120,
       "statusSummary": {
         "Scheduled": 60,
         "Completed": 40,
         "Canceled": 20
       }
     }
     ```