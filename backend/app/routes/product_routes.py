from fastapi import APIRouter
from app.database.database import get_connection

router = APIRouter(prefix="/products")

@router.get("/")
def get_products():

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM products")

    products = cursor.fetchall()

    return [dict(p) for p in products]


@router.post("/")
def add_product(product: dict):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        "INSERT INTO products (name, category, price, quantity) VALUES (?, ?, ?, ?)",
        (
            product["name"],
            product["category"],
            product["price"],
            product["quantity"],
        ),
    )

    conn.commit()

    return {"message": "product added"}