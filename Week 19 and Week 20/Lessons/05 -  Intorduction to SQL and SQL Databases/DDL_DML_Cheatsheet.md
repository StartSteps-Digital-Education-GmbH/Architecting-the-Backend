### **SQL DDL and DML Cheat Sheet**

This cheat sheet covers essential SQL queries related to **DDL (Data Definition Language)** and **DML (Data Manipulation Language)** operations, as well as important concepts like constraints, joins, and aggregation functions. It’s organized for quick reference, making it easy to use when working with SQL databases.

---

#### **1. DDL (Data Definition Language) Queries**
DDL commands deal with the structure of the database, such as creating, altering, and deleting tables.

- **CREATE TABLE**
    ```sql
    CREATE TABLE TableName (
        column1 datatype constraints,
        column2 datatype constraints,
        ...
    );
    ```

- **ALTER TABLE**
    ```sql
    -- Add a new column
    ALTER TABLE TableName
    ADD column_name datatype;

    -- Modify an existing column
    ALTER TABLE TableName
    MODIFY column_name datatype;

    -- Add a constraint
    ALTER TABLE TableName
    ADD CONSTRAINT constraint_name constraint_type (column_name);
    ```

- **DROP TABLE**
    ```sql
    DROP TABLE TableName;
    ```

- **TRUNCATE TABLE** (Removes all data without deleting the table structure)
    ```sql
    TRUNCATE TABLE TableName;
    ```

---

#### **2. DML (Data Manipulation Language) Queries**
DML commands are used to manage and manipulate data within tables.

- **INSERT INTO**
    ```sql
    INSERT INTO TableName (column1, column2, ...)
    VALUES (value1, value2, ...);
    ```

- **UPDATE**
    ```sql
    UPDATE TableName
    SET column1 = value1, column2 = value2
    WHERE condition;
    ```

- **DELETE**
    ```sql
    DELETE FROM TableName
    WHERE condition;
    ```

- **SELECT**
    ```sql
    SELECT column1, column2, ...
    FROM TableName
    WHERE condition;
    ```

- **SELECT ALL**
    ```sql
    SELECT * FROM TableName;
    ```

---

#### **3. SQL Constraints**
Constraints are rules applied to table columns to ensure the validity of data.

- **NOT NULL**
    ```sql
    CREATE TABLE Example (
        column1 datatype NOT NULL
    );
    ```

- **UNIQUE**
    ```sql
    CREATE TABLE Example (
        column1 datatype UNIQUE
    );
    ```

- **PRIMARY KEY**
    ```sql
    CREATE TABLE Example (
        column1 datatype PRIMARY KEY
    );
    ```

- **FOREIGN KEY**
    ```sql
    CREATE TABLE Example (
        column1 datatype,
        FOREIGN KEY (column1) REFERENCES OtherTable(column_in_other_table)
    );
    ```

- **CHECK**
    ```sql
    CREATE TABLE Example (
        column1 datatype,
        CHECK (condition)
    );
    ```

- **DEFAULT**
    ```sql
    CREATE TABLE Example (
        column1 datatype DEFAULT default_value
    );
    ```

---

#### **4. SQL Joins**
Joins combine rows from two or more tables based on a related column.

- **INNER JOIN** (Returns only matching rows from both tables)
    ```sql
    SELECT columns
    FROM table1
    INNER JOIN table2 ON table1.column = table2.column;
    ```

- **LEFT JOIN** (Returns all rows from the left table, and matched rows from the right table)
    ```sql
    SELECT columns
    FROM table1
    LEFT JOIN table2 ON table1.column = table2.column;
    ```

- **RIGHT JOIN** (Returns all rows from the right table, and matched rows from the left table)
    ```sql
    SELECT columns
    FROM table1
    RIGHT JOIN table2 ON table1.column = table2.column;
    ```

- **CROSS JOIN** (Returns the Cartesian product of both tables)
    ```sql
    SELECT columns
    FROM table1
    CROSS JOIN table2;
    ```

---

#### **5. SQL Aggregation Functions**
These functions perform calculations on multiple rows of a table and return a single value.

- **COUNT()** (Counts the number of rows)
    ```sql
    SELECT COUNT(column)
    FROM TableName;
    ```

- **SUM()** (Calculates the sum of values)
    ```sql
    SELECT SUM(column)
    FROM TableName;
    ```

- **AVG()** (Calculates the average value)
    ```sql
    SELECT AVG(column)
    FROM TableName;
    ```

- **MIN()** (Finds the minimum value)
    ```sql
    SELECT MIN(column)
    FROM TableName;
    ```

- **MAX()** (Finds the maximum value)
    ```sql
    SELECT MAX(column)
    FROM TableName;
    ```

---

#### **6. SQL GROUP BY Clause**
Used to group rows that have the same values in specified columns.

- **GROUP BY**
    ```sql
    SELECT column, COUNT(*)
    FROM TableName
    GROUP BY column;
    ```

- **HAVING Clause** (Filters groups based on aggregate function results)
    ```sql
    SELECT column, COUNT(*)
    FROM TableName
    GROUP BY column
    HAVING COUNT(*) > value;
    ```

---

#### **7. SQL ORDER BY Clause**
Sorts the result set in ascending or descending order.

- **ORDER BY**
    ```sql
    SELECT column1, column2
    FROM TableName
    ORDER BY column1 ASC;  -- or DESC for descending order
    ```

---

#### **8. SQL Subqueries**
Subqueries are queries nested inside other queries.

- **Simple Subquery**
    ```sql
    SELECT column1
    FROM TableName
    WHERE column2 = (SELECT MAX(column2) FROM TableName);
    ```

---

### **Quick Reference Table**

| **Command**           | **Purpose**                                       |
|-----------------------|---------------------------------------------------|
| `CREATE TABLE`        | Define a new table                                |
| `ALTER TABLE`         | Modify an existing table                          |
| `DROP TABLE`          | Delete a table                                    |
| `INSERT INTO`         | Add new records                                   |
| `UPDATE`              | Modify existing records                           |
| `DELETE`              | Remove records                                    |
| `SELECT`              | Retrieve records                                  |
| `JOIN`                | Combine data from multiple tables                 |
| `GROUP BY`            | Aggregate rows into groups                        |
| `ORDER BY`            | Sort result set                                   |
| `COUNT()`, `SUM()`, `AVG()`, `MIN()`, `MAX()` | Perform aggregate calculations |
| `CHECK`, `NOT NULL`, `UNIQUE`, `PRIMARY KEY`, `FOREIGN KEY`, `DEFAULT` | Apply constraints |

---

### **Conclusion**

This cheat sheet offers an organized and easy-to-use reference for DDL and DML SQL queries, helping you quickly perform common tasks related to database structure and data manipulation. Use it whenever you need a reminder of syntax or functionality!