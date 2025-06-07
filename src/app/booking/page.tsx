import BookingForm from "../components/BookingForm";

export default function BookingPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6">Make a Reservation</h1>
      <BookingForm />
    </main>
  );
}
