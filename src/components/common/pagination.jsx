import React from "react";

const Pagination = (props) => {
  const { handlePageClick, currentPage, totalPages, pageLinks, setCurrentPage } = props;

  return (
    <div>
      <div class="table-pagination">
        <ul class="pagination  justify-content-end">
          <li class="page-item">
            <a
              class={currentPage === 1 ? "page-link disabled _cursor" : "page-link _cursor"}
              aria-label="Previous"
              onClick={() => {             
                handlePageClick(currentPage - 1)
              }}
            >
              <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 13L1 7L7 1" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </a>
          </li>
          {pageLinks.map((pageNumber) => (
            <li key={pageNumber} className={pageNumber === currentPage ? "active page-item " : "page-item "}>
              <a class="page-link _cursor" onClick={() => handlePageClick(pageNumber)}>
                {pageNumber}
              </a>
            </li>
          ))}

          <li class="page-item">
            <a
              class={currentPage === totalPages ? "page-link disabled _cursor" : "page-link _cursor"}
              aria-label="Next"
              onClick={() => {
                handlePageClick(currentPage + 1);
              }}
            >
              <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 13L7 7L1 1" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Pagination;
