

export default function Home() {
    return(
        <div className="items-center justify-center w-1/2 text-center">

            <h1 className="mb-20 text-6xl">Rate My Society</h1>

            <div className="flex flex-col text-center border-2 p-15 rounded-2xl">
                <h3 className="mb-5 text-2xl">Search a University</h3>
                <form>
                    <input type="text" placeholder="Search" className="p-2 mr-2 text-center rounded-xl" />
                </form>
            </div>
        
        </div>
    );
}