import React, { useState } from 'react';
import { Menu, Package, ClipboardList, History, Search } from 'lucide-react'; // Husk: npm install lucide-react

const testTh2 = () => {
  const [activeTab, setActiveTab] = useState('Produkter');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = ['Produkter', 'Ordrer', 'Transaktionshistorik'];

  const renderContent = () => {
    switch (activeTab) {
      case 'Produkter':
        return <ProductTable />;
      case 'Ordrer':
        return <div className="p-8 text-center italic">Her vises igangværende ordrer...</div>;
      case 'Transaktionshistorik':
        return <div className="p-8 text-center italic">Her vises historik over alle salg...</div>;
      default:
        return <ProductTable />;
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col font-sans">
      {/* Header (Width 100%, Content 1280px) */}
      <header className="w-full bg-[#3d4451] text-white py-4">
        <div className="max-w-[1280px] mx-auto px-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold italic tracking-tight">StockFlow</h1>
          <span className="text-xs md:text-sm opacity-80 text-right">Du er ikke logget ind</span>
        </div>
      </header>

      <main className="flex-grow max-w-[1280px] mx-auto px-4 md:px-6 py-12 flex flex-col items-center w-full">
        
        {/* Logo & Velkomst (Samme som før) */}
        <div className="w-40 h-40 md:w-48 md:h-48 bg-white rounded-3xl shadow-sm flex items-center justify-center mb-8 border border-gray-100">
           <div className="relative w-24 h-24 md:w-32 md:h-32 border-4 border-blue-900 flex items-center justify-center">
             <span className="absolute transform -rotate-45 text-gray-300 font-bold uppercase text-[10px] md:text-xs">Placeholder</span>
             <div className="w-full h-full border-2 border-blue-900 scale-75 opacity-20"></div>
          </div>
        </div>

        <div className="text-center mb-12 max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Velkommen til StockFlow's Lagersystem.</h2>
          <p className="text-gray-600 text-sm leading-relaxed px-4">
            Her kan du se hvilke produkter vi har, samt hvor mange vi har på lager.
          </p>
        </div>

        {/* Login Sektion (Responsive) */}
        <section className="w-full max-w-4xl bg-gray-200 rounded-2xl p-6 md:p-8 mb-10 relative">
           <div className="absolute -top-5 left-6 bg-gray-300 px-6 py-2 rounded-t-xl font-bold text-sm">
             Login
           </div>
           <form className="flex flex-col md:flex-row items-stretch md:items-end gap-4 mt-4">
             <div className="flex-grow">
               <label className="block text-xs font-bold mb-1 uppercase text-gray-600">Username:</label>
               <input type="text" className="w-full h-10 rounded-full border-none px-4 shadow-inner focus:ring-2 focus:ring-blue-400 outline-none" />
             </div>
             <div className="flex-grow">
               <label className="block text-xs font-bold mb-1 uppercase text-gray-600">Password:</label>
               <input type="password" className="w-full h-10 rounded-full border-none px-4 shadow-inner focus:ring-2 focus:ring-blue-400 outline-none" />
             </div>
             <button className="bg-[#5c7cfa] hover:bg-blue-600 text-white px-8 py-2 rounded-full font-bold transition-all shadow-md active:scale-95">
               Log In
             </button>
           </form>
        </section>




        {/* Dynamisk Sektion med Burgermenu */}
        <section className="w-full max-w-4xl bg-gray-200 rounded-2xl p-6 md:p-8 relative">
          <div>

            {/* <h2 className="bg-gray-200 px-6 pt-2 rounded-t-xl font-bold text-2xl">
              Produkter
            </h2> */}


            {/* Menu Tab / Burger Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <div className="relative">
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="bg-gray-300 px-6 py-2 rounded-t-xl font-bold -mt-11 md:-mt-13 flex items-center gap-2 hover:bg-gray-400 transition-colors"
                >
                  <Menu size={18} />
                  {activeTab}
                </button>

                {/* Dropdown Menu */}
                {isMenuOpen && (
                  <div className="absolute top-0 left-0 w-56 bg-white shadow-xl rounded-lg mt-1 z-10 border border-gray-100 overflow-hidden">
                    {menuItems.map((item) => (
                      <button
                        key={item}
                        onClick={() => { setActiveTab(item); setIsMenuOpen(false); }}
                        className={`w-full text-left px-4 py-3 text-sm hover:bg-blue-50 flex items-center gap-3 ${activeTab === item ? 'bg-blue-100 font-bold text-blue-700' : 'text-gray-700'}`}
                      >
                        {item === 'Produkter' && <Package size={16} />}
                        {item === 'Ordrer' && <ClipboardList size={16} />}
                        {item === 'Transaktionshistorik' && <History size={16} />}
                        {item}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Søgefelt (Responsive) */}
              <div className="flex items-center gap-2 w-full md:w-auto bg-white/50 rounded-full px-3 py-1 shadow-inner">
                <Search size={14} className="text-gray-500" />
                <span className="text-[10px] font-bold italic whitespace-nowrap">Søg efter:</span>
                <input type="text" placeholder="Søg her..." className="bg-transparent border-none text-sm focus:ring-0 w-full" />
              </div>
            </div>

            {/* Dynamisk Indhold */}
            <div className="bg-white/40 rounded-xl overflow-hidden shadow-inner">
              {renderContent()}
            </div>
          </div>
        </section>



        
      </main>

      <footer className="w-full bg-[#3d4451] text-white py-4 mt-auto">
        <div className="max-w-[1280px] mx-auto px-6">
          <p className="text-sm font-bold opacity-70">Potentiel footer</p>
        </div>
      </footer>
    </div>
  );
};

// Tabel Komponent (udskilt for renhed)
const ProductTable = () => (
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

export default testTh2;
