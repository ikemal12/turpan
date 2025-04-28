import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";

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

        {/* Landing Section */}
        <section
          className="relative flex flex-col items-center justify-center text-center text-black p-8 min-h-screen bg-cover bg-center"
          style={{ backgroundImage: "url('/uyghur-cuisine.jpg')" }}
        >
          <h1 className="text-5xl font-bold mb-4">Welcome to Turpan Restaurant!</h1>
          
        </section>
        <a
            href="#booking"
            className="bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition"
          >
            Make a Reservation
        </a>
        {/* Ratings Section */}
        <section className="flex justify-center items-center bg-white py-16 px-4">
          <div className="border-4 border-gray-200 p-4 rounded-lg shadow-md max-w-4xl w-full">
            <Image
              src="/feedthelion.jpg" 
              alt="Good ratings from bloggers and platforms"
              width={1200} 
              height={600}
              className="rounded-md object-contain"
            />
          </div>
        </section>
        <section className="flex flex-col items-center justify-center bg- py-16 px-4">

  <div className="flex flex-wrap justify-center gap-8">
    
    {/* Feed the Lion */}
    <div className="text-center">
      <p className="text-xl font-semibold mb-2">Feed the Lion</p>
      <div className="flex justify-center text-yellow-500 text-2xl mb-1">
        <FontAwesomeIcon icon={solidStar} />
        <FontAwesomeIcon icon={solidStar} />
        <FontAwesomeIcon icon={solidStar} />
        <FontAwesomeIcon icon={solidStar} />
        <FontAwesomeIcon icon={faStarHalfAlt} />
      </div>
      <p className="text-gray-600">4.5/5</p>
    </div>

    {/* Google */}
    <div className="text-center">
      <p className="text-xl font-semibold mb-2">Google</p>
      <div className="flex justify-center text-yellow-500 text-2xl mb-1">
        <FontAwesomeIcon icon={solidStar} />
        <FontAwesomeIcon icon={solidStar} />
        <FontAwesomeIcon icon={solidStar} />
        <FontAwesomeIcon icon={solidStar} />
        <FontAwesomeIcon icon={faStarHalfAlt} />
      </div>
      <p className="text-gray-600">4.6/5</p>
    </div>

    {/* TripAdvisor */}
    <div className="text-center">
      <p className="text-xl font-semibold mb-2">TripAdvisor</p>
      <div className="flex justify-center text-yellow-500 text-2xl mb-1">
        <FontAwesomeIcon icon={solidStar} />
        <FontAwesomeIcon icon={solidStar} />
        <FontAwesomeIcon icon={solidStar} />
        <FontAwesomeIcon icon={solidStar} />
        <FontAwesomeIcon icon={faStarHalfAlt} />
      </div>
      <p className="text-gray-600">4.6/5</p>
    </div>

  </div>
</section>
        {/* Footer */}
        <footer className="w-full bg-white bg-opacity-90 text-black text-center text-sm py-4">
          <p>© 2025 Turpan Restaurant | All rights reserved</p>
          <p>
            <a href="tel:+442076369949" className="hover:underline">Call us: 020 7636 9949</a>
          </p>
        </footer>
      </div>
    );
  }
