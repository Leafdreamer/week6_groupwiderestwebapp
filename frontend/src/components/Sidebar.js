export default function Sidebar() {
  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen p-6 mt-9">
      <h2 className="text-2xl font-bold mb-8 mt-10">StockFlow</h2>

      <ul className="space-y-4">
        <li className="hover:text-gray-300 cursor-pointer">Dashboard</li>

        <li className="hover:text-gray-300 cursor-pointer">Products</li>

        <li className="hover:text-gray-300 cursor-pointer">Orders</li>

        <li className="hover:text-gray-300 cursor-pointer">Transactions</li>

        <li className="hover:text-gray-300 cursor-pointer">Users</li>
      </ul>
    </div>
  );
}
