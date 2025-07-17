import { SOCIETY } from "@/constants/interfaces";
import { getSocieties } from "@/lib/societies";
import { useEffect, useState } from "react";
import SocietyCard from "./SocietyCard";


export default function SocietyGrid({ universityId } : { universityId: number }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [societies, setSocieties] = useState<SOCIETY[]>([]);

    useEffect( () => {
        
        async function loadSocieties(universityId: number) {
            try {
                setLoading(true);
                setSocieties(await getSocieties(universityId))
                setError(false);
            } catch (e) {
                setError(true);
            } finally {
                setLoading(false);
            }
        }

        loadSocieties(universityId);
    }, [])

    return (
        <div>
            {loading && <p>Loading...</p>}

            {!loading && error && <p>Something went wrong. Please try again</p>}

            {!loading && !error && societies.length === 0 && <p>No societies found.</p>}

            {!loading && !error && societies.length > 0 &&
                <div className="grid grid-cols-4">
                    {societies.map( (society) => (
                        <SocietyCard key={society.id} society={society} />
                    ))}
                </div>
            }
        </div>
    );
}