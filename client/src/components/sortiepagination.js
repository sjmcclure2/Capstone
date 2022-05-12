// import React, { useState } from "react";

// function UsePagination( /*{sortie}*/ , itemsPerPage) {
//   const [currentPage, setCurrentPage] = useState(1);
//   const maxPage = Math.ceil(/*sortie*/.length / itemsPerPage);

//   function currentData() {
//     const begin = (currentPage - 1) * itemsPerPage;
//     const end = begin + itemsPerPage;
//     return /*sortie*/.slice(begin, end);
//   }

//   function next() {
//     setCurrentPage(currentPage => Math.min(currentPage + 1, maxPage));
//   }

//   function prev() {
//     setCurrentPage(currentPage => Math.max(currentPage - 1, 1));
//   }

//   function jump(page) {
//     const pageNumber = Math.max(1, page);
//     setCurrentPage(currentPage => Math.min(pageNumber, maxPage));
//   }

//   return { next, prev, jump, currentData, currentPage, maxPage };
// }

// export default UsePagination;