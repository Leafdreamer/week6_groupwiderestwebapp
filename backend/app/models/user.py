from datetime import datetime

class User:
    def __init__(self, username, password_hash, role="employee", id= None, created_at=None ):
        self.id = id                    #Primary key
        self.username = username
        self.password_hash = password_hash
        self.role = role
        self.created_at = created_at or datetime.now().isoformat()