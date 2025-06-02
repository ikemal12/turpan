"use client";
import Image from "next/image";
import React from 'react';
import { playfair } from '../layout';

export default function About() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="w-full bg-white bg-opacity-80 text-black flex justify-center space-x-8 py-4 text-lg font-medium shadow-md">
        <a href="/" className="hover:underline">Home</a>
        <a href="/about" className="hover:underline font-bold">About</a>
        <a href="#menu" className="hover:underline">Menu</a>
        <a href="#booking" className="hover:underline">Make a Booking</a>
        <a href="#contact" className="hover:underline">Contact</a>
      </nav>

      {/* Hero Section */}
      <section
        className="relative flex flex-col items-center justify-center text-center text-white p-8 h-96 bg-cover bg-center"
        style={{ backgroundImage: "url('/restaurant-interior.jpg')" }}
      >
        <div className="bg-black bg-opacity-50 p-8 rounded-lg">
          <h1 className={`${playfair.className} text-5xl md:text-6xl font-bold mb-4`}>Our Story</h1>
          <p className="text-xl max-w-2xl">Authentic Uyghur cuisine bringing the flavors of Central Asia to London</p>
        </div>
      </section>

      {/* Main Content */}
      <div className="flex-1 bg-white">
        {/* Story Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className={`${playfair.className} text-4xl font-bold text-black mb-6`}>A Family Tradition</h2>
                <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                  <p>
                    Welcome to Turpan Restaurant, where we bring the rich culinary heritage of the Uyghur people 
                    to the heart of London. Our family has been preserving these traditional recipes for generations, 
                    passed down through our ancestors from the ancient Silk Road city of Turpan.
                  </p>
                  <p>
                    Founded with love and dedication to authentic flavors, we specialize in hand-pulled noodles, 
                    perfectly spiced lamb dishes, and traditional breads baked in our tandoor oven. Every dish 
                    tells a story of our homeland and the journey that brought us to share our culture with you.
                  </p>
                  <p>
                    Our commitment goes beyond just serving food – we're preserving a cultural legacy and 
                    creating a bridge between East and West, one meal at a time.
                  </p>
                </div>
              </div>
              <div className="relative">
                <Image
                  src="/uyghur-family.jpg"
                  alt="The Turpan Restaurant family"
                  width={500}
                  height={400}
                  className="rounded-lg shadow-lg object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Cuisine Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className={`${playfair.className} text-4xl font-bold text-center text-black mb-12`}>Our Cuisine</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="mb-6">
                  <Image
                    src="/leghmen.jpg"
                    alt="Hand-pulled noodles"
                    width={300}
                    height={200}
                    className="rounded-lg mx-auto object-cover"
                  />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-black">Hand-Pulled Noodles</h3>
                <p className="text-gray-700">
                  Our signature laghman noodles are hand-pulled fresh daily using traditional techniques 
                  passed down through generations.
                </p>
              </div>
              <div className="text-center">
                <div className="mb-6">
                  <Image
                    src="/naan.jpg"
                    alt="Tandoor bread"
                    width={300}
                    height={200}
                    className="rounded-lg mx-auto object-cover"
                  />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-black">Tandoor Breads</h3>
                <p className="text-gray-700">
                  Fresh naan and traditional Uyghur breads baked to perfection in our authentic tandoor oven, 
                  creating the perfect crispy exterior and soft interior.
                </p>
              </div>
              <div className="text-center">
                <div className="mb-6">
                  <Image
                    src="/spices (2).jpg"
                    alt="Spiced lamb dishes"
                    width={300}
                    height={200}
                    className="rounded-lg mx-auto object-cover"
                  />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-black">Aromatic Spices</h3>
                <p className="text-gray-700">
                  Our dishes feature carefully balanced spice blends from the Silk Road, 
                  creating complex flavors that are both bold and harmonious.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className={`${playfair.className} text-4xl font-bold text-black mb-12`}>Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="text-4xl mb-4">🌟</div>
                <h3 className="text-xl font-semibold mb-3 text-black">Authenticity</h3>
                <p className="text-gray-700">
                  Every recipe is prepared using traditional methods and authentic ingredients 
                  sourced from trusted suppliers.
                </p>
              </div>
              <div>
                <div className="text-4xl mb-4">👨‍👩‍👧‍👦</div>
                <h3 className="text-xl font-semibold mb-3 text-black">Family</h3>
                <p className="text-gray-700">
                  We treat every guest as part of our extended family, providing warm hospitality 
                  and genuine care in every interaction.
                </p>
              </div>
              <div>
                <div className="text-4xl mb-4">🌍</div>
                <h3 className="text-xl font-semibold mb-3 text-black">Cultural Bridge</h3>
                <p className="text-gray-700">
                  We're proud to share Uyghur culture and cuisine, fostering understanding 
                  and appreciation through food.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Location Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className={`${playfair.className} text-4xl font-bold text-black mb-8`}>Visit Us</h2>
            <p className="text-xl text-gray-700 mb-8">
              Located in the heart of London, we welcome you to experience the warmth of Uyghur hospitality 
              and the authentic flavors of Central Asia.
            </p>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4 text-black">Opening Hours</h3>
              <div className="grid md:grid-cols-2 gap-4 text-gray-700">
                <div>
                  <p><strong>Everyday:</strong> 12:00 PM - 9:00 PM</p>
                  <p><strong>Address:</strong> 108 Great Russell St, London WC1B 3NA</p>
                </div>
                <div>
                  <p><strong>Phone:</strong> 020 7636 9949</p>
                  <p><strong>Instagram:</strong> @turpanuyghur</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

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