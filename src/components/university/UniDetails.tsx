"use client";
import { UNIVERSITY } from "@/constants/interfaces"
import Image from "next/image"
import { generateDirectURL, generateURLSafe } from "@/utils/URLSafe";
import StarRating from "../stars/StarRating";
import { RiShareBoxFill } from "react-icons/ri";

export default function UniDetails({ university }: { university: UNIVERSITY }) {
    const safeName = generateURLSafe(university.name);

    return (
        <div className="flex flex-col md:flex-row border-2 border-gray-200 w-[90dvw] max-w-[90dvw] min-w-[90dvw] min-h-64 p-6 sm:p-8 md:p-10 rounded-2xl shadow-md">
            <div className="flex flex-col h-full w-full md:w-2/3">
                <h1 className="mt-2 mb-2 text-xl sm:text-2xl text-left md:text-left">
                    {university.name}
                </h1>
                <p className="text-wrap w-full text-left md:text-left  text-sm sm:text-base">
                    {university.description}
                </p>
                <div className="mt-6 flex md:hidden justify-center">
                    <Image
                        src={`/university/${safeName}.svg`}
                        alt={"Logo for " + university.name}
                        width={200}
                        height={200}
                        className="h-auto"
                    />
                </div>
                <div className="flex justify-center md:justify-start text-base sm:text-lg mt-4 text-yellow-600">
                    <StarRating rating={university.rating} />
                </div>
                <div className="mt-4 text-sm sm:text-base flex flex-col md:flex-row sm:items-center sm:flex-wrap gap-2 sm:gap-4 text-center md:text-left md:items-center">
                    <span>{university.societyCount} Societ{university.societyCount === 1 ? 'y' : 'ies'}</span>
                    <span>Last updated: {university.updated_at?.toLocaleDateString?.()}</span>

                    <div className="flex justify-center md:justify-start gap-2 sm:mt-0 flex-wrap">
                        {university.website &&
                            <a
                                href={generateDirectURL(university.website)}
                                className="group inline-flex items-center border-0 rounded-lg p-2 bg-blue-500 text-white hover:bg-blue-800 transition duration-200"
                                target="_blank"
                            >Website <RiShareBoxFill className="ml-2" />
                            </a>
                        }
                        {university.studentsUnion &&
                            <a
                                href={generateDirectURL(university.studentsUnion)}
                                className="inline-flex items-center border-0 rounded-lg p-2 bg-red-500 text-white hover:bg-red-800 transition duration-200"
                                target="_blank"
                            >Students Union <RiShareBoxFill className="ml-2" /></a>
                        }
                    </div>
                </div>
            </div>

            <div className="hidden md:flex justify-center items-center md:ml-auto">
                <Image
                    src={`/university/${safeName}.svg`}
                    alt={"Logo for " + university.name}
                    width={300}
                    height={300}
                    className="h-auto ml-5"
                />
            </div>
        </div>
    );
}
