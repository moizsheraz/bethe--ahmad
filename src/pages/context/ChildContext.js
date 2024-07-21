import React, { createContext, useContext, useState, useEffect } from 'react';
import { firestore } from '../../firebase/firebase';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where } from 'firebase/firestore';

// Create context
const ChildContext = createContext();

// Custom hook to use the context
export const useChild = () => {
  return useContext(ChildContext);
};

// Provider component
export const ChildProvider = ({ children }) => {
  const [childrenData, setChildrenData] = useState([]);

  // Fetch user info from localStorage
  const getUserFromLocalStorage = () => {
    const userInfo = localStorage.getItem('user-info');
    return userInfo ? JSON.parse(userInfo) : null;
  };

  useEffect(() => {
    const fetchUserChildren = async () => {
      const user = getUserFromLocalStorage();
      if (!user) return; // Exit if no user is available
      
      const q = query(collection(firestore, 'children'), where('userId', '==', user.uid));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setChildrenData(data);
    };

    fetchUserChildren();
  }, []);

  const addChild = async (child) => {
    const user = getUserFromLocalStorage();
    if (!user) return; // Ensure user is available

    const childWithUserId = { ...child, userId: user.uid };
    const docRef = await addDoc(collection(firestore, 'children'), childWithUserId);
    
    setChildrenData([...childrenData, { id: docRef.id, ...childWithUserId }]);
  };

  const updateChild = async (id, updatedChild) => {
    await updateDoc(doc(firestore, 'children', id), updatedChild);
    
    setChildrenData(childrenData.map(child => 
      child.id === id ? { ...child, ...updatedChild } : child
    ));
  };

  const deleteChild = async (id) => {
    await deleteDoc(doc(firestore, 'children', id));
    
    setChildrenData(childrenData.filter(child => child.id !== id));
  };

  return (
    <ChildContext.Provider value={{ childrenData, addChild, updateChild, deleteChild }}>
      {children}
    </ChildContext.Provider>
  );
};
