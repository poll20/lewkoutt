import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";

import { NavLink } from "react-router-dom";
import "./Carousel.css";

import cara1 from "../components/image/cara1.jpeg";
import cara2 from "../components/image/cara2.jpeg";
import cara3 from "../components/image/cara3.jpeg";
import cara4 from "../components/image/cara4.jpeg";
import cara5 from "../components/image/cara5.jpeg";
import cara6 from "../components/image/cara6.jpeg";
import cara8 from "../components/image/bags.png";
import vacation from "../components/image/vacation.webp";
import pretty from "../components/image/pretty.webp";
import evening from "../components/image/evening.png";
import kurti from "../components/image/kurti.jpeg";
import jumpsiut from "../components/image/jumpsuit.jpeg";
import festive from "../components/image/fastive.jpeg";


/* STATIC OVERLAY + IMAGE DATA */
const OVERLAY_DATA = [
  {
    tag: "Festive styles",
    title: "Festive\nFashion",
    cta: "Discover",
    image: festive,
  },
  {
    tag: "New collection",
    title: "Summer\nBloom",
    cta: "Shop now",
    image: pretty,
  },
  {
    tag: "Trending now",
    title: "Cool &\nCasual",
    cta: "Explore",
    image: evening,
  },
  {
    tag: "Limited drops",
    title: "Edit\nSeason",
    cta: "View looks",
    image: vacation,
  },
  {
    tag: "Fresh styles",
    title: "Street\nFashion",
    cta: "Discover",
    image: jumpsiut,
  },
  
  {
    tag: "Premium looks",
    title: "Luxury\nEdit",
    cta: "Explore now",
    image: cara5,
  },
  {
    tag: "Premium looks",
    title: "Luxury\nEdit",
    cta: "Explore now",
    image: kurti,
  },
];

const Carousel = ({ interval = 4000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const timeoutRef = useRef(null);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) =>
      prev === OVERLAY_DATA.length - 1
        ? 0
        : prev + 1
    );
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) =>
      prev === 0
        ? OVERLAY_DATA.length - 1
        : prev - 1
    );
  }, []);

  /* AUTO SLIDE */
  useEffect(() => {
    timeoutRef.current = setTimeout(
      nextSlide,
      interval
    );

    return () => clearTimeout(timeoutRef.current);
  }, [currentIndex, nextSlide, interval]);

  /* TOUCH EVENTS */
  const handleTouchStart = (e) => {
    touchStartX.current =
      e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current =
      e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff =
      touchStartX.current -
      touchEndX.current;

    if (diff > 50) nextSlide();

    if (diff < -50) prevSlide();
  };

  const current =
    OVERLAY_DATA[
      currentIndex % OVERLAY_DATA.length
    ];

  return (
    <div
      className="carousel-container"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <NavLink
        to="/store/store"
        className="carousel-slide"
      >
        {/* STATIC IMAGE */}
        <img
          src={current.image}
          alt={current.title}
          className="carousel-image"
          width="400"
          height="225"
          loading={
            currentIndex === 0
              ? "eager"
              : "lazy"
          }
          fetchpriority={
            currentIndex === 0
              ? "high"
              : "low"
          }
          decoding="async"
        />

        {/* DARK OVERLAY */}
        <div className="carousel-gradient" />

        {/* TEXT OVERLAY */}
        <div className="carousel-text">
          <span className="carousel-tag">
            {current.tag}
          </span>

          <h2 className="carousel-title">
            {current.title
              .split("\n")
              .map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  {i === 0 && <br />}
                </React.Fragment>
              ))}
          </h2>

          <div className="carousel-cta">
            {current.cta} →
          </div>
        </div>
      </NavLink>

      {/* DOT INDICATORS */}
      <div className="carousel-indicators">
        {OVERLAY_DATA.map((_, index) => (
          <span
            key={index}
            className={`indicator ${
              currentIndex === index
                ? "active"
                : ""
            }`}
            onClick={() =>
              setCurrentIndex(index)
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;