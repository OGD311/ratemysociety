

export default function Home() {
    return(
        <div className="text-center justify-center items-center w-1/2">

            <h1 className="text-6xl mb-20">Rate My Society</h1>

            <div className="flex flex-col text-center border-2 p-15 rounded-2xl">
                <h3 className="text-2xl mb-5">Search a University</h3>
                <form>
                    <input type="text" placeholder="Search" className="mr-2 text-center" />
                </form>
            </div>
        
        </div>
    );
}