interface PaginationProps {
    currentPage: number;
    hasNextPage: boolean;
}

export default function Pagination({ currentPage, hasNextPage }:PaginationProps) {
    return (
        <div className="mt-4 flex justify-between">
            {currentPage > 1 && (
                <a 
                    href={`?page=${currentPage - 1}`}
                    className="bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                >
                    Page Précédente
                </a>
            )}
            
            
            {hasNextPage && (
                <>
                    <span className="self-center">Page {currentPage}</span>
                    <a 
                        href={`?page=${currentPage + 1}`}
                        className="bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                    >
                        Page Suivante
                    </a>
                </>
            )}
        </div>
    );
}
