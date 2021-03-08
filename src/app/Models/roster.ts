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
}

export class UpdateNote {
    charName: string;
    notes: string;
}

export class ChangePassword{
    username: string;
    oldPassword: string;
    password: string;
}

export class isAdminCall {
    username: string;
    token: string;
}