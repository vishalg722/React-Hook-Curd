import React, { Component, Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useStateWithCallback from 'use-state-with-callback';

const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';
/**
 * Helper method for creating a range of numbers
 * range(1, 5) => [1, 2, 3, 4, 5]
 */
const range = (from, to, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }
  return range;
}

function Pagination(props) {

  //const { totalRecords2 = null, pageLimit2 = 30, pageNeighbours2 = 0 } = props;

    let pageLimit = typeof props.pageLimit === 'number' ? props.pageLimit : 30;
    let totalRecords = typeof props.totalRecords === 'number' ? props.totalRecords  : 0;

    // pageNeighbours can be: 0, 1 or 2
    let pageNeighbours = typeof props.pageNeighbours === 'number'
      ? Math.max(0, Math.min(props.pageNeighbours, 2))
      : 0;
    
    let totalPages = Math.ceil(totalRecords / pageLimit);

    const [pageInfo , setPageInfo] = useState( {currentPage : 1,  pageNum : 0});
    const [check , setCheck] = useState(1);
    // const [currentPage , setCurrentPage] = useState(1);
    // const [pageNum , setCurrentPage] = useState(1);
    
    
    useEffect(() =>{
      gotoPage(1);
    },[])
  
   const gotoPage = page => {
    const { onPageChanged = f => f } = props;
    const currentPage = Math.max(0, Math.min(page, totalPages));

    const paginationData = {
      currentPage,
      totalPages: totalPages,
      pageLimit: pageLimit,
      totalRecords: totalRecords
    };
    
    setPageInfo({...pageInfo ,currentPage: currentPage});

    onPageChanged(paginationData)
    console.log(onPageChanged(paginationData))
  }

   const handleClick = page => evt => {
    evt.preventDefault();
    gotoPage(page);
  }

  const handleMoveLeft = evt => {
    evt.preventDefault();
    
    gotoPage(pageInfo.currentPage - (pageNeighbours * 2) - 1);
  }

  const handleMoveRight = evt => {
    evt.preventDefault();
    gotoPage(pageInfo.currentPage + (pageNeighbours * 2) + 1);
  }

  const onChange = evt => {
    evt.preventDefault();
    setPageInfo({...pageInfo ,pageNum: evt.target.value});
  }

  const keyPress = event => {
    if(event.keyCode == 13){
       event.preventDefault();
       gotoPage(pageInfo.pageNum);
    }
 }

  /**
   * Let's say we have 10 pages and we set pageNeighbours to 2
   * Given that the current page is 6
   * The pagination control will look like the following:
   *
   * (1) < {4 5} [6] {7 8} > (10)
   *
   * (x) => terminal pages: first and last page(always visible)
   * [x] => represents current page
   * {...x} => represents page neighbours
   */
  const fetchPageNumbers = () => {

    let currentPage = pageInfo.currentPage;

    /**
     * totalNumbers: the total page numbers to show on the control
     * totalBlocks: totalNumbers + 2 to cover for the left(<) and right(>) controls
     */
    const totalNumbers = (pageNeighbours * 2) + 3;
    const totalBlocks = totalNumbers + 2;
    if (totalPages > totalBlocks) {

      const startPage = Math.max(2, currentPage - pageNeighbours);
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);
      let pages = range(startPage, endPage);
      
      /**
       * hasLeftSpill: has hidden pages to the left
       * hasRightSpill: has hidden pages to the right
       * spillOffset: number of hidden pages either to the left or to the right
       */
      const hasLeftSpill = startPage > 2;
      const hasRightSpill = (totalPages - endPage) > 1;
      const spillOffset = totalNumbers - (pages.length + 1);
      
      
      switch (true) {
        // handle: (1) < {5 6} [7] {8 9} (10)
        case (hasLeftSpill && !hasRightSpill): {
          const extraPages = range(startPage - spillOffset, startPage - 1);
          pages = [LEFT_PAGE, ...extraPages, ...pages];
          
          break;
        }

        // handle: (1) {2 3} [4] {5 6} > (10)
        case (!hasLeftSpill && hasRightSpill): {
          const extraPages = range(endPage + 1, endPage + spillOffset);
          pages = [...pages, ...extraPages, RIGHT_PAGE];
          break;
        }

        // handle: (1) < {4 5} [6] {7 8} > (10)
        case (hasLeftSpill && hasRightSpill):
        default: {
          pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
          break;
        }
      }
      
      return [1, ...pages, totalPages];
    
    }
    return range(1, totalPages);

  }

    if (!totalRecords || totalPages === 1) return null;

    const { currentPage } = pageInfo;
    const pages = fetchPageNumbers();
    
    return (
      <Fragment>
        <nav aria-label="Countries Pagination">
          <ul className="pagination">
            { pages.map((page, index) => {

              if (page === LEFT_PAGE) return (
                <li key={index} className="page-item">
                  <a className="page-link" href="#" aria-label="Previous" onClick={handleMoveLeft}>
                    <span aria-hidden="true">&laquo;</span>
                    <span className="sr-only">Previous</span>
                  </a>
                </li>
              );

              if (page === RIGHT_PAGE) return (
                <li key={index} className="page-item">
                  <a className="page-link" href="#" aria-label="Next" onClick={handleMoveRight}>
                    <span aria-hidden="true">&raquo;</span>
                    <span className="sr-only">Next</span>
                  </a>
                </li>
              );

              return (
                <li key={index} className={`page-item${ currentPage === page ? ' active' : ''}`}>
                  <a className="page-link" href="#" onClick={ handleClick(page) }>{ page }</a>
                </li>
              );

            }) }
            <input className = "gotoPage ml-3" min="1" placeholder={'Go to Page'} type="number" name="gotoPage" onChange = { onChange } onKeyDown={keyPress} />
          </ul>
        </nav>
      </Fragment>
    );

}

Pagination.propTypes = {
  totalRecords: PropTypes.number.isRequired,
  pageLimit: PropTypes.number,
  pageNeighbours: PropTypes.number,
  onPageChanged: PropTypes.func
};

export { Pagination };