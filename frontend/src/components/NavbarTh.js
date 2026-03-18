export default function NavbarTh() {
  return (
    <header className="w-full bg-[#3B414D] max-h-24 text-white sticky">
      <div className="max-w-[1360px] mx-auto flex justify-between items-center py-4 px-10">
        <p className="font-bold text-5xl">StockFlow</p>
        
        <nav className="flex gap-4">
          <p>Du er ikke logget ind</p>
        </nav>
      </div>
    </header>
  );
}