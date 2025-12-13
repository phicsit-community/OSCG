"use client";

import React, { useState, useEffect } from 'react';
import './AnimatedSidePanel.css';

const slides = [
  {
    title: 'Join the<br/><span>Open Source</span><br/>Community',
    desc: 'Connect with contributors, discover projects, and make your mark in the open source world.',
  },
  {
    title: 'Contribute &<br/><span>Collaborate</span>',
    desc: 'Find projects that match your skills, submit PRs, and grow as a developer together.',
  },
  {
    title: 'Build Your<br/><span>Recognition</span>',
    desc: 'Earn badges, showcase contributions, and get recognized for your open source work.',
  },
  {
    title: 'Connect<br/><span>Contributors</span><br/>& Maintainers',
    desc: 'Bridge the gap between project admins and passionate contributors worldwide.',
  },
];

const AnimatedSidePanel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setIsTransitioning(false);
      }, 300);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="side-panel">
      {/* Floating Shapes */}
      <div className="shape shape-1"></div>
      <div className="shape shape-2"></div>
      <div className="shape shape-3"></div>
      <div className="shape shape-4"></div>

      {/* Glowing Orb */}
      <div className="glow-orb"></div>

      {/* Animated Lines */}
      <svg className="line-svg" viewBox="0 0 400 600" preserveAspectRatio="none">
        <path
          className="animated-line"
          d="M0 150 Q100 100 200 150 T400 150"
          stroke="rgba(17,211,146,0.4)"
          strokeWidth="2"
          fill="none"
        />
        <path
          className="animated-line"
          d="M0 300 Q150 250 250 300 T400 280"
          stroke="rgba(42,174,111,0.3)"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          className="animated-line"
          d="M0 450 Q100 400 200 450 T400 430"
          stroke="rgba(17,211,146,0.4)"
          strokeWidth="2"
          fill="none"
        />
      </svg>

      {/* Content */}
      <div className="panel-content">
        <h2
          className="panel-title"
          style={{ opacity: isTransitioning ? 0 : 1 }}
          dangerouslySetInnerHTML={{ __html: slides[currentSlide].title }}
        />
        <p
          className="panel-desc"
          style={{ opacity: isTransitioning ? 0 : 1 }}
        >
          {slides[currentSlide].desc}
        </p>
        <div className="dots">
          {slides.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentSlide ? 'active' : ''}`}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnimatedSidePanel;
