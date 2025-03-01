import React from "react";
import "./home.css";
import placeleft from "../assets/placeleft.png";
import placefull from "../assets/placefull.png";
import placeright from "../assets/placeright.png";
import gymguy from '../assets/gym-bg-1.png'
import q from '../assets/q.jpg'
import r from '../assets/r.jpg'
import s from '../assets/Erick.jpg'
const HomePage = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>TRANSFORM YOUR LIFE WITH Gym</h1>
          <p>
            Join Gym Today and Experience Expert Training, Personalized
            Programs, and a Supportive Community to Achieve Your Fitness Goals.
          </p>
          <button className="get-started-btn">
            Get Started <span>&rarr;</span>
          </button>
        </div>
        <div className="hero-image">
          <img src={gymguy} alt="" />
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="success-stories-section">
        <div className="success-content">
          <div className="success-text">
            <h2>Inspiring Success Stories from gymMembers</h2>
            <p>
              At Gym, we celebrate the incredible journeys of our
              members. From weight loss triumphs and muscle gain milestones to
              enhanced well-being and newfound confidence, our members' success
              stories highlight the power of commitment and community. Explore
              these inspiring testimonials and see how gymcan help
              you reach your fitness goals.
            </p>
            <button className="join-today-btn">Join Today</button>
          </div>

          {/* Success Stories Image Grid */}
          <div className="success-images">
            <div className="image-container">
              <img src={placefull} alt="Yoga Meditation" className="main-img" />
              <img
                src={placeleft}
                alt="Bodybuilding Transformation"
                className="left-img"
              />
              <img
                src={placeright}
                alt="Running and Fitness"
                className="right-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h2>Real Voices, Real Transformations</h2>
        <p className="testimonials-subtitle">
          See How gym Has Helped Our Members Achieve Their Fitness
          Goals and Transform Their Lives Through Expert Training and Supportive
          Community
        </p>

        <div className="testimonials-container">
          <div className="testimonial-card">
            <div className="star-rating">★★★★★</div>
            <p className="testimonial-text">
              Joining gym was the best decision I ever made for my
              health. The trainers are incredibly supportive, and the
              personalized programs have helped me achieve results!
            </p>
            <div className="testimonial-author">
              <img
                src={q}
                alt="John Doe"
                className="author-img"
              />
              <div className="author-info">
                <h4>John Doe</h4>
                <p>Marketing Executive</p>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="star-rating">★★★★★</div>
            <p className="testimonial-text">
              Gym Studio group classes are so much fun and motivating.
              I've lost 20 pounds and gained a ton of confidence. The community
              here is amazing.
            </p>
            <div className="testimonial-author">
              <img
                src={r}
                alt="Sarah Smith"
                className="author-img"
              />
              <div className="author-info">
                <h4>Sarah Smith</h4>
                <p>Graphic Designer</p>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="star-rating">★★★★★</div>
            <p className="testimonial-text">
              The holistic approach at gym has improved my overall
              well-being. The combination of strength training, cardio, and
              wellness programs has been life-changing.
            </p>
            <div className="testimonial-author">
              <img
                src={s}
                alt="Mike Johnson"
                className="author-img"
              />
              <div className="author-info">
                <h4>Mike Johnson</h4>
                <p>Entrepreneur</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Take the First Step Towards a Healthier You</h2>
          <p>
            Join gymToday and Transform Your Life with Expert
            Guidance, Personalized Programs, and a Supportive Community. Your
            Fitness Journey Starts Now!
          </p>
          <div className="cta-form">
            <input
              type="email"
              placeholder="Enter your email"
              className="email-input"
            />
            <button className="join-now-btn">Join Now</button>
          </div>
          <p className="terms-text">
            By clicking 'Sign Up', you confirm that you agree with our Terms and
            Conditions.
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
