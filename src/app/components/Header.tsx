import Image from "next/image";
import Logo from '../assets/ceemo-logo.png'

type HeaderProps = {
  logout: () => void;
};

export default function Header({ logout }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow">
      {/* Left: Logo + App Name */}
      <div className="flex items-center space-x-3">
        {/* Placeholder logo */}
        <Image src={Logo} alt="logo" width={100} height={100}></Image>
        {/* <div className="w-8 h-8 bg-gray-300 rounded-full" /> */}
        <h1 className="text-xl font-bold text-gray-800">Cheemo - Check Emotion</h1>
      </div>

      {/* Right: Logout */}
      <button className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600" onClick={logout}>
        Logout
      </button>
    </header>
  );
}
