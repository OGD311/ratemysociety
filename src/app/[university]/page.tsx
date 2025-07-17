"use client";
import { UNIVERSITY } from "@/constants/interfaces";
import { getUniversityDetails } from "@/lib/universities";
import { generateUniName, generateURLSafe } from "@/utils/URLSafe";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function ShowUni() {
    const uniNameParam = useParams<{ university: string; }>().university;
    const fullUniversityName = generateUniName(uniNameParam);
    const safeName = generateURLSafe(uniNameParam);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [university, setUniversity] = useState<UNIVERSITY | null>(null);

    useEffect( () => {
        async function getUniversity(universityName: string) {
            try {
                setLoading(true);
                setUniversity(await getUniversityDetails(universityName));
                setError(false);
            } catch (e) {
                setError(true);
                console.log(e);
            } finally {
                setLoading(false);
            }
        }

        getUniversity(fullUniversityName);
    }, [])


    return(
        <div>
            {loading && <p>Loading...</p>}
            
            {!loading && error && <p>404 - University not found</p> }

            {!loading && !error && university === null && <p>Something went wrong. Please try again</p>}

            {!loading && !error && university !== null &&
                <div className="flex border-2 min-w-full max-w-full w-[90dvw] h-64 p-10 pt-5 rounded-2xl shadow-lg shadow-gray-500 ">
                    <div className="">
                        <h1 className="mt-2 mb-2 text-2xl text-left">
                            { university.name }
                        </h1>
                        <p className="text-wrap w-3/4">
                            { university.description }
                        </p>
                        <div className="flex text-lg mt-5 text-yellow-600">
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
                    <Image 
                        src={`/university/${safeName}.svg`}
                        alt={"Logo for " + university.name}
                        width={300}
                        height={300}
                        className="ml-auto"
                    />
                </div>
            }
        </div>
    );
}