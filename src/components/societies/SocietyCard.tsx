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
        <div
            onClick={() => goToSociety(society.name)}
            className="flex flex-col items-center p-5 mt-8 bg-white border border-gray-200 shadow-md rounded-2xl w-60 h-56 cursor-pointer hover:shadow-xl hover:-translate-y-2 transition-transform duration-200"
        >
            <h1 className="mb-3 text-xl font-semibold text-center text-gray-800 truncate w-full">
            {society.name}
            </h1>
            <div className="flex items-center text-lg text-yellow-600 mb-2">
            <span className="font-medium">{Math.round(society.rating * 10) / 10} / 5</span>
            <Image
                src={'/star.svg'}
                alt="Gold star"
                width={20}
                height={20}
                className="mx-1"
            />
            <span className="ml-1 text-gray-600 text-base">({society._count.reviews})</span>
            </div>
            <div className="mt-auto text-base text-gray-700">
            Around <span className="font-medium">{society.memberCount}</span> member{society.memberCount === 1 ? '' : 's'}
            </div>
            <div className="mt-auto text-sm text-gray-500">
                Last reviewed: {new Date(society.updated_at).toLocaleDateString('en-GB')}
            </div>
        </div>
    )
}