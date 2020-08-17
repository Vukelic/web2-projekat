import { RoleTypes } from './enumeration.enum';

export class User {
    public Fullname: string;
    public Username: string;
    public Email: string;
    public Password: string;
    public Address: string;
    public PhoneNumber: string;
    public Role: RoleTypes;
    public Activated: boolean;


    constructor(Fullname:string,Username: string,Email: string,Password: string,Address:string,PhoneNumber: string) {
        this.Fullname=Fullname;
        this.Username= Username;
        this.Email=Email;
        this.Password= Password;
        this.Address=Address;
        this.PhoneNumber=PhoneNumber;
        this.Role=RoleTypes.user;
        this.Activated=false;
    }
   

}