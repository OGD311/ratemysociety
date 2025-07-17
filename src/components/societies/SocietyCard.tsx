"use client";
import { SOCIETY } from "@/constants/interfaces"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { generateURLSafe } from "@/utils/URLSafe";

export default function SocietyCard( { society } : { society: SOCIETY }) {
    const safeUniName = useParams<{ university: string; }>().university;
    const router = useRouter();
    
    const goToSociety = ( societyName: string ) => {
        router.push(`/${safeUniName}/${generateURLSafe(societyName)}`)
    }

    return (
        <div onClick={() => goToSociety(society.name)} className="flex flex-col items-center p-4 pt-2 m-10 border-2 border-gray-400 shadow-lg max-w-54 max-h-64 w-54 rounded-xl shadow-gray-500 hover:-translate-y-3.5 hover:shadow-2xl transition duration-200 cursor-pointer">
            <h1 className="mt-2 mb-2 text-2xl text-center">
                { society.name }
            </h1>
            <div className="flex text-lg text-yellow-600">
                <p className="mr-2">
                    {society.rating} / 5
                </p>
                <Image
                    src={'star.svg'}
                    alt="Image of gold star"
                    width={20}
                    height={20}
                />
            </div>
            <div className="mt-2 text-lg">
                Around {society.memberCount} member{society.memberCount == 1 ? '' : 's'}
            </div>
        </div>
    )
}