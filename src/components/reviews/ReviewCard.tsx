import { REVIEW } from "@/constants/interfaces";
import StarRating from "../StarRating";


export default function ReviewCard({ review } : { review: REVIEW }) {

    return (
        <div className="bg-gray-400 p-4 m-2 text-pretty break-words min-h-50 max-h-50 h-50">
            <div className="flex justify-between">
                <StarRating rating={review.rating} />
                <p>Posted on { new Date(review.posted_at).toLocaleDateString('en-GB') }</p>
            </div>
            {review.comment && 
                <p className="mt-3">{ review.comment }</p>
            }
            {!review.comment &&
                <p className="mt-3">No Comment Left</p>
            }
        </div>
    )
}