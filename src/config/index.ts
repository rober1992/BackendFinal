import dotenv from 'dotenv';
import path from 'path'
dotenv.config();

export default {
    NODE_ENV : process.env.NODE_ENV || 'production',
    PORT: process.env.PORT || 8080,
    GMAIL_EMAIL : process.env.GMAIL_EMAIL || 'gmail',
    GMAIL_PASSWORD : process.env.GMAIL_PASSWORD || 'gmailPassword',
    GMAIL_NAME : process.env.GMAIL_NAME || 'gmailName',
    ETHEREAL_EMAIL : process.env.ETHEREAL_EMAIL || 'etherealMail',
    ETHEREAL_PASSWORD : process.env.ETHEREAL_PASSWORD || 'etherealPassword',
    ETHEREAL_NAME : process.env.ETHEREAL_NAME || 'etherealName',
    MONGO_LOCAL_DBNAME : process.env.MONGO_LOCAL_DBNAME || 'mongoDBLocalName',
    MONGO_ATLAS_USER: process.env.MONGO_ATLAS_USER || 'user',
    MONGO_ATLAS_PASSWORD: process.env.MONGO_ATLAS_PASSWORD || 'pasw',
    MONGO_ATLAS_CLUSTER: process.env.MONGO_ATLAS_CLUSTER || 'clusterUrl',
    MONGO_ATLAS_DBNAME: process.env.MONGO_ATLAS_DBNAME || 'dbName',
    CLOUD_NAME : process.env.CLOUD_NAME || 'cloudName',
    API_KEY : process.env.API_KEY || 'apiKey',
    API_SECRET : process.env.API_SECRET || 'apiSecret',
};