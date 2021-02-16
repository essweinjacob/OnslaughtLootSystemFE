export class Attendance {
    charId: number;
    charName: string;
    charClass: string;
    raidDate: string;
    didAttend: boolean;
}

export class AttUpdate {
    charId: number;
    raidDate: string;
    didAttend: boolean;
}

export class CharNameAndRoster {
    charName: String;   
    charClass: string;
}

export class AddAttendance {
    charId: number;
    raidDate: string;
}