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
                setFilteredSocieties(societies);
                setError(false);
            } catch (e) {
                setError(true);
            } finally {
                setLoading(false);
            }
        }

        loadSocieties(universityId);
    }, [])


    function filterUniversities(e: React.ChangeEvent<HTMLInputElement>) {
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

    return (
        <div className="flex flex-col items-center">
            <input type="text" placeholder="Search" onChange={filterUniversities} className="mt-10"/>

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