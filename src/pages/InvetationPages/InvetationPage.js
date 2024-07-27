import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { firestore } from "../../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import "../../styles/Products.css";
import "./InvitationPage.css";
import { FaCopy } from "react-icons/fa";
import "../../App.css";

const InvitationPage = () => {
  const { invitationId } = useParams();
  const [invitation, setInvitation] = useState(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [filteredList, setFilteredList] = useState([]);
  const [isGiftOpen, setIsGiftOpen] = useState(false);

  useEffect(() => {
    const fetchInvitation = async () => {
      try {
        const invitationDoc = doc(firestore, "invitations", invitationId);
        const docSnap = await getDoc(invitationDoc);
        if (docSnap.exists()) {
          const invitationData = docSnap.data();
          setInvitation(invitationData);
          setFilteredList(invitationData.list);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching invitation:", error);
      }
    };

    fetchInvitation();
  }, [invitationId]);

  useEffect(() => {
    if (invitation) {
      // Filter gifts based on selected price range
      const filtered = invitation.list.filter((item) => {
        const price = parseFloat(item.price.replace("$", ""));
        switch (selectedPriceRange) {
          case "0-50":
            return price >= 0 && price <= 50;
          case "51-100":
            return price > 50 && price <= 100;
          case "101-200":
            return price > 100 && price <= 200;
          case "201-500":
            return price > 200 && price <= 500;
          case "500+":
            return price > 500;
          default:
            return true; // Show all items if 'all' is selected
        }
      });
      setFilteredList(filtered);
    }
  }, [selectedPriceRange, invitation]);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      alert("Invitation link copied to clipboard!");
    });
  };

  const handleGiftClick = () => {
    setIsGiftOpen(true);
  };

  const getGoogleCalendarLink = () => {
    if (!invitation) return "";

    const { name, date, time, place } = invitation;

    // Format the date and time
    const eventDate = new Date(date);
    const eventStart = new Date(
      `${eventDate.toISOString().split("T")[0]}T${time}:00`
    );
    const eventEnd = new Date(eventStart.getTime() + 2 * 60 * 60 * 1000); // Assuming 2 hours event duration

    const start = eventStart
      .toISOString()
      .replace(/-|:|\.\d+Z/g, "")
      .replace("T", "T");
    const end = eventEnd
      .toISOString()
      .replace(/-|:|\.\d+Z/g, "")
      .replace("T", "T");

    const googleCalendarBase =
      "https://calendar.google.com/calendar/render?action=TEMPLATE";
    const details = `Event: ${name} - Birthday Party\nLocation: ${place}`;
    const description = invitation.description
      ? `Details: ${invitation.description}`
      : "";

    return `${googleCalendarBase}&text=${encodeURIComponent(
      name
    )}&dates=${start}/${end}&details=${encodeURIComponent(
      details + " " + description
    )}&location=${encodeURIComponent(place)}`;
  };

  if (!invitation) return <p>Loading...</p>;

  const { name, place, date, time, description, summary } = invitation;
  let DateArr = date
    ? new Date(date).toString().split(" ")
    : ["", "", "", "", ""];

  return (
    <div className="outer-container">
      <div className="invitation-page">
        {/* <div>
        <div className="balloon"></div>
        <h1>Birthday Party Invitation 🎉</h1>
        <h4>You are invited to celebrate {name}'s birthday!</h4>
        <h4>
          📅 Date and Time:{" "}
          <strong>
            {time} {DateArr[0]} {DateArr[2]} {DateArr[1]}
          </strong>
        </h4>
        <h4>
          📍 Location: <strong>{place}</strong>
        </h4>
        <h4>
          Come rejoice, dance, and surprise {name} with gifts they truly love!
        </h4>
        {description && (
          <p>
            <strong>Additional Details:</strong> {description}
          </p>
        )}
      </div> */}
        <div className="invitation-container">
          {/* <div className="balloon"></div> */}
          <h1>🎉Birthday Party Invitation 🎉</h1>
          <h4>You are invited to celebrate {name}'s birthday! 🥳</h4>
          <h4>
            📅 Date and Time:{" "}
            <strong>
              {time} {DateArr[0]} {DateArr[2]} {DateArr[1]}
            </strong>
          </h4>
          <h4>
            📍 Location: <strong>{place}</strong>
          </h4>
          <h4>
            Come rejoice, dance, and surprise {name} with gifts they truly love!
            🎁
          </h4>
          {description && (
            <p>
              <strong>Additional Details:</strong> {description}
            </p>
          )}
          <div className="copy">
            <strong>Invitation Link:</strong>
            <span
              style={{ cursor: "pointer", fontSize: "1rem", padding: "10px" }}
              onClick={handleCopy}
            >
              <FaCopy width={"8"} height={"8"} />
            </span>
          </div>
        </div>

        {summary && (
          <p style={{ color: "#304463", fontSize: "1rem" }}>
            <strong>Child Will love these Gifts:</strong> {summary}
          </p>
        )}
        <div className="calendar-button-container" style={{ margin: "20px 0" }}>
          <a
            href={getGoogleCalendarLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="google-calendar-button"
          >
            Add to Google Calendar
          </a>
        </div>
        {/* Container for filter and gift list */}
        <div className="content-container">
          {/* Filter Section */}
          <div
            className="filter-container"
            style={{
              display: "flex",
              justifyContent: "center",
              backgroundColor: "#37B7C3",
            }}
          >
            <select
              id="priceRange"
              className="price-filter"
              style={{ width: "20vw", color: "#EBF4F6" }}
              value={selectedPriceRange}
              onChange={(e) => setSelectedPriceRange(e.target.value)}
            >
              <option value="all">All</option>
              <option value="0-50">$0 - $50</option>
              <option value="51-100">$51 - $100</option>
              <option value="101-200">$101 - $200</option>
              <option value="201-500">$201 - $500</option>
              <option value="500+">$500+</option>
            </select>
          </div>

          {/* Gifts List */}
          {filteredList && filteredList.length > 0 && (
            <div className="item-list">
              {filteredList.map((item, index) => (
                <li key={index} className="item">
                  <img src={item.image} alt={item.name} />
                  <p>
                    <strong>Name:</strong> {item.name}
                  </p>
                  <p>
                    <strong>Price:</strong> {item.price}
                  </p>
                  <p>
                    <strong>Description:</strong> {item.description}
                  </p>
                </li>
              ))}
            </div>
          )}
        </div>

        {/* Gift Box Animation */}
        <div
          className={`gift-container ${isGiftOpen ? "gift-open" : ""}`}
          onClick={handleGiftClick}
        >
          <div className="gift-lid"></div>
          <div className="gift-box"></div>
        </div>
      </div>
    </div>
  );
};

export default InvitationPage;
