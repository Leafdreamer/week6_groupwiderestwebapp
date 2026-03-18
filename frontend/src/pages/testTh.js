export default function testTh() {
  return (
    <div className="min-h-screen bg-blue-50 flex flex-col font-sans">
      {/* Header */}
      <header className="w-full bg-[#3d4451] text-white py-4">
        <div className="max-w-[1280px] mx-auto px-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold italic">StockFlow</h1>
          <span className="text-sm">Du er ikke logget ind</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-[1280px] mx-auto px-6 py-12 flex flex-col items-center">
        
        {/* Logo Placeholder */}
        <div className="w-48 h-48 bg-white rounded-3xl shadow-sm flex items-center justify-center mb-8 border border-gray-100">
          <div className="relative w-32 h-32 border-4 border-blue-900 flex items-center justify-center">
             <span className="absolute transform -rotate-45 text-gray-400 font-bold uppercase tracking-widest">Placeholder</span>
             <div className="w-full h-full border-2 border-blue-900 scale-75"></div>
          </div>
        </div>

        {/* Velkomst Tekst */}
        <div className="text-center mb-12 max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Velkommen til StockFlow's Lagersystem.</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Her kan du se hvilke produkter vi har, samt hvor mange vi har på lager.
          </p>
          <p className="text-gray-600 text-sm mt-2 italic">
            Hvis du har en profil, så kan du også logge ind, hvorefter du så vil kunne se, redigere, oprette og slette, både produkter, ordrer og transaktioner.
          </p>
        </div>

        {/* Login Sektion */}
        <section className="w-full max-w-4xl bg-gray-200 rounded-2xl p-8 mb-10">
           <div className="inline-block bg-gray-300 px-6 py-2 rounded-t-xl font-bold -mt-8 ml-2">
             Login
           </div>
           <form className="flex flex-wrap items-end gap-6 mt-4">
             <div className="flex-grow min-w-[200px]">
               <label className="block text-sm font-medium mb-1">Username:</label>
               <input type="text" className="w-full h-10 rounded-full border-none px-4 shadow-inner" />
             </div>
             <div className="flex-grow min-w-[200px]">
               <label className="block text-sm font-medium mb-1">Password:</label>
               <input type="password" className="w-full h-10 rounded-full border-none px-4 shadow-inner" />
             </div>
             <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-2 rounded-full font-medium transition-colors">
               Log In
             </button>
           </form>
        </section>

        {/* Produkter Sektion */}
        <section className="w-full max-w-4xl bg-gray-200 rounded-2xl p-8">
          <div className="flex justify-between items-start mb-6">
            <div className="bg-gray-300 px-6 py-2 rounded-t-xl font-bold -mt-8 ml-2">
              Produkter
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold italic">▼ Søg efter:</span>
              <input type="text" placeholder="Søg her..." className="rounded-full px-4 py-1 text-sm border-none shadow-inner" />
            </div>
          </div>

          <table className="w-full text-left text-sm border-separate border-spacing-y-2">
            <thead>
              <tr className="font-bold">
                <th className="pb-2">⬍ ID</th>
                <th className="pb-2">⬍ Produkt Navn</th>
                <th className="pb-2">⬍ Kategori</th>
                <th className="pb-2">⬍ Pris</th>
                <th className="pb-2">⬍ På lager</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((item) => (
                <tr key={item} className="text-gray-700">
                  <td>• 213</td>
                  <td>Rød Blyant</td>
                  <td>Kontor artikler</td>
                  <td>20 kr</td>
                  <td>5 stk</td>
                </tr>
              ))}
              <tr>
                <td>• ...</td>
                <td colSpan="4"></td>
              </tr>
            </tbody>
          </table>

          
            {/* <table className="w-full text-left text-sm border-separate border-spacing-0">
              <thead className="pb-2">
                <tr className="font-bold pb-2">
                  <th>⬍ ID</th>
                  <th>⬍ Produkt Navn</th>
                  <th>⬍ Kategori</th>
                  <th>⬍ Pris</th>
                  <th>⬍ På lager</th>
                </tr>
              </thead>
              <tbody className="bg-white rounded-full p-4">
                {[1, 2, 3, 4].map((item) => (
                  <tr key={item} className="text-gray-700">
                    <td>• 213</td>
                    <td>Rød Blyant</td>
                    <td>Kontor artikler</td>
                    <td>20 kr</td>
                    <td>5 stk</td>
                  </tr>
                ))}
                <tr>
                  <td>• ...</td>
                  <td colSpan="4"></td>
                </tr>
              </tbody>
            </table> */}
            
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full bg-[#3d4451] text-white py-4 mt-auto">
        <div className="max-w-[1280px] mx-auto px-6">
          <p className="text-sm font-bold">Potentiel footer</p>
        </div>
      </footer>
    </div>
  );
}