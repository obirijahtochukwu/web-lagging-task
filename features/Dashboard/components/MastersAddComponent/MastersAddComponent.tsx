'use client';

import Button from '@/components/Button/Button';
import React, { useEffect, useMemo, useState } from 'react'
import { IoAddOutline, IoCloseCircle } from 'react-icons/io5'
import styles from './styles.module.css'
import emptyUserPic from '../../../../assets/avatar.png'
import Image from 'next/image';
import TextInputComponent from '@/components/inputs/TextInputComponent/TextInputComponent';
import { v4 as uuidv4 } from 'uuid';
import FileInputComponent from '@/components/inputs/FileInputComponent/FileInputComponent';
import { convertFileObjectToBinaryStr } from '@/helpers/helpers';
import { toast } from 'sonner';


const MastersAddComponent = ({
    updateSingleItem=()=>{},
    items=[],
    updateItemsArr=()=>{},
}: {
    items?: IPlaceMasterImage[];
    updateItemsArr?: (val: IPlaceMasterImage[]) => void;
    updateSingleItem?: (itemIndex: number, value: string | File, key: string) => void;
}) => {
    const [ mastersInfo, setMastersInfo ] = useState<IPlaceMasterImage[]>([]);

    const handleAddNewItem = () => {
        const copyOfCurrentItems = items.slice();
        copyOfCurrentItems.push({
            id: uuidv4(),
            name: '',
            bio: '',
            image: '',
        });
        if (copyOfCurrentItems.length > 3) return toast.info('You can only add a maximum of 3 mentor images');

        updateItemsArr(copyOfCurrentItems);
    }

    const handleDeleteItem = (itemIndexToDelete: number) => {
        const copyOfCurrentItems = items.slice();
        updateItemsArr(copyOfCurrentItems.filter((_item, index) => index !== itemIndexToDelete));
    }

    const updateItemsInfoWithImageUrl = useMemo(() => {
        const updateItemsInfoWithImageUrl = async () => {
            const updatedInfo = await Promise.all(
                items.map(async (item) => {
                    if (item.imageFile) {
                        item.image = await convertFileObjectToBinaryStr(item.imageFile) as string;
                    }
                    return item;
                })
            );
            return updatedInfo;
        };

        return updateItemsInfoWithImageUrl();
    }, [items]);

    useEffect(() => {
        const setInfo = async () => {
            const updatedItems = await updateItemsInfoWithImageUrl;
            setMastersInfo(updatedItems);
        };

        setInfo();
    }, [updateItemsInfoWithImageUrl]);

    return <>
        <section className={styles.item__Wrap}>
            <section className={styles.items__List}>
                {
                    React.Children.toArray(mastersInfo.map((item, index) => {
                        const masterImage = item.image as string;

                        return <section 
                            className={styles.master__Item}
                            key={item.id}
                        >
                            <IoCloseCircle 
                                cursor={'pointer'}
                                size={'2rem'}
                                style={{
                                    marginLeft: 'auto',
                                }}
                                onClick={() => handleDeleteItem(index)}
                                fill='#f90000'
                            />

                            <Image
                                src={
                                    masterImage?.length > 0 ?
                                        masterImage
                                    :
                                    emptyUserPic
                                }
                                alt='user'
                                width={120}
                                height={120}
                                style={{
                                    objectFit: 'cover',
                                    borderRadius: '50%'
                                }}
                            />

                            <TextInputComponent
                                label='name'
                                labelFontSize='0.8rem'
                                placeholder={'e.g master AA'}
                                value={item.name}
                                onChange={(_name, value: string) => updateSingleItem(index, value, 'name')}
                                borderRadius='12px'
                                isRequired
                            />
                            
                            <TextInputComponent
                                label='bio'
                                labelFontSize='0.8rem'
                                value={item.bio}
                                onChange={(_name, value: string) => updateSingleItem(index, value, 'bio')}
                                isTextArea={true}
                                borderRadius='12px'
                            />

                            <FileInputComponent 
                                label='image'
                                labelFontSize='0.8rem'
                                accept='image/*'
                                onChange={(files) => {
                                    if (files && files[0]) {
                                        updateSingleItem(index, files[0], 'imageFile')
                                    }
                                }}
                                isRequired
                            />
                        </section>
                    }))
                }
            </section>

            <Button
                label='add new'
                icon={
                    <IoAddOutline
                        size={'1.1rem'}
                    />
                }
                style={{
                    padding: '0.5rem 0.75rem',
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
                handleClick={handleAddNewItem}
            />
        </section>
    </>
}

export default MastersAddComponent