import Image from "next/image";
import Logo from "../assets/parley-ai-logo.png";

type HeaderProps = {
  logout: () => void;
};

export default function Header({ logout }: HeaderProps) {
  return (
    <header className="relative backdrop-blur-xl bg-black/10 border-b border-white/20 shadow-xl">
      {/* Subtle background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-indigo-500/5 pointer-events-none"></div>

      <div className="relative flex items-center justify-between px-8 py-5">
        {/* Left: Logo + App Name */}
        <div className="flex items-center space-x-4 group">
          {/* Glass logo container */}

          <Image
            src={Logo}
            alt="logo"
            width={64}
            height={64}
            className="relative z-10 w-full h-full object-contain"
          />
          {/* </div> */}

          {/* App name with glass text effect */}
          <div className="relative">
            <h1 className="text-2xl font-bold text-white drop-shadow-lg tracking-wide">
              ParleyAI
            </h1>
            {/* <p className="text-sm text-white/70 font-medium -mt-1">
              Check Emotion
            </p> */}
          </div>
        </div>

        {/* Right: Glass Logout Button */}
        <button
          className="relative backdrop-blur-md bg-red-500/20 border border-red-400/30 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:bg-red-500/30 hover:border-red-400/50 hover:shadow-lg hover:scale-105 active:scale-95 group overflow-hidden"
          onClick={logout}
        >
          {/* Button inner glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-red-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>

          <span className="relative z-10 flex items-center gap-2">Logout</span>
        </button>
      </div>

      {/* Bottom subtle glow line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
    </header>
  );
}
