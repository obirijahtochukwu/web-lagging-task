import React, { useEffect, useMemo, useState } from 'react'
import { IoMdAddCircle } from 'react-icons/io'
import styles from './styles.module.css'
import { v4 as uuidv4 } from 'uuid';
import { convertFileObjectToBinaryStr } from '@/helpers/helpers';
import Image from 'next/image';
import { IoClose } from 'react-icons/io5';
import { toast } from 'sonner';


const maxCap = 15;

const GalleryEditItem = ({
    images=[],
    updateImages=()=>{},
}: {
    images?: IPlaceImage[];
    updateImages?: (images: IPlaceImage[]) => void;
}) => {
    const [ galleryImages, setGalleryImages ] = useState<IPlaceImage[]>([]);

    const handleFilesChange = async (files: FileList | null) => {
        if (!files) return;

        const galleryItems = Array.from(files).map((file) => {
            return {
                id: uuidv4(),
                image: '',
                imageFile: file,
            }
        });

        const updatedGalleryImages = [
            ...images,
            ...galleryItems,
        ];
        if (updatedGalleryImages.length > maxCap) return toast.info(`You can only add a maximum of ${maxCap} image(s)`);

        updateImages(updatedGalleryImages);
    }

    const updateItemsInfoWithImageUrl = useMemo(() => {
        const updateItemsInfoWithImageUrl = async () => {
            const updatedInfo = await Promise.all(
                images.map(async (item) => {
                    if (item.imageFile) {
                        item.image = await convertFileObjectToBinaryStr(item.imageFile) as string;
                    }
                    return item;
                })
            );
            return updatedInfo;
        };

        return updateItemsInfoWithImageUrl();
    }, [images]);

    useEffect(() => {
        const setInfo = async () => {
            const updatedItems = await updateItemsInfoWithImageUrl;
            setGalleryImages(updatedItems);
        };

        setInfo();
    }, [updateItemsInfoWithImageUrl]);

    const handleDeleteItem = (itemId: string | number) => {
        const copyOfCurrentItems = images.slice();
        updateImages(copyOfCurrentItems.filter((item) => item.id !== itemId));
    }

    return <>
        <section className={styles.gallery}>
            <label className={styles.add__New__Item}>
                <IoMdAddCircle 
                    size={'4rem'}
                    style={{
                        fill: 'var(--primary-app-color)',
                    }}
                />

                <input 
                    type='file' 
                    accept='image/*'
                    className={styles.file__input}
                    onChange={({ target }) => handleFilesChange(target.files)}
                    multiple
                />
            </label>

            {
                React.Children.toArray(
                    galleryImages.map(image => {
                        return <div
                            key={image.id}
                            className={styles.place__Image__Wrap}
                        >
                            <div className={styles.place__Remove__Icon}>
                                <IoClose
                                    fill='#fff'
                                    size={'1.5rem'}
                                    onClick={() => handleDeleteItem(image.id)}
                                />
                            </div>

                            <Image 
                                src={image.image as string}
                                alt='place'
                                width={0}
                                height={0}
                                className={styles.place__Image}
                            />
                        </div>
                    })
                )
            }
        </section>
    </>
}

export default GalleryEditItem