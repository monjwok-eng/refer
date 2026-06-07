import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, collection, addDoc, query, where, getDocs, serverTimestamp, getDoc } from "firebase/firestore";
import firebaseConfig from "../../firebase-applet-config.json";

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, (firebaseConfig as any).firestoreDatabaseId);
export const auth = getAuth(app);

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export const addFavorite = async (businessId: string, hustlerId: string) => {
    try {
        await addDoc(collection(db, "favorites"), { businessId, hustlerId });
        await addDoc(collection(db, "notifications"), {
            hustlerId,
            message: `You have been added to favorites by ${businessId}`,
            read: false,
            createdAt: serverTimestamp()
        });
    } catch (error) {
        handleFirestoreError(error, OperationType.WRITE, "favorites/notifications");
    }
};

export const postDeal = async (businessId: string, dealData: any, notifyFavorites: boolean) => {
    try {
        await addDoc(collection(db, "deals"), { ...dealData, businessId });
        
        if (notifyFavorites) {
            const q = query(collection(db, "favorites"), where("businessId", "==", businessId));
            const favoritesSnapshot = await getDocs(q);
            
            for (const doc of favoritesSnapshot.docs) {
                const favorite = doc.data();
                await addDoc(collection(db, "notifications"), {
                    hustlerId: favorite.hustlerId,
                    message: `New deal from ${businessId}: ${dealData.title}`,
                    read: false,
                    createdAt: serverTimestamp()
                });
            }
        }
    } catch (error) {
        handleFirestoreError(error, OperationType.WRITE, "deals/notifications");
    }
};
