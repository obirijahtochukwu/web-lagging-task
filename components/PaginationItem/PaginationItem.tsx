import React from 'react'
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import styles from './styles.module.css';


const PaginationItem = ({
    currentPage=1,
    updateCurrentPage=()=>{},
    totalItems=1,
    itemsPerPage=1,
}: {
    currentPage: number;
    updateCurrentPage?: (page: number) => void;
    totalItems: number;
    itemsPerPage: number;
}) => {
    
    const handleGoForward = () => {
        if (currentPage < Math.ceil(totalItems / itemsPerPage)) updateCurrentPage(currentPage + 1)
    }

    const handleGoBackward = () => {
        if (currentPage <= 1) return
        
        updateCurrentPage(currentPage - 1);
    }

    return <>
        <section className={styles.custom__Pagination__Wrap}>
            <IoChevronBack
                size={
                    currentPage <=1 ?
                        '0.8rem'
                    :
                    '1.2rem'
                }
                cursor={
                    currentPage <=1 ?
                        'default'
                    :
                    'pointer'
                }
                color={
                    currentPage <=1 ?
                        '#808080'
                    :
                    '#000'
                }
                onClick={handleGoBackward}
            />
            
            <section className={styles.pagination__Content}>
                <p className={styles.pagination__Detail}>
                    <span className={styles.current__Page}>{currentPage}</span>
                    <span>/</span>
                    <span>
                        {
                            totalItems < itemsPerPage ?
                                1
                            :
                            Math.ceil(totalItems / itemsPerPage)
                        }
                    </span>
                </p>

                <section className={styles.progress__Bar}>
                    <section
                        className={styles.progress}
                        style={{
                            width: `${Number(currentPage / Math.ceil(totalItems / itemsPerPage)) * 100}%`
                        }}
                    ></section>
                </section>
            </section>

            <IoChevronForward
                size={
                    currentPage < Math.ceil(totalItems / itemsPerPage) ?
                        '1.2rem'
                    :
                    '0.8rem'
                }
                cursor={
                    currentPage < Math.ceil(totalItems / itemsPerPage) ?
                        'pointer'
                    :
                    'default'
                }
                color={
                    currentPage < Math.ceil(totalItems / itemsPerPage) ?
                        '#000'
                    :
                    '#808080'
                }
                onClick={handleGoForward}
            />
        </section>
    </>
}

export default PaginationItem;