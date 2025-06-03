"use client";
import Image from "next/image";
import React, { useState } from 'react';
import { playfair } from '../layout';

export default function Menu() {
  const [activeTab, setActiveTab] = useState('starters');

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

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="w-full bg-white bg-opacity-80 text-black flex justify-center space-x-8 py-4 text-lg font-medium shadow-md">
        <a href="/" className="hover:underline">Home</a>
        <a href="/about" className="hover:underline">About</a>
        <a href="/menu" className="hover:underline font-bold">Menu</a>
        <a href="/booking" className="hover:underline">Make a Booking</a>
        <a href="/contact" className="hover:underline">Contact</a>
      </nav>

      {/* Hero Section */}
      <section
        className="relative flex flex-col items-center justify-center text-center text-white p-8 h-80 bg-cover bg-center"
        style={{ backgroundImage: "url('/interior.jpg')" }}
      >
        <div className="p-8">
          <h1 className={`${playfair.className} text-5xl md:text-6xl font-bold mb-4`}>Our Menu</h1>
          <p className="text-xl max-w-2xl">Authentic flavors from the ancient Silk Road</p>
        </div>
      </section>

      {/* Menu Content */}
      <div className="flex-1 bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          
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
          <div className="grid gap-6 md:grid-cols-2">
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
                
                {/* Placeholder for dish image - replace src with your actual image path */}
                <div className="my-4 w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
                  <Image 
                    src={`/dishes/${item.name.toLowerCase().replace(/\s+/g, '-')}.jpg`} 
                    alt={item.name}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <p className="text-gray-700 leading-relaxed">
                  {item.description}
                </p>

                <div className="mt-4 flex justify-between items-center">
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
          <div className="mt-16 bg-gray-50 rounded-lg p-8">
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
              <div>
                <h4 className="font-semibold mb-2 text-black">🍽️ Group Dining</h4>
                <p>Large group bookings welcome. We recommend sharing multiple dishes for the authentic experience.</p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <h3 className={`${playfair.className} text-3xl font-bold text-black mb-4`}>
              Ready to Order?
            </h3>
            <p className="text-gray-700 mb-6 text-lg">
              Visit us today or make a reservation to experience authentic Uyghur cuisine
            </p>
            <div className="flex justify-center space-x-4">
              <a
                href="/booking"
                className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-300"
              >
                Make a Booking
              </a>
              <a
                href="tel:+442076369949"
                className="border-2 border-red-600 text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-red-600 hover:text-white transition-colors duration-300"
              >
                Call Now
              </a>
            </div>
          </div>
        </div>
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