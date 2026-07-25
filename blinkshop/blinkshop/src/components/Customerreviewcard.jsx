import React, { useRef } from "react";

// -----------------------------------------------------------------------
// CustomerReviewCard
// Mobile-only, horizontally scrollable review card carousel.
// Pure inline CSS (style objects) — no external stylesheet needed.
// Drop this component anywhere in your page; it renders nothing but
// itself (no page chrome), so it slots into any layout.
//
// Design language: one calm brand accent (dusty rose) instead of a
// different color per card — keeps the strip feeling like one
// considered piece rather than four random tiles.
// -----------------------------------------------------------------------

const BRAND = {
  rose: "gold",
  roseTint: "#FBEAF0",
  roseLine: "#F1D2DD",
  ink: "#2B2330",
  inkSoft: "#6B5F68",
  cream: "#FFFCFA",
};

const reviews = [
  {
    id: 1,
    name: "Eva madhavam",
    initials: "EM",
    rating: 5,
    text: "The second top was just so amazing and the fit , colour everything wass just so perfect .....I lived it alotttt ...and for sure your business will grow🫶🏻🫶🏻",
  },
  {
    id: 2,
    name: "Kashish bajpai",
    initials: "KB",
    rating: 5,
    text: "I received my dress 👗 and such a beautiful 😍😘 i Loved 😍 thank you so much 💖 and exactly shame as shown  in the picture  I Loved the dree thank you 😊 beautiful fabric and great overall experience,🫠❤️",
  },
  {
    id: 3,
    name: "Juhi rawat",
    initials: "JR",
    rating: 5,
    text: "Loved the top from the first wear. Beautiful fabric, perfect fit, and great overall experience. Highly recommended! 🫶🏻✨",
  },
  {
    id: 4,
    name: "Harshitha",
    initials: "H",
    rating: 5,
    text: "Yes its exactly as shown in the picture i loved the dress",
  },
    {
    id: 4,
    name: "Ila rewari",
    initials: "IR",
    rating: 5,
    text: "Hey! I had bought this for my sister's birthday earlier. She wore it today and looked beautiful. I'm so glad I made the right choice buying from you guys. Here are a few glimpses!",
  },
    {
    id: 4,
    name: "Anushka ghosh",
    initials: "AG",
    rating: 5,
    text: "I absolutely loved the top. Haven't had the chance to wear it yet. But the fit is great!!!❤️🔥",
  },
    {
    id: 4,
    name: "Kanishka",
    initials: "K",
    rating: 5,
    text: "Hii, just recieved my order i LOVEDDDDDD it. The fabric , the fitting everything is just perfect. I loved it lots😍✌🏼 thanku",
  },
    {
    id: 4,
    name: "Elisha prakash",
    initials: "EP",
    rating: 5,
    text: "hey i just received my shirt and its too cute. love the colour, quality and fit 💙",
  },
    {
    id: 4,
    name: "Gaganshree",
    initials: "G",
    rating: 5,
    text: "Thank you so much I have received my Oder it was very god and the material is wow 🤩 thank you I did not expect it’s thank you. I’ll order it again. It was so comfortable and very nice material and good product.",
  },
    {
    id: 4,
    name: "Aarya khemmar",
    initials: "AK",
    rating: 5,
    text: "Tysm loved it🥹🫶🏼🫶🏼",
  },
    {
    id: 4,
    name: "Aakhya",
    initials: "A",
    rating: 5,
    text: "Thank you so much for the dresses. They are amazing and I will surely order from Lewkout again!!",
  },
];


function Star({ filled }) {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill={filled ? BRAND.rose : "none"}
      stroke={BRAND.rose}
      strokeWidth="1.4"
      style={{ marginRight: 1 }}
    >
      <path
        d="M12 2.5l2.9 6.6 7.1.6-5.4 4.7 1.7 7-6.3-3.9-6.3 3.9 1.7-7-5.4-4.7 7.1-.6z"
        strokeLinejoin="round"
      />
    </svg>
  );
}
 
function ReviewCard({ review }) {
  return (
    <div
      style={{
        flex: "0 0 auto",
        width: "72vw",
        maxWidth: 248,
        scrollSnapAlign: "start",
        background: BRAND.cream,
        borderRadius: 20,
        padding: "20px 20px 18px",
        boxShadow: "0 1px 2px rgba(43,35,48,0.04), 0 8px 20px rgba(43,35,48,0.06)",
        border: `1px solid ${BRAND.roseLine}`,
        display: "flex",
        flexDirection: "column",
        position: "relative",
        height: 260,
      }}
    >
      {/* quote mark, quiet decorative accent */}
      <span
        style={{
          position: "absolute",
          top: 10,
          right: 18,
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 46,
          lineHeight: 1,
          color: BRAND.roseTint,
          fontWeight: 700,
          userSelect: "none",
        }}
      >
        ”
      </span>
 
      {/* stars */}
      <div style={{ display: "flex", marginBottom: 12, flexShrink: 0 }}>
        {[...Array(5)].map((_, i) => (
          <Star key={i} filled={i < review.rating} />
        ))}
      </div>
 
      {/* review text — scrolls internally if longer than the fixed card height allows */}
      <p
        style={{
          margin: 0,
          fontSize: 13.5,
          lineHeight: 1.6,
          color: BRAND.inkSoft,
          fontFamily: "-apple-system, 'Segoe UI', system-ui, sans-serif",
          flex: "1 1 auto",
          overflowY: "auto",
          paddingRight: 2,
        }}
      >
        {review.text}
      </p>
 
      {/* divider + footer are glued to the bottom of the card, always,
          so the name sits at the exact same spot no matter how short
          or long the review text is */}
      <div style={{ marginTop: "auto", flexShrink: 0 }}>
        <div
          style={{
            height: 1,
            background: BRAND.roseLine,
            margin: "12px 0 12px",
          }}
        />
 
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: "50%",
              background: BRAND.roseTint,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 700,
              fontSize: 13,
              color: '#C6446E',
              flexShrink: 0,
            }}
          >
            {review.initials}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <span
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 600,
                fontSize: 13.5,
                color: BRAND.ink,
                lineHeight: 1.1,
              }}
            >
              {review.name}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default function CustomerReviewCard() {
  const scrollRef = useRef(null);
 
  return (
    <div
      style={{
        width: "100%",
        maxWidth: 420,
        margin: "0 auto",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      {/* section heading */}
      <div
        style={{
          padding: "0 18px 14px",
          marginTop: "20px",
        }}
      >
        <h2
          style={{
            margin: 0,
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: 26,
            fontWeight: 400,
            fontStyle: 'italic',
            letterSpacing: 0.01,
            color: '#2a1f1d',
          }}
        >
          Loved by our customers
        </h2>
        <p
          style={{
            margin: "2px 0 0",
            fontSize: 12.5,
            color: "#8A7E86",
            fontFamily: "-apple-system, 'Segoe UI', system-ui, sans-serif",
          }}
        >
          Real words, real orders
        </p>
      </div>
 
      {/* horizontal scroll track */}
      <div
        ref={scrollRef}
        style={{
          display: "flex",
          gap: 14,
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          padding: "4px 18px 10px",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
        }}
        className="crc-scroll-hide"
      >
        {reviews.map((r, i) => (
          <ReviewCard key={i} review={r} />
        ))}
 
        {/* trailing spacer so last card can center */}
        <div style={{ flex: "0 0 auto", width: 4 }} />
      </div>
 
      {/* hide scrollbar (webkit) */}
      <style>{`
        .crc-scroll-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}