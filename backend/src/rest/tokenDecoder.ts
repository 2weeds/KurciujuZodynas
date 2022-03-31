import admin from '../config/FirebaseConfig';

export const tokenDecoder = async (auth: any) => {
    const token = auth.split(' ')[1];
    try {
        const decodeValue = admin.auth().verifyIdToken(token);
        if (decodeValue) {
            return true;
        }
        return false;
    } catch (e) {
        throw new Error("Internal server error");
    }
}