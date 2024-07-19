import React, { createContext, useState, useContext } from 'react';

const ChildContext = createContext();

export const ChildProvider = ({ children }) => {
    const [childrenData, setChildrenData] = useState([
        
          
    ]);

    const addChild = child => {
        setChildrenData([...childrenData, child]);
        
    };

    const updateChild = (oldName, newName) => {
        const updatedChildren = childrenData.map(child => 
            child.name === oldName ? { ...child, name: newName } : child
        );
        setChildrenData(updatedChildren);
    };

    const deleteChild = childName => {
        setChildrenData(childrenData.filter(child => child.name !== childName));
    };

    return (
        <ChildContext.Provider value={{ childrenData, addChild, updateChild, deleteChild ,setChildrenData}}>
            {children}
        </ChildContext.Provider>
    );
};

export const useChild = () => useContext(ChildContext);
