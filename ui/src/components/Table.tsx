import React from 'react';
import { useState, useMemo } from 'react';

// Define a proper type for items with an ID and the necessary fields
interface QuoteItem {
  quote: string;
  author: string;
  tags: string[];
  id: number;
  [key: string]: any; // Allows dynamic access like item[sortConfig.key]
}

// Define types for sorting state
type SortDirection = 'asc' | 'desc' | null;
type SortConfig = {
  key: string | null;
  direction: SortDirection;
};


export default function Table({ items }: { items: QuoteItem[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'author', direction: 'asc' });
  // State to track which row's ID is currently expanded (null if none)
  const [expandedRowId, setExpandedRowId] = useState<number | null>(null);


  // Function to handle sorting logic
  const sortedItems = useMemo(() => {
    let sortableItems = [...items];

    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        const aValue = a[sortConfig.key!];
        const bValue = b[sortConfig.key!];

        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  // Function to handle header clicks for sorting
  const requestSort = (key: string) => {
    let direction: SortDirection = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
    setCurrentPage(1);
  };

  // Pagination logic uses the *sorted* data
  const totalPages = Math.ceil(sortedItems.length / itemsPerPage);

  const currentTableData = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return sortedItems.slice(indexOfFirstItem, indexOfLastItem);
  }, [currentPage, sortedItems, itemsPerPage]);

  // Handlers for pagination controls
  const goToNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const goToPreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  // function to toggle the detail panel
  const toggleDetails = (id: number) => {
    // If the clicked row is already open, close it (set null), otherwise open it (set its ID)
    setExpandedRowId(expandedRowId === id ? null : id);
  };

  if (items.length === 0) {
    return <p>No items to display.</p>;
  }

  return (
    <div className="flex flex-col">
      <table className="w-full border">
        <thead>
        <tr className="bg-gray-100">
          <th className="p-2">Quote</th>
          <th className="p-2 cursor-pointer" onClick={() => requestSort('author')}>
            Author
            {sortConfig.key === 'author' && (sortConfig.direction === 'asc' ? ' ↑' : ' ↓')}
          </th>
        </tr>
        </thead>
        <tbody>
        {currentTableData.map((item: QuoteItem) => (
            // Use React.Fragment to group the main row and the potential detail row
            <React.Fragment key={item.id}>
              {/* Main table row */}
              <tr
                key={item.id}
                onClick={() => toggleDetails(item.id)}
                className="border-t hover:bg-gray-100 cursor-pointer transition duration-150"
              >
                <td className="p-2">{item.quote}</td>
                <td className="p-2">{item.author}</td>
              </tr>

              {/* Detail panel row (conditionally rendered) */}
              {expandedRowId === item.id && (
                <tr>
                  {/* colSpan={2} makes this cell span both the Quote and Author columns */}
                  <td colSpan={2} className="p-4 bg-gray-50 border-b">
                    <div className="text-sm text-gray-600">
                      <strong>Tags:</strong>
                      <p>{item.tags.join(", ")}</p>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
}



// export default function Table({ items }: any) {
//   return (
//     <table className="w-full border">
//       <thead>
//         <tr className="bg-gray-100">
//           <th>Quote</th>
//           <th>Author</th>
//           <th>Tags</th>
//         </tr>
//       </thead>
//       <tbody>
//         {items.slice(0, 5).map((i: any, idx: number) => (
//           <tr key={idx}>
//             <td>{i.quote}</td>
//             <td>{i.author}</td>
//             <td>{i.tags.join(", ")}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// }


