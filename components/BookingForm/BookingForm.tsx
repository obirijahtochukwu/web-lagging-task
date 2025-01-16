import React, { useEffect, useMemo, useState } from 'react'
import styles from './styles.module.css'
import { useAppContext } from '@/contexts/AppContext/AppContext'
import { IoCalendarNumberOutline, IoCloseOutline } from 'react-icons/io5';
import Button from '../Button/Button';
import { PlaceService } from '@/services/placeService';
import Carousel from '../wrapperComponents/Carousel/Carousel';
import Image from 'next/image';
import TextInputComponent from '../inputs/TextInputComponent/TextInputComponent';
import { BookingDetails, bookingDetailsDict, bookingUserOptions, formPageDetail, initialBookingDetails, requiredInfo } from './utils';
import PageLoader from '../loaders/PageLoader/PageLoader';
import { useUserContext } from '@/contexts/UserContext';
import Divider from '@/features/Places/components/Divider/Divider';
import RequiredIndicator from '../RequiredIndicator/RequiredIndicator';
import { toast } from 'sonner';
import { BookingService } from '@/services/bookingService';
import { AppConstants } from '@/utils/constants';
import SelectItem from '../SelectItem/SelectItem';
import Link from 'next/link';
import { ImAttachment } from 'react-icons/im';
import { calulateYearsDifference, formatDate, getWeekday, validateEmail } from '@/helpers/helpers';
import AppPopup from '../AppPopup/AppPopup';
import DatePicker from "react-datepicker";
import CustomDatePickerInput from './components/CustomDatePickerInput';
import CustomDatePickerHeader from './components/CustomDatePickerHeader';
import useMobile from '@/hooks/useMobile';
import { cleanStringAndReturnLower } from '@/helpers/formatters';

const BookingForm = () => {
    const {
        selectedPlaceId,
        setSelectedPlaceId,
        bookings,
        setBookings,
    } = useAppContext();

    const {
        userDetails
    } = useUserContext();

    const [ currentPage, setCurrentPage ] = useState<number>(1);
    const [ bookingDetails, setBookingDetails ] = useState<BookingDetails>(initialBookingDetails)
    const [ selectedPlaceDetailsLoading, setSelectedPlaceDetailsLoading ] = useState(true);
    const [ loading, setLoading ] = useState(false);
    const [ selectedPlace, setSelectedPlace ] = useState<IPlace | null>(null);
    const [ showConfirmationModal, setShowConfirmationModal ] = useState(false);
    
    const isMobile = useMobile();

    const placeService = new PlaceService();
    const bookingService = new BookingService();
    
    const [
        openDaysForPlace,
        openTimesForPlace,
    ] = [
        selectedPlace?.place_activity_hours.flatMap(item => 
            item?.opening_time && item?.opening_time?.length > 0 && item?.closing_time && item?.closing_time?.length > 0 ? [item.day.toLocaleLowerCase()] : []
        ) ?? [],
        selectedPlace?.place_activity_hours.flatMap(item => 
            item?.opening_time && item?.opening_time?.length > 0 && item?.closing_time && item?.closing_time?.length > 0 ? [
                {
                    day: item.day,
                    opening_time: item.opening_time,
                    closing_time: item.closing_time,
                }
            ] : []
        ) ?? []
    ];

    const availableTimeSlots = useMemo(() => {
        if (bookingDetails.date.length < 1) return [];

        const foundClassSchedule = selectedPlace?.class_schedules_data?.find(schedule => Number(schedule.class_id) === Number(bookingDetails.class_id));
        if (!foundClassSchedule) return [];

        const foundAvailableTimesForDate = foundClassSchedule?.schedules.find(item => 
            cleanStringAndReturnLower(item.day) === cleanStringAndReturnLower(getWeekday(new Date(bookingDetails.date)))
        );
        return foundAvailableTimesForDate?.times ?? [];
    }, [bookingDetails.date, bookingDetails.class_id])

    const isDayValid = (date: Date) => {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        // Checks if the selected date is in the past
        if (date < currentDate) return false;

        const dayOfWeek = date.toLocaleString('en-us', { weekday: 'long' }).toLowerCase();
        return openDaysForPlace.includes(dayOfWeek);
    };

    const handleDetailUpdate = (
        key: string, 
        value: string | boolean | number[] | number
    ) => {
        setBookingDetails((prevDetails) => {
            return {
                ...prevDetails,
                [key]: value,
            }
        });
    }

    const handleUpdateCheckboxItems = (key: keyof BookingDetails, styleId: number, checkedStatus: boolean) => {
        const validkeys = [bookingDetails.selected_styles];

        const currentItem = bookingDetails[key];
        if (!Array.isArray(currentItem)) return;

        handleDetailUpdate(bookingDetailsDict.child_name, '');
        handleDetailUpdate(bookingDetailsDict.child_email, '');
        handleDetailUpdate(bookingDetailsDict.child_dob, '');
        handleDetailUpdate(bookingDetailsDict.child_phone_number, '');

        const currentItemsCopy = currentItem.slice() as number[];
        if (checkedStatus === true) {
            currentItemsCopy.push(styleId);
            handleDetailUpdate(key, currentItemsCopy);
            return;
        }

        handleDetailUpdate(key, currentItemsCopy.filter(item => item !== styleId));
    }

    useEffect(() => {
        if (selectedPlace || !selectedPlaceId) return setSelectedPlaceDetailsLoading(false);
        if (!userDetails) return;

        placeService.getSinglePlace(selectedPlaceId).then(res => {
            setSelectedPlace(res);

            handleDetailUpdate(bookingDetailsDict.place_id, selectedPlaceId);
            handleDetailUpdate(bookingDetailsDict.email, userDetails?.email);
            handleDetailUpdate(bookingDetailsDict.phone, userDetails?.phone_number ?? '');

            setSelectedPlaceDetailsLoading(false);
        }).catch(() => {
            setSelectedPlaceDetailsLoading(false);
        });

    }, [selectedPlace, userDetails, selectedPlaceId]);

    const handleGoToPreviousPage = () => {
        if (loading) return;
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    }

    const handleGoToNextPage = async () => {
        const authToken = AppConstants.getSavedToken();

        if (loading || !authToken) return;

        const requiredItemsForPage: string[] = requiredInfo[currentPage];

        if (currentPage === 3 && bookingDetails.is_for_child === null) return toast.info('Please fill in all required info');

        const missingRequiredInfo = requiredItemsForPage.find((item: string) => {
            const missingItem = bookingDetails[item as keyof BookingDetails] as string | number[];
            
            return missingItem?.length < 1
        });

        if (missingRequiredInfo) return toast.info('Please fill in all required info');
        
        if (currentPage === 4) {
            if (isNaN(Number(bookingDetails.age))) return toast.info('Please provide a valid age');
            if (bookingDetails.is_for_child === false) return setCurrentPage(currentPage + 1);

            if (
                !bookingDetails.child_name ||
                bookingDetails.child_name && bookingDetails?.child_name?.length < 1 ||
                !bookingDetails.child_email ||
                bookingDetails.child_email && bookingDetails?.child_email?.length < 1 ||
                !bookingDetails.child_dob ||
                bookingDetails.child_dob && bookingDetails?.child_dob?.length < 1
            ) return toast.info('Please fill in all required info');

            if (!validateEmail(bookingDetails.child_email)) return toast.info('Please enter a valid email for your child');
        }

        if (currentPage === 6) {
            if (bookingDetails.agreed_to_health_declaration === false || bookingDetails.agreed_to_liability_waiver === false) return toast.info('Please agree to all terms before continuing');

            setLoading(true);

            try {
                const res = await bookingService.createNewBooking(authToken, bookingDetails);
                
                setLoading(false);
                setBookings([
                    {
                        ...res,
                        status: 'pending'
                    },
                    ...bookings,
                ]);
                setSelectedPlaceId(null);
                setShowConfirmationModal(true);
            } catch (error) {
                setLoading(false);                
            }

            return
        }

        setCurrentPage(currentPage + 1);
    }
    
    return <>
        <section className={styles.overlay}>
            <section className={styles.content}>
                {
                    selectedPlaceDetailsLoading ?
                        <PageLoader />
                    :
                    <>
                        <section className={styles.header__Row}>
                            <h3 className={styles.header}>New Booking</h3>
                            <IoCloseOutline 
                                size={'1.5rem'}
                                cursor={'pointer'}
                                onClick={() => setSelectedPlaceId(null)}
                            />
                        </section>

                        <section className={styles.progress}>
                            <section className={styles.progress__Wrap}>
                                <section
                                    className={styles.progress__Indicator}
                                    style={{
                                        width: `${Number(currentPage / formPageDetail.length) * 100}%`
                                    }}
                                ></section>
                            </section>

                            {
                                currentPage > 1 && <>
                                    <p className={styles.current__Page__header}>Current step: {formPageDetail.find(page => page.id === currentPage)?.name}</p>
                                </>
                            }
                        </section>

                        {
                            currentPage === 1 ? <>
                                <section className={styles.selected__place}>
                                    <h4 className={styles.place__Title}>Selected place</h4>
                                    
                                    <section className={styles.place__Details}>
                                        <Carousel 
                                            style={{
                                                width: '40%',
                                                borderRadius: '24px'
                                            }}
                                            delay={2000}
                                        >
                                            {
                                                React.Children.toArray(selectedPlace?.images_data.map(item => {
                                                    return <Image 
                                                        src={item.image as string}
                                                        alt={selectedPlace?.name}
                                                        width={0}
                                                        height={200}
                                                        style={{
                                                            borderRadius: '24px',
                                                            width: '100%',
                                                            objectFit: 'cover',
                                                        }}
                                                        key={item.id}
                                                    />
                                                }))
                                            }
                                        </Carousel>

                                        <section className={styles.details__Info}>
                                            <h3 className={styles.place__Name}>{selectedPlace?.name}</h3>

                                            <p className={styles.detail__item}>
                                                <span className={styles.detail__Title}>styles offered</span>
                                                <span className={styles.detail__Info}>{selectedPlace?.place_styles?.map(style => style.name)?.join(', ')}</span>
                                            </p>

                                            <p className={styles.detail__item}>
                                                <span className={styles.detail__Title}>skill levels</span>
                                                <span className={styles.detail__Info}>{selectedPlace?.place_caters_to?.map(item => item.name)?.join(', ')}</span>
                                            </p>

                                            <p className={styles.detail__item}>
                                                <span className={styles.detail__Title}>pricing</span>
                                                <span className={styles.detail__Info}>from ${selectedPlace?.pricing}</span>
                                            </p>
                                        </section>
                                    </section>
                                </section>
                                
                                <br/>

                                <section className={styles.detail__item}>
                                    <p className={styles.label__Item}>choose martial art style offered <RequiredIndicator /></p>
                                    <section className={styles.listing__Wrap}>
                                        {
                                            React.Children.toArray(selectedPlace?.place_styles
                                                .map(style => {
                                                    return <TextInputComponent 
                                                        label={style.name}
                                                        type='checkbox'
                                                        style={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            width: 'max-content',
                                                            flexDirection: 'row-reverse',
                                                            gap: '1rem',
                                                            marginRight: '3rem',
                                                        }}
                                                        checked={bookingDetails?.selected_styles?.includes(style.id)}
                                                        key={style.id}
                                                        handleUpdateChecked={(val) => handleUpdateCheckboxItems(bookingDetailsDict.selected_styles as keyof BookingDetails, style.id, val)}
                                                        accentColor='var(--red-color)'
                                                    />
                                                })
                                            )
                                        }
                                    </section>
                                </section>
                            </> :
                            currentPage === 2 ? <>
                                <SelectItem
                                    label='select class type'
                                    options={
                                        selectedPlace?.place_caters_to?.map(item => ({
                                            id: item.id,
                                            label: item.name,
                                            value: `${item.id}`,
                                        })) ?? []
                                    }
                                    value={bookingDetails.class_id}
                                    handleChange={(val) => handleDetailUpdate(bookingDetailsDict.class_id, val)}
                                    isRequired
                                />

                                <section className={styles.input__Row}>
                                    <label 
                                        className={styles.label__Detail}
                                        style={{
                                            width: isMobile ? '100%' : 'calc(50% - 0.5rem)',
                                        }}
                                    >
                                        <span>appointment date <RequiredIndicator /></span>
                                        <DatePicker 
                                            selected={new Date(bookingDetails.date)}
                                            onChange={(date) => {
                                                    if (!date) return;
                                                    handleDetailUpdate(bookingDetailsDict.date, formatDate(date))
                                                }
                                            }
                                            filterDate={isDayValid}
                                            dayClassName={date => isDayValid(date) ? styles.open__Day : ''}
                                            icon={
                                                <IoCalendarNumberOutline />
                                            }
                                            customInput={React.createElement(CustomDatePickerInput)}
                                            // minDate={new Date(2025, 0, 1)}
                                            disabled={bookingDetails.class_id.length < 1}
                                            renderCustomHeader={(props) => 
                                                <CustomDatePickerHeader 
                                                    startYear={new Date().getFullYear()} 
                                                    startFromCurrent={true} 
                                                    {...props} 
                                                />
                                            }
                                        />
                                    </label>

                                    <SelectItem 
                                        label='appointment time'
                                        isRequired
                                        value={bookingDetails.time}
                                        options={
                                            availableTimeSlots.map(time => {
                                                return {
                                                    id: time,
                                                    label: time,
                                                    value: time,
                                                }
                                            })
                                        }
                                        isDisabled={bookingDetails.date.length < 1}
                                        handleChange={(val) => handleDetailUpdate(bookingDetailsDict.time, val)}
                                        style={{
                                            width: isMobile ? '100%' : 'calc(50% - 0.5rem)',
                                        }}
                                    />
                                </section>
                                
                                <SelectItem
                                    label='select age group'
                                    options={
                                        selectedPlace?.place_age_groups?.map(item => ({
                                            id: item.id,
                                            label: item.name,
                                            value: `${item.id}`,
                                        })) ?? []
                                    }
                                    value={bookingDetails.age_group_id}
                                    handleChange={(val) => handleDetailUpdate(bookingDetailsDict.age_group_id, val)}
                                    isRequired
                                />
                            </> :
                            currentPage === 3 ? <>
                                <section className={styles.detail__item}>
                                    <p className={styles.label__Item}>Are you an adult or a parent? <RequiredIndicator /></p>

                                    <section className={styles.options}>
                                        {
                                            React.Children.toArray(bookingUserOptions.map(option => {
                                                return <TextInputComponent 
                                                    name=''
                                                    checked={bookingDetails.is_for_child === option.value}
                                                    type='radio'
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        width: 'max-content',
                                                        flexDirection: 'row-reverse',
                                                        gap: '1rem',
                                                    }}
                                                    onChange={() => handleDetailUpdate(bookingDetailsDict.is_for_child, option.value)}
                                                    label={'I am ' + option.name}
                                                    key={option.id}
                                                    accentColor='var(--red-color)'
                                                />
                                            }))
                                        }
                                    </section>
                                </section>
                            </>
                            :
                            currentPage === 4 ? <>
                                <section className={styles.input__Row}>
                                    <TextInputComponent 
                                        label='full name'
                                        name={bookingDetailsDict.name}
                                        value={bookingDetails.name}
                                        onChange={handleDetailUpdate}
                                        isRequired
                                        borderRadius='12px'
                                        style={{
                                            width: isMobile ? '100%' : 'calc(50% - 0.5rem)',
                                        }}
                                    />

                                    <TextInputComponent 
                                        label='email'
                                        name={bookingDetailsDict.email}
                                        value={bookingDetails.email}
                                        onChange={handleDetailUpdate}
                                        isRequired
                                        borderRadius='12px'
                                        style={{
                                            width: isMobile ? '100%' : 'calc(50% - 0.5rem)',
                                        }}
                                    />
                                </section>

                                <SelectItem
                                    label='studio location'
                                    options={
                                        selectedPlace?.place_locations?.map(location => ({
                                            id: location.id,
                                            label: `${location.address}, ${location.city}, ${location.state}`,
                                            value: `${location.id}`,
                                        })) ?? []
                                    }
                                    value={bookingDetails.location_id}
                                    handleChange={(val) => handleDetailUpdate(bookingDetailsDict.location_id, val)}
                                    isRequired
                                />
                                
                                <section className={styles.input__Row}>
                                    <TextInputComponent 
                                        label='phone'
                                        name={bookingDetailsDict.phone}
                                        value={bookingDetails.phone}
                                        onChange={handleDetailUpdate}
                                        borderRadius='12px'
                                        isRequired
                                        style={{
                                            width: bookingDetails.is_for_child === false ?
                                                'calc(60% - 0.5rem)'
                                            :
                                            '100%',
                                        }}
                                    />

                                    {
                                        bookingDetails.is_for_child === false &&          
                                        <TextInputComponent 
                                            label='age'
                                            name={bookingDetailsDict.age}
                                            value={bookingDetails.age}
                                            onChange={handleDetailUpdate}
                                            borderRadius='12px'
                                            isRequired
                                            style={{
                                                width: 'calc(40% - 0.5rem)',
                                            }}
                                        />
                                    }
                                </section>

                                {
                                    bookingDetails.is_for_child === true && <>
                                        <Divider />
                                        
                                        <p className={styles.label__Item}>Child personal info</p>
                                        
                                        <section className={styles.input__Row}>
                                            <TextInputComponent 
                                                label='child name'
                                                name={bookingDetailsDict.child_name}
                                                value={bookingDetails.child_name}
                                                onChange={handleDetailUpdate}
                                                isRequired
                                                borderRadius='12px'
                                                style={{
                                                    width: isMobile ? '100%' : 'calc(50% - 0.5rem)',
                                                }}
                                            />

                                            <TextInputComponent 
                                                label='child email'
                                                type='email'
                                                name={bookingDetailsDict.child_email}
                                                value={bookingDetails.child_email}
                                                onChange={handleDetailUpdate}
                                                isRequired
                                                borderRadius='12px'
                                                style={{
                                                    width: isMobile ? '100%' : 'calc(50% - 0.5rem)',
                                                }}
                                            />
                                        </section>

                                        <section className={styles.input__Row}>
                                            <label 
                                                className={styles.label__Detail}
                                                style={{
                                                    width: isMobile ? '100%' : 'calc(50% - 0.5rem)',
                                                }}
                                            >
                                                <span>child date of birth <RequiredIndicator /></span>

                                                <DatePicker 
                                                    selected={
                                                        bookingDetails.child_dob && bookingDetails.child_dob.length > 0 ?
                                                            new Date(bookingDetails.child_dob)
                                                        :
                                                        null
                                                    }
                                                    onChange={(date) => {
                                                            if (!date) return;

                                                            handleDetailUpdate(bookingDetailsDict.child_dob, formatDate(date))
                                                            handleDetailUpdate(bookingDetailsDict.age, calulateYearsDifference(date));
                                                        }
                                                    }
                                                    icon={
                                                        <IoCalendarNumberOutline />
                                                    }
                                                    // minDate={new Date(new Date().setFullYear(new Date().getFullYear() - 5))}
                                                    customInput={React.createElement(CustomDatePickerInput)}
                                                    showMonthDropdown
                                                    showYearDropdown
                                                    dropdownMode='select'
                                                    showPopperArrow={false}
                                                    renderCustomHeader={(props) => 
                                                        <CustomDatePickerHeader 
                                                            startYear={new Date().getFullYear() - 50} 
                                                            {...props} 
                                                        />
                                                    }
                                                />
                                            </label>
                                            
                                            <TextInputComponent 
                                                label='child phone'
                                                name={bookingDetailsDict.child_phone_number}
                                                value={bookingDetails.child_phone_number}
                                                onChange={handleDetailUpdate}
                                                borderRadius='12px'
                                                style={{
                                                    width: isMobile ? '100%' : 'calc(50% - 0.5rem)',
                                                }}
                                            />
                                        </section>
                                    </>
                                }
                            </>
                            :
                            currentPage === 5 ? <>
                                <section className={styles.details__Info}>
                                    <p className={styles.label__Item}>Health declaration and other document(s)</p>

                                    {
                                        !selectedPlace?.documents_data || selectedPlace.documents_data?.length < 1 ?
                                            <p className={styles.no__Doc}>No declaration documents to review, please continue</p>
                                        :
                                        React.Children.toArray(selectedPlace?.documents_data.map(document => {
                                            return <Link
                                                href={document.document}
                                                target='_blank'
                                                rel='noreferrer noopener'
                                                className={styles.document__Link}
                                                key={document.id}
                                            >   
                                                <ImAttachment />
                                                <span>{document.title}</span>
                                            </Link>
                                        }))
                                    }
                                </section>
                            </>
                            :
                            currentPage === 6 ? <>
                                <section className={styles.details__Info}>
                                    <TextInputComponent 
                                        label="I have reviewed and accepted the studio's health declaration form as well as other attached documents."
                                        type='checkbox'
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            width: 'max-content',
                                            flexDirection: 'row-reverse',
                                            gap: '1rem',
                                            maxWidth: '100%',
                                        }}
                                        handleUpdateChecked={(val) => handleDetailUpdate(bookingDetailsDict.agreed_to_health_declaration, val)}
                                        checked={bookingDetails.agreed_to_health_declaration}
                                        accentColor='var(--red-color)'
                                    />

                                    <TextInputComponent 
                                        label={`I understand and accept the risks involved in martial arts classes and waive all liability ${bookingDetails.is_for_child === true ? 'for my child' : '.'}`}
                                        type='checkbox'
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            width: 'max-content',
                                            flexDirection: 'row-reverse',
                                            gap: '1rem',
                                            maxWidth: '100%',
                                        }}
                                        handleUpdateChecked={(val) => handleDetailUpdate(bookingDetailsDict.agreed_to_liability_waiver, val)}
                                        checked={bookingDetails.agreed_to_liability_waiver}
                                        accentColor='var(--red-color)'
                                    />

                                    <br />

                                    <h4 className={styles.summary}>summary</h4>
                                    
                                    <section className={styles.summary__Item}>
                                        <h5 className={styles.summary__Item__Title}>styles selected</h5>
                                        <p className={styles.summary__Item__Detail}>
                                            {
                                                bookingDetails.selected_styles.map(
                                                    style => {
                                                        const foundStyle = selectedPlace?.place_styles.find(placeStyle => placeStyle.id === Number(style));
                                                        return foundStyle?.name ?? '';
                                                    }
                                                ).join(', ')
                                            }
                                        </p>
                                    </section>

                                    <section className={styles.input__Row}>
                                        <section className={styles.summary__Item}>
                                            <h5 className={styles.summary__Item__Title}>class selected</h5>
                                            <p className={styles.summary__Item__Detail}>{selectedPlace?.place_caters_to?.find(item => `${item.id}` === bookingDetails.class_id)?.name}</p>
                                        </section>

                                        <section className={styles.summary__Item}>
                                            <h5 className={styles.summary__Item__Title}>first lesson</h5>
                                            <p className={styles.summary__Item__Detail}>free</p>
                                        </section>
                                    </section>
                                </section>
                            </>
                            :
                            <>
                            
                            </>
                        }

                        <section className={`${styles.header__Row} ${styles.actions}`}>
                            <Button
                                label='back'
                                style={{
                                    background: 'transparent',
                                    border: '1px solid var(--red-color)',
                                    color: 'var(--red-color)',
                                    padding: '0.65rem 1.5rem'
                                }}
                                handleClick={handleGoToPreviousPage}
                            />

                            <Button 
                                label={
                                    loading ?
                                        'creating...'
                                    :
                                    currentPage === 6 ?
                                        'submit'
                                    :
                                    'next'
                                }
                                style={{
                                    padding: '0.65rem 1.5rem',
                                    backgroundColor: 'var(--red-color)',
                                }}
                                hoverStyle={{
                                    backgroundColor: 'black',
                                }}
                                handleClick={handleGoToNextPage}
                            />
                        </section>
                    </>
                }
            </section>
        </section>

        {
            showConfirmationModal &&
            <AppPopup 
                title='Your Registration is Complete!'
                content={"Thank you for signing up! You will receive an email shortly with all the details for your first free class.\n\nPlease note, the place will review and confirm your registration. You will receive a follow-up email once your spot is confirmed"}
                hidePopup={() => setShowConfirmationModal(false)}
            />
        }
    </>
}

export default BookingForm