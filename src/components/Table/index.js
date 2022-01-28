import { useTable, usePagination, useSortBy } from 'react-table'
import DoubleArrowRight from '../../assets/icons/double-arrow.svg'
import ArrowRight from '../../assets/icons/arrow.svg'
import Empty from '../../assets/images/empty.png'

export function Table({columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useSortBy,
    usePagination,
  )

  const cols = headerGroups.map((headerGroup) => headerGroup.headers.length);

  return (
    <>
      <div className="border-2 border-light-silver w-full h bg-white rounded-md overflow-hidden">
        <table {...getTableProps()} className={`w-full ${data.length === 0 && 'h-table-size'}`}>
          {page.length > 0 && <thead className="h-12 bg-space-cadet">
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps(column.getSortByToggleProps())} className="border-r-2 last:border-r-0 border-light-silver">
                      <div className="flex items-center w-full justify-center text-white font-semibold">

                      {column.render('Header')}
                        {column.isSorted
                          ? column.isSortedDesc
                            ? <span style={{ backgroundImage: `url(${ArrowRight})` }} className="ml-2 w-6 h-6 inline-block bg-cover bg-center rotate-90 invert" />
                            : <span style={{ backgroundImage: `url(${ArrowRight})` }} className="ml-2 w-6 h-6 inline-block bg-cover bg-center -rotate-90 invert" />
                          : ''}
                      </div>

                    </th>
                  ))}
                </tr>
              ))}
            </thead>
          }
          <tbody {...getTableBodyProps()}>
            {
              page.length > 0 ? (
                page.map((row, i) => {
                  prepareRow(row)
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map(cell => {
                        return <td {...cell.getCellProps()} className="border-t-2 border-r-2 last:border-r-0 border-light-silver px-4 h-12">{cell.render('Cell')}</td>
                      })}
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan={Number(cols) + 1}>
                    <img src={Empty} alt="Tabela vazia" className="m-auto" />
                    <p className="text-center mt-4 text-xl">não encontramos nenhum registro</p>
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>
        
      </div>
      <div className="pagination flex justify-end items-center mt-4">
     
      <select
        value={pageSize}
        onChange={e => {
          setPageSize(Number(e.target.value))
        }}
        className="bg-transparent"
      >
        {[10, 20, 30, 40, 50].map(pageSize => (
          <option key={pageSize} value={pageSize}>
            Mostrar {pageSize}
          </option>
        ))}
      </select>
      <span className="text-dark-jungle-green mx-8">
        Página {' '}
        <strong>
          {pageIndex + 1} de {pageOptions.length}
        </strong>
      </span>
      <button onClick={() => gotoPage(0)} className="disabled:opacity-20 mx-1" disabled={!canPreviousPage}>
        <span style={{ backgroundImage: `url(${DoubleArrowRight})` }} className="w-6 h-6 block bg-cover bg-center rotate-180" />
      </button>
      <button onClick={() => previousPage()} className="disabled:opacity-20 mx-1" disabled={!canPreviousPage}>
        <span style={{ backgroundImage: `url(${ArrowRight})` }} className="w-6 h-6 block bg-cover bg-center rotate-180" />
      </button>
      <button onClick={() => nextPage()} className="disabled:opacity-20 mx-1" disabled={!canNextPage}>
        <span style={{ backgroundImage: `url(${ArrowRight})` }} className="w-6 h-6 block bg-cover bg-center" />
      </button>
      <button onClick={() => gotoPage(pageCount - 1)} className="disabled:opacity-20 mx-1" disabled={!canNextPage}>
        <span style={{ backgroundImage: `url(${DoubleArrowRight})` }} className="w-6 h-6 block bg-cover bg-center" />
      </button>
    </div>
  </>
  )
}