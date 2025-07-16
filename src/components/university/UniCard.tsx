import { UNIVERSITY } from "@/constants/interfaces"
import Image from "next/image"

export default function UniCard( { university } : { university: UNIVERSITY }) {


    return (
        <div className="flex flex-col items-center h-64 p-4 pt-2 m-10 border-2 border-gray-400 shadow-lg max-w-54 max-h-64 w-54 rounded-xl shadow-gray-500 hover:-translate-y-3.5 transition duration-200">
            <h1 className="mt-2 mb-2 text-2xl text-center">
                { university.name }
            </h1>
            <Image 
                src={`/university/${(university.name).toLowerCase().replace(/ /g, "_")}.svg`}
                alt={"Logo for " + university.name}
                width={170}
                height={200}
                className="m-1 mb-5"
            />
            <div className="flex text-lg text-yellow-600">
                <p className="mr-2">
                    {university.rating} / 5
                </p>
                <Image
                    src={'star.svg'}
                    alt="Image of gold star"
                    width={20}
                    height={20}
                />
            </div>
            <div className="mt-2 text-lg">
                {university.societyCount} societ{university.societyCount == 1 ? 'y' : 'ies'}
            </div>
        </div>
    )
}