import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from 'firebase/auth';
import { auth } from 'db';
import { updateUserProfile } from './actions';
import { saveProfileToDatabase, getProfileFromDatabase } from 'functions';
import { initialUser } from 'state';
import { toast } from 'react-toastify';

export const authSignUpUser = async (
  state,
  { user, errorTitle },
  changeGlobalState,
) => {
  const { firstName, lastName, email, password } = user;
  const fullName = `${firstName} ${lastName}`;

  try {
    await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(auth.currentUser, {
      displayName: fullName,
    });

    const newUser = {
      ...user,
      uid: auth.currentUser.uid,
    };

    delete newUser.password;

    saveProfileToDatabase(newUser);

    return changeGlobalState(updateUserProfile, newUser);
  } catch (error) {
    toast.error(`${errorTitle}: ${error.message}`);
  }
};

export const authSignInUser = async (
  state,
  { user, errorTitle },
  changeGlobalState,
) => {
  const { email, password } = user;

  try {
    await signInWithEmailAndPassword(auth, email, password);

    const newUser = await getProfileFromDatabase(auth.currentUser.uid);

    return changeGlobalState(updateUserProfile, newUser);
  } catch (error) {
    toast.error(`${errorTitle}: ${error.message}`);
  }
};

export const authSignOutUser = async (state, payload, changeGlobalState) => {
  await signOut(auth);

  return changeGlobalState(updateUserProfile, initialUser);
};
