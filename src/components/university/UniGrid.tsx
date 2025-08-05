"use client"
import { getUniversities } from "@/lib/universities";
import { useEffect, useState } from "react";
import UniCard from "./UniCard";
import { UNIVERSITY } from "@/constants/interfaces";
import Loader from "../Loader";

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


    function searchUniversities(e: React.ChangeEvent<HTMLInputElement>) {
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

    function filterUniversities(e: React.ChangeEvent<HTMLSelectElement>) {
        const value = e.target.value;
        let sorted = [...filteredUniversities];
        if (value === "az") {
            sorted.sort((a, b) => a.name.localeCompare(b.name));
        } else if (value === "za") {
            sorted.sort((a, b) => b.name.localeCompare(a.name));
        } else if (value === "best") {
            sorted.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
        } else if (value === "soccount") {
            sorted.sort((a, b) => (b.societyCount ?? 0) - (a.societyCount ?? 0));
        }
        setFilteredUniversities(sorted);
    }

    return(
        <div className="flex flex-col items-center">
            <input type="text" placeholder="Search" onChange={searchUniversities} />
            <select
                className="mt-4 mb-6"
                onChange={filterUniversities}
                defaultValue="az"
            >
                <option value="az">A-Z</option>
                <option value="za">Z-A</option>
                <option value="best">Best Rated</option>
                <option value="soccount">Number of Societies</option>
            </select>

            {loading && <Loader />}

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