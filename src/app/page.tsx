import UniSearchBox from "@/components/UniSearchBox";


export default function Home() {
    return(
        <div className="items-center justify-center w-1/2 text-center">

            <h1 className="mb-20 text-6xl">Rate My Society</h1>

            <div className="flex flex-col items-center text-center border-2 p-15 rounded-2xl">
                <h3 className="mb-5 text-2xl">Search a University</h3>
                <form>
                    <UniSearchBox  />
                </form>
            </div>
        
        </div>
    );
}