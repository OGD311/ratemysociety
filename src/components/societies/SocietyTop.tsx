"use client"
import { SOCIETY } from "@/constants/interfaces";
import { getTopSocieties } from "@/lib/societies";
import { useEffect, useState } from "react";
import Loader from "../Loader";
import SocietyCard from "./SocietyCard";

export default function SocietyTop() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [societies, setSocieties] = useState<SOCIETY[]>([]);
    
    useEffect( () => {
        
        async function loadSocieties() {
            try {
                setLoading(true);
                const societies = await getTopSocieties();
                // @ts-ignore
                setSocieties(societies);
                setError(false);
            } catch (e) {
                setError(true);
            } finally {
                setLoading(false);
            }
        }

        loadSocieties();
        console.log(societies)
    }, [])

    return (
        <div>
            {loading && <Loader />}

            {!loading && error && <p>Something went wrong. Please try again</p>}

            {!loading && !error && societies.length === 0 && <p>No societies found.</p>}

            {!loading && !error && societies.length > 0 &&
                <div className="grid 2xl:grid-cols-7 xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 mb-5">
                    {societies.map( (society) => (
                        <SocietyCard key={society.id} society={society} showUni={society.university?.name} />
                    ))}
                </div>
            }
        </div>
    )

}