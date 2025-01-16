'use client';


import React, { useState } from 'react'
import styles from './styles.module.css'
import { PlaceService } from '@/services/placeService';
import { useAppContext } from '@/contexts/AppContext/AppContext';
import { IoCloseOutline } from 'react-icons/io5';
import TextInputComponent from '../inputs/TextInputComponent/TextInputComponent';
import Button from '../Button/Button';
import { toast } from 'sonner';
import { AppConstants } from '@/utils/constants';


const StyleAddModal = ({
    hideModal=() => {},
}: {
    hideModal: () => void;
}) => {
    const [ newStyleName, setNewStyleName ] = useState('');
    const [ loading, setLoading ] = useState(false);
    
    const {
        allStyles,
        setAllStyles,
    } = useAppContext();

    const placeService = new PlaceService();

    const handleCreateStyle = async () => {
        const savedToken = AppConstants.getSavedToken();

        if (!savedToken || loading) return;
        if (newStyleName.length < 1) return toast.info('Please provide a name for your style');

        setLoading(true);

        try {
            const res = await placeService.createNewStyle(savedToken, {
                name: newStyleName,
            });

            setAllStyles([
                ...allStyles,
                res,
            ]);

            setLoading(false);
            setNewStyleName('');
        } catch (error) {
            setLoading(false);
        }
    }

    return (
        <section className={styles.overlay}>
            <section className={styles.content}>
                <section className={styles.header__Row}>
                    <h3 className={styles.header}>Add new style</h3>
                    <IoCloseOutline
                        size={'1.5rem'}
                        cursor={'pointer'}
                        onClick={() => hideModal()}
                    />
                </section>

                <TextInputComponent 
                    label='name of style'
                    value={newStyleName}
                    onChange={(_targetName, targetValue) => setNewStyleName(targetValue)}
                    borderRadius='12px'
                    placeholder='Enter style name here'
                />

                <Button 
                    label={
                        loading ?
                            'saving...'
                        :
                        'save'
                    }
                    style={{
                        width: 'max-content',
                    }}
                    handleClick={handleCreateStyle}
                    disabled={loading}
                />
            </section>
        </section>
    )
}

export default StyleAddModal