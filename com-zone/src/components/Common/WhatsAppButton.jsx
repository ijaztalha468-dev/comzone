export default function WhatsAppButton() {

  const phoneNumber = "923261839384";

  const message = "Hello, I have a question about your products.";

  const link = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 w-[50px] h-[50px] sm:bottom-6 sm:right-6 sm:w-[58px] sm:h-[58px] bg-[#25d366] rounded-full flex items-center justify-center shadow-[0_4px_14px_rgba(0,0,0,0.25)] z-[1000] transition-transform duration-[250ms] ease-in-out hover:scale-[1.08] hover:shadow-[0_6px_18px_rgba(0,0,0,0.3)]"
      aria-label="Chat on WhatsApp"
    >
      <svg
        viewBox="0 0 32 32"
        width="30"
        height="30"
        fill="white"
      >
        <path d="M16 3C9.373 3 4 8.373 4 15c0 2.634.86 5.075 2.317 7.06L4.8 28l6.11-1.605A11.93 11.93 0 0 0 16 27c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 22c-1.98 0-3.83-.55-5.41-1.505l-.386-.23-3.615.95.965-3.522-.252-.36A9.94 9.94 0 0 1 6 15c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10zm5.47-7.44c-.3-.15-1.77-.87-2.045-.97-.274-.1-.474-.15-.674.15-.2.3-.774.97-.95 1.17-.174.2-.35.224-.65.075-.3-.15-1.265-.466-2.41-1.486-.89-.795-1.49-1.775-1.664-2.075-.174-.3-.02-.462.13-.612.134-.133.3-.35.45-.524.15-.174.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.674-1.62-.924-2.22-.244-.585-.49-.505-.674-.514-.174-.008-.374-.01-.574-.01-.2 0-.525.075-.8.375-.274.3-1.05 1.026-1.05 2.5 0 1.475 1.075 2.9 1.225 3.1.15.2 2.116 3.23 5.126 4.53.716.31 1.276.494 1.712.632.72.23 1.375.198 1.893.12.578-.086 1.77-.723 2.02-1.42.25-.698.25-1.296.175-1.42-.075-.126-.274-.2-.574-.35z"/>
      </svg>
    </a>
  );
}
