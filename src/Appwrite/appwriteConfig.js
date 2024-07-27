import { Client, Account, Databases,ID} from 'appwrite';

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('66922978002c1a570184');

export const account = new Account(client);

export const databases = new Databases(client , "669eb077001804161f69" , "669eb0a800032d5b581f" ,ID.unique());

// export { ID } from 'appwrite';