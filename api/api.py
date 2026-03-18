from flask import Flask, request
from flask_restful import Api, Resource
from flasgger import Swagger
from flask_cors import CORS
from datetime import datetime
from models import ValidateProduct, ValidateOrder, ValidateTransaction
from db.db import get_db

app = Flask(__name__)
CORS(app)
api = Api(app)
swagger = Swagger(app)


# Test data before database implementation
# Once we have the database implemented, it can be tied in by replacing this
# products = {
#     1: {'id': 1, 'name': 'Test Product', 'category': 'Test', 'quantity': 5, 'price': 5.00}
# }

products = {
    i: {'id': i, 'name': f'Product{i}', 'category': 'Test', 'quantity': 100-i, 'price': 2*i}
    for i in range(100)
}

product_names = {p['name'] for p in products.values()}

orders = [
    {'id': 1, 'product_id': 1, 'quantity': 1, 'date': datetime.now().isoformat()}
]

transactions = [
    {'id': 1, 'type': 'sale', 'product_id': 1, 'quantity': 1, 'date': datetime.now().isoformat()}
]

next_product_id = max(products.keys()) + 1 if products else 1

### REST SERVICES FOR PRODUCTS
# Class for functions relating to all products (GET, POST)
class ProductREST(Resource):
    def get(self):
        """
        Get all products
        ---
        responses:
          200:
            description: Returns list of products
        """
        """Get all products with optional sorting and search"""
        conn = get_db()
        cursor = conn.cursor()

        cursor.execute("SELECT * FROM products")
        rows = cursor.fetchall()

        products = [dict(row) for row in rows]

        conn.close()
        return products, 200
    
    def post(self):
        """
        Create a new product
        ---
        parameters:
            -   in: body
                name: product
                required:
                schema:
                    type: object
                    required:
                        - name
                        - category
                        - quantity
                        - price
                    properties:
                        name:
                            type: string
                        category:
                            type: string
                        quantity:
                            type: integer
                        price:
                            type: number
        responses:
          201:
            description: New product created
          422:
            description: Invalid data (quantity must be INT, price must be a number)
        """

        # global next_product_id

        # data = request.json

        # if data['name'] in product_names:
        #     return {'message': 'Duplicate product'}, 422

        # newProduct = {
        #     'id': next_product_id, 
        #     'name': data['name'], 
        #     'category': data['category'], 
        #     'quantity': data['quantity'], 
        #     'price': data['price']
        #     }
        
        # if ValidateProduct(newProduct):
        #     products[next_product_id] = newProduct
        #     product_names.add(newProduct['name'])
        #     next_product_id += 1

        #     return newProduct, 201
        # else: 
        #     return {'message': 'Unable to parse data'}, 422
        conn = get_db()
        cursor = conn.cursor()

        cursor.execute("INSERT INTO products (name, category, price, quantity) VALUES (Gaming PC, Elektronik, 500.00, 20)")
        rows = cursor.fetchall()

        products = [dict(row) for row in rows]
        
        conn.commit()
        conn.close()
        return products, 200
    
# Class for functions related to a single product (GET[id], PUT, DELETE)
class ProductIDRest(Resource):
    def get(self, id):
        """
        Find a specific product based on its ID
        ---
        parameters:
          - in: path
            name: id
            type: integer
            required: true
        responses:
          200:
            description: Returns product
          404:
            description: Product not found
        """
        if id in products:
            return products[id], 200
        return {'message': 'Product not found'}, 404
    
    def put(self, id):
        """
        Update an existing product
        ---
        parameters:
          - in: path
            name: id
            type: integer
            required: true
          - in: body
            name: body
            required: true
            schema:
                type: object
                required:
                    - name
                    - category
                    - quantity
                    - price
                properties:
                    name:
                        type: string
                    category:
                        type: string
                    quantity:
                        type: integer
                    price:
                        type: number
        responses:
          200:
            description: Successfully updated the product
          404:
            description: Product not found
        """
        data = request.json

        if not ValidateProduct(data):
            return {'message': 'Invalid data'}, 422

        if id not in products:
            return {'message': 'Product not found'}, 404
        
        old_name = products[id]['name']
        new_name = data['name']
        if new_name != old_name:
            if new_name in product_names:
                return {'message': 'Duplicate product name found'}, 422
            product_names.discard(old_name)
            product_names.add(new_name)
        
        products[id].update(data)
        return products[id], 200
    
    def delete(self, id):
        """
        Delete a product
        ---
        parameters:
          - in: path
            name: id
            type: integer
            required: true
        responses:
          200:
            description: Successfully deleted the product
          404:
            description: Product not found
        """
        if id not in products:    
            return {"message": "Product not found"}, 404
        
        deleted_product = products.pop(id)
        product_names.discard(deleted_product['name'])
        return {'message': 'Product deleted', 'product': deleted_product}
        # for i, x in enumerate(products):
        #     if x['id'] == id:
        #         dProduct = products.pop(i)
        #         return dProduct, 200
        # return {'message': 'Product not found'}, 404

### REST SERVICES FOR ORDERS
# Class for functions relating to all orders (GET, POST)
class OrderREST(Resource):
    def get(self):
        """
        Get all orders
        ---
        responses:
          200:
            description: Returns list of orders
        """
        return orders, 200    
    
    def post(self):
        """
        Create a new order
        ---
        parameters:
            -   in: body
                name: order
                required:
                schema:
                    type: object
                    required:
                        - product_id
                        - quantity
                    properties:
                        product_id:
                            type: integer
                        quantity:
                            type: integer
        responses:
          201:
            description: New product created
          404:
            description: Cannot find product tied to product_id
          422:
            description: Invalid data (quantity must be INT)
        """
        data = request.json
        potentialID = data['product_id']
        
        if ProductIDRest.get(self, potentialID)[1] == 404:
            return {'message': 'Cannot make an order for product that does not exist'}, 404

        currentID = orders[-1]['id'] + 1
        newOrder = {
            'id': currentID,
            'product_id': data['product_id'],
            'quantity': data['quantity'], 
            'date': datetime.now().isoformat()
            }
        
        if ValidateOrder(newOrder):
            orders.append(newOrder)
            return newOrder, 201
        else: return {'message': 'Unable to parse data'}, 422

# Class for functions related to a single order (GET[id], PUT, DELETE)
class OrderIDRest(Resource):
    def get(self, id):
        """
        Find a specific order based on its ID
        ---
        parameters:
          - in: path
            name: id
            type: integer
            required: true
        responses:
          200:
            description: Returns order
          404:
            description: Order not found
        """
        for x in orders:
            if x['id'] == id:
                return x, 200
        return {'message': 'Order not found'}, 404
    
    def put(self, id):
        """
        Update an existing order
        ---
        parameters:
          - in: path
            name: id
            type: integer
            required: true
          - in: body
            name: body
            required: true
            schema:
                type: object
                required:
                    - product_id
                    - quantity
                    - date
                properties:
                    product_id:
                        type: integer
                    quantity:
                        type: integer
                    date:
                        type: boolean
        responses:
          200:
            description: Successfully updated the order
          404:
            description: Order not found
        """
        data = request.json

        if not ValidateOrder(data):
            return {'message': 'Invalid data'}, 422

        for x in orders:
            if x['id'] == id:
                # The next few lines are to keep/change the order's DateTime
                # If input is True, then DateTime is updated to now
                # If input is False, then DateTime is left alone
                if data['date'] == True:
                    data['date'] = datetime.now().isoformat()
                else:
                    data['date'] = x['date']
                x.update(data)
                return x, 200
        return {'message': 'Order not found'}, 404
    
    def delete(self, id):
        """
        Delete an order
        ---
        parameters:
          - in: path
            name: id
            type: integer
            required: true
        responses:
          200:
            description: Successfully deleted the order
          404:
            description: Order not found
        """
        for i, x in enumerate(orders):
            if x['id'] == id:
                dOrder = orders.pop(i)
                return dOrder, 200
        return {'message': 'Order not found'}, 404

### REST SERVICES FOR TRANSACTIONS
# Class for functions relating to all transactions (GET, POST)
class TransactionREST(Resource):
    def get(self):
        """
        Get all transactions
        ---
        responses:
          200:
            description: Returns list of transactions
        """
        return transactions, 200    
    
    def post(self):
        """
        Create a new transaction
        ---
        parameters:
            -   in: body
                name: transaction
                required:
                schema:
                    type: object
                    required:
                        - type
                        - product_id
                        - quantity
                    properties:
                        type:
                            type: string
                        product_id:
                            type: integer
                        quantity:
                            type: integer
        responses:
          201:
            description: New product created
          404:
            description: Cannot find product tied to product_id
          422:
            description: Invalid data (quantity must be INT)
        """
        data = request.json
        potentialID = data['product_id']
        
        if ProductIDRest.get(self, potentialID)[1] == 404:
            return {'message': 'Cannot make a transaction for product that does not exist'}, 404

        currentID = transactions[-1]['id'] + 1
        newTransaction = {
            'id': currentID,
            'type': data['type'],
            'product_id': data['product_id'],
            'quantity': data['quantity'], 
            'date': datetime.now().isoformat()
            }
        
        if ValidateTransaction(newTransaction):
            transactions.append(newTransaction)
            return newTransaction, 201
        else: return {'message': 'Unable to parse data'}, 422

# Class for functions related to a single order (GET[id], PUT, DELETE)
class TransactionIDRest(Resource):
    def get(self, id):
        """
        Find a specific transaction based on its ID
        ---
        parameters:
          - in: path
            name: id
            type: integer
            required: true
        responses:
          200:
            description: Returns transaction
          404:
            description: Transaction not found
        """
        for x in transactions:
            if x['id'] == id:
                return x, 200
        return {'message': 'Order not found'}, 404
    
    def put(self, id):
        """
        Update an existing transaction
        ---
        parameters:
          - in: path
            name: id
            type: integer
            required: true
          - in: body
            name: body
            required: true
            schema:
                type: object
                required:
                    - type
                    - product_id
                    - quantity
                    - date
                properties:
                    type:
                        type: string
                    product_id:
                        type: integer
                    quantity:
                        type: integer
                    date:
                        type: boolean
        responses:
          200:
            description: Successfully updated the transaction
          404:
            description: Transaction not found
        """
        data = request.json

        if not ValidateTransaction(data):
            return {'message': 'Invalid data'}, 422

        for x in transactions:
            if x['id'] == id:
                # See Order's PUT function for explanation for these lines
                if data['date'] == True:
                    data['date'] = datetime.now().isoformat()
                else:
                    data['date'] = x['date']
                x.update(data)
                return x, 200
        return {'message': 'Transaction not found'}, 404
    
    def delete(self, id):
        """
        Delete a transaction
        ---
        parameters:
          - in: path
            name: id
            type: integer
            required: true
        responses:
          200:
            description: Successfully deleted the transaction
          404:
            description: Transaction not found
        """
        for i, x in enumerate(transactions):
            if x['id'] == id:
                dTransaction = transactions.pop(i)
                return dTransaction, 200
        return {'message': 'Transaction not found'}, 404

# API routes
api.add_resource(ProductREST, '/products')
api.add_resource(ProductIDRest, '/products/<int:id>')
api.add_resource(OrderREST, '/orders')
api.add_resource(OrderIDRest, '/orders/<int:id>')
api.add_resource(TransactionREST, '/transactions')
api.add_resource(TransactionIDRest, '/transactions/<int:id>')

# Swagger tests are done through /apidocs
if __name__ == '__main__':
    app.run(debug = True)
