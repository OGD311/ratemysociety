"use client";
import { UNIVERSITY } from "@/constants/interfaces"
import Image from "next/image"
import { generateURLSafe } from "@/utils/URLSafe";

export default function UniDetails( { university } : { university: UNIVERSITY }) {

    const safeName = generateURLSafe(university.name);

    return (
        <div className="flex border-2 min-w-full max-w-full w-[90dvw] h-64 p-10 pt-5 pb-5 rounded-2xl shadow-lg shadow-gray-500 ">
            <div className="h-full flex flex-col">
                <h1 className="mt-2 mb-2 text-2xl text-left">
                    { university.name }
                </h1>
                <p className="text-wrap w-3/4">
                    { university.description }
                </p>
                <div className="flex text-lg mt-auto text-yellow-600">
                    <p className="mr-2">
                        {university.rating} / 5
                    </p>
                    <Image
                        src={'star.svg'}
                        alt="Image of gold star"
                        width={20}
                        height={20}
                    />
                </div>
                <div className="mt-2 text-lg">
                    {university.societyCount} societ{university.societyCount == 1 ? 'y' : 'ies'}
                </div>
            </div>
            <Image 
                src={`/university/${safeName}.svg`}
                alt={"Logo for " + university.name}
                width={300}
                height={300}
                className="ml-auto"
            />
        </div>
    );

}