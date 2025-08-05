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
        <div onClick={() => goToSociety(society.name)} className="flex flex-col items-center p-4 pt-2 mt-10 border-2 border-gray-400 shadow-lg max-w-54 min-w-54 w-54 max-h-48 min-h-48 h-48 rounded-xl shadow-gray-500 hover:-translate-y-3.5 hover:shadow-2xl transition duration-200 cursor-pointer">
            <h1 className="mt-auto mb-2 text-2xl text-center">
                { society.name }
            </h1>
            <div className="flex text-lg text-yellow-600 mt-auto">
                <p className="mr-2">
                    {Math.round(society.rating * 10) / 10} / 5
                </p>
                <Image
                    src={'star.svg'}
                    alt="Image of gold star"
                    width={20}
                    height={20}
                />
                <p className="ml-2 text-black">
                    ({society._count.reviews})
                </p>
            </div>
            <div className="mt-2 text-lg">
                Around {society.memberCount} member{society.memberCount == 1 ? '' : 's'}
            </div>
        </div>
    )
}