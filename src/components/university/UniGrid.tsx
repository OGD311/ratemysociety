"use client"
import { getUniversities } from "@/lib/universities";
import { useEffect, useState } from "react";
import UniCard from "./UniCard";
import { UNIVERSITY } from "@/constants/interfaces";

export default function UniGrid() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [universities, setUniversities] = useState<UNIVERSITY[]>([]);
    const [filteredUniversities, setFilteredUniversities] = useState<UNIVERSITY[]>([]);

    useEffect( () => {
        async function loadUnis() {
            
            try{
                setLoading(true);
                const unis = await getUniversities()
                setUniversities(unis);
                setFilteredUniversities(unis);
                setError(false);
            } catch (e){
                setError(true);
                console.log(e)
            } finally {
                setLoading(false);
            }
            
        }

        loadUnis();
    }, [])


    function filterUniversities(e: React.ChangeEvent<HTMLInputElement>) {
        const search = e.target?.value.toLowerCase().trim();

        if (search.length === 0) {
            setFilteredUniversities(universities);
        } else {
            setFilteredUniversities(
                universities.filter((uni) =>
                    uni.name.toLowerCase().includes(search)
                )
            );
        }
    }

    return(
        <div className="flex flex-col items-center">
            <input type="text" placeholder="Search" onChange={filterUniversities} />
            {loading && <p>Loading...</p>}

            {!loading && error && <p>Something went wrong. Please try again</p>}

            {!loading && !error && filterUniversities.length === 0 && <p>No universities found.</p>}

            {!loading && !error && filterUniversities.length > 0 &&    
                <div className="grid grid-cols-4">
                    {filteredUniversities.map((uni) => (
                        <UniCard key={uni.id} university={uni} />
                    ))}
                </div>
            }
        </div>
    )
}