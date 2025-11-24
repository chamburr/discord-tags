'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber.toString());
        return `/?${params.toString()}`;
    };

    const handlePageChange = (pageNumber: number) => {
        router.push(createPageURL(pageNumber), { scroll: false });

        // Scroll to the tag grid
        const tagGrid = document.getElementById('tag-grid');
        if (tagGrid) {
            const offset = 100; // Add some offset for the header
            const elementPosition = tagGrid.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-center items-center space-x-4 mt-12">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage <= 1}
                className="p-2 rounded-lg bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-all"
                aria-label="Previous page"
            >
                <ChevronLeft className="w-5 h-5" />
            </button>

            <span className="text-zinc-400 text-sm">
                Page <span className="text-white font-medium">{currentPage}</span> of{' '}
                <span className="text-white font-medium">{totalPages}</span>
            </span>

            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className="p-2 rounded-lg bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-all"
                aria-label="Next page"
            >
                <ChevronRight className="w-5 h-5" />
            </button>
        </div>
    );
}
