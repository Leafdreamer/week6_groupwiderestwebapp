// !!!!!!!!!!!!!
// !!!VIGTIGT!!! Husk at 'npm install lucide-react' inden du 'npm start'
// !!!!!!!!!!!!!

import React, { useState } from 'react';
import { Menu, Package, ClipboardList, History } from 'lucide-react'; // Dette benytter lucide-react

import NavbarTh from "../components/NavbarTh"
import StartTextTh from "../components/StartTextTh"
import LogoTh from "../components/LogoTh"
import LoginTh from "../components/LoginTh"
import FooterTh from "../components/FooterTh"
import ProductsTh from "../components/ProductsTh"

const Thomas = () => {
  const [activeTab, setActiveTab] = useState('Produkter');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = ['Produkter', 'Ordrer', 'Transaktionshistorik'];

  const renderContent = () => {
    switch (activeTab) {
      case 'Produkter':
        return <ProductsTh />;
      case 'Ordrer':
        return <div className="p-8 text-center italic">Her vises igangværende ordrer...</div>;
      case 'Transaktionshistorik':
        return <div className="p-8 text-center italic">Her vises historik over alle salg...</div>;
      default:
        return <ProductsTh />;
    }
  };
  
  return (
    <div className="w-full">
      <NavbarTh />

      {/* Main Content */}
      <main className="flex-grow max-w-[1280px] mx-auto px-6 py-12 flex flex-col items-center bg-[#EFF4FF]">
        
        <LogoTh />

        <StartTextTh />

        <LoginTh />

        {/* Tabel Sektion */}
        <section className="w-full max-w-4xl">

          {/* Burgermenu og søgefelt */}
          <div className="flex justify-between items-bottom">
            <div className="relative">            
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="bg-gray-200 px-6 pt-3 rounded-t-xl font-bold text-2xl flex items-center gap-1"
              >
                <Menu size={24} />
                <h2>{activeTab}</h2>
              </button>

              {isMenuOpen && (
                <div className="absolute top-0 left-0 w-56 bg-white shadow-xl rounded-lg z-10 border border-gray-100 overflow-hidden">
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
            <div className="bg-gray-200 px-6 pt-2 rounded-t-xl flex items-center content-end gap-5">
              <span className="text-sm font-bold italic">▼ Søg efter:</span>
              <input type="text" placeholder="Søg her..." className="max-w-28 rounded-full px-4 py-1 text-sm border-none shadow-inner" />
            </div>
          </div>

          {/* Selve tabellen */}
          <div className="w-full max-w-4xl bg-gray-200 rounded-b-lg p-6 ">
            <div className="bg-white/40 rounded-xl">
              {renderContent()}
            </div>
          </div>
        </section>
      </main>

      <FooterTh />

    </div>
  );
}

export default Thomas;