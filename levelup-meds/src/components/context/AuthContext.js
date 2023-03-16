import { createContext, useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import auth from "../Auth/AuthProvider";

const UserContext = createContext();

export const AuthContext = ({ children }) => {
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  // const signUp = async (email, password, displayName) => {
  //   setError(null);
  //   setIsPending(true);

  //   console.log(displayName);

  //   try {
  //     // sign up user
  //     const res = await createUser(email, password);

  //     if (!res) {
  //       throw new Error("Could not complete signup");
  //     }
  //     // add display name to user
  //     await updateProfile(auth.currentUser, {
  //       displayName: displayName,
  //     })
  //       .then(() => {
  //         const name = displayName.split(" ");
  //         setDoc(doc(db, "Accounts", auth.currentUser.uid), {
  //           fname: name[0],
  //           lname: name[1],
  //           email: email,
  //           uid: auth.currentUser.uid,
  //         });
  //       })
  //       .catch((error) => {
  //         console.log(error.message);
  //       });

  //     await auth.currentUser
  //       .reload()
  //       .then(() => {
  //         console.log("Successfully reloaded");
  //       })
  //       .catch(() => {
  //         console.log("Unable to reload");
  //       });
  //     // dispatch({ type: "LOGIN", payload: res.user });
  //     setIsPending(false);
  //     setError(null);
  //   } catch (error) {
  //     setError(error.message);
  //     console.log(error.message);
  //     setIsPending(false);
  //   }
  // };

  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ createUser, user, logout, signIn, signUp }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
