import Link from 'next/link';
import React from 'react';

interface propType {
    page: number;
    pageNumbers: (string | number)[];
    totalPages: number;
    query?: string; // Make query optional
    path: string;
}

const Pagination = ({ path, page, pageNumbers, totalPages, query }: propType) => {
    const buildUrl = (pageNumber: number | string) => {
        const baseUrl = `/${path}?page=${pageNumber}`;
        return query ? `${baseUrl}&query=${query}` : baseUrl;
    };

    return (
        <div className='flex justify-center items-center gap-1 md:gap-2 md:mx-2 mt-10'>
            {page > 1 && (
                <Link rel='canonical' href={buildUrl(page - 1)}>
                    <button className='px-2 py-1 text-gray-700 border-[1px] rounded-[6px] border-gray-300 text-xs md:text-base'>
                        Previous
                    </button>
                </Link>
            )}
            {pageNumbers?.map((number: any, index: number) =>
                number === '...' ? (
                    <span key={index} className='px-1 md:px-2 py-1 text-xs md:text-base'>
                        ...
                    </span>
                ) : (
                    <Link rel='canonical' key={index} href={buildUrl(number)}>
                        <button
                            className={`px-2 py-1 ${number === page ? 'bg-gray-300' : 'text-gray-700'} border-[1px] rounded-[6px] border-gray-300 text-xs md:text-base`}
                        >
                            {number}
                        </button>
                    </Link>
                )
            )}
            {totalPages && page < totalPages && (
                <Link rel='canonical' href={buildUrl(page + 1)}>
                    <button className='px-2 py-1 text-gray-700 border-[1px] rounded-[6px] border-gray-300 text-xs md:text-base'>
                        Next
                    </button>
                </Link>
            )}
        </div>
    );
};

export default Pagination;