'use client';


import React, { useEffect, useMemo, useState } from 'react'
import styles from './styles.module.css'
import { IoMdAddCircle } from 'react-icons/io'
import { v4 as uuidv4 } from 'uuid';
import { IoClose } from 'react-icons/io5';


const DocumentsAdd = ({
    items=[],
    updateItemsArr=()=>{},
}: {
    items: IPlaceDocuments[];
    updateItemsArr: (items: IPlaceDocuments[]) => void;
}) => {
    const [ isOver, setOver ] = useState(false);

    const documents = useMemo<IPlaceDocuments[]>(() => {
        return items;
    }, [items]);

    const handleFilesChange = async (files: FileList | null) => {
        if (!files) return;

        const items = Array.from(files).map(file => {
            return {
                id: uuidv4(),
                title: file.name,
                document: '',
                uploaded_at: new Date().toString(),
                file,
            }
        });
        const updatedDocuments = [
            ...documents,
            ...items,
        ];
        
        updateItemsArr(updatedDocuments);
    }

    const handleDragOver = (e: React.DragEvent<HTMLLabelElement> ) => {
        e.preventDefault();
        setOver(true);
    }

    const handleDragLeave = (e: React.DragEvent<HTMLLabelElement> ) => {
        e.preventDefault();
        setOver(false);
    }

    const handleDrop = (e: React.DragEvent<HTMLLabelElement> ) => {
        e.preventDefault();
        e.stopPropagation();

        setOver(false);

        const data = e.dataTransfer.files; 
        handleFilesChange(data);
    }

    const handleDeleteFile = (id: string | number) => {
        updateItemsArr(items.filter(doc => doc.id !== id));
    }
    
    return (
        <section className={styles.wrapper}>
            <label 
                className={`${styles.file__label} ${isOver ? styles.over : ''}`}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onDragLeave={handleDragLeave}
            >
                <IoMdAddCircle
                    size={'4rem'}
                    cursor={'pointer'}
                    fill='var(--primary-app-color)'
                />

                <input 
                    type='file'
                    className={styles.file__input}
                    onChange={({ target }) => handleFilesChange(target.files)}
                    multiple
                />
            </label>

            <section className={styles.documents_wrap}>
                {
                    React.Children.toArray(documents.map(document => {
                        return <p 
                            className={styles.single__Dco}
                            key={document.id}
                        >
                            <span>{document.title}</span>
                            
                            <IoClose 
                                onClick={() => handleDeleteFile(document.id)}
                                cursor={'pointer'}
                            />
                        </p>
                    }))
                }
            </section>
        </section>
    )
}

export default DocumentsAdd