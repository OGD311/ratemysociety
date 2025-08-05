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
        <div className="flex flex-col items-center w-full px-4">
            <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-4xl gap-4 mb-8">
            <input
                type="text"
                placeholder="Search universities..."
                onChange={searchUniversities}
                className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
            <select
                className="w-full md:w-1/4 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                onChange={filterUniversities}
                defaultValue="az"
            >
                <option value="az">A-Z</option>
                <option value="za">Z-A</option>
                <option value="best">Best Rated</option>
                <option value="soccount">Number of Societies</option>
            </select>
            </div>

            {loading && <Loader />}

            {!loading && error && (
            <p className="text-red-600 font-semibold mt-8">Something went wrong. Please try again.</p>
            )}

            {!loading && !error && filteredUniversities.length === 0 && (
            <p className="text-gray-500 mt-8">No universities found.</p>
            )}

            {!loading && !error && filteredUniversities.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full max-w-6xl">
                {filteredUniversities.map((uni) => (
                <UniCard key={uni.id} university={uni} />
                ))}
            </div>
            )}
        </div>
    )
}