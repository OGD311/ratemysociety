
import { submitReview } from '@/lib/reviews';
import React from 'react';

export default function ReviewForm({ societyId } : { societyId: number}) {

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const rating = (form.elements.namedItem('rating') as HTMLInputElement)?.value;
        console.log('Form submitted for societyId:', societyId, 'Rating:', rating);

        submitReview(societyId, {
            "rating": 0,
            "comment": "",
            "posted_at": new Date(),
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Rating (0-5):
                    <input type="number" name="rating" min={0} max={5} required />
                </label>
            </div>
            <div>
                <label>
                    Review:
                    <input type="text" name="review" required />
                </label>
            </div>
            <button type="submit">Submit</button>
        </form>
    );
}