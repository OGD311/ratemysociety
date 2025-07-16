import './globals.css'

export default function RootLayout({ children } : { children: React.ReactNode}) {
    return(
        <html lang="en">
            <body className='flex flex-col items-center'>
                <nav className='flex w-full p-5 mb-20 bg-amber-500 drop-shadow-xl drop-shadow-zinc-300'>
                    <a href='/' className='p-3 mr-3 transition duration-300 border-2 rounded-xl hover:bg-blue-500 hover:text-white'>Home</a>
                    <a href='/universities' className='p-3 mr-3 transition duration-300 border-2 rounded-xl hover:bg-blue-500 hover:text-white'>Universities</a>
                    <a href='/about' className='p-3 mr-3 transition duration-300 border-2 rounded-xl hover:bg-blue-500 hover:text-white'>About</a>
                
                    <input type='text' placeholder='Search' className='p-3 ml-auto border-2 rounded-xl placeholder:text-black'/>
                </nav>
                {children}
            </body>
        </html>
    );
}