export const validateEmail = (email: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line
    return re.test(email);
};

export const getDayOfTheWeek = (date: Date) => {
    const day = new Date(date).getDay();
    const weekday= ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    
    if (!weekday[day]) return '';

    return weekday[day];
}

export const getAllDaysOfTheWeek = () => {
    return ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
}

export const getMonthsOfTheYear = () => {
    return [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
}

export const generateDashLinkForUser = (userIsOwner?: boolean) => {
    return `/dashboard/${userIsOwner === true ? 'owner' : 'user'}`
}

export const convertFileObjectToBinaryStr = (fileObj: File): Promise<string | ArrayBuffer | null> => {
    // returning a new promise
    return new Promise((resolve, reject) => {
        // instantiating a new object of the FileReader class to read the file object passed
        const reader = new FileReader();

        // using the object to read the file as a data url i.e 'data:image/...'
        reader.readAsDataURL(fileObj);

        // on successful read of file
        reader.onload = () => resolve(reader.result);

        // on error reading the file
        reader.onerror = error => reject(error);
    });
}

export const formatTimeString = (timeStr: string) => {
    const date = new Date(`1970-01-01T${timeStr}Z`);
    const options: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric', hour12: true };

    return date.toLocaleString('en-US', options);
}

export const formatDate = (date: Date): string => {
    if (!date) return "";

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

export const estimateReadingTime = (textLength: number) => {
    const wordsPerMinute = 200;
    const avgWordLength = 5;
  
    const totalWords = textLength / avgWordLength;
    const readingTimeMinutes = totalWords / wordsPerMinute;
  
    return Math.ceil(readingTimeMinutes);
}


export const getTimeAgoFromDate = (date: string) => {
    const now = new Date();
    const inputDate = new Date(date);
    const diffInSeconds = Math.floor((now.getTime() - inputDate.getTime()) / 1000);

    if (diffInSeconds < 60) {
        return `${diffInSeconds} secs ago`;
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
        return `${diffInMinutes} mins ago`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
        return `${diffInHours} hr${diffInHours > 1 ? 's' : ''} ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) {
        return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    }

    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) {
        return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
    }

    const diffInYears = Math.floor(diffInMonths / 12);
    return `${diffInYears} year${diffInYears > 1 ? 's' : ''} ago`;
}

export const getYoutubeEmbedVideoLink = (url?: string) => {
    const defaultPlaceYoutubeUrl = "https://www.youtube.com/embed/bxuYDT-BWaI";
    if (!url) return defaultPlaceYoutubeUrl;

    const embedPattern = /^https:\/\/www\.youtube\.com\/embed\/([a-zA-Z0-9_-]+)/;
    if (embedPattern.test(url)) {
        return url;
    }

    const videoIdPattern = /(?:youtube\.com\/(?:shorts\/|(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=))|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(videoIdPattern);

    if (match && match[1]) {
        return `https://www.youtube.com/embed/${match[1]}`;
    }

    return defaultPlaceYoutubeUrl;
}

export const getWeekday = (date: Date): string => {
    const weekday = date.toLocaleString('en-US', { weekday: 'long' });
    return weekday;
}

export const generateAvailableTimeIntervalsForPlace = (
    { 
        opening_time, 
        closing_time,
    }: { 
        opening_time?: string; 
        closing_time?: string;
    } = {},
    date_selected: Date,
): string[] => {
    if (!opening_time || opening_time?.length < 1 || !closing_time || closing_time?.length < 1 || !date_selected) return [];

    const passedDate = new Date(date_selected);
    const passedDateFormmatted = formatDate(passedDate);

    const openingDate = new Date(`${passedDateFormmatted}T${opening_time}`);
    const closingDate = new Date(`${passedDateFormmatted}T${closing_time}`);
  
    const lastAvailableTime = new Date(closingDate);
    lastAvailableTime.setHours(lastAvailableTime.getHours() - 1);

    const timeIntervals: string[] = [];
    let currentTime = new Date(openingDate);
    
    while (currentTime.getTime() <= lastAvailableTime.getTime()) {
        const currentTimeString = currentTime.toISOString().slice(11, 19); // format as HH:MM:SS
        if (currentTime.getTime() >= passedDate.getTime()) {
            timeIntervals.push(currentTimeString);
        }
        currentTime.setHours(currentTime.getHours() + 1);
    }
    return timeIntervals;
}

export const checkIfDateIsLessThanNYears = (date: Date, n: number) => {
    if (n < 1) return true;

    const currentYear = new Date().getFullYear();
    const selectedYear = date.getFullYear();

    return selectedYear <= currentYear - n;
};

export const calulateYearsDifference = (date: Date) => {
    const currentDate = new Date();
    const selectedDate = new Date(date);
    let age = currentDate.getFullYear() - selectedDate.getFullYear();

    // Adjust if the birthday hasn't occurred yet this year
    const monthDifference = currentDate.getMonth() - selectedDate.getMonth();
    const dayDifference = currentDate.getDate() - selectedDate.getDate();
    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
        age--;
    }

    return age;
}

export const base64StrToFile = (base64Str: string, fileName: string = 'image-file'): File => {
    // Split the Base64 string to get the data part (after the comma)
    const [base64Prefix, base64Data] = base64Str.split(',');
  
    // Determine MIME type (e.g., image/png, image/jpeg)
    const mimeTypeMatch = base64Prefix.match(/:(.*?);/);
    const mimeType = mimeTypeMatch ? mimeTypeMatch[1] : 'application/octet-stream';
  
    // Decode Base64 string to binary data
    const byteCharacters = atob(base64Data);
  
    // Create a typed array to store the binary data
    const byteArrays = new Uint8Array(byteCharacters.length);
  
    // Copy binary data into the typed array
    for (let i = 0; i < byteCharacters.length; i++) {
      byteArrays[i] = byteCharacters.charCodeAt(i);
    }
  
    // Create a Blob from the byte arrays
    const blob = new Blob([byteArrays], { type: mimeType });
  
    // Create and return a File object from the Blob
    return new File([blob], fileName, { type: mimeType });
}  