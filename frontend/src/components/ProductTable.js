import { useState } from "react";

export default function ProductTable() {
  const [search, setSearch] = useState("");

  const products = [
    {
      id: 1,
      name: "Laptop",
      category: "Electronics",
      quantity: 10,
      price: 1200,
    },
    { id: 2, name: "Phone", category: "Electronics", quantity: 25, price: 800 },
    {
      id: 3,
      name: "Headphones",
      category: "Accessories",
      quantity: 40,
      price: 150,
    },
  ];

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search product..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 p-2 border rounded w-full"
      />

      <table className="w-full bg-white shadow rounded">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3">Name</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>

        <tbody>
          {filteredProducts.map((p) => (
            <tr key={p.id} className="border-t">
              <td className="p-3">{p.name}</td>
              <td>{p.category}</td>
              <td>{p.quantity}</td>
              <td>${p.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
