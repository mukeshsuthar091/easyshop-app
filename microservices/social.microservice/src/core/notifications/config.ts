import * as admin from 'firebase-admin';
import { ServiceAccount } from "firebase-admin"

// Set the firebase config options
const fireBaseAdminConfig: ServiceAccount = {
    "projectId": process.env.FIREBASE_PROJECT_ID,
    "privateKey": process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    "clientEmail": process.env.FIREBASE_CLIENT_EMAIL,
}

// Initialize the firebase admin app
admin.initializeApp({
    credential: admin.credential.cert(fireBaseAdminConfig),
});

export default admin;