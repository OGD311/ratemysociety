"use client";
import { useState } from "react";
import { SEARCH_RESULT } from "@/constants/interfaces";
import { searchUniversities } from "@/lib/universities";
import { useRouter } from "next/navigation";
import { generateURLSafe } from "@/utils/URLSafe";
import Image from "next/image";

export default function UniSearchBox({ className } : { className?: string }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [universities, setUniversities] = useState<SEARCH_RESULT[]>([]);
    const [search, setSearch] = useState("");


    async function loadUnis(searchString: string) {
        try {
            setLoading(true);
            setError(false);
            const unis = await searchUniversities(searchString)
            setUniversities(unis);
        }  catch (e) {
            setError(true);
            console.log(e);
        } finally {
            setLoading(false);
        }
    }

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const query = e.target?.value;

        if (query !== search) {
            setSearch(query);

            if (query.length > 0) {
                loadUnis(query);
            }
            if (query.length === 0) {
                setUniversities([]);
            }
        }
    }

    const router = useRouter();
    const goToUniversity = ( uniName: string ) => {
        router.push(`/${uniName}`)
    }
    

    return (
        <div className={className}>
        <input 
            type="text"
            placeholder="Search"
            value={search}
            onChange={handleInputChange}
            className="p-3 rounded-2xl border-gray-400 border-2"
        />
        {loading && <p className="absolute p-3 mt-2 text-center bg-white shadow-lg shadow-gray-500">Loading...</p>}

        {!loading && error && <p className="absolute p-3 mt-2 text-center bg-white shadow-lg shadow-gray-500">Error loading Universities</p>}

        {!loading && !error && universities.length === 0 && search.length > 0 && <p className="absolute p-3 mt-2 text-center bg-white shadow-lg shadow-gray-500">No Universities found.</p>}

        {!loading && !error && universities.length > 0 && (
            <ul className="absolute mt-2 ml-auto w-80 min-w-80 max-w-80 text-center bg-white shadow-lg shadow-gray-500">
                {universities.map( (uni) => (
                    <li 
                        onClick={() => goToUniversity(generateURLSafe(uni.name))} 
                        key={uni.name}
                        className="p-4 cursor-pointer flex items-center max-h-10 h-10 hover:bg-gray-300"
                    >
                        <p className="mr-5">
                            {uni.name}
                        </p>
                        <Image 
                            src={`/university/${generateURLSafe(uni.name)}.svg`}
                            alt={"Logo for " + uni.name}
                            width={75}
                            height={60}
                            className="ml-auto"
                        />    
                    </li>
                ))}
            </ul>
        )}
        </div>
    )
        
}

//className="p-2 mr-2 text-center rounded-xl"