export interface ResetpwdOutput {
    id:       number;
    name:     string;
    username: string;
    email:    string;
    password: string;
    idcard:   string;
    roles:    Role[];
}

export interface Role {
    id:   number;
    name: string;
}
