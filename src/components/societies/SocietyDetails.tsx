import { SOCIETY } from "@/constants/interfaces";
import StarRating from "../StarRating";
import { UniNameArticle } from "@/utils/UniName";


export default function SocietyDetails( { society, universityName } : { society: SOCIETY, universityName: string }) {

    return (
        
        <div className="border-2 p-4 rounded-xl w-[25dvw] min-w-[25dvw] max-w-[25dvw] h-64 min-h-64 max-h-64">    
            <h1 className="text-2xl mb-5">{society.name}</h1>
            {society.description && <p>{society.description}</p>}
            {!society.description && <p>{society.name} is a society of category {"category"} at {UniNameArticle(universityName)} {universityName}</p>}

            <div className="mt-5 text-md">
                Around {society.memberCount} member{society.memberCount == 1 ? '' : 's'}
            </div>
            <StarRating rating={society.rating} />
        </div>
    )
}