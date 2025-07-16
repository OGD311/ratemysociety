import Image from "next/image"

export default function UniCard( { university } : { university: any }) {


    return (
        <div>
            <h1>
                { university.name }
            </h1>
            <Image 
                src={`/${(university.name).replace(" ", "_")}`}
                alt={university.name + "logo"}
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