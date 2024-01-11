import React, { useState, useMemo } from 'react';

interface Row {
    [key: string]: any;
}

interface Column {
    header: string;
    value: string;
}

interface SimpleTableProps {
    data: Row[];
    columns: Column[];
    onSelect: (row: Row) => void;
}

const ROWS_PER_PAGE = 5;

function SimpleTable({ data, columns, onSelect }: SimpleTableProps) {
    const [filter, setFilter] = useState('');
    const [sortColumn, setSortColumn] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(0);

    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(event.target.value);
    };

    const handleSortChange = (column: string) => {
        setSortColumn(column);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const filteredData = useMemo(() => {
        return data.filter((row) =>
            columns.some((column) => String(row[column.value]).toLowerCase().includes(filter.toLowerCase()))
        );
    }, [data, columns, filter]);

    const sortedData = useMemo(() => {
        if (!sortColumn) return filteredData;
        return [...filteredData].sort((a, b) => String(a[sortColumn]).localeCompare(String(b[sortColumn])));
    }, [filteredData, sortColumn]);

    const pagedData = useMemo(() => {
        const pages = [];
        for (let i = 0; i < sortedData.length; i += ROWS_PER_PAGE) {
            pages.push(sortedData.slice(i, i + ROWS_PER_PAGE));
        }
        return pages;
    }, [sortedData]);

    return (
        <div>
            <input type="text" value={filter} onChange={handleFilterChange}
                className="w-full p-2 mb-4 rounded shadow"
                placeholder='Buscar...'
            />
            <div className='px-4'>
            <table className="w-full table-auto">
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th key={column.value} onClick={() => handleSortChange(column.value)} className='text-left'>
                                {column.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {pagedData[currentPage]?.map((row, index) => (
                        <tr key={index}>
                            {columns.map((column) => (
                                <td key={column.value}>{row[column.value]}</td>
                            ))}
                            <td className='text-end'>
                                <button
                                    type="button"
                                    onClick={() => onSelect(row)}
                                    className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-700 transition-colors duration-200"
                                >
                                    Seleccionar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="mt-4 flex gap-1 ">
                {pagedData.map((_, i) => (
                    <button type="button" key={i} onClick={() => handlePageChange(i)} className="px-2 py-1 bg-blue-500 text-white rounded shadow hover:bg-blue-700 transition-colors duration-200">
                        {i + 1}
                    </button>
                ))}
            </div></div>
        </div>
    );
}

export default SimpleTable;