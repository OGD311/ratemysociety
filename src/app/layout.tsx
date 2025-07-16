import './globals.css'

export default function RootLayout({ children } : { children: React.ReactNode}) {
    return(
        <html lang="en">
            <body>
                <nav className='flex bg-amber-500 p-5 drop-shadow-xl drop-shadow-zinc-300'>
                    <a href='/' className='border-2 p-3 rounded-xl hover:bg-blue-500 hover:text-white transition duration-300 mr-3'>Home</a>
                    <a href='/universities' className='border-2 p-3 rounded-xl hover:bg-blue-500 hover:text-white transition duration-300 mr-3'>Universities</a>
                    <a href='/about' className='border-2 p-3 rounded-xl hover:bg-blue-500 hover:text-white transition duration-300 mr-3'>About</a>
                
                    <input type='text' placeholder='Search' className='ml-auto border-2 p-3 rounded-xl placeholder:text-black'/>
                </nav>
                {children}
            </body>
        </html>
    );
}