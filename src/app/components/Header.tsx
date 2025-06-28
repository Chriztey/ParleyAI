import Image from "next/image";
import Logo from '../assets/parley-ai-logo.png'

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
          {/* <div className="relative w-12 h-12 backdrop-blur-sm bg-white/20 rounded-2xl border border-white/30 p-2 group-hover:bg-white/30 transition-all duration-300 hover:scale-105"> */}
            {/* <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div> */}
            
            
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
          
          <span className="relative z-10 flex items-center gap-2">
            {/* <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg> */}
            Logout
          </span>
        </button>
      </div>

      {/* Bottom subtle glow line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
    </header>
  );
}