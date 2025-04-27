import Image from "next/image";

export default function Home() {
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/homepage.jpg')" }}>
      {/* Welcome Section */}
      <section className="absolute text-center text-white p-8 bg-black bg-opacity-50 rounded-lg">
        <h1 className="text-5xl font-bold mb-4">Welcome to Turpan Restaurant!</h1>
        <a
          href="#reservation"
          className="bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition"
        >
          Make a Reservation
        </a>
      </section>

      {/* Footer Section */}
      <footer className="absolute bottom-4 text-sm text-white w-full text-center">
        <p>© 2025 Turpan Restaurant | All rights reserved</p>
        <p>
          <a href="tel:+442076369949" className="hover:underline">Call us: 020 7636 9949</a>
        </p>
      </footer>
    </div>
  );
}
