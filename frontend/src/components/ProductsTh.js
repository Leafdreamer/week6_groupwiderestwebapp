export default function ProductsTh() {
  return (
    <div className="overflow-x-auto">
        <table className="w-full text-left text-sm border-separate border-spacing-y-2 px-4">
        <thead>
            <tr className="text-gray-500 uppercase text-[10px] tracking-widest">
            <th className="p-3">⬍ ID</th>
            <th className="p-3">⬍ Produkt Navn</th>
            <th className="p-3 text-center">⬍ Kategori</th>
            <th className="p-3 text-right">⬍ Pris</th>
            <th className="p-3 text-right">⬍ På lager</th>
            </tr>
        </thead>
        <tbody className="bg-white/80">
            {[1, 2, 3, 4, 5].map((i) => (
            <tr key={i} className="hover:bg-blue-50 transition-colors">
                <td className="p-3 rounded-l-lg">• 21{i}</td>
                <td className="p-3 font-medium text-gray-800">Rød Blyant</td>
                <td className="p-3 text-center text-gray-500">Kontor artikler</td>
                <td className="p-3 text-right font-bold">20 kr</td>
                <td className="p-3 text-right rounded-r-lg">5 stk</td>
            </tr>
            ))}
        </tbody>
        </table>
    </div>
  );
}
