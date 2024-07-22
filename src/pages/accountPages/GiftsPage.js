import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/GiftsPage.css'; 
import { useChild } from '../context/ChildContext';
import ChildList from './ChildList';
import GiftList from './GiftList';
import AddGiftForm from './AddGiftForm';
import EditGiftForm from './EditGiftForm';
import InvitationForm from "../InvetationPages/InvetationForom"; // Corrected the path
import AddFriendForm from './AddFriendForm';
import productsData from '../../assets/products.json'; 
import { firestore } from '../../firebase/firebase';
import { doc, updateDoc } from 'firebase/firestore';

const GiftsPage = () => {
  const { childrenData } = useChild(); 
  const [children, setChildren] = useState(childrenData.map(child => ({
    ...child,
    gifts: child.gifts || [],
    friends: child.friends || [],  
    invitations: child.invitations || [],  
    events: child.events || []  // Ensure events is always an array
  })));
  const [selectedChild, setSelectedChild] = useState(null);
  const [addingGift, setAddingGift] = useState(false);
  const [editingGift, setEditingGift] = useState(null);
  const [invite, setInvitation] = useState(false);
  const [addingFriend, setAddingFriend] = useState(false);
  const [view, setView] = useState('list');
  const [suggestedGifts, setSuggestedGifts] = useState([]);

  const getAiSuggestedProductIds = async () => {
    try {
      const response = await axios.post('http://localhost:4000/suggest-products', { answers: selectedChild?.answers || {} });
      return response.data.suggestedProductIds.split(',').map(id => id.trim());
    } catch (error) {
      console.error('Error fetching AI suggestions:', error);
      return [];
    }
  };

  const getSuggestedGifts = (ids) => {
    return productsData.filter(product => ids.includes(product.id.toString()));
  };

  useEffect(() => {
    const fetchSuggestedGifts = async () => {
      if (selectedChild) {
        const aiProductIds = await getAiSuggestedProductIds();
        const suggestions = getSuggestedGifts(aiProductIds);
        setSuggestedGifts(suggestions);
      }
    };

    fetchSuggestedGifts();
  }, [selectedChild]);

  const addGift = async (childName, gift) => {
    const updatedChildren = children.map(child => 
      child.name === childName ? { ...child, gifts: [...child.gifts, gift] } : child
    );
    setChildren(updatedChildren);

    const childRef = doc(firestore, 'children', selectedChild.id);
    await updateDoc(childRef, {
      gifts: updatedChildren.find(child => child.name === childName).gifts
    });
    
    setAddingGift(false);
    setView('list');
  };

  const deleteGift = async (childName, giftId) => {
    const updatedChildren = children.map(child => 
      child.name === childName 
        ? { ...child, gifts: child.gifts.filter(gift => gift.id !== giftId) }
        : child
    );
    setChildren(updatedChildren);
    
    const childRef = doc(firestore, 'children', selectedChild.id);
    await updateDoc(childRef, {
      gifts: updatedChildren.find(child => child.name === childName).gifts
    });
  };

  const updateGift = async (childName, updatedGift) => {
    const updatedChildren = children.map(child => 
      child.name === childName 
        ? { ...child, gifts: child.gifts.map(gift => gift.id === updatedGift.id ? updatedGift : gift) }
        : child
    );
    setChildren(updatedChildren);
    
    const childRef = doc(firestore, 'children', selectedChild.id);
    await updateDoc(childRef, {
      gifts: updatedChildren.find(child => child.name === childName).gifts
    });
    
    setEditingGift(null);
  };

  const addFriend = async (childName, friendId) => {
    const updatedChildren = children.map(child =>
      child.name === childName ? { ...child, friends: [...child.friends, friendId] } : child
    );
    setChildren(updatedChildren);

    const childRef = doc(firestore, 'children', selectedChild.id);
    await updateDoc(childRef, {
      friends: updatedChildren.find(child => child.name === childName).friends
    });

    setAddingFriend(false);
  };

  return (
    <div className="gifts-page">
      <h1 className="page-title">Manage Gifts</h1>
      <div className="page-content">
        <div className="child-list">
          <ChildList children={children} setSelectedChild={setSelectedChild} />
        </div>
        <div className="gift-section">
          {selectedChild && (
            <>
              <div className="view-switcher">
                <button className="btn" onClick={() => setView('add')}>Add Gift</button>
                <button className="btn" onClick={() => setView('addedgifts')}>Child's Gift</button>
                <button className="btn" onClick={() => setView('list')}>Suggesting Gifts</button>
              </div>

              {view === 'add' && (
                <AddGiftForm 
                  addGift={addGift} 
                  setAddingGift={setAddingGift} 
                  childName={selectedChild?.name}
                />
              )}

              {view === 'addedgifts' && (
                <GiftList
                  className='gift'
                  gifts={selectedChild?.gifts || []}
                  deleteGift={deleteGift}
                  setEditingGift={setEditingGift}
                  childName={selectedChild?.name}
                />
              )}

              {view === 'list' && (
                <>
                  {suggestedGifts.length > 0 && (
                    <div className="suggested-gifts">
                      <h3 className='gifts-header'>Suggested Gifts</h3>
                      <GiftList
                        gifts={suggestedGifts}
                        deleteGift={deleteGift}
                        setEditingGift={setEditingGift}
                        childName={selectedChild?.name}
                        isSuggested={true}
                      />
                    </div>
                  )}
                </>
              )}

              <button className="btn" onClick={() => setAddingFriend(true)}>Add Friend</button>
            </>
          )}
        </div>
      </div>

      {editingGift && selectedChild && (
        <div className="modal-overlay">
          <div className="modal-content">
            <EditGiftForm 
              gift={editingGift} 
              updateGift={updateGift} 
              setEditingGift={setEditingGift} 
              childName={selectedChild?.name}
            />
          </div>
        </div>
      )}

      {addingGift && selectedChild && (
        <div className="modal-overlay">
          <div className="modal-content">
            <AddGiftForm 
              addGift={addGift} 
              setAddingGift={setAddingGift} 
              childName={selectedChild?.name}
            />
          </div>
        </div>
      )}

      {addingFriend && selectedChild && (
        <div className="modal-overlay">
          <div className="modal-content">
            <AddFriendForm 
              children={children}
              addFriend={addFriend}
              setAddingFriend={setAddingFriend}
              childName={selectedChild?.name}
            />
          </div>
        </div>
      )}

      {selectedChild && (
        <div className="invite-section">
          <button className="btn invite-btn" onClick={() => setInvitation(true)}>Invite Friends</button>
        </div>
      )}

      {invite && selectedChild && (
        <div className="modal-overlay">
          <div className="modal-content">
            <InvitationForm 
              listOfGifts={selectedChild.gifts || []}
              childName={selectedChild.name} 
              childId={selectedChild.id}
              friends={selectedChild.friends}  // Pass the friends list
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default GiftsPage;
