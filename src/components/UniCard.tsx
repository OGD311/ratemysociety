import Image from "next/image"

export default function UniCard( { university } : { university: any }) {


    return (
        <div className="border-2 border-gray-400 max-w-48 rounded-xl p-4 pt-2 m-10 flex flex-col items-center">
            <h1 className="text-2xl">
                { university.name }
            </h1>
            <Image 
                src={`/${(university.name).toLowerCase().replace(" ", "_")}.svg`}
                alt={"Logo for " + university.name}
                width={100}
                height={100}
            />
            <div>
                { university.rating}
            </div>
            <div>
                Society count: {university.societyCount}
            </div>
        </div>
    )
}