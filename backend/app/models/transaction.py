from datetime import datetime

class Transaction:
    def __init__(self, type, product_id, quantity, id=None, date=None):
        self.id = id                    #Primary key
        self.type = type                # sale, return, transfer
        self.product_id = product_id    #Foreign key
        self.quantity = quantity
        self.date = date or datetime.now().isoformat()