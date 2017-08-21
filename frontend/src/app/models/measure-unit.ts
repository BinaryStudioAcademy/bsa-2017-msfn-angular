export interface IMeasureUnit {
    id?: string;
    measureName?: string;
    unitName: string;
    unitType?: string;
    conversionFactor?: number;
    isRemoved?: boolean;
}
