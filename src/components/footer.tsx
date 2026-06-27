export default function Footer() {
  return (
    <footer className="border-t bg-white py-6">
      <div className="mx-auto max-w-7xl px-4 text-center text-sm text-zinc-500">
        &copy; {new Date().getFullYear()} Seapedia. Semua hak dilindungi.
      </div>
    </footer>
  );
}
