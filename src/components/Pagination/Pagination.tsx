export default function Pagination () {

  return (
    <div className="flex flex-col gap-6 p-6">

      {/* Pagination */}
      <div className="mt-6 flex justify-center">
        <nav className="inline-flex items-center space-x-1 text-sm">
          <button className="px-2 py-1 text-gray-500 hover:text-sky-800">&lt; Previous</button>
          <button className="px-3 py-1 rounded hover:bg-gray-100">1</button>
          <button className="px-3 py-1 rounded bg-primary/50 text-sky-800 font-medium shadow">2</button>
          <button className="px-3 py-1 rounded hover:bg-gray-100">3</button>
          <span className="px-2 py-1">...</span>
          <button className="px-2 py-1 text-gray-500 hover:text-sky-800">Next &gt;</button>
        </nav>
      </div>
    </div>
  );
}
