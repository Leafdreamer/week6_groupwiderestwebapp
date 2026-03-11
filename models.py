from datetime import datetime

class Product:
    def __init__(self, id, name, category, quantity, price):
        self.id = id    #Primary key
        self.name = name
        self.category = category
        self.quantity = quantity
        self.price = price
        
class Order:
    def __init__(self, id, product_id, quantity, date=None):
        self.id = id
        self.product_id = product_id  #Foreign key
        self.quantity = quantity
        self.date = date or datetime.now().isoformat()

class Transaction:
    def __init__(self, id, type, product_id, quantity, date=None):
        self.id = id
        self.type = type  # sale, return, transfer
        self.product_id = product_id    #Foreign key
        self.quantity = quantity
        self.date = date or datetime.now().isoformat()
        
# Product's quantity must be a positive integer
# Order's price must be a positive number
def ValidateProduct(product):
    try:
        a = int(product['quantity'])
        b = float(product['price'])
        if a < 0 or b < 0: return False
        return True
    except:
        return False

# Order's quantity must be a positive integer
# product_id for the order must be a positive integer
def ValidateOrder(order):
    try:
        a = int(order['quantity'])
        b = int(order['product_id'])
        if a < 0 or b < 0: return False
        return True
    except:
        return False
    
# Transaction's quantity must be a positive integer
# product_id for the transaction must be a positive integer
def ValidateTransaction(transaction):
    try:
        a = int(transaction['quantity'])
        b = int(transaction['product_id'])
        if a < 0 or b < 0: return False
        return True
    except:
        return False