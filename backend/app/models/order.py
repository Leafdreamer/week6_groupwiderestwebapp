from datetime import datetime
class Order:
    def __init__(self, id=None, date=None):
        self.id = id    #Primary key  
        self.date = date or datetime.now().isoformat()