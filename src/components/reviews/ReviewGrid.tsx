import { REVIEW } from "@/constants/interfaces";
import { useEffect, useState } from "react";
import Loader from "@/components/loader";
import ReviewCard from "./ReviewCard";
import { getReviews } from "@/lib/reviews";


export default function ReviewGrid({ societyId } : { societyId: number}) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [reviews, setReviews] = useState<REVIEW[]>([]);
    

    useEffect( () => {
        
        async function loadReviews(societyId: number) {
            try {
                setLoading(true);
                setReviews(await getReviews(societyId))
                setError(false);
            } catch (e) {
                setError(true);
            } finally {
                setLoading(false);
            }
        }

        loadReviews(societyId);
    }, [])


    return (
        <div className="flex w-[80dvw] w-min-[80dvw] w-max-[80dvw] mt-10">

            {loading && <Loader />}

            {!loading && error && <p>Something went wrong. Please try again</p>}

            {!loading && !error && reviews.length === 0 && <p>No reviews yet.</p>}

            {!loading && !error && reviews.length > 0 &&
                <div className="grid grid-cols-2">
                    {reviews.map( (review) => (
                        <ReviewCard key={review.id} review={review} />
                    ))}
                </div>
            }
        </div>
    );
}