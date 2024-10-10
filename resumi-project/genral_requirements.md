### Part 2: General Project Requirements

This section outlines the fundamental standards and requirements for the **Travel Booking System** and **Hospital Management System** projects. These guidelines will ensure consistency, maintainability, and scalability across both projects. The main goal is to create a robust and well-structured application that you can showcase in your portfolio.

---

#### 1. **Clean Code & Best Practices**

- **Code Formatting**: Use consistent formatting. Enforce this with Prettier and ESLint to standardize code style and avoid common pitfalls.
- **Error Handling**: Implement robust error handling with proper status codes and error messages. Avoid exposing sensitive information in error messages.
- **Modularity**: Break down functionality into smaller, reusable modules and services. 
- **Commenting**: Write clear and concise comments where necessary, especially for complex logic.
- **Naming Conventions**: Use descriptive and consistent names for variables, functions, and files. Stick to camelCase for variables and functions, PascalCase for classes, and lowercase for files with dashes or underscores as separators (e.g., `user-service.js`).
- **Environment Variables**: Store sensitive data like API keys, database credentials, and other secrets in environment variables. Load these variables using `dotenv` for Node.js projects.
  
---

#### 2. **Folder Structure**

- **Project Root**:
  - **`/api/`**: Holds the serverless functions for each microservice.
  - **`/api/{microservice_name}/`**: Folder structure within each microservice.
    - **`controllers/`**: Handles request processing and calls appropriate services.
    - **`models/`**: Database schemas and models.
    - **`routes/`**: Defines API routes.
    - **`services/`**: Contains business logic for the microservice.
    - **`middlewares/`**: Custom middleware for validation, error handling, etc.
    - **`utils/`**: General utility functions (e.g., date formatting, data transformation).
  - **`/config/`**: Configuration files for the database, environment variables, etc.
  - **`/docs/`**: Contains project documentation such as API documentation and setup instructions.

**Example Folder Structure:**

```plaintext
├── api/
│   ├── users/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── middlewares/
│   └── flights/
│       ├── controllers/
│       ├── models/
│       ├── routes/
│       ├── services/
│       └── middlewares/
├── config/
├── tests/
└── docs/
```

---

#### 3. **Database Choice**

Students have the flexibility to choose between **MongoDB**, **SQLite**, or **PostgreSQL** based on their preference and familiarity.

- **MongoDB**:
  - Use **Mongoose** as the ODM. Mongoose schemas will help enforce structure and relationships within the collections.
- **SQLite** and **PostgreSQL**:
  - Use **TypeORM** as the ORM. TypeORM supports both databases and provides tools for managing schemas, migrations, and relationships.
- **Connection Configuration**:
  - Each microservice should manage its own database connection, configured using environment variables.
  
---

#### 4. **ORM and ODM**

- For **MongoDB**: Use **Mongoose** as it provides excellent support for schemas, validations, and easy integration with serverless functions.
- For **SQLite/PostgreSQL**: Use **TypeORM**, which is well-suited for relational databases and works seamlessly with serverless deployments.
  
---

#### 5. **Deployment on Vercel**

- **Serverless Functions**: Each microservice should be structured as a serverless function in the `api` directory. For example, an `api/users` folder will contain all serverless functions related to the User microservice.
- **Environment Variables**: Ensure all sensitive information is managed via Vercel's environment variables.
- **Build Settings**: Adjust Vercel build settings as needed to accommodate any specific project requirements.
  
---

#### 6. **Validation Middleware**

- **Express Validator** or **Joi**: 
  - Use **Joi** for validation as it’s suitable for both synchronous and asynchronous validations.
  - Ensure all incoming requests have proper validations in place (e.g., required fields, correct data types).
- **Error Messages**: Return user-friendly error messages for failed validations.

---

#### 7. **API Documentation**

- **Swagger or Postman**:
  - Use **Swagger** to document each API endpoint. Swagger UI will allow testing and visualization of the API.
  - Alternatively, provide a **Postman** collection with all the endpoints, including examples and descriptions.
  
---

#### 8. **Additional Best Practices**

- **Request Logging**: Implement logging for all incoming requests (e.g., request method, endpoint, response status).
- **Rate Limiting**: Add rate limiting to prevent abuse of APIs.
- **Data Security**:
  - Implement input sanitization to prevent XSS and SQL Injection attacks.
  - Encrypt sensitive data and secure all external communications with HTTPS.