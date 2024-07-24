import React, { createContext, useContext, useState, useEffect } from 'react';
import { firestore } from '../../firebase/firebase';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where } from 'firebase/firestore';

const ChildContext = createContext();

export const useChild = () => {
  return useContext(ChildContext);
};

export const ChildProvider = ({ children }) => {
  const [childrenData, setChildrenData] = useState(() => {
    const storedChildrenData = localStorage.getItem('children-data');
    return storedChildrenData ? JSON.parse(storedChildrenData) : [];
  });

  const getUserFromLocalStorage = () => {
    const userInfo = localStorage.getItem('user-info');
    return userInfo ? JSON.parse(userInfo) : null;
  };

  const saveChildrenDataToLocalStorage = (data) => {
    localStorage.setItem('children-data', JSON.stringify(data));
  };

  useEffect(() => {
    const fetchUserChildren = async () => {
      const user = getUserFromLocalStorage();
      if (!user) return; 
      
      const q = query(collection(firestore, 'children'), where('userId', '==', user.uid));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setChildrenData(data);
      saveChildrenDataToLocalStorage(data);
    };

    const storedChildrenData = localStorage.getItem('children-data');
    if (storedChildrenData) {
      setChildrenData(JSON.parse(storedChildrenData));
    } else {
      fetchUserChildren();
    }
  }, []);

  const addChild = async (child) => {
    const user = getUserFromLocalStorage();
    if (!user) return;

    const childWithUserId = { ...child, userId: user.uid };
    const docRef = await addDoc(collection(firestore, 'children'), childWithUserId);
    
    const newChildrenData = [...childrenData, { id: docRef.id, ...childWithUserId }];
    setChildrenData(newChildrenData);
    saveChildrenDataToLocalStorage(newChildrenData); 
  };

  const updateChild = async (id, updatedChild) => {
    await updateDoc(doc(firestore, 'children', id), updatedChild);
    
    const newChildrenData = childrenData.map(child => 
      child.id === id ? { ...child, ...updatedChild } : child
    );
    setChildrenData(newChildrenData);
    saveChildrenDataToLocalStorage(newChildrenData); // Update local storage
  };

  const deleteChild = async (id) => {
    await deleteDoc(doc(firestore, 'children', id));
    
    const newChildrenData = childrenData.filter(child => child.id !== id);
    setChildrenData(newChildrenData);
    saveChildrenDataToLocalStorage(newChildrenData); // Update local storage
  };

  return (
    <ChildContext.Provider value={{ childrenData, addChild, updateChild, deleteChild }}>
      {children}
    </ChildContext.Provider>
  );
};
