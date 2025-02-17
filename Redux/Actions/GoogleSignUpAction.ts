import { SIGN_IN_CANCELLED, SIGN_IN_ERROR, SIGN_IN_SUCCESS } from '@/Redux/ReduxConstants';
import { Dispatch } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import 'expo-dev-client';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import app  from '@/firebaseConfiguration';
import { getAuth, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';


GoogleSignin.configure({
  webClientId: '495571122421-lbono0lgajjh01r53md65ojijmf6ak2n.apps.googleusercontent.com',
  // googleServicePlistPath: 'google-services.json',
  
  // offlineAccess: true
});

export const googleSignIn = (): any => async (dispatch: Dispatch) => {
  
  try {
    const firebaseDB = getFirestore(app);
    const auth = getAuth(app);
    // Ensure Google Play Services are available
    await GoogleSignin.hasPlayServices();

    // Log out the current user
    await GoogleSignin.signOut();

    // Prompt user for sign-in
    const userInfo = await GoogleSignin.signIn();

    if (!userInfo.data?.idToken) {
      dispatch({
        type: SIGN_IN_CANCELLED
      });
      return Promise.resolve({ type: SIGN_IN_CANCELLED });
    }

    // If sign-in was successful, proceed with Firebase authentication
    const { idToken } = userInfo.data;
    const googleCredential = GoogleAuthProvider.credential(idToken);

    const userCredential = await signInWithCredential(auth, googleCredential);
    const user = userCredential.user;

    const serializableUser = {
      displayName: user.displayName,
      email: user.email,
      emailVerified: user.emailVerified,
      isAnonymous: user.isAnonymous,
      metadata: {
        creationTime: user.metadata.creationTime,
        lastSignInTime: user.metadata.lastSignInTime,
      },
      phoneNumber: user.phoneNumber,
      photoURL: user.photoURL,
      uid: user.uid,
    };
    await AsyncStorage.setItem('user', serializableUser.uid)
    await setDoc(doc(firebaseDB, 'users', user.uid), {
      displayName: user.displayName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      photoUrl: user.photoURL,
      theme: 'Arctic Mist'
    });
    
    // Dispatch success action
    dispatch({
      type: SIGN_IN_SUCCESS,
      payload: serializableUser,
    });
    return Promise.resolve({ type: SIGN_IN_SUCCESS });
  } catch (error: any) {
    console.log('Sign-in error:', error);
    dispatch({
      type: SIGN_IN_ERROR,
      payload: error.message,
    });
  }
};
