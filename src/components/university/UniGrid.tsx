"use client"
import { getUniversities } from "@/lib/universities";
import { useEffect, useState } from "react";
import UniCard from "./UniCard";
import { UNIVERSITY } from "@/constants/interfaces";

export default function UniGrid() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [universities, setUniversities] = useState<UNIVERSITY[]>([]);

    useEffect( () => {
        async function loadUnis() {
            
            try{
                setLoading(true);
                setUniversities(await getUniversities());
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


    return(
        <div>
            {loading && <p>Loading...</p>}

            {!loading && error && <p>Something went wrong. Please try again</p>}

            {!loading && !error && universities.length === 0 && <p>No universities found.</p>}

            {!loading && !error && universities.length > 0 &&
                <div className="grid grid-cols-4">
                    {universities.map( (uni) => (
                        <UniCard key={uni.id} university={uni} />
                    ))}
                </div>
            }
        </div>
    )
}