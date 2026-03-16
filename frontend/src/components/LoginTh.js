export default function LoginTh() {
  return (
    <section className="w-full max-w-4xl">
        <h2 className="inline-block bg-gray-200 px-6 pt-3 rounded-t-xl font-bold text-2xl">
        Login
        </h2>
        <div className=" bg-gray-200 rounded-2xl rounded-tl-none p-8 mb-10">
        <form className="flex flex-wrap items-end gap-6">
            <div className="flex-grow min-w-[200px]">
            <label for="uname" className="block text-sm font-medium mb-1">Username:</label>
            <input id="uname" type="text" className="w-full h-10 rounded-full border-none px-4 shadow-inner" />
            </div>
            <div className="flex-grow min-w-[200px]">
            <label for="password" className="block text-sm font-medium mb-1">Password:</label>
            <input id="password" type="password" className="w-full h-10 rounded-full border-none px-4 shadow-inner" />
            </div>
            <button type="submit" value="Submit" className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-2 rounded-full font-medium transition-colors">
            Log In
            </button>
        </form>
        </div>
    </section>
  );
}
