### Part 2: PostgreSQL in Action

In this section, we will go through the step-by-step installation and setup of PostgreSQL and integrate it with our existing **travel-booking-system** serverless microservices using **TypeORM**. This will enable a smooth transition from SQLite to PostgreSQL, leveraging PostgreSQL’s powerful features while maintaining a similar structure.

---

#### 1. Installing PostgreSQL

**Step 1: Download PostgreSQL**
- Visit the official [PostgreSQL download page](https://www.postgresql.org/download/).
- Select your operating system (Windows, macOS, Linux) and follow the instructions provided for your platform.
- PostgreSQL also includes **pgAdmin**, a graphical interface for managing PostgreSQL databases.

**Step 2: Install PostgreSQL**
- Follow the setup process. During installation, make sure to:
  - Set a password for the PostgreSQL superuser (`postgres`).
  - Remember the port number (5432 is default).
  - Install **pgAdmin** if you want a GUI to manage your databases.

**Step 3: Verify Installation**
After installation, open a terminal or command prompt and run:
```bash
psql --version
```
This command should display the installed version of PostgreSQL.

**Step 4: Start PostgreSQL Server**
To start the PostgreSQL server (if it’s not started automatically):
- **Windows**: Use **pgAdmin** or PostgreSQL’s **services** tool.
- **macOS/Linux**: Start PostgreSQL using:
  ```bash
  sudo service postgresql start
  ```

---

#### 2. Setting Up PostgreSQL Database for Travel Management System

**Step 1: Create a New Database**
Open the terminal and log into the PostgreSQL prompt:
```bash
psql -U postgres
```
You will be asked to enter the password you set during installation.

Next, create the travel management system database:
```sql
CREATE DATABASE travel_management_system;
```

**Step 2: Create a User**
You can create a new PostgreSQL user to access the database:
```sql
CREATE USER travel_user WITH ENCRYPTED PASSWORD 'your_password';
```

**Step 3: Grant Privileges**
Now grant this user all privileges on the travel management database:
```sql
GRANT ALL PRIVILEGES ON DATABASE travel_management_system TO travel_user;
```

**Step 4: Exit PostgreSQL**
Type `\q` to exit the PostgreSQL prompt.

---

#### 3. Integrating PostgreSQL with TypeORM

Now, we will modify our **travel-booking-system** to switch from SQLite to PostgreSQL.

**Step 1: Install PostgreSQL Driver**
In your **travel-booking-system** project, navigate to the root directory and install the required PostgreSQL driver for Node.js:
```bash
npm install pg
```

**Step 2: Update `ormconfig.json` or `data-source.ts`**
If you are using a configuration file like `ormconfig.json` or `data-source.ts`, update it with PostgreSQL settings.

Example for **ormconfig.json**:
```json
{
  "type": "postgres",
  "host": "localhost",
  "port": 5432,
  "username": "travel_user",
  "password": "your_password",
  "database": "travel_management_system",
  "entities": ["src/entity/**/*.ts"],
  "synchronize": true,
  "logging": false
}
```

If using **data-source.ts**:
```ts
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "travel_user",
    password: "your_password",
    database: "travel_management_system",
    entities: [__dirname + "/entity/*.ts"],
    synchronize: true,
});
```

**Step 3: Update TypeORM Entities**
Make sure your TypeORM entities are configured correctly. Here’s a sample entity for the `Flights` table:
```ts
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Flight {
  @PrimaryGeneratedColumn()
  flight_id: number;

  @Column()
  origin: string;

  @Column()
  destination: string;

  @Column()
  departure_time: string;

  @Column()
  arrival_time: string;

  @Column('float')
  price: number;
}
```

**Step 4: Running Migrations (Optional)**
If you prefer not to use the `synchronize: true` option (automatic synchronization), TypeORM provides a migration feature. First, generate the migration:
```bash
npm run typeorm migration:generate -- -n InitialMigration
```

Then, run the migration:
```bash
npm run typeorm migration:run
```

**Step 5: Connect Your Microservices**
Ensure that your microservices (`flight-service`, `user-service`) are properly connected to the new PostgreSQL database using the updated TypeORM configuration.

---

#### 4. Test PostgreSQL Integration

**Step 1: Start the Server**
Start your microservices with the updated PostgreSQL configuration

**Step 2: Verify Functionality**
Use tools like **Postman** or **curl** to test your APIs. Check that CRUD operations (create, read, update, delete) are working as expected with PostgreSQL.

- **Create a new flight**:
```bash
POST /api/flights
{
  "origin": "New York",
  "destination": "London",
  "departure_time": "2024-10-10 14:00",
  "arrival_time": "2024-10-10 22:00",
  "price": 500.00
}
```

- **Get all flights**:
```bash
GET /api/flights
```

Verify that the data is stored in PostgreSQL.

---

#### 5. Advantages of PostgreSQL Integration

- **Scalability**: PostgreSQL is well-suited for production-scale applications.
- **Advanced Features**: With PostgreSQL, you have access to features like advanced indexing, support for large datasets, and full ACID compliance.
- **Improved Data Integrity**: PostgreSQL offers robust constraint handling and transactions, which helps ensure the consistency and integrity of your data.