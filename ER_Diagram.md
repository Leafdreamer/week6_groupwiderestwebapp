Products
--------
id (PK)
name
category
quantity
price



Orders
--------
id (PK)
date


OrderItems
--------
id (PK)
order_id (FK)
product_id (FK)
quantity


Transactions
--------
id (PK)
type
product_id (FK)
quantity
date

Users
-----
id
username
password_hash
role
created_at