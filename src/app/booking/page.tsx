import BookingForm from "../components/BookingForm";

export default function BookingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      {/* Hero Section */}
      <div className="pt-20 pb-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Book Your Table
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Experience authentic flavors in a warm, welcoming atmosphere
          </p>
        </div>
      </div>

      {/* Booking Form Section */}
      <div className="px-6 pb-20">
        <BookingForm />
      </div>

      {/* Additional Info */}
      <div className="bg-white border-t border-gray-200 px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-3">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">🕐</span>
              </div>
              <h3 className="font-semibold text-gray-800">Opening Hours</h3>
              <p className="text-gray-600 text-sm">
                Daily: 12:00 PM - 9:00 PM<br />
                Last booking: 8:30 PM
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">📞</span>
              </div>
              <h3 className="font-semibold text-gray-800">Need Help?</h3>
              <p className="text-gray-600 text-sm">
                Call us at 020 7636 9949 for special requests
                or large group bookings
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="font-semibold text-gray-800">Special Events</h3>
              <p className="text-gray-600 text-sm">
                Private dining available<br />
                Contact us for details
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}