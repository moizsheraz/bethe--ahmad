import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/GiftsPage.css";
import { useChild } from "../context/ChildContext";
import ChildList from "./ChildList";
import GiftList from "./GiftList";
import AddGiftForm from "./AddGiftForm";
import EditGiftForm from "./EditGiftForm";
import InvitationForm from "../InvetationPages/InvetationForom";
import AddFriendForm from "./AddFriendForm";
import productsData from "../../assets/products.json";
import { firestore } from "../../firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";

const GiftsPage = () => {
  const { childrenData } = useChild();
  const [children, setChildren] = useState(
    childrenData.map((child) => ({
      ...child,
      gifts: child.gifts || [],
      friends: child.friends || [],
      invitations: child.invitations || [],
      events: child.events || [],
    }))
  );
  const [selectedChild, setSelectedChild] = useState(null);
  const [addingGift, setAddingGift] = useState(false);
  const [editingGift, setEditingGift] = useState(null);
  const [invite, setInvitation] = useState(false);
  const [addingFriend, setAddingFriend] = useState(false);
  const [view, setView] = useState(null);
  const [activeButton, setActiveButton] = useState(null);
  const [suggestedGifts, setSuggestedGifts] = useState([]);
  const [summary, setSummary] = useState("");
  const getAiSuggestedProductIds = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/suggest-products",
        { answers: selectedChild?.answers || {} }
      );
      return response.data.suggestedProductIds
        .split(",")
        .map((id) => id.trim());
    } catch (error) {
      console.error("Error fetching AI suggestions:", error);
      return [];
    } finally {
    }
  };

  const getSuggestedGifts = (ids) => {
    return productsData.filter((product) =>
      ids.includes(product.id.toString())
    );
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

  const fetchSummary = async () => {
    if (!selectedChild) {
      console.error("No child selected for fetching summary");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/summary",
        selectedChild.answers || {}
      );
      const { summary } = response.data;

      if (summary) {
        setSummary(summary);
        handleButtonClick("summary"); // Set active button
      } else {
        console.warn("Summary not found in the response:", response.data);
      }
    } catch (error) {
      console.error("Error fetching summary:", error);
    }
  };

  const addGift = async (childName, gift) => {
    const updatedChildren = children.map((child) =>
      child.name === childName
        ? { ...child, gifts: [...child.gifts, gift] }
        : child
    );
    setChildren(updatedChildren);

    const updatedSelectedChild = updatedChildren.find(
      (child) => child.name === childName
    );
    setSelectedChild(updatedSelectedChild);

    const childRef = doc(firestore, "children", updatedSelectedChild.id);
    await updateDoc(childRef, {
      gifts: updatedSelectedChild.gifts,
    });

    setAddingGift(false);
    setView("addedgifts");
  };

  const deleteGift = async (childName, giftId) => {
    const updatedChildren = children.map((child) =>
      child.name === childName
        ? { ...child, gifts: child.gifts.filter((gift) => gift.id !== giftId) }
        : child
    );
    setChildren(updatedChildren);

    const updatedSelectedChild = updatedChildren.find(
      (child) => child.name === childName
    );
    setSelectedChild(updatedSelectedChild);

    const childRef = doc(firestore, "children", updatedSelectedChild.id);
    await updateDoc(childRef, {
      gifts: updatedSelectedChild.gifts,
    });
  };

  const addLikedGift = async (gift) => {
    if (selectedChild) {
      const updatedChildren = children.map((child) =>
        child.name === selectedChild.name
          ? {
              ...child,
              gifts: [...child.gifts, gift],
              addedGifts: [...(child.addedGifts || []), gift],
            }
          : child
      );
      setChildren(updatedChildren);

      const updatedSelectedChild = updatedChildren.find(
        (child) => child.name === selectedChild.name
      );
      setSelectedChild(updatedSelectedChild);

      const childRef = doc(firestore, "children", updatedSelectedChild.id);
      await updateDoc(childRef, {
        gifts: updatedSelectedChild.gifts,
        addedGifts: updatedSelectedChild.addedGifts,
      });

      setAddingGift(false);
    }
  };

  const updateGift = async (childName, updatedGift) => {
    const updatedChildren = children.map((child) =>
      child.name === childName
        ? {
            ...child,
            gifts: child.gifts.map((gift) =>
              gift.id === updatedGift.id ? updatedGift : gift
            ),
          }
        : child
    );
    setChildren(updatedChildren);

    const updatedSelectedChild = updatedChildren.find(
      (child) => child.name === childName
    );
    setSelectedChild(updatedSelectedChild);

    const childRef = doc(firestore, "children", updatedSelectedChild.id);
    await updateDoc(childRef, {
      gifts: updatedSelectedChild.gifts,
    });

    setEditingGift(null);
  };

  const addFriend = async (childName, friendId) => {
    const updatedChildren = children.map((child) =>
      child.name === childName
        ? { ...child, friends: [...child.friends, friendId] }
        : child
    );
    setChildren(updatedChildren);

    const updatedSelectedChild = updatedChildren.find(
      (child) => child.name === childName
    );
    setSelectedChild(updatedSelectedChild);

    const childRef = doc(firestore, "children", updatedSelectedChild.id);
    await updateDoc(childRef, {
      friends: updatedSelectedChild.friends,
    });

    setAddingFriend(false);
  };

  const handleButtonClick = (view) => {
    setView(view);
    setActiveButton(view); // Set active button
  };

  return (
    <div className="gifts-page">
      {selectedChild && (
        <div className="invite-section">
          <button
            className="btn invite-btn"
            onClick={() => setInvitation(true)}
          >
            Invite Friends
          </button>
        </div>
      )}
      <h1 className="page-title">
        Manage Gifts for {selectedChild ? selectedChild.name : ""}
      </h1>{" "}
      {/* Updated header */}
      <div className="page-content">
        <div className="child-list">
          <ChildList children={children} setSelectedChild={setSelectedChild} />
        </div>
        <div className="gift-section">
          {selectedChild && (
            <>
              <div className="view-switcher">
                <button
                  className={`btn ${activeButton === "add" ? "active" : ""}`}
                  onClick={() => handleButtonClick("add")}
                >
                  Add Gift
                </button>
                <button
                  className={`btn ${
                    activeButton === "addedgifts" ? "active" : ""
                  }`}
                  onClick={() => handleButtonClick("addedgifts")}
                >
                  Child's Gift
                </button>
                <button
                  className={`btn ${activeButton === "list" ? "active" : ""}`}
                  onClick={() => handleButtonClick("list")}
                >
                  Suggesting Gifts
                </button>
                <button
                  className={`btn ${
                    activeButton === "summary" ? "active" : ""
                  }`}
                  onClick={fetchSummary}
                >
                  Child will like...
                </button>
              </div>

              {view === "add" && (
                <AddGiftForm
                  addGift={addGift}
                  setAddingGift={setAddingGift}
                  childName={selectedChild?.name}
                />
              )}

              {view === "addedgifts" && (
                <GiftList
                  className="gift"
                  gifts={selectedChild?.gifts || []}
                  deleteGift={deleteGift}
                  setEditingGift={setEditingGift}
                  childName={selectedChild?.name}
                  isAdded={true}
                />
              )}

              {view === "list" && (
                <>
                  {suggestedGifts.length > 0 ? (
                    <div className="suggested-gifts">
                      <h3 className="gifts-header">Suggested Gifts</h3>
                      <GiftList
                        gifts={suggestedGifts}
                        deleteGift={deleteGift}
                        setEditingGift={setEditingGift}
                        childName={selectedChild?.name}
                        isSuggested={true}
                        addLikedGift={addLikedGift}
                      />
                    </div>
                  ) : (
                    <h2>AI is thinking..</h2>
                  )}
                </>
              )}

              {view === "summary" && summary && (
                <div className="summary-section">
                  <h3>Child will like...</h3>
                  <p className="">{summary}</p>
                </div>
              )}
              {view === null && <div className="summary-section"></div>}
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
      {/* old invite friend */}
      {invite && selectedChild && (
        <div className="modal-overlay">
          <div className="modal-content">
            <InvitationForm
              listOfGifts={selectedChild.gifts || []}
              childName={selectedChild.name}
              childId={selectedChild.id}
              friends={selectedChild.friends}
              summary={summary}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default GiftsPage;
