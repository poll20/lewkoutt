const BecomeMemberCard = () => {
  const instagramUrl = "https://instagram.com/lewkout.in"; // 👈 Replace with your Instagram username

  const handleInstagramClick = (e) => {
    e.preventDefault();

    // Scroll to top first
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    // Open Instagram after scroll animation
    setTimeout(() => {
      window.open(instagramUrl, "_blank", "noopener,noreferrer");
    }, 500);
  };

  return (
    <>
      <style>{`
        .membership-card-mobile {
          display: none;
        }

        @media (max-width: 768px) {
          .membership-card-mobile {
            display: block;
          }
        }
      `}</style>

      <div
        className="membership-card-mobile"
        style={{
          background:
            "linear-gradient(135deg, #dCE3F7 0%, #f3ded9 50%, #eef0f7 100%)",
          borderRadius: "18px",
          padding: "18px 14px",
          maxWidth: "320px",
          margin: "auto",
          textAlign: "center",
          fontFamily: "'Inter', sans-serif",
          boxShadow: "0 12px 24px -12px rgba(0,0,0,0.1)",
        }}
      >
        {/* Diamond Icon */}
        <div
          style={{
            fontSize: "20px",
            marginBottom: "6px",
          }}
        >
          💎
        </div>

        {/* Heading */}
        <h2
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 700,
            fontSize: "18px",
            color: "#2b2b33",
            margin: "0 0 8px",
            lineHeight: 1.3,
          }}
        >
          Want to become a member?
        </h2>

        {/* Description */}
        <p
          style={{
            fontSize: "11px",
            color: "#4a4a52",
            lineHeight: 1.5,
            maxWidth: "260px",
            margin: "0 auto 14px",
          }}
        >
          DM us whether you'd like the{" "}
          <span style={{ fontWeight: 600 }}>Silver</span> or{" "}
          <span style={{ fontWeight: 600 }}>Gold</span>{" "}
          Membership, and we'll help you join in just a few minutes. ✨
        </p>

        {/* Instagram Button */}
        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleInstagramClick}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            background: "rgba(255,255,255,0.65)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            padding: "10px 22px",
            borderRadius: "999px",
            textDecoration: "none",
            fontSize: "11px",
            fontWeight: 600,
            color: "#2b2b33",
            boxShadow: "0 8px 16px -8px rgba(0,0,0,0.15)",
            transition: "all .25s ease",
            marginBottom: "10px",
          }}
        >
          <span style={{ fontSize: "15px" }}>📩</span>
          Join via Instagram DM
        </a>

        {/* Response Time */}
        {/* <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "6px",
            fontSize: "9px",
            letterSpacing: "0.08em",
            color: "#8a8a92",
            fontWeight: 600,
            textTransform: "uppercase",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#4ade80",
            }}
          />
          Typical response time: &lt; 10 mins
        </div> */}
      </div>
    </>
  );
};

export default BecomeMemberCard;