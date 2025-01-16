import Button from '@/components/Button/Button'
import TextInputComponent from '@/components/inputs/TextInputComponent/TextInputComponent'
import React, { useState } from 'react'
import styles from './styles.module.css'
import { toast } from 'sonner'
import FaqsList from '../FaqsList/FaqsList'
import { v4 as uuidv4 } from 'uuid';


const initialNewFaq = {
    question: '',
    answer: '',
}

const AddFaqItem = ({
    faqs=[],
    updateItemsArr=()=>{},
}: {
    faqs: IPlaceFaq[];
    updateItemsArr?: (items: IPlaceFaq[]) => void;
}) => {
    const [ newFaq, setNewFaq ] = useState(initialNewFaq);

    const handleNewFaqUpdate = (key: string, value: string) => {
        setNewFaq((prevDetails) => {
            return {
                ...prevDetails,
                [key]: value,
            }
        });
    }

    const handleAddNewFaq = () => {
        if (newFaq.question.length < 1) return toast.info('Please enter a question');
        if (newFaq.answer.length < 1) return toast.info('Please enter an answer');

        const currentItemsCopy = [...faqs];
        currentItemsCopy.push({
            id: uuidv4(),
            ...newFaq
        });

        updateItemsArr(currentItemsCopy);
        setNewFaq(initialNewFaq);
    }

    return <>
        <section className={styles.faq__Content__Wrap}>
            <section className={styles.faq__Input__Section}>
                <TextInputComponent 
                    label='question'
                    borderRadius='12px'
                    name='question'
                    value={newFaq.question}
                    onChange={(name: string, value: string) => handleNewFaqUpdate(name, value)}
                    isRequired
                    labelFontSize='0.85rem'
                />

                <TextInputComponent 
                    label='answer'
                    isTextArea={true}
                    borderRadius='12px'
                    name='answer'
                    value={newFaq.answer}
                    onChange={(name: string, value: string) => handleNewFaqUpdate(name, value)}
                    isRequired
                    labelFontSize='0.85rem'
                />

                <Button 
                    label='save'
                    style={{
                        padding: '0.5rem 1.5rem',
                        fontSize: '0.75rem',
                        width: 'max-content',
                        backgroundColor: 'transparent',
                        border: '1px solid #000',
                        color: '#000',
                    }}
                    hoverStyle={{
                        backgroundColor: 'var(--primary-app-color)',
                        borderColor: 'var(--primary-app-color)',
                        color: '#fff'
                    }}
                    handleClick={handleAddNewFaq}
                />
            </section>

            <FaqsList 
                faqs={faqs}
                showDeleteIcon
                handleDeleteFaq={(id) => updateItemsArr(faqs.filter(faq => faq.id !== id))}
            />
        </section>
    </>
}

export default AddFaqItem