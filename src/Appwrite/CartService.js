import { Client, Account, ID , Databases , Query } from "appwrite";

const appwriteUrl="https://cloud.appwrite.io/v1"
const appwriteProjectId = "66922978002c1a570184"
const food_Database_id = "66aa157800185f4cebd0"
const food_collection_id = "66aa15830027d9bc6607"

export class CartService {
    client = new Client();
    account;
    databases =new Databases();

    constructor() {
        this.client
            .setEndpoint(appwriteUrl)
            .setProject(appwriteProjectId);
        this.account = new Account(this.client);
        this.databases = new Databases(this.client);
            
    }

    async addtocart(email, dishname, price) {
        try {
            const fooddata = await this.databases.createDocument(
                food_Database_id,
                food_collection_id,
                ID.unique(),
                {
                    email:email,
                    DishName:dishname,
                    Price:price
                }
            );
            
        } catch (error) {
            throw error;
        }
    }

    async getCart(email) {
        try {
            const items=await this.databases.listDocuments(
                food_Database_id,
                food_collection_id,
                [
                    Query.equal("email", [email]),
                ]
            );
            return items.documents;
        } catch (error) {
            throw error;
        }
    }

    async DeleteItemFromCart(email,dishname) {
        try {
            const items=await this.databases.deleteDocument(
                food_Database_id,
                food_collection_id,
                [
                    Query.equal("email", [email]),
                    Query.equal("DishName", [dishname])
                ]
            );
        } catch (error) {
            throw error;
        }
    }
}

const cartService = new CartService();

export default cartService;


