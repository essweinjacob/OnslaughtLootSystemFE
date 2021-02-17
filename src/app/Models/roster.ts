export class Roster {
    charId: number;
    charName: string;
    charClass: string;
    attendCount: number;
    perms: string;
}

export class AddNewUser{
    charName: string;
    charClass: string;
    password: string;
    perms: string;
    role: string;
}

export class UpdateNote {
    charName: string;
    notes: string;
}

export class ChangePassword{
    charName: string;
    password: string;
}