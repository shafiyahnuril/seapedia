export default function Navbar() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <span className="text-xl font-bold text-teal-600">Seapedia</span>
        <nav className="flex gap-4 text-sm font-medium">
          <a href="/" className="hover:text-teal-600">Beranda</a>
          <a href="/login" className="hover:text-teal-600">Masuk</a>
          <a href="/register" className="hover:text-teal-600">Daftar</a>
        </nav>
      </div>
    </header>
  );
}
