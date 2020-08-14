import { RoleTypes } from './enumeration.enum';

export class User {
    public FirstName: string ;
    public LastName: string;
    public Username: string;
    public Email: string;
    public Password: string;
    public Address: string;
    public PhoneNumber: string;
    public Role: RoleTypes;
    public Activated: boolean;


    constructor(FirstName:string,LastName: string,Username: string,Email: string,Password: string,Address:string,PhoneNumber: string) {
        this.FirstName=FirstName;
        this.LastName=LastName
        this.Username= Username;
        this.Email=Email;
        this.Password= Password;
        this.Address=Address;
        this.PhoneNumber=PhoneNumber;
        this.Role=RoleTypes.User;
        this.Activated=false;
    }

}