import {
    TableOptions,
    usePagination,
    useTable
} from 'react-table';

// src/components/CustomTable.tsx



export const CustomTable = <D extends object>({ data, columns }: TableOptions<D>) => {
    const { getTableProps, getTableBodyProps, headerGroups, prepareRow, page, // Instead of using 'rows', we'll use page,
        // which has only the rows for the active page

        // The rest of these things are super handy, too ;)
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize }, } =
        useTable({
            columns,
            data,
            initialState: { pageIndex: 2 },
        },
            usePagination);

    return (
        <div className='table-wrapper'>
            <table {...getTableProps()} style={{ border: "solid 1px blue" }}>
                <thead>
                    {headerGroups.map((headerGroup, headerGroupIdx) => (
                        <tr {...headerGroup.getHeaderGroupProps()} key={`${headerGroupIdx}`}>
                            {headerGroup.headers.map((column, columnIdx) => (
                                <th {...column.getHeaderProps()} key={`${headerGroupIdx}-${columnIdx}`}>{column.render("Header")}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row, rowIdx) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()} key={`${rowIdx}`}>
                                {row.cells.map((cell, cellIdx) => {
                                    return <td {...cell.getCellProps()} key={`${rowIdx}-${cellIdx}`}>{cell.render("Cell")}</td>;
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className="pagination">
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {'<<'}
                </button>{' '}
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    {'<'}
                </button>{' '}
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    {'>'}
                </button>{' '}
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    {'>>'}
                </button>{' '}
                <span>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{' '}
                </span>
                <span>
                    | Go to page:{' '}
                    <input
                        type="number"
                        defaultValue={pageIndex + 1}
                        onChange={e => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0
                            gotoPage(page)
                        }}
                        style={{ width: '100px' }}
                    />
                </span>{' '}
                <select
                    value={pageSize}
                    onChange={e => {
                        setPageSize(Number(e.target.value))
                    }}
                >
                    {[10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
        </div>

    );
};
