"use client"
import UniSearchBox from '@/components/UniSearchBox';
import './globals.css'
import { usePathname } from 'next/navigation';

export default function RootLayout({ children } : { children: React.ReactNode}) {
    const pathname = usePathname();
    
    return(
        <html lang="en">
            <body className='flex flex-col items-center min-h-screen'>
                <nav className='flex w-full p-5 mb-20 bg-amber-400 drop-shadow-xl drop-shadow-zinc-300'>
                    <a
                        href="/"
                        className={`p-3 mr-3 transition duration-300 border-b-2 border-black pb-[10px] hover:bg-blue-500 hover:text-white
                        ${pathname === '/' ? 'bg-blue-500 text-white' : ''}`}
                    >
                        Home
                    </a>
                    <a
                        href="/universities"
                        className={`p-3 mr-3 transition duration-300 border-b-2 border-black pb-[10px] hover:bg-blue-500 hover:text-white
                        ${pathname === '/universities' ? 'bg-blue-500 text-white' : ''}`}
                    >
                        Universities
                    </a>
                    <a
                        href="/about"
                        className={`p-3 mr-3 transition duration-300 border-b-2 border-black pb-[10px] hover:bg-blue-500 hover:text-white
                        ${pathname === '/about' ? 'bg-blue-500 text-white' : ''}`}
                    >
                        About
                    </a>
                  
                
                    {/* <UniSearchBox className='p-3 ml-auto border-2 rounded-xl placeholder:text-black'/> */}
                </nav>

                {children}
                
                <div className="mt-auto pt-1 w-full">
                    <footer className="flex mt-5 h-10 bg-amber-400 items-center justify-center">
                    <a
                        href="/termsandconditions"
                        className={`mr-5 ml-5 pr-2 pl-2 h-full flex items-center  ${pathname === '/termsandconditions' ? 'bg-blue-500 text-white' : ''}`}
                    >
                        Terms and Conditions
                    </a>
                    <a
                        href="/privacy"
                        className={`mr-auto pr-2 pl-2 h-full flex items-center  ${pathname === '/privacy' ? 'bg-blue-500 text-white' : ''}`}
                    >
                        Privacy Policy
                    </a>
                    <span className='mr-5'>
                        Rate My Society &copy; <a className='pr-1 pl-1' href='https://github.com/OGD311'>OGD311</a> {new Date().getFullYear()}
                    </span>
                    </footer>
                </div>
            </body>
        </html>
    );
}