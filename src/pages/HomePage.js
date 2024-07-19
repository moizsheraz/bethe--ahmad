import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/HomePage.css";
import { Collapse } from "react-bootstrap";

const HomePage = () => {
  const [open, setOpen] = useState(false);
  return (
      <div className="home">
        <h1>Welcome!</h1>
        <div className="img">
          <img
            src="giftflowlogoclr.png"
            alt="Birthday Gifts Logo"
            className="logo-image"
          />
        </div>
        <p>Discover the Perfect Gifts for Your Child with Ease</p>
        <h5>
          GiftFlow, we know that nothing is more important than your child’s
          smile. We understand the challenge of finding the perfect gifts for
          your child. Our innovative gift-sharing platform uses advanced A.I. to
          help you create personalized gift lists that make every event more
          memorable and filled with joy
        </h5>

        <div className="partners">
          <h3>Comapnies With Us!</h3>
          <div className="moving-bar">
            <div className="moving-bar-inner">
              <img src="ToysRus.png" alt="Company Logo 1" />
              <img src="Marmelada.png" alt="Company Logo 3" />
              <img src="Mamme.png" alt="Company Logo 5" />
              <img src="ToysRus.png" alt="Company Logo 1" />
              <img src="Marmelada.png" alt="Company Logo 3" />
              <img src="Mamme.png" alt="Company Logo 5" />
              <img src="ToysRus.png" alt="Company Logo 1" />
              <img src="Marmelada.png" alt="Company Logo 3" />
              <img src="Mamme.png" alt="Company Logo 5" />
              <img src="ToysRus.png" alt="Company Logo 1" />
              <img src="Marmelada.png" alt="Company Logo 3" />
              <img src="Mamme.png" alt="Company Logo 5" />
            </div>
          </div>
        </div>

        <div className="button">
          <button onClick={() => setOpen(!open)}>
            {open ? "Hide Details" : "Show Details"}
          </button>
        </div>

        <Collapse in={open}>
          <div id="how-it-works-collapse">
            <div className="row">
              <div className="card"style={{ background: '#e4a8d33d' }}>
                <h5 className="card-title">Personalized Gift Suggestions</h5>
                <p className="card-text">
                  When you sign up, we’ll ask a few questions about your child’s
                  interests and personality. Our advanced A.I. analyzes this
                  information to recommend gifts that your child will love,
                  ensuring every present is a perfect match
                </p>
              </div>
              <div className="card" style={{ background: '#ecb7fc3d' }}>
                <h5 className="card-title">Easy Gift List Management</h5>
                <p className="card-text">
                  Create and manage gift lists for each of your children. Edit,
                  add, or remove items as you see fit, keeping the list updated
                  and relevant to your child’s evolving interests.
                </p>
              </div>
              <div className="card" style={{ background: '#e4a8d33d' }}>
                <h5 className="card-title">Share with Friends and Family</h5>
                <p className="card-text">
                  Once your list is complete, share it effortlessly with
                  friends, family, and even your child’s classmates through a
                  unique link. This makes it easy for others to see what gifts
                  your child would love.
                </p>
              </div>
              <div className="card" style={{ background: '#b7a3eb3d' }}>
                <h5 className="card-title">Event Details at a Glance</h5>
                <p className="card-text">
                  When someone opens your shared link, they’ll see all the
                  important event details like the date, time, and any special
                  notes you’ve included. This helps everyone stay informed and
                  makes gift-giving a breeze. They can also add the event to
                  their calendar and receive reminders to prepare in advance.
                </p>
              </div>
              <div className="card" style={{ background: '#ecb7fc3d' }}>
                <h5 className="card-title">Enhanced Gift Matching</h5>
                <p className="card-text">
                  If someone knows more details about your child, they can
                  provide this information through the shared link. Our A.I.
                  will use these additional insights to refine its gift
                  recommendations, ensuring an even better match for your
                  child’s preferences.
                </p>
              </div>
            </div>
          </div>
        </Collapse>
        <div className="why-choose-giftflow">
          <h3>Why choose GiftFlow?</h3>
          <div className="cards-container">
            <div className="card" style={{ background: '#ecb7fc3d' }}>
              <h5>Tailored for Children</h5>
              <p>
                Our platform is designed specifically for children, ensuring
                that every gift suggestion is age-appropriate and aligned with
                their interests.
              </p>
            </div>
            <div className="card" style={{ background: '#b7a3eb3d' }}>
              <h5>Multiple Children, One Account</h5>
              <p>
                Manage gift lists for all your children from a single parent
                account. Easily switch between profiles and keep each list
                organized and up-to-date.
              </p>
            </div>
            <div className="card" style={{ background: '#e4a8d33d' }}>
              <h5>Convenient and Fun</h5>
              <p>
                Make gift-giving enjoyable and stress-free. With GiftFlow, you
                can be confident that every gift is something your child will
                cherish.
              </p>
            </div>
          </div>
          <div className="button">
            <a href="/ai-help">
              <button>Try GiftFlow Today!</button>
            </a>
          </div>
        </div>

        <footer>
          <div className="rights">
          &copy; 2024 GiftFlow. All rights reserved.
          </div>
        </footer>
        
      </div>
  );
};

export default HomePage;