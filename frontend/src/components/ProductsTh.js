import { useEffect, useState } from "react";

export default function InventoryCards() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="overflow-x-auto">
        <table className="w-full text-left text-sm border-separate border-spacing-y-2 px-4">
        <thead>
            <tr className="text-gray-500 uppercase text-[10px] tracking-widest">
            <th className="p-3">ID</th>
            <th className="p-3">Produkt Navn</th>
            <th className="p-3 text-center">Kategori</th>
            <th className="p-3 text-right">Pris</th>
            <th className="p-3 text-right">På lager</th>
            </tr>
        </thead>
        <tbody className="bg-white/80">
            {items.map((item) => (
            <tr key={item.id} className="hover:bg-blue-50 transition-colors">
                <td className="p-3 rounded-l-lg">• {item.id}</td>
                <td className="p-3 font-medium text-gray-800">{item.name}</td>
                <td className="p-3 text-center text-gray-500">{item.category}</td>
                <td className="p-3 text-right font-bold">${item.price}</td>
                <td className="p-3 text-right rounded-r-lg">{item.quantity}</td>
            </tr>
            ))}
        </tbody>
        </table>
    </div>
  );
}
