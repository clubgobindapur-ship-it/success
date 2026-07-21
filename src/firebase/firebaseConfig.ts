import { initializeApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, doc, getDocFromServer } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// ⚠️ Add your Firebase apiKey here. Get it from:
// Firebase Console → Project Settings → Your apps → Web app → SDK setup and configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
  authDomain: "success-group-c58d5.firebaseapp.com",
  projectId: "success-group-c58d5",
  storageBucket: "success-group-c58d5.firebasestorage.app",
  messagingSenderId: "1065609481955",
  appId: "1:1065609481955:web:f4a55ef87fb620c517bfd6",
  measurementId: "G-PHCLL7NSFG"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firebase services — Auth requires a valid apiKey
export const db = getFirestore(app);
export const storage = getStorage(app);

let _auth: Auth | null = null;
try {
  _auth = getAuth(app);
} catch (e) {
  console.warn("Firebase Auth could not be initialized. Admin features will be disabled. Add VITE_FIREBASE_API_KEY to your .env file.");
}
export const auth = _auth;

// Operational Types for Error Handlers
export enum OperationType {
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
  LIST = "list",
  GET = "get",
  WRITE = "write",
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

/**
 * Centrally handles and logs Firestore errors with detailed operational and authentication details,
 * complying with critical safety guidelines.
 */
export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth?.currentUser?.uid,
      email: auth?.currentUser?.email,
      emailVerified: auth?.currentUser?.emailVerified,
      isAnonymous: auth?.currentUser?.isAnonymous,
      tenantId: auth?.currentUser?.tenantId,
      providerInfo: auth?.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error("Firestore Error Detailed: ", JSON.stringify(errInfo));
  // We throw a standardized error which the application can catch or display
  throw new Error(JSON.stringify(errInfo));
}

/**
 * Validates connection to Firestore database server-side / live network connection.
 */
export async function testConnection() {
  try {
    await getDocFromServer(doc(db, "test", "connection"));
    console.log("Firestore live server connection test executed successfully.");
  } catch (error) {
    if (error instanceof Error && error.message.includes("the client is offline")) {
      console.warn("Please check your Firebase configuration or internet connection. Client is offline.");
    }
  }
}

testConnection();
