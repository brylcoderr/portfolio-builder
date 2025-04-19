import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  GoogleAuthProvider, 
  GithubAuthProvider, 
  signInWithPopup,
  sendPasswordResetEmail,
  updateProfile,
  User as FirebaseUser
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { User } from '../types';

export const registerWithEmail = async (email: string, password: string, displayName: string): Promise<User> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName });
    
    // Create user document in Firestore
    const newUser: Omit<User, 'uid'> = {
      email: userCredential.user.email!,
      displayName: displayName,
      photoURL: null,
      createdAt: Date.now(),
    };
    
    await setDoc(doc(db, 'users', userCredential.user.uid), newUser);
    
    return {
      uid: userCredential.user.uid,
      ...newUser
    };
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const loginWithEmail = async (email: string, password: string): Promise<FirebaseUser> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const loginWithGoogle = async (): Promise<FirebaseUser> => {
  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    
    // Check if user exists in Firestore
    const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
    
    if (!userDoc.exists()) {
      // Create user document if first time logging in
      const newUser = {
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
        photoURL: userCredential.user.photoURL,
        createdAt: Date.now(),
      };
      
      await setDoc(doc(db, 'users', userCredential.user.uid), newUser);
    }
    
    return userCredential.user;
  } catch (error) {
    console.error('Error logging in with Google:', error);
    throw error;
  }
};

export const loginWithGithub = async (): Promise<FirebaseUser> => {
  try {
    const provider = new GithubAuthProvider();
    provider.addScope('repo');
    const userCredential = await signInWithPopup(auth, provider);
    
    // Extract GitHub username from provider data
    const githubUsername = userCredential.user.providerData[0].uid;
    
    // Check if user exists in Firestore
    const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
    
    if (!userDoc.exists()) {
      // Create user document if first time logging in
      const newUser = {
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
        photoURL: userCredential.user.photoURL,
        githubUsername: githubUsername,
        createdAt: Date.now(),
      };
      
      await setDoc(doc(db, 'users', userCredential.user.uid), newUser);
    } else if (!userDoc.data().githubUsername) {
      // Update GitHub username if not already set
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        githubUsername: githubUsername
      }, { merge: true });
    }
    
    return userCredential.user;
  } catch (error) {
    console.error('Error logging in with GitHub:', error);
    throw error;
  }
};

export const logoutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
};

export const resetPassword = async (email: string): Promise<void> => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.error('Error resetting password:', error);
    throw error;
  }
};

export const getCurrentUser = (): Promise<FirebaseUser | null> => {
  return new Promise((resolve) => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      unsubscribe();
      resolve(user);
    });
  });
};

export const getUserData = async (uid: string): Promise<User | null> => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      return {
        uid,
        ...userDoc.data() as Omit<User, 'uid'>
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
};