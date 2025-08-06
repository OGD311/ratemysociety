import { SOCIETY } from "@/constants/interfaces";
import StarRating from "../stars/StarRating";
import { UniNameArticle } from "@/utils/UniName";
import CategoryPill from "../CategoryPill";


export default function SocietyDetails( { society, universityName } : { society: SOCIETY, universityName: string }) {

    return (
        
        <div className="border-2 border-gray-200 shadow-lg bg-white p-6 rounded-2xl w-[30dvw] min-w-[30dvw] max-w-[30dvw] h-auto flex flex-col justify-between">
            <div>
            <h1 className="text-3xl font-bold mb-3 text-indigo-700">{society.name}</h1>
            {society.description ? (
                <p className="text-gray-700">{society.description}</p>
            ) : (
                <span className="text-gray-500">
                    {society.name} is a{' '}
                    <CategoryPill category={ {
                        "name": society.category?.name ?? null,
                        "colour": society.category?.colour ?? null
                    } } /> 
                    {' '}category society at {UniNameArticle(universityName)} <span className="font-semibold">{universityName}</span>
                </span>
            )}
            </div>
            <div className="flex flex-col items-baseline mt-6">
                {society.description ? 
                    <CategoryPill category={ {
                        "name": society.category?.name ?? null,
                        "colour": society.category?.colour ?? null
                    } } /> 
                    :
                    ""
                }
                <StarRating rating={society.rating} />
                <div className="text-md mt-3 text-gray-600">
                    Around <span className="font-semibold">{society.memberCount}</span> member{society.memberCount == 1 ? '' : 's'}
                </div>
            </div>
        </div>
    )
}