import { Client, Account, Databases} from 'appwrite';

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('66922978002c1a570184');

export const account = new Account(client);

export const databases = new Databases(client,"66923848001a56c8b298");

// export { ID } from 'appwrite';