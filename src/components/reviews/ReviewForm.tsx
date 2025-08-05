import { submitReview } from '@/lib/reviews';
import React, { useEffect, useRef, useState } from 'react';

export default function ReviewForm({ societyId } : { societyId: number}) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
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
                            sitekey: "1x00000000000000000000AA"
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
        }

        
    }

    return (
        <>
        <form onSubmit={handleSubmit} className='flex flex-col w-2/3 mt-10'>
            <div>
                <label>
                    Rating (0-5):
                    <input type="number" name="rating" min={0} max={5} required />
                </label>
            </div>
            <div>
                <label>
                    Review:
                    <input type="text" name="review" maxLength={255} />
                </label>
            </div>
            
            <div ref={cfWidget} className="cf-turnstile"></div>

            <button type="submit" disabled={loading}>{!loading && "Submit"}{loading && "Submitting..."}</button>
            {error && <p className='text-red-500'>Error submitting review - please try again</p>}
        </form>
        </>
    );
}