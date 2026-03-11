from flask import Flask, request
from flask_restful import Api, Resource
from flasgger import Swagger
from models import ValidateProduct

app = Flask(__name__)
api = Api(app)
swagger = Swagger(app)


# Test data before database implementation
# Once we have the database implemented, it can be tied in by replacing this
products = [
    {'id': 1, 'name': 'Test Product', 'category': 'Test', 'quantity': 5, 'price': 5.00}
]

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
        data = request.json

        currentID = products[-1]['id'] + 1
        newProduct = {
            'id': currentID, 
            'name': data['name'], 
            'category': data['category'], 
            'quantity': data['quantity'], 
            'price': data['price']
            }
        
        if ValidateProduct(newProduct):
            products.append(newProduct)
            return newProduct, 201
        else: return {'message': 'Unable to parse data'}, 422
    
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
        for x in products:
            if x['id'] == id:
                return x, 200
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

        for x in products:
            if x['id'] == id:
                x.update(data)
                return x, 200
        return {'message': 'Product not found'}, 404
    
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
        for i, x in enumerate(products):
            if x['id'] == id:
                dProduct = products.pop(i)
                return dProduct, 200
        return {'message': 'Product not found'}, 404

# TO BE IMPLEMENTED:
# Orders and Transactions

# API routes
api.add_resource(ProductREST, '/products')
api.add_resource(ProductIDRest, '/products/<int:id>')

# Swagger tests are done through /apidocs
if __name__ == '__main__':
    app.run(debug = True)
