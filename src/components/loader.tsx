

export default function Loader() {
    return (
        <>
        <div className="mt-20 text-center">
         <span className="loader"></span>
            <style>{`
                .loader {
                    width: 48px;
                    height: 48px;
                    border: 5px solid #DDD;
                    border-bottom-color: oklch(76.9% 0.188 70.08);
                    border-radius: 50%;
                    display: inline-block;
                    box-sizing: border-box;
                    animation: rotation 1s linear infinite;
                    }
                    
                    @keyframes rotation {
                        0% {
                            transform: rotate(0deg);
                        }
                        100% {
                            transform: rotate(360deg);
                        }
                    }
            `}</style>
        </div>

        </>
    );
}
