import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from 'db';

export async function saveProfileToDatabase(user) {
  if (auth.currentUser) {
    const { uid, displayName, email } = await auth.currentUser;

    const usersDevisesRef = doc(db, 'users', uid);

    await setDoc(
      usersDevisesRef,
      {
        ...user,
        fullName: displayName,
        email,
      },
      { merge: true },
    );
  }
}
