"use client";
import Image from "next/image";
import React, { useEffect, useState } from 'react';
import { fetchGoogleReviews } from './utils/googlereviews';
import GoogleReviewsSlider from "./components/googlereviewsslider";
import { playfair } from './layout';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { Star, Users, Globe } from 'lucide-react'

export default function Home() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('starters');

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY!;
  const placeId = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID!;

  useEffect(() => {
    const getReviews = async () => {
      const reviewsData = await fetchGoogleReviews(apiKey, placeId);
      setReviews(reviewsData);
    };

    getReviews();
  }, []);

  const menuItems = {
    starters: [
      {
        name: "Samsa",
        description: "Flaky meat pie filled with seasoned minced lamb and onions, baked to perfection",
        price: "£3.50",
        spicy: false,
        popular: true
      },
      {
        name: "Uyghur Salad",
        description: "Beans thread mixed with fresh carrots, peppers, herbs and vinegar dressing",
        price: "£5.95",
        spicy: false,
        popular: false
      },
      {
        name: "Lighildaq",
        description: "Cooked mung beans served with fresh vegetables, chilli sauce and vinegar",
        price: "£6.50",
        spicy: false,
        popular: true
      },
      {
        name: "Kala Til Salad",
        description: "Tender beef tongue spiced with chilli sauce and peppers",
        price: "£10.95",
        spicy: false,
        popular: false
      },
      {
        name: "Pak Choy Salad",
        description: "Fresh pak choy leaves, sesame oil, soy sauce, garlic dressing and a touch of vinegar for a tangy kick",
        price: "£5.95",
        spicy: false,
        popular: false
      }
    ],
    mains: [
      {
        name: "Leghmen",
        description: "Our signature dish - fresh hand-pulled noodles served with diced beef / chicken and mixed vegetables in aromatic broth",
        price: "£14.95",
        spicy: false,
        popular: true
      },
      {
        name: "Polu",
        description: "Traditional pilaf with tender lamb, carrots, and fragrant basmati rice cooked in lamb stock, served with Uyghur salad",
        price: "£14.95",
        spicy: false,
        popular: true
      },
      {
        name: "Marjan Chop",
        description: "Homemade chopped noodles, stir-fried with beef / chicken and vegetables",
        price: "£14.95",
        spicy: false,
        popular: false
      },
      {
        name: "Tohu Qordaq (Big Plate Chicken)",
        description: "Spiced chicken with potatoes and bell peppers, cooked with garlic, ginger, soya sauce and other herbs, served with hand-pulled flat noodles",
        price: "£28.95",
        spicy: true,
        popular: true
      },
      {
        name: "Manta",
        description: "Uyghur manti dumplings, filled with seasoned minced lamb and onions, steamed to juiciness and served with chilli oil",
        price: "£14.95",
        spicy: false,
        popular: true
      },
      {
        name: "Qoruma Chop",
        description: "Dry stir fried homemade noodles and vegetables",
        price: "£14.95",
        spicy: true,
        popular: false
      },
      {
        name: "Goshnan",
        description: "Fried flat bread, stuffed with minced lamb, onions and other fresh vegetables",
        price: "£15.95",
        spicy: false,
        popular: false
      },
      {
        name: "Qerin",
        description: "Stir fried tripe with spices and bell peppers, served with white rice",
        price: "£14.95",
        spicy: false,
        popular: false
      },
      {
        name: "Tohu Meghiz",
        description: "Spicy kung pao style chicken with peanuts, vegetables and chilli peppers, served with rice",
        price: "£13.95",
        spicy: false,
        popular: false
      },
      {
        name: "Tufu",
        description: "Tofu set in a rich, spicy sauce, topped with fresh green onion, served with rice",
        price: "£14.95",
        spicy: false,
        popular: false
      },
      {
        name: "Pidigen & Much",
        description: "Long chopped aubergine cooked with beef / chicken and peppers, served with rice",
        price: "£14.95",
        spicy: false,
        popular: false
      },
      {
        name: "Pachaq",
        description: "Lamb hoof marinated in fresh herbs and stirred with spices and bell pepper",
        price: "£17.95",
        spicy: false,
        popular: false
      },
      {
        name: "Tugre",
        description: "Boiled dumplings filled with minced lamb, onions and herbs, served with a spicy chilli sauce",
        price: "£15.95",
        spicy: false,
        popular: false
      },
      {
        name: "Beliq Shorpa",
        description: "Chopped sea bass boiled with mushroom and herbs, served with rice",
        price: "£16.95",
        spicy: false,
        popular: false
      }
    ],
    sides: [
      {
        name: "Uyghur Kawap",
        description: "Marinated tender lamb skewers grilled to smoky perfection, sprinkled with cumin and spices",
        price: "£3.95",
        spicy: true,
        popular: true
      },
      {
        name: "Borek Kawap",
        description: "Lamb kidney BBQ skewers, marinated with traditional spices and grilled to perfection",
        price: "£3.95",
        spicy: true,
        popular: false
      },
      {
        name: "Ugre",
        description: "Uyghur style handmade noodle soup with beef and fresh herbs",
        price: "£9.95",
        spicy: false,
        popular: true
      },
      {
        name: "Chochure",
        description: "Minced lamb ravioli, served with a rich lamb bone broth",
        price: "£3.50",
        spicy: false,
        popular: false
      },
      {
        name: "Lentil Soup",
        description: "Homemade red lentil served with garlic bread",
        price: "£2.50",
        spicy: false,
        popular: false
      }
    ],
    drinks: [
      {
        name: "Uyghur Herbal Tea Pot",
        description: "Traditional home blend of local herbs and spices",
        price: "£6.50",
        spicy: false,
        popular: true
      },
      {
        name: "Milk tea",
        description: "Salty milk tea, a staple in Uyghur breakfast culture",
        price: "£6.50",
        spicy: false,
        popular: false
      },
      {
        name: "Honey Cake",
        description: "Light and fluffy homemade honey cake",
        price: "£5.95",
        spicy: false,
        popular: true
      },
      {
        name: "Rice Pudding",
        description: "Creamy homemade rice pudding with a hint of cinnamon for a comforting finish",
        price: "£3.95",
        spicy: false,
        popular: false
      },
      {
        name: "Baklava",
        description: "Turkish pistachio baklava, a sweet pastry made of layers of filo filled with chopped nuts and sweetened with honey",
        price: "£5.95",
        spicy: false,
        popular: false
      }
    ]
  };

  const tabs = [
    { id: 'starters', name: 'Starters', icon: '🥟' },
    { id: 'mains', name: 'Main Dishes', icon: '🍜' },
    { id: 'sides', name: 'Soups and Sides', icon: '🥗' },
    { id: 'drinks', name: 'Drinks and Deserts', icon: '🫖' }
  ];

  // Smooth scroll function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Fixed Navbar */}
      <nav className="fixed top-0 w-full bg-white bg-opacity-95 text-black flex justify-center space-x-8 py-4 text-lg font-medium shadow-md z-50 backdrop-blur-sm">
        <button onClick={() => scrollToSection('home')} className="hover:underline">Home</button>
        <button onClick={() => scrollToSection('about')} className="hover:underline">About</button>
        <button onClick={() => scrollToSection('reviews')} className="hover:underline">Reviews</button>
        <button onClick={() => scrollToSection('menu')} className="hover:underline">Menu</button>
        <button onClick={() => scrollToSection('contact')} className="hover:underline">Contact</button>
      </nav>

      {/* HOME SECTION - Landing */}
      <section
        id="home"
        className="relative flex flex-col items-center justify-center text-center text-black p-8 min-h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/uyghur-cuisine.jpg')" }}
      >
        <h1 className={`${playfair.className} text-white text-6xl md:text-7xl font-bold mb-4 drop-shadow-xl`}>Journey Through Taste</h1>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Hero Part */}
          <div className="text-center mb-16">
            <h1 className={`${playfair.className} text-5xl md:text-6xl font-bold mb-6 text-black`}>Our Story</h1>
            <p className="text-xl max-w-2xl mx-auto text-gray-700">Authentic Uyghur cuisine bringing the flavors of Central Asia to London</p>
          </div>

          {/* Story Section */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
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

          {/* Cuisine Section */}
          <div className="py-16 px-4 bg-gray-50 rounded-xl mb-16">
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
                  We're proud to share Uyghur culture and cuisine, fostering understanding 
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
            <h2 className={`${playfair.className} text-4xl font-bold text-center mb-12 text-black`}>What Our Customers Say</h2>
            
            {/* Google Reviews Slider Component */}
            <div className="mb-12">
              <GoogleReviewsSlider />
            </div>
            
          {/* Manual Review Slider */}
          <div className="relative mb-16">
            <div className="flex space-x-4 overflow-x-scroll pb-4">
              {reviews.map((review, index) => (
                <div
                  key={index}
                  className="flex-none w-80 p-6 bg-amber-50 rounded-xl shadow-lg border-2 border-amber-200"
                >
                  <p className="font-semibold mb-3 text-amber-900">{review.author_name}</p>
                  <div className="text-amber-500 mb-4 text-2xl">
                    {'★'.repeat(Math.round(review.rating))}
                  </div>
                  <p className="text-amber-800 mb-4 leading-relaxed">{review.text}</p>
                  <p className="text-right text-sm text-amber-600">{review.time}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Platform Ratings */}
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h3 className={`${playfair.className} text-2xl font-bold text-center mb-8 text-black`}>Our Ratings</h3>
            <div className="flex flex-wrap justify-center gap-12">
              
              {/* Feed the Lion */}
              <div className="text-center">
                <Image
                    src="/feedthelion-logo.png" 
                    alt="Feed the Lion"
                    width={80} 
                    height={80}
                    className="mb-3 mx-auto"
                />
                <p className="text-lg font-semibold mb-2 text-black">Feed the Lion</p>
                <div className="flex justify-center text-yellow-500 text-xl mb-1">
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
                <Image
                  src="/google-logo.svg" 
                  alt="Google"
                  width={80} 
                  height={80}
                  className="mb-3 mx-auto"
                />
                <p className="text-lg font-semibold mb-2 text-black">Google</p>
                <div className="flex justify-center text-yellow-500 text-xl mb-1">
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
                <Image
                      src="/tripadvisor-logo.svg" 
                      alt="Tripadvisor"
                      width={80} 
                      height={80}
                      className="mb-3 mx-auto"
                />
                <p className="text-lg font-semibold mb-2 text-black">Tripadvisor</p>
                <div className="flex justify-center text-yellow-500 text-xl mb-1">
                  <FontAwesomeIcon icon={solidStar} />
                  <FontAwesomeIcon icon={solidStar} />
                  <FontAwesomeIcon icon={solidStar} />
                  <FontAwesomeIcon icon={solidStar} />
                  <FontAwesomeIcon icon={faStarHalfAlt} />
                </div>
                <p className="text-gray-600">4.6/5</p>
              </div>
            </div>
          </div>

          {/* Press Coverage Image */}
          <div className="mt-12 text-center">
            <h3 className={`${playfair.className} text-2xl font-bold mb-6 text-black`}>Featured In</h3>
            <div className="border-4 border-gray-200 p-4 rounded-lg shadow-md">
              <Image
                src="/feedthelion.jpg" 
                alt="Good ratings from bloggers and platforms"
                width={800} 
                height={400}
                className="rounded-md object-contain mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* MENU SECTION */}
      <section id="menu" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className={`${playfair.className} text-5xl md:text-6xl font-bold mb-4 text-black`}>Our Menu</h1>
            <p className="text-xl text-gray-700">Authentic flavors from the ancient Silk Road</p>
          </div>
          
          {/* Tab Navigation */}
          <div className="flex justify-center mb-12">
            <div className="flex bg-gray-100 rounded-lg p-1 shadow-lg">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-md font-semibold transition-all duration-300 flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'bg-white text-black shadow-md'
                      : 'text-gray-600 hover:text-black'
                  }`}
                >
                  <span className="text-xl">{tab.icon}</span>
                  <span>{tab.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Menu Items */}
          <div className="grid gap-6 md:grid-cols-2 mb-16">
            {menuItems[activeTab as keyof typeof menuItems].map((item, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 relative"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-black flex items-center">
                    {item.name}
                    {item.spicy && (
                      <span className="ml-2 text-red-500" title="Spicy">🌶️</span>
                    )}
                  </h3>
                  <span className={`${playfair.className} text-2xl font-bold text-red-600`}>
                    {item.price}
                  </span>
                </div>
                
                {/* Placeholder for dish image */}
                <div className="my-4 w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
                  <Image 
                    src={`/dishes/${item.name.toLowerCase().replace(/\s+/g, '-')}.jpg`} 
                    alt={item.name}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <p className="text-gray-700 leading-relaxed mb-4">
                  {item.description}
                </p>

                <div className="flex justify-between items-center">
                  <div className="flex space-x-2 text-sm">
                    {item.spicy && (
                      <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full">
                        Spicy
                      </span>
                    )}
                    {item.popular && (
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                        Customer Favorite
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
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

          {/* Call to Action - Fixed Version */}
          <div className="relative py-16 px-4 text-center min-h-[300px] flex items-center justify-center">
            {/* Background Image with stronger contrast */}
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
              <h3 className={`${playfair.className} text-4xl font-bold text-white mb-4 drop-shadow-lg`}>
                Ready to Order?
              </h3>
              <p className="text-white mb-6 text-xl font-medium drop-shadow-lg">
                Visit us today or call to make a reservation
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button
                  onClick={() => scrollToSection('contact')}
                  className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-300 shadow-xl text-lg"
                >
                  Contact Us
                </button>
                <a
                  href="tel:+442076369949"
                  className="border-2 border-red-600 bg-red-600/90 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-red-600 transition-colors duration-300 shadow-xl text-lg"
                >
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION with visible background image */}
      <section 
        id="contact" 
        className="relative py-20 px-4 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/interior1.jpg')" }}
      >
        <div className="relative max-w-4xl mx-auto text-center z-10">
          <h2 className={`${playfair.className} text-4xl font-bold text-white mb-8 drop-shadow-md`}>Visit Us</h2>
          <p className="text-xl text-white mb-8 drop-shadow-md">
            Located in the heart of London, we welcome you to experience the warmth of Uyghur hospitality 
            and the authentic flavors of Central Asia.
          </p>
          
          <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-6 text-gray-800">Opening Hours & Contact</h3>
            <div className="grid md:grid-cols-2 gap-6 text-gray-700 text-lg">
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
                <p className="mb-2"><strong>Email:</strong> <a href="mailto:info@turpanrestaurant.com" className="text-red-600 hover:underline">info@turpanrestaurant.com</a></p>
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
  );
}