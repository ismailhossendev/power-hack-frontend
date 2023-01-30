import React from 'react';

const Pagination = ({ pages, currentPage, setCurrentPage }) => {
    const normalClass = "inline-flex items-center justify-center w-8 h-8 text-sm border rounded shadow-md dark:bg-gray-900 dark:border-gray-800"
    const activeClass = "inline-flex items-center justify-center w-8 h-8 text-sm font-semibold border rounded shadow-md dark:bg-gray-900 dark:text-violet-400 dark:border-violet-400"
    return (
        <div className="flex justify-center space-x-1 dark:text-gray-100">
            {

                [...Array(pages).keys()].map((page) => {
                    return (
                        <button key={page}
                            onClick={() => setCurrentPage(page)}
                            className={page === currentPage ? activeClass : normalClass} >
                            {page + 1}
                        </button>
                    )
                })

            }

        </div>
    );
};

export default Pagination;