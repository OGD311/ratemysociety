"use client";
import { UNIVERSITY } from "@/constants/interfaces"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { generateURLSafeLowercase } from "@/utils/URLSafe";

export default function UniCard( { university } : { university: UNIVERSITY }) {
    const router = useRouter();
    const goToUniversity = ( uniName: string ) => {
        router.push(`/${uniName}`)
    }

    const safeName = generateURLSafeLowercase(university.name);

    return (
        <div onClick={() => goToUniversity(safeName)} className="contain-content flex flex-col items-center h-72 min-h-72 p-4 pt-2 m-10 border-2 border-gray-400 shadow-lg max-w-54 max-h-72 w-54 rounded-xl shadow-gray-500 hover:-translate-y-3.5 hover:shadow-2xl transition duration-200 cursor-pointer">
            <h1 className="mt-2 text-2xl text-center">
                { university.name }
            </h1>
            <Image 
                src={`/university/${safeName}.svg`}
                alt={"Logo for " + university.name}
                width={200}
                height={60}
                className="mt-auto"
            />
            <div className="flex text-lg text-yellow-600 mt-auto">
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