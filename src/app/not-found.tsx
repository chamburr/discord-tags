import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/20 blur-[120px] rounded-full -z-10 pointer-events-none" />

            <div className="text-center space-y-8 px-6">
                {/* Error Message */}
                <div className="space-y-4">
                    <h1 className="text-7xl sm:text-8xl font-bold text-white tracking-tight">
                        404
                    </h1>
                    <h2 className="text-2xl sm:text-3xl font-semibold text-zinc-300">
                        Page Not Found
                    </h2>
                    <p className="text-zinc-400 text-lg max-w-md mx-auto">
                        The page you&apos;re looking for doesn&apos;t exist or has been moved.
                    </p>
                </div>

                {/* CTA Button */}
                <div className="pt-4">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-all shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
