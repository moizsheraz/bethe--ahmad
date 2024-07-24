import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/GiftsPage.css'; 
import { useChild } from '../context/ChildContext';
import ChildList from './ChildList';
import GiftList from './GiftList';
import AddGiftForm from './AddGiftForm';
import EditGiftForm from './EditGiftForm';
import InvitationForm from "../InvetationPages/InvetationForom"; 
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
  const [summary, setSummary] = useState(''); 

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
    fetchSummary();
    fetchSuggestedGifts();
  }, [selectedChild]);


  const fetchSummary = async () => {
    if (!selectedChild) {
      console.error('No child selected for fetching summary');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:4000/summary', selectedChild.answers || {});
      const { summary } = response.data;
  
      if (summary) {
        setSummary(summary);
        setView('summary');
      } else {
        console.warn('Summary not found in the response:', response.data);
      }
    } catch (error) {
      console.error('Error fetching summary:', error);
    }
  };
  

  const addGift = async (childName, gift) => {
    const updatedChildren = children.map(child => 
      child.name === childName ? { ...child, gifts: [...child.gifts, gift] } : child
    );
    setChildren(updatedChildren);

    const updatedSelectedChild = updatedChildren.find(child => child.name === childName);
    setSelectedChild(updatedSelectedChild);

    const childRef = doc(firestore, 'children', updatedSelectedChild.id);
    await updateDoc(childRef, {
      gifts: updatedSelectedChild.gifts
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

    const updatedSelectedChild = updatedChildren.find(child => child.name === childName);
    setSelectedChild(updatedSelectedChild);

    const childRef = doc(firestore, 'children', updatedSelectedChild.id);
    await updateDoc(childRef, {
      gifts: updatedSelectedChild.gifts
    });
  };

  const updateGift = async (childName, updatedGift) => {
    const updatedChildren = children.map(child => 
      child.name === childName 
        ? { ...child, gifts: child.gifts.map(gift => gift.id === updatedGift.id ? updatedGift : gift) }
        : child
    );
    setChildren(updatedChildren);

    const updatedSelectedChild = updatedChildren.find(child => child.name === childName);
    setSelectedChild(updatedSelectedChild);

    const childRef = doc(firestore, 'children', updatedSelectedChild.id);
    await updateDoc(childRef, {
      gifts: updatedSelectedChild.gifts
    });

    setEditingGift(null);
  };

  const addFriend = async (childName, friendId) => {
    const updatedChildren = children.map(child =>
      child.name === childName ? { ...child, friends: [...child.friends, friendId] } : child
    );
    setChildren(updatedChildren);

    const updatedSelectedChild = updatedChildren.find(child => child.name === childName);
    setSelectedChild(updatedSelectedChild);

    const childRef = doc(firestore, 'children', updatedSelectedChild.id);
    await updateDoc(childRef, {
      friends: updatedSelectedChild.friends
    });

    setAddingFriend(false);
  };

  return (
    <div className="gifts-page">
      <h1 className="page-title">Manage Gifts for {selectedChild ? selectedChild.name : ''}</h1> {/* Updated header */}
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
                <button className="btn" onClick={fetchSummary}>Child will like...</button> 
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
                  isAdded={true}
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

              {view === 'summary' && summary && ( // Ensure only the summary view is visible
                <div className="summary-section">
                  <h3>Child will like...</h3>
                  <p className="">{summary}</p>
                </div>
              )}

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
              friends={selectedChild.friends}  
              summary = {summary}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default GiftsPage;
