import React from 'react'
import styles from './styles.module.css'
import { HiOutlineChevronDown } from 'react-icons/hi2';
import { IoTrashOutline } from 'react-icons/io5';
import { HiOutlineChatAlt2 } from 'react-icons/hi';


const FaqsList = ({
    faqs=[],
    showDeleteIcon=false,
    handleDeleteFaq=()=>{},
}: {
    faqs: IPlaceFaq[];
    showDeleteIcon?: boolean;
    handleDeleteFaq?: (val: number | string | undefined) => void;
}) => {

    return <>
        <section className={styles.list__Wrap}>
            {
                React.Children.toArray(faqs.map(faq => {
                    return <details
                        key={faq.id}
                        className={styles.details__Wrap}
                    >
                        <summary>
                            <section className={styles.question__Wrap}>
                                <section className={styles.icon__Wrap}>
                                    <HiOutlineChatAlt2 />
                                </section>
                                <span className={styles.question}>{faq.question}</span>
                            </section>
                            
                            <section className={styles.action__Icons}>
                                <HiOutlineChevronDown />
                                {
                                    
                                    showDeleteIcon ?
                                        <IoTrashOutline
                                            cursor={'pointer'}
                                            size={'1.2rem'}
                                            onClick={() => handleDeleteFaq(faq?.id)}
                                            color='#f90000'
                                        />
                                    :
                                    <></>
                                }
                            </section>
                        </summary>

                        <p className={styles.answer}>{faq.answer}</p>
                    </details>
                }))
            }
        </section>
    </>
}

export default FaqsList