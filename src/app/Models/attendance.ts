export class Attendance {
    charId: number;
    charName: string;
    charClass: string;
    raidDate: string;
    didAttend: boolean;
}

export class NameWithAttendance {
    charName: string;
    raidsAttended: number;
}

export class AttUpdate {
    charName: string;
    raidDate: string;
    didAttend: boolean;
}

export class CharNameAndRoster {
    charName: String;   
    charClass: string;
}

export class AddAttendance {
    charName: String;
    raidDate: string;
}