type MapDataType = {
    type: string;
    width: number;
    height: number;
    dataFormat: string;
    dataSource: {
        chart: {
            caption: string;
            subcaption: string;
            numbersuffix: string;
            includevalueinlabels: string;
            labelsepchar: string;
            entityFillHoverColor: string;
            theme: string;
        };
        colorrange: {
            minvalue: string;
            code: string;
            gradient: string;
            color: {
                minvalue: string;
                maxvalue: string;
                color: string;
            }[];
        };
        data: MapDataProp[];
    };
}


type MapDataProp = {
    id: string;
    value: string | number;
    showLabel: string;
}