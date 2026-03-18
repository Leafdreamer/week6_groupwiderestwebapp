import timeit
from datetime import datetime

# Simulated dataset
products = [
    {'id': i, 'name': f'Product{i}', 'category': 'Test', 'quantity': 5, 'price': 5.00}
    for i in range(100000)
]

product_names = {p['name'] for p in products}


# Current implementation (list scan)
def check_duplicate_list(name):
    return any(p['name'] == name for p in products)


# Set implementation
def check_duplicate_set(name):
    return name in product_names


# Benchmark
list_time = timeit.timeit(
    lambda: check_duplicate_list("Product30000"),
    number=10000
)

set_time = timeit.timeit(
    lambda: check_duplicate_set("Product30000"),
    number=10000
)

print("List duplicate check:", list_time)
print("Set duplicate check:", set_time)
print("Speed improvement:", list_time / set_time)