import React from "react";
import "../styles/about.css"; // Make sure to adjust the path to your CSS file

const About = () => {
  return (
      <div className="about">
        <h1>About Us</h1>
        <p>
          We are a team of four persons Our website was created out of
          recognition of a problem many of us face during children's birthdays –
          guests don't always know what to buy, and sometimes the gifts are not
          suitable or meaningful. Our goal is to ease the burden on guests and
          ensure that every child receives a gift they truly love and
          appreciate.
        </p>

      <div className="about-cards">
        <div id="card">
          <img src={'avatar.png'} alt="Avatar Photo" />
          <h4>Avatar Name</h4>
          <p>Team Member</p>
          <p className="email">hello@gmail.com</p>
        </div>
        <div id="card">
          <img src={'avatar.png'} alt="Avatar Photo" />
          <h4>Avatar Name</h4>
          <p>Team Member</p>
          <p className="email">hello@gmail.com</p>
        </div>
        <div id="card">
          <img src={'avatar.png'} alt="Avatar Photo" />
          <h4>Avatar Name</h4>
          <p>Team Member</p>
          <p className="email">hello@gmail.com</p>
        </div>
        <div id="card">
          <img src={'avatar.png'} alt="Avatar Photo" />
          <h4>Avatar Name</h4>
          <p>Team Member</p>
          <p className="email">hello@gmail.com</p>
        </div>
      </div>

      </div>
  );
};

export default About;
