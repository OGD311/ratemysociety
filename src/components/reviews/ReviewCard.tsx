import { REVIEW } from "@/constants/interfaces";


export default function ReviewCard({ review } : { review: REVIEW }) {

    return (
        <div className="bg-gray-500 p-4 m-2 w-auto">
            <div className="flex justify-between">
                <p>{ review.rating } / 5</p>
                <p>Posted on { new Date(review.posted_at).toLocaleDateString('en-GB') }</p>
            </div>
            <p className="mt-3">{ review.comment }</p>
        </div>
    )
}