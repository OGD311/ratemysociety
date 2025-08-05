"use client";
import { UNIVERSITY } from "@/constants/interfaces";
import { getUniversityDetails } from "@/lib/universities";
import { generateOriginal } from "@/utils/URLSafe";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import UniDetails from "@/components/university/UniDetails";
import SocietyGrid from "@/components/societies/SocietyGrid";
import Loader from "@/components/loader";

export default function ShowUni() {
    const uniNameParam = useParams<{ university: string; }>().university;
    const fullUniversityName = generateOriginal(uniNameParam);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [university, setUniversity] = useState<UNIVERSITY | null>(null);

    useEffect( () => {
        async function loadUniversity(universityName: string) {
            try {
                setLoading(true);
                setUniversity(await getUniversityDetails(universityName));
                setError(false);
            } catch (e) {
                setError(true);
                console.log(e);
            } finally {
                setLoading(false);
            }
        }

        loadUniversity(fullUniversityName);
    }, [])


    return(
        <div>
            {loading && <Loader />}
            
            {!loading && error && 
            <div className="text-center">
            <h1 className="text-7xl font-bold mb-5">Error 404</h1>
            <h3 className="text-4xl mb-20">University '{fullUniversityName}' not found</h3>
            <a href="/" className="text-2xl border-2 rounded-lg p-3 hover:bg-amber-500 transition shadow-gray-500 duration-200 hover:shadow-2xl">Home</a>
            </div>
            }

            {!loading && !error && university === null && <p>Something went wrong. Please try again</p>}

            {!loading && !error && university !== null &&
                <div className="text-center flex flex-col items-center">
                <UniDetails university={university} />
                <SocietyGrid universityId={university.id} />
                </div>
            }
        </div>
    );
}