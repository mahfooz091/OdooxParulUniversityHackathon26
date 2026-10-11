export default function Footer() {
  return (
    <footer className="hidden lg:block text-center text-xs text-muted py-6">
      © {new Date().getFullYear()} Colombiator — Collaborative Travel & Itineraries
    </footer>
  );
}
