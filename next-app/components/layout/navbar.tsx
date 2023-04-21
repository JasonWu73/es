import Image from 'next/image';
import NextJsLogo from '@/public/next.svg';
import Link from 'next/link';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { useState } from 'react';
import { ROUTES } from '@/pages';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenuOpen() {
    setMenuOpen(prevOpenMenu => !prevOpenMenu);
  }

  return (
    <nav className="w-full h-24 shadow-xl bg-white">
      <div className="flex items-center justify-between h-full w-full px-4 2xl:px-16">
        <PageLogo />

        <ul className="hidden sm:flex">
          {ROUTES.map(route => (
            <Link key={route.href} href={route.href}>
              <li className="ml-10 hover:border-b text-xl flex items-center gap-1">
                {route.title}
              </li>
            </Link>
          ))}
        </ul>

        <div
          className="sm:hidden cursor-pointer pl-24"
          onClick={toggleMenuOpen}
        >
          <AiOutlineMenu size={25} />
        </div>
      </div>

      <div
        className={menuOpen ?
          'fixed left-0 top-0 w-[65%] sm:hidden h-screen bg-gray-50 p-10 ease-in duration-500' :
          'fixed left-[-100%] top-0 p-10 ease-in duration-500'
        }
      >
        <div className="flex w-full items-center justify-between">
          <div>
            <PageLogo />
          </div>
          <div
            className="cursor-pointer"
            onClick={toggleMenuOpen}
          >
            <AiOutlineClose size={25} />
          </div>
        </div>

        <div className="flex-col">
          <ul>
            {ROUTES.map(route => (
              <Link key={route.href} href={route.href}>
                <li className="pt-4 hover:border-b text-lg flex items-center gap-1">
                  {route.title}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

function PageLogo() {
  return (
    <Link href="/">
      <Image src={NextJsLogo} alt="Logo" priority width={205} className="cursor-pointer" />
    </Link>
  );
}
