export class ItemEntry {
    charId: number;
    charName: string;
    itemName: string;
    prioValue: number;
    hasItem: boolean;
}

export interface ItemEntryUpdate {
    charId: number;
    charName: string;
    itemName: string;
    prioValue: number;
    prioValueCalc: number;
    hasItem: boolean;
    hasPlusOne: boolean;
}

export class LootSheetUpdate {
    charId: number;
    itemName: string;
    prioValue: number;
    hasItem: boolean;
}