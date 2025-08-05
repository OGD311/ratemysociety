import { SOCIETY } from "@/constants/interfaces";
import { getSocieties } from "@/lib/societies";
import { useEffect, useState } from "react";
import SocietyCard from "./SocietyCard";
import Loader from "../Loader";


export default function SocietyGrid({ universityId } : { universityId: number }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [societies, setSocieties] = useState<SOCIETY[]>([]);
    const [filteredSocieties, setFilteredSocieties] = useState<SOCIETY[]>([]);
    

    useEffect( () => {
        
        async function loadSocieties(universityId: number) {
            try {
                setLoading(true);
                const societies = await getSocieties(universityId);
                setSocieties(societies);
                setFilteredSocieties(societies.sort((a, b) => a.name.localeCompare(b.name)));
                setError(false);
            } catch (e) {
                setError(true);
            } finally {
                setLoading(false);
            }
        }

        loadSocieties(universityId);
    }, [])


    function searchSocieties(e: React.ChangeEvent<HTMLInputElement>) {
        const search = e.target?.value.toLowerCase().trim();

        if (search.length === 0) {
            setFilteredSocieties(societies);
        } else {
            setFilteredSocieties(
                societies.filter((society) =>
                    society.name.toLowerCase().includes(search)
                )
            );
        }
    }

    function filterSocieties(e: React.ChangeEvent<HTMLSelectElement>) {
        const value = e.target.value;
        let sorted = [...filteredSocieties];
        if (value === "az") {
            sorted.sort((a, b) => a.name.localeCompare(b.name));
        } else if (value === "za") {
            sorted.sort((a, b) => b.name.localeCompare(a.name));
        } else if (value === "best") {
            sorted.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
        } else if (value === "reviews") {
            sorted.sort((a, b) => (b._count.reviews ?? 0) - (a._count.reviews ?? 0));
        }
        setFilteredSocieties(sorted);
    }

    return (
        <div className="flex flex-col items-center w-full px-4 mt-15">
            <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-4xl gap-4 mb-8">
            <input
                type="text"
                placeholder="Search universities..."
                onChange={searchSocieties}
                className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
            <select
                className="w-full md:w-1/4 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                onChange={filterSocieties}
                defaultValue="az"
            >
                <option value="az">A-Z</option>
                <option value="za">Z-A</option>
                <option value="best">Best Rated</option>
                <option value="soccount">Number of Societies</option>
            </select>
            </div>

            {loading && <Loader />}

            {!loading && error && <p>Something went wrong. Please try again</p>}

            {!loading && !error && filteredSocieties.length === 0 && <p>No societies found.</p>}

            {!loading && !error && filteredSocieties.length > 0 &&
                <div className="grid grid-cols-5 gap-5">
                    {filteredSocieties.map( (society) => (
                        <SocietyCard key={society.id} society={society} />
                    ))}
                </div>
            }
        </div>
    );
}