import {Client, Account, ID} from "appwrite";
import config from '../config/config.js';


export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId);
    this.account = new Account(this.client)
    }

    async createAccount({email, password, name}){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if(userAccount){
                //call another method
                return this.login({email, password});
            }
            else{
                return userAccount;
            }
        } catch (error) {
            throw error;
            
        }
    }

    async login({email, password}){
        try {
            return await this.account.createEmailPasswordSession
            (email, password);    
            
        } catch (error) {
            return error
            
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
            
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error)
            // if(error.code === 404){
            //     window.location.href = "/login"
            // }
            
        }

        return null;
    }

    async logout(){
        try {
            return await this.account.deleteSessions();
        } catch (error) {
           console.log("Appwrite service :: logout :: error", error); 
        }
    }
}

const authService = new AuthService();
export default authService



