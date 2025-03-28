import { doc, setDoc } from 'firebase/firestore';
import { db } from 'db';

export async function saveProfileToDatabase(user) {
  const userRef = doc(db, 'users', user.uid);

  await setDoc(userRef, user, { merge: true });
}
