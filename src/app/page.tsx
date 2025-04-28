import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="w-full bg-white bg-opacity-80 text-black flex justify-center space-x-8 py-4 text-lg font-medium shadow-md">
        <a href="#" className="hover:underline">Home</a>
        <a href="#about" className="hover:underline">About</a>
        <a href="#menu" className="hover:underline">Menu</a>
        <a href="#booking" className="hover:underline">Make a Booking</a>
        <a href="#contact" className="hover:underline">Contact</a>
      </nav>

      {/* Hero Section with Background Image */}
      <section
        className="flex flex-col items-center justify-center text-center text-black p-8 flex-grow bg-cover bg-center"
        style={{ backgroundImage: "url('/uyghur-cuisine.jpg')" }}
      >
        <h1 className="text-5xl font-bold mb-4">Welcome to Turpan Restaurant!</h1>
        <a
          href="#booking"
          className="bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition"
        >
          Make a Reservation
        </a>
      </section>

      {/* Footer */}
      <footer className="w-full bg-black bg-opacity-90 text-white text-center text-sm py-4">
        <p>© 2025 Turpan Restaurant | All rights reserved</p>
        <p>
          <a href="tel:+442076369949" className="hover:underline">Call us: 020 7636 9949</a>
        </p>
      </footer>
    </div>
  );
}
