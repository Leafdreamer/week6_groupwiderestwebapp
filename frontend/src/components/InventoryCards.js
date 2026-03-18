export default function InventoryCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-gray-500">Total Products</h3>
        <p className="text-3xl font-bold">120</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-gray-500">Low Stock</h3>
        <p className="text-3xl font-bold text-red-500">8</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-gray-500">Orders Today</h3>
        <p className="text-3xl font-bold">24</p>
      </div>
    </div>
  );
}
