const { initializeApp, cert, getApps } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

export function database() {
  if (getApps().length) { return;}
  try {
    initializeApp({
      credential: cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      })
    });

    const db = getFirestore();
    db.settings({ ignoreUndefinedProperties: true })
    return db;
  } catch (error) {
    console.log('Firebase admin initialization error', error.stack);
  }
}



