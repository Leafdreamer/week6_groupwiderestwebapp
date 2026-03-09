from datetime import datetime

class Product:
    def __init__(self, id, name, category, quantity, price):
        self.id = id    #Primary key
        self.name = name
        self.category = category
        self.quantity = quantity
        self.price = price
        

class Order:
    def __init__(self, product_id, quantity, date=None):
        self.product_id = product_id  #Foreign key
        self.quantity = quantity
        self.date = date or datetime.now().isoformat()

class Transaction:
    def __init__(self, type, product_id, quantity, date=None):
        self.type = type  # sale, return, transfer
        self.product_id = product_id    #Foreign key
        self.quantity = quantity
        self.date = date or datetime.now().isoformat()
        