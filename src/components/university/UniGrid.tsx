"use client"
import { getUniversities } from "@/lib/universities";
import { useEffect, useState } from "react";
import UniCard from "./UniCard";


export default function UniGrid() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [universities, setUniversities] = useState([]);

    useEffect( () => {
        async function loadUnis() {
            
            try{
                setLoading(true);
                setUniversities(await getUniversities());
                setError(false);
                setLoading(false);
            } catch {
                setLoading(false);
                setError(true);
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
                <table>
                    {universities.map( (uni) => (
                        <UniCard key={uni.id} university={uni} />
                    ))}
                </table>
            }
        </div>
    )
}