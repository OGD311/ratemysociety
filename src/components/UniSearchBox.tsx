"use client";
import { useEffect, useState } from "react";
import { UNIVERSITY } from "@/constants/interfaces";
import { searchUniversities } from "@/lib/universities";
import { useRouter } from "next/navigation";
import { generateURLSafe } from "@/utils/URLSafe";

export default function UniSearchBox({ className } : { className?: string }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [universities, setUniversities] = useState<UNIVERSITY[]>([]);
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
        />
        {loading && <p className="absolute p-3 mt-2 text-center bg-white shadow-lg shadow-gray-500">Loading...</p>}

        {!loading && error && <p className="absolute p-3 mt-2 text-center bg-white shadow-lg shadow-gray-500">Error loading Universities</p>}

        {!loading && !error && universities.length === 0 && search.length > 0 && <p className="absolute p-3 mt-2 text-center bg-white shadow-lg shadow-gray-500">No Universities found.</p>}

        {!loading && !error && universities.length > 0 && (
            <ul className="absolute p-3 mt-2 text-center bg-white shadow-lg shadow-gray-500">
                {universities.map( (uni) => (
                    <li 
                    onClick={() => goToUniversity(generateURLSafe(uni.name))} 
                    key={uni.name}
                    className="py-1 m-1 cursor-pointer"
                    >{uni.name}</li>
                ))}
            </ul>
        )}
        </div>
    )
        
}

//className="p-2 mr-2 text-center rounded-xl"