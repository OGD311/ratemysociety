"use client";
import Loader from "@/components/Loader";
import ReviewCard from "@/components/reviews/ReviewCard";
import ReviewForm from "@/components/reviews/ReviewForm";
import ReviewGrid from "@/components/reviews/ReviewGrid";
import SocietyDetails from "@/components/societies/SocietyDetails";
import { SOCIETY } from "@/constants/interfaces";
import { getSocietyDetails } from "@/lib/societies";
import { generateOriginal, generateURLSafe } from "@/utils/URLSafe";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function ShowSociety() {
    const params = useParams<{ university: string, society:string }>();
    const uniFullName = generateOriginal(params.university);
    const societyFullName = generateOriginal(params.society)

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [society, setSociety] = useState<SOCIETY | null>(null);

    const router = useRouter();
    const goToUniversity = ( uniName: string ) => {
        router.push(`/${uniName}`)
    }

    const safeUniName = generateURLSafe(uniFullName);


    useEffect(() => {
        async function loadSociety(uniFullName: string, societyFullName: string) {
            try {
                setLoading(true);
                setSociety(await getSocietyDetails(uniFullName, societyFullName));
                setError(false);
            } catch (e) {
                setError(true);
                console.log(e);
            } finally {
                setLoading(false);
            }
        }

        loadSociety(uniFullName, societyFullName);
    }, [])

    return (
        <div className="flex flex-col items-center">
            {loading && <Loader />}

            {!loading && error && <p>An Error occured, please try again.</p>}

            {!loading && !error && society === null && <p>404 - Society does not exist</p>}

            {!loading && !error && society !== null &&
            <> 
                <a onClick={() => goToUniversity(safeUniName)} className="border-2 p-3 rounded-lg relative right-120 bottom-10 hover:bg-blue-400 hover:text-white transition duration-300 cursor-pointer">&lt; {uniFullName}</a>
                <SocietyDetails society={society} />

                <ReviewForm societyId={society.id} />
                <ReviewGrid societyId={society.id} />
            </>
            }
        </div>
    );
}