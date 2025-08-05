import { REVIEW } from "@/constants/interfaces";
import StarRating from "../StarRating";


export default function ReviewCard({ review } : { review: REVIEW }) {

    return (
        <div className="bg-white shadow-md rounded-lg p-6 m-4 min-h-54 max-h-54 h-54 flex flex-col justify-between transition-transform hover:scale-105">
            <div className="flex justify-between items-center mb-2">
            <StarRating rating={review.rating} />
            <span className="text-sm text-gray-500">
                {new Date(review.posted_at).toLocaleDateString('en-GB')}
            </span>
            </div>
            <div className="flex-1 flex items-center">
            {review.comment ? (
                <p className="mt-2 text-gray-800 break-all">{review.comment}</p>
            ) : (
                <p className="mt-2 italic text-gray-400">No Comment Left</p>
            )}
            </div>
        </div>
    )
}