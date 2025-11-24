'use client';

import { Search as SearchIcon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { useState, useEffect } from 'react';

export default function Search() {
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const [searchValue, setSearchValue] = useState(searchParams.get('q') || '');

    // Sync input value with URL params when navigating
    useEffect(() => {
        setSearchValue(searchParams.get('q') || '');
    }, [searchParams]);

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('q', term);
        } else {
            params.delete('q');
        }
        params.delete('page'); // Reset to page 1 on new search
        const queryString = params.toString();
        replace(queryString ? `/?${queryString}` : '/', { scroll: false });
    }, 300);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchValue(value);
        handleSearch(value);
    };

    return (
        <div className="w-full max-w-2xl mx-auto group relative z-20">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl opacity-20 group-hover:opacity-40 blur transition duration-500" />
            <div className="relative flex items-center bg-zinc-900/90 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden transition-all shadow-2xl shadow-black/50">
                <div className="pl-4 text-zinc-500 group-focus-within:text-indigo-400 transition-colors">
                    <SearchIcon className="w-5 h-5" />
                </div>
                <input
                    type="text"
                    placeholder="Search for tags..."
                    className="w-full bg-transparent border-none outline-none text-white placeholder-zinc-500 px-4 py-4 text-base"
                    onChange={handleChange}
                    value={searchValue}
                    autoComplete="off"
                />
            </div>
        </div>
    );
}
