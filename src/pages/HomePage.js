import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/HomePage.css";
import { Collapse } from "react-bootstrap";
// import app.css
import "../App.css";

const HomePage = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="home">
      <div class="homecontainer ">
        <h1 class="welcome">!Welcome</h1>
        <img
          src="giftflowlogoclr.png"
          alt="Gift Flow Logo"
          class="logo pulsate-bck"
        />

        <p class="tagline">
          Discover the Perfect Gifts for Your Child with Ease
        </p>
        <p class="description">
          At GiftFlow, we know that nothing is more important than your child’s
          smile. We understand the challenge of finding the perfect gifts for
          your child. Our innovative gift-sharing platform uses advanced A.I. to
          help you create personalized gift lists that make every event more
          memorable and filled with joy.
        </p>
        <div class="background-shape shape1"></div>
        <div class="background-shape shape2"></div>
      </div>

      <div className="partners">
        <div class="companies-section">
          <h3>Companies With Us!</h3>
        </div>

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

      {/* <div className="button">
        <button onClick={() => setOpen(!open)}>
          {open ? "Hide Details" : "Show Details"}
        </button>
      </div> */}

      {/* <Collapse className="collapse" in={open}> */}
      <div className="feature-sections">
        <div className="feature">
          <div className="feature-text">
            <h2>Personalized Gift Suggestions</h2>
            <p className="paragraph">
              When you sign up, we’ll ask a few questions about your child’s
              interests and personality. Our advanced A.I. analyzes this
              information to recommend gifts that your child will love, ensuring
              every present is a perfect match.
            </p>
          </div>
          <img
            src="giftsuggestion.png"
            alt="Gift Suggestions"
            className="feature-image"
          />
        </div>
        <div className="feature" style={{ backgroundColor: "#EBF4F6" }}>
          <div className="feature-text">
            <h2
              style={{
                fontSize: "2.5rem",
                marginBottom: "18px",
                color: "#304463",
              }}
            >
              Easy Gift List Management
            </h2>
            <p
              className="paragraph"
              style={{ color: "#304463", fontSize: "1.4rem" }}
            >
              Create and manage gift lists for each of your children. Edit, add,
              or remove items as you see fit, keeping the list updated and
              relevant to your child’s evolving interests.
            </p>
          </div>
          <img
            src="giftmanagement.jpg"
            alt="Gift List Management"
            className="feature-image"
          />
        </div>
        <div className="feature">
          <div className="feature-text">
            <h2>Share with Friends and Family</h2>
            <p className="paragraph">
              Once your list is complete, share it effortlessly with friends,
              family, and even your child’s classmates through a unique link.
              This makes it easy for others to see what gifts your child would
              love.
            </p>
          </div>
          <img
            src="share.png"
            alt="Share with Friends and Family"
            className="feature-image"
          />
        </div>
        <div className="feature" style={{ backgroundColor: "#EBF4F6" }}>
          <div className="feature-text">
            <h2
              style={{
                fontSize: "2.5rem",
                marginBottom: "18px",
                color: "#304463",
              }}
            >
              Event Details at a Glance
            </h2>
            <p
              className="pargraph"
              style={{ color: "#304463", fontSize: "1.4rem" }}
            >
              When someone opens your shared link, they’ll see all the important
              event details like the date, time, and any special notes you’ve
              included. This helps everyone stay informed and makes gift-giving
              a breeze. They can also add the event to their calendar and
              receive reminders to prepare in advance.
            </p>
          </div>
          <img src="event.png" alt="Event Details" className="feature-image" />
        </div>
        <div className="feature">
          <div className="feature-text">
            <h2>Enhanced Gift Matching</h2>
            <p className="paragraph">
              If someone knows more details about your child, they can provide
              this information through the shared link. Our A.I. will use these
              additional insights to refine its gift recommendations, ensuring
              an even better match for your child’s preferences.
            </p>
          </div>
          <img
            src="giftmatch.png"
            alt="Enhanced Gift Matching"
            className="feature-image"
          />
        </div>
      </div>
      {/* </Collapse> */}
      <div class=""></div>

      <section className="choose-section">
        <div class="feature-container">
          <h3 className="heading-three">Why Choose GiftFlow?</h3>

          <div class="feature-section">
            <div class="feature-card">
              <div class="feature-content">
                <h5>Tailored for Children</h5>
                <p>
                  Our platform is designed specifically for children, ensuring
                  that every gift suggestion is age-appropriate and aligned with
                  their interests
                </p>
              </div>
              <div class="feature-image">
                <img src="moon.png" alt="Tailored for Children" />
              </div>
            </div>
            <div class="feature-card">
              <div class="feature-content">
                <h5>Multiple Children, One Account</h5>
                <p>
                  Manage gift lists for all your children from a single parent
                  account. Easily switch between profiles and keep each list
                  organized and up-to-date
                </p>
              </div>
              <div class="feature-image">
                <img src="toys.jpg" alt="Multiple Children" />
              </div>
            </div>
            <div class="feature-card">
              <div class="feature-content">
                <h5>Convenient and Fun</h5>
                <p>
                  Make gift-giving enjoyable and stress-free. With GiftFlow, you
                  can be confident that every gift is something your child will
                  cherish
                </p>
              </div>
              <div class="feature-image">
                <img src="child.jpg" alt="Convenient and Fun" />
              </div>
            </div>
          </div>
          <div class="cta-button">
            <a href="/ai-help">
              <button
                className="ctaButton"
                style={{ backgroundColor: "#088395" }}
              >
                Try GiftFlow Today!
              </button>
            </a>
          </div>
        </div>
      </section>
      <footer
        style={{
          color: "#EBF4F6",
          backgroundColor: "#088395",
        }}
      >
        <div>&copy; 2024 GiftFlow. All rights reserved.</div>
      </footer>
    </div>
  );
};

export default HomePage;
