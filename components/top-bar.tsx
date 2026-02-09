"use client";

import { useTopBar } from "./top-bar-context";

// Inline SVG icons
const PhoneIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
);

const PinIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
      clipRule="evenodd"
    />
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.051-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.051-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 100 10.27 5.135 5.135 0 000-10.27zm0 1.802a3.333 3.333 0 110 6.666 3.333 3.333 0 010-6.666zm5.338-3.205a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z"
      clipRule="evenodd"
    />
  </svg>
);

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7.41a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
  </svg>
);

export function TopBar() {
  const { isTopBarVisible } = useTopBar();

  return (
    <div className="fixed top-0 left-0 right-0 w-full z-[1001] h-9">
      <div
        className={`w-full h-full bg-[#C9A24D] transition-all duration-300 ease-out ${
          isTopBarVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="h-9 w-full grid grid-cols-3 items-center min-[500px]:flex min-[500px]:items-center min-[500px]:justify-between px-4 sm:px-6 lg:px-10">
          {/* Phone - Column 1 (mobile) */}
          <a
            href="tel:+381638033576"
            className="justify-self-start min-[500px]:hidden flex items-center gap-1.5 md:gap-2 text-xs font-medium text-[#0d1f32] leading-none hover:underline transition-all duration-200 focus:outline-none focus-visible:outline-2 focus-visible:outline-[#0d1f32]/60 focus-visible:outline-offset-1 rounded"
          >
            <PhoneIcon className="w-4 h-4 flex-shrink-0" />
            <span>063 803 3576</span>
          </a>

          {/* Location - Column 2 (mobile) */}
          <div className="justify-self-center min-[500px]:hidden flex items-center gap-1.5 md:gap-2 text-xs font-medium text-[#0d1f32] leading-none">
            <PinIcon className="w-4 h-4 flex-shrink-0" />
            <span className="whitespace-nowrap">Novi Beograd</span>
          </div>

          {/* Left group - Phone and Location (desktop >=500px) */}
          <div className="hidden min-[500px]:flex items-center gap-2 md:gap-4">
            {/* Phone */}
            <a
              href="tel:+381638033576"
              className="flex items-center gap-1.5 md:gap-2 text-xs font-medium text-[#0d1f32] leading-none hover:underline transition-all duration-200 focus:outline-none focus-visible:outline-2 focus-visible:outline-[#0d1f32]/60 focus-visible:outline-offset-1 rounded"
            >
              <PhoneIcon className="w-4 h-4 flex-shrink-0" />
              <span>063 803 3576</span>
            </a>

            {/* Location */}
            <div className="flex items-center gap-1.5 md:gap-2 text-xs font-medium text-[#0d1f32] leading-none">
              <PinIcon className="w-4 h-4 flex-shrink-0" />
              <span className="whitespace-nowrap">Novi Beograd</span>
            </div>
          </div>

          {/* Social icons - Column 3 (mobile) / Right group (desktop) */}
          <div className="justify-self-end min-[500px]:justify-self-auto flex items-center gap-3 md:gap-3.5">
            <a
              href="https://www.facebook.com/people/Odalis-NBG/61574995882346/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-[#0d1f32] hover:brightness-110 transition-all duration-200 hover:scale-110 focus:outline-none focus-visible:outline-2 focus-visible:outline-[#0d1f32]/60 focus-visible:outline-offset-1 rounded"
            >
              <FacebookIcon className="w-4 h-4" />
            </a>
            <a
              href="https://www.instagram.com/odalis_nbg/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-[#0d1f32] hover:brightness-110 transition-all duration-200 hover:scale-110 focus:outline-none focus-visible:outline-2 focus-visible:outline-[#0d1f32]/60 focus-visible:outline-offset-1 rounded"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              aria-label="TikTok"
              className="text-[#0d1f32] hover:brightness-110 transition-all duration-200 hover:scale-110 focus:outline-none focus-visible:outline-2 focus-visible:outline-[#0d1f32]/60 focus-visible:outline-offset-1 rounded"
            >
              <TikTokIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
