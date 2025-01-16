import { AppConstants } from "@/utils/constants";
import { useEffect } from "react";

interface InfoParams {
    authorisationRequired?: boolean;
    inputParam?: string;
    hasDependency?: boolean;
    dependency?: any;
}

export default function useLoadData(
    dataLoaded: boolean,
    setDataLoading: (val: boolean) => void,
    dataLoaderFunction: (val?: string | null) => Promise<void>,
    setData: (val: any) => void,
    setDataLoaded: (val: boolean) => void,
    extraInfo: InfoParams = {
        authorisationRequired: false,
        inputParam: '',
        hasDependency: false,
        dependency: null,
    },
) {
    useEffect(() => {
        const savedToken = AppConstants.getSavedToken();

        if (extraInfo.hasDependency === true && (extraInfo.dependency === null || extraInfo.dependency === false)) return;

        if (dataLoaded) return setDataLoading(false);

        setDataLoading(true);
        
        dataLoaderFunction(
            extraInfo.authorisationRequired === true ? 
                savedToken 
                : 
            extraInfo.inputParam && extraInfo?.inputParam?.length > 0 ?
                extraInfo.inputParam
            :
            null
        ).then((res: any) => {
            setDataLoading(false);
            setData(res);
            setDataLoaded(true);
        }).catch(() => {
            setDataLoading(false);
        })
    }, [dataLoaded, extraInfo.hasDependency, extraInfo.dependency])
}