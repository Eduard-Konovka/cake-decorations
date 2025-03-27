import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from 'firebase/auth';
import { auth } from 'db';
import { updateUserProfile } from './actions';
import { saveProfileToDatabase } from 'functions';
import { toast } from 'react-toastify';

export const authSignUpUser = async (
  state,
  { user, errorTitle },
  changeGlobalState,
) => {
  const { fullName, phone, email, password } = user;

  try {
    await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(auth.currentUser, {
      displayName: fullName,
      photoURL: phone,
    });

    const authUpdateProfile = {
      ...user,
      userId: auth.currentUser.uid,
    };

    saveProfileToDatabase(user);

    return changeGlobalState(updateUserProfile, authUpdateProfile);
  } catch (error) {
    toast.error(`${errorTitle}: ${error.message}`);
  }
};

export const authSignInUser = async (state, { user, errorTitle }) => {
  const { email, password } = user;

  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    toast.error(`${errorTitle}: ${error.message}`);
  }
};

export const authSignOutUser = async (state, payload, changeGlobalState) => {
  await signOut(auth);

  const authInitialProfile = {
    userId: null,
    fullName: null,
  };

  changeGlobalState(updateUserProfile, authInitialProfile);
};

export const authStateChange = async (state, payload, changeGlobalState) => {
  await onAuthStateChanged(auth, authUser => {
    if (authUser) {
      const authUpdateProfile = {
        userId: authUser.uid,
        fullName: authUser.displayName,
      };

      changeGlobalState(updateUserProfile, authUpdateProfile);
    }
  });
};
