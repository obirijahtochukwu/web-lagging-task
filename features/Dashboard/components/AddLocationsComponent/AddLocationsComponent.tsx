import Button from '@/components/Button/Button';
import React from 'react'
import styles from './styles.module.css'
import { IoAddOutline } from 'react-icons/io5';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import RequiredIndicator from '@/components/RequiredIndicator/RequiredIndicator';
import AddLocationItem from './AddLocationItem';

const AddLocationsComponent = ({
    label='',
    items=[],
    updateItemsArr=()=>{},
    updateSingleItem=()=>{},
    maxItemCap = 9,
    useCustomCityDropdownListing=true,
}: {
    label: string;
    items?: ILocation[]
    updateItemsArr?: (val: ILocation[]) => void;
    updateSingleItem?: (itemIndex: number, value: string, key: string) => void;
    maxItemCap?: number;
    useCustomCityDropdownListing?: boolean;
}) => {
    const handleAddNewItem = () => {
        const copyOfCurrentItems = items.slice();
        copyOfCurrentItems.push({
            id: uuidv4(),
            address: '',
            city: '',
            zip_code: '',
            state: '',
        });

        if (copyOfCurrentItems.length > maxItemCap) return toast.info(`You can only add a maximum of ${maxItemCap} item(s)`)

        updateItemsArr(copyOfCurrentItems);
    }

    const handleDeleteItem = (itemIdToDelete: string | number) => {
        const copyOfCurrentItems = items.slice();
        updateItemsArr(copyOfCurrentItems.filter((item) => item.id !== itemIdToDelete));
    }

    return <>
        <section className={styles.item__Wrap}>
            <p className={styles.title}>{label} <RequiredIndicator /></p>

            <ul className={styles.items__List}>
                {
                    React.Children.toArray(items.map((item, index) => {
                        return <AddLocationItem 
                            item={item}
                            useCustomCityDropdownListing={useCustomCityDropdownListing}
                            handleUpdateItem={(value: string, key: string) => updateSingleItem(index, value, key)}
                            handleDeleteItem={() => handleDeleteItem(item.id)}
                            isLastItemIndex={items.length - 1 === index}
                            key={item.id}
                        />
                    }))
                }
            </ul>

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

export default AddLocationsComponent