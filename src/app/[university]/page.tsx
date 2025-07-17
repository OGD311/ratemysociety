"use client";
import { UNIVERSITY } from "@/constants/interfaces";
import { getUniversityDetails } from "@/lib/universities";
import { generateUniName, generateURLSafe } from "@/utils/URLSafe";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import UniDetails from "@/components/university/UniDetails";
import SocietyGrid from "@/components/societies/SocietyGrid";

export default function ShowUni() {
    const uniNameParam = useParams<{ university: string; }>().university;
    const fullUniversityName = generateUniName(uniNameParam);
    const safeName = generateURLSafe(uniNameParam);

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
            {loading && <p>Loading...</p>}
            
            {!loading && error && <p>404 - University not found</p> }

            {!loading && !error && university === null && <p>Something went wrong. Please try again</p>}

            {!loading && !error && university !== null &&
                <>
                <UniDetails university={university} />
                <SocietyGrid universityId={university.id} />
                </>
            }
        </div>
    );
}