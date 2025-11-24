export default function Footer() {
    return (
        <footer className="py-12 text-center border-t border-white/5 bg-black/20 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-zinc-500 text-sm">
                    Copyright © 2025 <a href="https://chamburr.com" target="_blank" rel="noopener" className="hover:text-white transition-colors">Han Cen</a>
                </p>
                <div className="flex items-center gap-6">
                    <a href="/terms" className="text-sm text-zinc-500 hover:text-white transition-colors">Terms</a>
                    <a href="/privacy" className="text-sm text-zinc-500 hover:text-white transition-colors">Privacy</a>
                </div>
            </div>
        </footer>
    );
}
