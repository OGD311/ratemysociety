import { submitReview } from '@/lib/reviews';
import React, { useEffect, useRef, useState } from 'react';

export default function ReviewForm({ societyId } : { societyId: number}) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const cfWidget = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cfScript = document.createElement('script');
        cfScript.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
        cfScript.async = true;
        cfScript.onload = () => {
            // @ts-ignore
            if (window.turnstile && cfWidget.current) {
                if (!cfWidget.current.hasChildNodes()) {
                    // @ts-ignore
                    window.turnstile.render(
                        cfWidget.current, 
                        {
                            sitekey: "3x00000000000000000000FF"
                        }
                    );
                }
            }
        };
        document.body.appendChild(cfScript);    
    }, []);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        
        const rating = (form.elements.namedItem('rating') as HTMLInputElement)?.value;
        const review = (form.elements.namedItem('review') as HTMLInputElement)?.value;

        const turnstileToken = (form.elements.namedItem('cf-turnstile-response') as HTMLInputElement)?.value;
        
        if (!turnstileToken) {
            setError(true);
            setErrorMessage("Please complete verification");
            return;
        }

        try {
            setLoading(true);

            await submitReview(societyId, {
                "rating": parseInt(rating),
                "comment": review
            }, turnstileToken)

            window.location.reload();
        
        } catch (err) {
            setLoading(false);
            setError(true);
            if (err && typeof err === 'object' && 'message' in err) {
                setErrorMessage((err as { message: string }).message);
            } else {
                setErrorMessage('An unexpected error occurred.');
            }
        }

        
    }

    return (
        <>
        <form onSubmit={handleSubmit} className='flex flex-col w-2/3 border-2 p-3 rounded-2xl min-h-max justify-center'>
            <div className="mt-1 flex flex-row items-center gap-2">
                <label htmlFor="rating" className="font-semibold text-gray-700">
                    Rating (0-5):
                </label>
                <input
                    id="rating"
                    type="number"
                    name="rating"
                    min={0}
                    max={5}
                    required
                    className="w-24 ml-auto px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>
            <div className="mt-4 flex flex-col gap-2">
                <label htmlFor="review" className="font-semibold text-gray-700">
                    Review:
                </label>
                <input
                    id="review"
                    type="text"
                    name="review"
                    maxLength={255}
                    className="px-3 mb-5 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Share your thoughts..."
                />
            </div>
            <div ref={cfWidget} className="cf-turnstile"></div>

            <button
                type="submit"
                disabled={loading}
                className={`px-4 py-2 mt-auto rounded bg-blue-500 text-white ${loading ? "bg-gray-300 text-gray-400 cursor-not-allowed" : "hover:bg-blue-600"}`}
            >
                {!loading && "Submit"}
                {loading && "Submitting..."}
            </button>
            {error && errorMessage == "" && <p className='text-red-500'>Error submitting review - please try again</p>}
            {error && <p className='text-red-500'>{errorMessage}</p>}
        </form>
        </>
    );
}