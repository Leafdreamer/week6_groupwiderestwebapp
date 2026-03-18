import sqlite3
from faker import Faker
import random

from database import get_connection # make it database, not database.database

# Initialisering
fake = Faker()
db_name = 'database.db' # Navngiv din database-fil her

def seed_database():
    conn = get_connection()
    cursor = conn.cursor()

    # # 0.1. Slet eksisterende data (valgfrit - fjern hvis du vil beholde gammel data)
    # cursor.execute("DROP TABLE IF EXISTS OrderItems")
    # cursor.execute("DROP TABLE IF EXISTS Transactions")
    # cursor.execute("DROP TABLE IF EXISTS Orders")
    # cursor.execute("DROP TABLE IF EXISTS Products")
    # cursor.execute("DROP TABLE IF EXISTS Users")

    # # 0.2. Opret tabeller ud fra dit ER-diagram
    # cursor.execute('''CREATE TABLE Products (
    #     id INTEGER PRIMARY KEY AUTOINCREMENT,
    #     name TEXT, category TEXT, quantity INTEGER, price REAL)''')

    # cursor.execute('''CREATE TABLE Orders (
    #     id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT)''')

    # cursor.execute('''CREATE TABLE OrderItems (
    #     id INTEGER PRIMARY KEY AUTOINCREMENT, 
    #     order_id INTEGER, product_id INTEGER, quantity INTEGER,
    #     FOREIGN KEY(order_id) REFERENCES Orders(id),
    #     FOREIGN KEY(product_id) REFERENCES Products(id))''')

    # cursor.execute('''CREATE TABLE Transactions (
    #     id INTEGER PRIMARY KEY AUTOINCREMENT,
    #     type TEXT, product_id INTEGER, quantity INTEGER, date TEXT,
    #     FOREIGN KEY(product_id) REFERENCES Products(id))''')

    # cursor.execute('''CREATE TABLE Users (
    #     id INTEGER PRIMARY KEY AUTOINCREMENT,
    #     username TEXT, password_hash TEXT, role TEXT, created_at TEXT)''')

    # 1. Indsæt 20 Produkter
    product_ids = []
    categories = ['Elektronik', 'Tøj', 'Hjem & Have', 'Legetøj', 'Sport']
    for _ in range(20):
        cursor.execute("INSERT INTO products (name, category, quantity, price) VALUES (?, ?, ?, ?)",
                       (fake.word().capitalize(), random.choice(categories), random.randint(5, 100), round(random.uniform(49.0, 1999.0), 2)))
        product_ids.append(cursor.lastrowid)

    # 2. Indsæt 10 Ordrer og deres OrderItems
    for _ in range(10):
        cursor.execute("INSERT INTO orders (date) VALUES (?)", (fake.date_this_year().isoformat(),))
        order_id = cursor.lastrowid
        
        # Hver ordre får 1-4 forskellige produkter (OrderItems)
        for _ in range(random.randint(1, 4)):
            cursor.execute("INSERT INTO order_items (order_id, product_id, quantity) VALUES (?, ?, ?)",
                           (order_id, random.choice(product_ids), random.randint(1, 5)))

    # 3. Indsæt 15 Transaktioner (Lagerbevægelser)
    types = ['Indgående', 'Udgående']
    for _ in range(15):
        cursor.execute("INSERT INTO transactions (type, product_id, quantity, date) VALUES (?, ?, ?, ?)",
                       (random.choice(types), random.choice(product_ids), random.randint(1, 20), fake.date_this_month().isoformat()))

    # 4. Indsæt 2 Brugere
    roles = ['Admin', 'User']
    for _ in range(2):
        cursor.execute("INSERT INTO users (username, password_hash, role, created_at) VALUES (?, ?, ?, ?)",
                       (fake.user_name(), fake.sha256(), random.choice(roles), fake.date_this_decade().isoformat()))

    conn.commit()
    conn.close()
    print(f"Succes! Databasen '{db_name}' er nu fyldt med fake data.")

if __name__ == "__main__":
    seed_database()