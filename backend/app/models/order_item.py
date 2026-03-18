class OrderItem:
    def __init__(self, order_id, product_id, quantity, id=None):
        self.id = id                    #Primary key
        self.order_id = order_id        #Foreign key
        self.product_id = product_id    #Foreign key
        self.quantity = quantity