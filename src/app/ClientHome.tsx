"use client";
import Image from "next/image";
import Head from "next/head";
import React, { useEffect, useState } from 'react';
import { fetchGoogleReviews } from './utils/googlereviews';
import GoogleReviewsSlider from "./components/googlereviewsslider";
import { Playfair_Display } from "next/font/google";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { Star, Users, Globe } from 'lucide-react'

const useScrollAnimation = () => {
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [homeAnimated, setHomeAnimated] = useState(false);

  useEffect(() => {
    const homeTimer = setTimeout(() => {
      setHomeAnimated(true);
    }, 500); 

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    const sections = document.querySelectorAll('[data-animate]');
    sections.forEach(section => observer.observe(section));

    return () => {
      observer.disconnect();
      clearTimeout(homeTimer);
    };
  }, []);

  return { visibleSections, homeAnimated };
};

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: '700', 
});

interface GoogleReview {
  author_name: string;
  rating: number;
  text: string;
  time: number;
  profile_photo_url?: string;
}

export const metadata = {
  title: 'Turpan Uyghur Restaurant',
  description: 'Authentic Uyghur cuisine bringing the flavors of Central Asia to London',
  };

export default function Home() {
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [activeTab, setActiveTab] = useState('starters');
  const [isTabChanging, setIsTabChanging] = useState(false);
  const { visibleSections, homeAnimated } = useScrollAnimation();

  useEffect(() => {
    const getReviews = async () => {
      try {
        const reviewsData = await fetchGoogleReviews();
        setReviews(reviewsData);
      } catch {
        console.error('Failed to fetch reviews');
      }
    };

    getReviews();
  }, []);

  const handleTabChange = (newTab: string) => {
        if (newTab !== activeTab) {
          setIsTabChanging(true);
          
          setTimeout(() => {
            setActiveTab(newTab);
            setIsTabChanging(false);
          }, 150);
        }
      };

  const menuItems = {
    starters: [
      { name: "Samsa" },
      { name: "Uyghur Salad" },
      { name: "Lighildaq" },
      { name: "Kala Til Salad" },
      { name: "Pak Choy Salad" },
      { name: "Chicken Wings" }
    ],
    mains: [
      { name: "Leghmen" },
      { name: "Polu" },
      { name: "Marjan Chop" },
      { name: "Tohu Qordaq (Big Plate Chicken)" },
      { name: "Manta" },
      { name: "Qoruma Chop" },
      { name: "Goshnan" },
      { name: "Lazaji" },
      { name: "Tohu Meghiz" },
      { name: "Tufu" },
      { name: "Pidigen & Much" },
      { name: "Pachaq" },
      { name: "Tugre" },
      { name: "Beliq Shorpa" }
    ],
    sides: [
      { name: "Uyghur Kawap" },
      { name: "Chochure" }
    ],
    drinks: [
      { name: "Uyghur Herbal Tea Pot" },
      { name: "Honey Cake" },
      { name: "Baklava" },
      { name: "Rice Pudding" }
    ]
  };

  const tabs = [
    { id: 'starters', name: 'Starters', icon: '🥟' },
    { id: 'mains', name: 'Main Dishes', icon: '🍜' },
    { id: 'sides', name: 'Soups and Sides', icon: '🥗' },
    { id: 'drinks', name: 'Drinks and Deserts', icon: '🫖' }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="w-full overflow-x-hidden">
      {/* Fixed Navbar */}
      <nav className="fixed top-0 w-full bg-white bg-opacity-95 text-black flex justify-center py-4 text-lg font-medium shadow-md z-50 backdrop-blur-sm px-4">
        <div className="flex flex-wrap justify-center space-x-4 sm:space-x-8 max-w-full">
          <button onClick={() => scrollToSection('home')} className="hover:underline whitespace-nowrap text-sm sm:text-lg">Home</button>
          <button onClick={() => scrollToSection('about')} className="hover:underline whitespace-nowrap text-sm sm:text-lg">About</button>
          <button onClick={() => scrollToSection('reviews')} className="hover:underline whitespace-nowrap text-sm sm:text-lg">Reviews</button>
          <button onClick={() => scrollToSection('gallery')} className="hover:underline whitespace-nowrap text-sm sm:text-lg">Gallery</button>
          <button onClick={() => scrollToSection('contact')} className="hover:underline whitespace-nowrap text-sm sm:text-lg">Contact</button>
        </div>
      </nav>

      {/* HOME SECTION - Landing */}
      <section
        id="home"
        className="relative flex flex-col items-center justify-center text-center text-black p-8 min-h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/landingpage.jpg')" }}
      >
        <h1 className={`${playfair.className} text-white text-4xl sm:text-5xl md:text-7xl font-bold mb-8 drop-shadow-xl px-4 text-center ${
          homeAnimated ? 'home-title-enter' : 'opacity-0'
        }`}>
          Journey Through Taste
        </h1>

        <div className={`mt-8 px-4 flex flex-col sm:flex-row gap-4 ${homeAnimated ? 'home-button-enter' : 'opacity-0'}`}>
          <a
            href="/booking"
            className="inline-block bg-red-600 text-white px-6 sm:px-12 py-3 sm:py-4 rounded-lg font-bold text-lg sm:text-xl hover:bg-red-700 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105 border-2 border-red-600 hover:border-red-700"
          >
            Book a Table
          </a>
          <a
            href="/menu.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-red-600 px-6 sm:px-12 py-3 sm:py-4 rounded-lg font-bold text-lg sm:text-xl hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105 border-2 border-white hover:border-gray-100"
          >
            View Menu
          </a>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Hero Part */}
          <div 
            className={`text-center mb-16 fade-in-up ${visibleSections.has('about-hero') ? 'visible' : ''}`}
            data-animate
            id="about-hero"
          >
            <h1 className={`${playfair.className} text-3xl sm:text-5xl md:text-6xl font-bold mb-6 text-black text-center`}>Our Story</h1>
            <p className="text-lg sm:text-xl max-w-2xl mx-auto text-gray-700 px-4">Authentic Uyghur cuisine bringing the flavors of Central Asia to London</p>
          </div>

          {/* Story Section */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div 
              className={`fade-in-left ${visibleSections.has('about-story') ? 'visible' : ''}`}
              data-animate
              id="about-story"
            >
              <h2 className={`${playfair.className} text-2xl sm:text-4xl font-bold text-black mb-6`}>A Family Tradition</h2>
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
                  Our commitment goes beyond just serving food – we are preserving a cultural legacy and 
                  creating a bridge between East and West, one meal at a time.
                </p>
              </div>
            </div>
            <div 
              className={`relative fade-in-right ${visibleSections.has('about-image') ? 'visible' : ''}`}
              data-animate
              id="about-image"
            >
              <Image
                src="/uyghur-family.jpg"
                alt="The Turpan Restaurant family"
                width={500}
                height={400}
                className="rounded-lg shadow-lg object-cover"
              />
            </div>
          </div>

          {/* Cuisine Section */}
          <div className="py-16 px-4 bg-gray-50 rounded-xl mb-16">
            <h2 className={`${playfair.className} text-4xl font-bold text-center text-black mb-12`}>Our Cuisine</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Card 1 - Hand-Pulled Noodles */}
              <div 
                className={`text-center scale-in stagger-delay-1 ${visibleSections.has('cuisine-cards') ? 'visible' : ''}`}
                data-animate
                id="cuisine-cards"
              >
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

              {/* Card 2 - Tandoor Breads */}
              <div 
                className={`text-center scale-in stagger-delay-2 ${visibleSections.has('cuisine-cards') ? 'visible' : ''}`}
                data-animate
              >
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

              {/* Card 3 - Aromatic Spices */}
              <div 
                className={`text-center scale-in stagger-delay-3 ${visibleSections.has('cuisine-cards') ? 'visible' : ''}`}
                data-animate
              >
                <div className="mb-6">
                  <Image
                    src="/spices.jpg"
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

          {/* Values Section */}
          <div className="text-center">
            <h2 className={`${playfair.className} text-4xl font-bold text-black mb-12`}>Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="flex justify-center mb-4">
                  <Star className="w-12 h-12 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-black">Authenticity</h3>
                <p className="text-gray-700">
                  Every recipe is prepared using traditional methods and authentic ingredients 
                  sourced from trusted suppliers.
                </p>
              </div>
              <div>
                <div className="flex justify-center mb-4">
                  <Users className="w-12 h-12 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-black">Family</h3>
                <p className="text-gray-700">
                  We treat every guest as part of our extended family, providing warm hospitality 
                  and genuine care in every interaction.
                </p>
              </div>
              <div>
                <div className="flex justify-center mb-4">
                  <Globe className="w-12 h-12 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-black">Cultural Bridge</h3>
                <p className="text-gray-700">
                  We are proud to share Uyghur culture and cuisine, fostering understanding 
                  and appreciation through food.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS SECTION */}
        <section id="reviews" className="py-20 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 
              className={`${playfair.className} text-4xl font-bold text-center mb-12 text-black fade-in-up ${visibleSections.has('reviews-header') ? 'visible' : ''}`}
              data-animate
              id="reviews-header"
            >
              What Our Customers Say
            </h2>

            {/* Trust Badges - Platform Ratings */}
            <div 
              className={`flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 mb-12 fade-in-up stagger-delay-1 ${visibleSections.has('reviews-badges') ? 'visible' : ''}`}
              data-animate
              id="reviews-badges"
            >
              <div className="flex items-center space-x-2">
                <Image
                  src="/google-logo.svg" 
                  alt="Google"
                  width={32} 
                  height={32}
                />
                <div className="flex text-yellow-500 text-sm">
                  <FontAwesomeIcon icon={solidStar} />
                  <FontAwesomeIcon icon={solidStar} />
                  <FontAwesomeIcon icon={solidStar} />
                  <FontAwesomeIcon icon={solidStar} />
                  <FontAwesomeIcon icon={faStarHalfAlt} />
                </div>
                <span className="text-sm text-gray-600">4.6/5</span>
              </div>

              <div className="flex items-center space-x-2">
                <Image
                  src="/tripadvisor-logo.svg" 
                  alt="Tripadvisor"
                  width={32} 
                  height={32}
                />
                <div className="flex text-yellow-500 text-sm">
                  <FontAwesomeIcon icon={solidStar} />
                  <FontAwesomeIcon icon={solidStar} />
                  <FontAwesomeIcon icon={solidStar} />
                  <FontAwesomeIcon icon={solidStar} />
                  <FontAwesomeIcon icon={faStarHalfAlt} />
                </div>
                <span className="text-sm text-gray-600">4.6/5</span>
              </div>

              <div className="flex items-center space-x-2">
                <Image
                  src="/feedthelion-logo.png" 
                  alt="Feed the Lion"
                  width={32} 
                  height={32}
                />
                <div className="flex text-yellow-500 text-sm">
                  <FontAwesomeIcon icon={solidStar} />
                  <FontAwesomeIcon icon={solidStar} />
                  <FontAwesomeIcon icon={solidStar} />
                  <FontAwesomeIcon icon={solidStar} />
                  <FontAwesomeIcon icon={faStarHalfAlt} />
                </div>
                <span className="text-sm text-gray-600">4.5/5</span>
              </div>
            </div>
            
            {/* Google Reviews Slider Component */}
            <div 
              className={`mb-12 fade-in-up stagger-delay-2 ${visibleSections.has('reviews-slider') ? 'visible' : ''}`}
              data-animate
              id="reviews-slider"
            >
              <GoogleReviewsSlider reviews={reviews}/>
            </div>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section id="gallery" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div 
            className={`text-center mb-16 fade-in-up ${visibleSections.has('gallery-header') ? 'visible' : ''}`}
            data-animate
            id="gallery-header"
          >
            <h1 className={`${playfair.className} text-3xl sm:text-5xl md:text-6xl font-bold mb-4 text-black`}>Gallery</h1>
          </div>
          
          {/* Tab Navigation */}
          <div 
            className={`flex justify-center mb-12 px-4 fade-in-up stagger-delay-1 ${visibleSections.has('gallery-tabs') ? 'visible' : ''}`}
            data-animate
            id="gallery-tabs"
          >
            <div className="flex flex-wrap bg-gray-100 rounded-lg p-1 shadow-lg justify-center gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`px-3 sm:px-6 py-2 sm:py-3 rounded-md font-semibold transition-all duration-300 flex items-center space-x-1 sm:space-x-2 text-sm sm:text-base ${
                    activeTab === tab.id
                      ? 'bg-white text-black shadow-md'
                      : 'text-gray-600 hover:text-black'
                  }`}
                >
                  <span className="text-lg sm:text-xl">{tab.icon}</span>
                  <span className="hidden sm:inline">{tab.name}</span>
                  <span className="sm:hidden">{tab.name.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Gallery Items */}
          <div className={`grid gap-6 lg:grid-cols-3 xl:grid-cols-4 mb-16 menu-items-container ${
            isTabChanging ? 'menu-items-fade-out' : 'menu-items-fade-in'
          }`}>
            {menuItems[activeTab as keyof typeof menuItems].map((item, index) => (
              <div
                key={`${activeTab}-${index}`} 
                className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 relative menu-item-card"
                style={{ 
                  opacity: isTabChanging ? 0 : 1,
                  animationDelay: isTabChanging ? '0s' : `${index * 0.1}s`
                }}
              >
                <div className="w-full h-64 bg-gray-100 overflow-hidden">
                  <Image 
                    src={`/dishes/${item.name.toLowerCase().replace(/\s+/g, '-')}.jpg`} 
                    alt={item.name}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="relative py-16 px-4 text-center min-h-[300px] flex items-center justify-center">
            <div className="absolute inset-0 z-0 overflow-hidden">
              <Image
                src="/assortment.jpg"
                alt="Restaurant food background"
                fill
                className="object-cover"
                quality={80}
                priority
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-opacity-30"></div>
            </div>
            
            <div className="relative z-20 max-w-2xl mx-auto">
              <h3 className={`${playfair.className} text-2xl sm:text-4xl font-bold text-white mb-4 drop-shadow-lg px-4 text-center`}>
                Ready to Order?
              </h3>
              <p className="text-white mb-6 text-xl font-medium drop-shadow-lg">
                Visit us today or call to make a reservation
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 px-4">
                <button
                  onClick={() => scrollToSection('contact')}
                  className="bg-red-600 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-300 shadow-xl text-lg"
                >
                  Contact Us
                </button>
                <a
                  href="/booking"
                  className="border-2 border-red-600 bg-red-600/90 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-red-600 transition-colors duration-300 shadow-xl text-lg text-center"
                >
                  Book a Table
                </a>
              </div>
            </div>
          </div>

          {/* Special Notes */}
          <div className="bg-gray-50 rounded-lg p-8 mb-12">
            <h3 className={`${playfair.className} text-2xl font-bold text-center text-black mb-6`}>
              Please Note
            </h3>
            <div className="grid md:grid-cols-2 gap-6 text-gray-700">
              <div>
                <h4 className="font-semibold mb-2 text-black">🤧 Allergy Warnings</h4>
                <p>Some of our dishes contain dairy, nuts, eggs and other allergens. If you have any food allergies, please be sure to inform us before placing your order. We will do our best to accommodate to your needs.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-black">🌶️ Spice Levels</h4>
                <p>All spicy dishes can be adjusted to your preference. Please inform our staff of your spice tolerance.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-black">🥬 Dietary Requirements</h4>
                <p>We can accommodate vegetarian, vegan, and gluten-free requests. Please speak with our staff.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-black">👨‍🍳 Fresh Preparation</h4>
                <p>All our dishes are made fresh to order. Hand-pulled noodles may take extra time but are worth the wait!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section 
        id="contact" 
        className="relative py-20 px-4 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/interior1.jpg')" }}
      >
        <div 
          className={`relative max-w-4xl mx-auto text-center z-10 fade-in-up ${visibleSections.has('contact-content') ? 'visible' : ''}`}
          data-animate
          id="contact-content"
        >
          <h2 className={`${playfair.className} text-2xl sm:text-4xl font-bold text-white mb-8 drop-shadow-md text-center px-4`}>Visit Us</h2>
          <p className="text-lg sm:text-xl text-white mb-8 drop-shadow-md px-4">
            Located in the heart of London, we welcome you to experience the warmth of Uyghur hospitality 
            and the authentic flavors of Central Asia.
          </p>
          
          <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-6 text-gray-800">Opening Hours & Contact</h3>
            <div className="grid sm:grid-cols-2 gap-6 text-gray-700 text-base sm:text-lg">
              <div>
                <p className="mb-2"><strong>Everyday:</strong> 12:00 PM - 9:00 PM</p>
                <p className="mb-2"><strong>Address:</strong> 108 Great Russell St, London WC1B 3NA</p>
                <a 
                  href="https://maps.google.com/?q=108+Great+Russell+St,+London+WC1B+3NA" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                >
                  Get Directions
                </a>
              </div>
              <div>
                <p className="mb-2"><strong>Phone:</strong> <a href="tel:+442076369949" className="text-red-600 hover:underline">020 7636 9949</a></p>
                <p className="mb-2"><strong>Email:</strong> <a href="mailto:info@turpanuyghur.com" className="text-red-600 hover:underline">info@turpanuyghur.com</a></p>
                <p className="mb-2">
                  <strong>Instagram:</strong> 
                  <a href="https://instagram.com/turpanuyghur" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline ml-1">
                    @turpanuyghur
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-white text-black text-center text-sm py-6 border-t">
        <p className="mb-2">© 2025 Turpan Restaurant | All rights reserved</p>
        <p>
          <a href="tel:+442076369949" className="hover:underline text-red-600">Call us: 020 7636 9949</a>
        </p>
      </footer>
      </div>
    </div>
  );
}