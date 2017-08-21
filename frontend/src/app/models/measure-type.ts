export interface IMeasurementType {
    id?: string;
    measureName: string;
    measureUnits?: Array<{
        id?: string
        unitName?: string;
        unitType?: string;
        conversionFactor?: number;
        isRemoved?: boolean;
    }>;
}
