"use client";
import Loader from "@/components/loader";
import SocietyDetails from "@/components/societies/SocietyDetails";
import { SOCIETY } from "@/constants/interfaces";
import { getSocietyDetails } from "@/lib/societies";
import { generateOriginal } from "@/utils/URLSafe";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";


export default function ShowSociety() {
    const params = useParams<{ university: string, society:string }>();
    const uniFullName = generateOriginal(params.university);
    const societyFullName = generateOriginal(params.society)

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [society, setSociety] = useState<SOCIETY | null>(null);


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
        <div>
            {loading && <Loader />}

            {!loading && error && <p>An Error occured, please try again.</p>}

            {!loading && !error && society === null && <p>404 - Society does not exist</p>}

            {!loading && !error && society !== null &&
                <div className="border-2 p-4 rounded-xl w-[50dvw] min-w-[50dvw] max-w-[50dvw] h-64 min-h-64 max-h-64">
                    <SocietyDetails society={society} />
                </div>
            }
        </div>
    );
}