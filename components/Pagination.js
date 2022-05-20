import React, { useState } from 'react';
import { CPagination, CPaginationItem } from '@coreui/react';

const Pagination = ({ totalPage, currentPage, onPageChange = () => {} }) => {
    const [activeIndex, setActiveIndex] = useState(1);
    const generateItems = () => {
        if(totalPage && currentPage && currentPage < totalPage){
            let items = [];
            if(totalPage - currentPage < 5){
                for (let i = currentPage; i <= totalPage; i++){
                    items.push(
                        <CPaginationItem 
                            active={activeIndex === i}
                            onClick={() => setActiveIndex(i)}>
                            {i}
                        </CPaginationItem>
                    )
                }
            }else{
                for (let i = currentPage; i <= currentPage + 2; i++) {
                    items.push(
                        <CPaginationItem 
                            active={activeIndex === i}
                            onClick={() => setActiveIndex(i)}>
                            {i}
                        </CPaginationItem>
                    )
                }
                items.push(
                    <CPaginationItem>
                        ...
                    </CPaginationItem>,
                    <CPaginationItem active={activeIndex === totalPage}>
                        {totalPage}
                    </CPaginationItem>
                )
            }
            return items;
        }
        return null
    }

    return (
        <CPagination>
            <CPaginationItem aria-label="Previous">
            </CPaginationItem>
            {generateItems()}
            <CPaginationItem aria-label="Next">
            </CPaginationItem>
        </CPagination>
    )
}