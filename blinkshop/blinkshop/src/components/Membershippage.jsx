import { useState } from "react";
import lewkoutlogo from "../components/image/lewklogo.webp";
import "./Membershippage.css";

import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { SlLockOpen } from "react-icons/sl";
import { BsBoxSeam } from "react-icons/bs";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { useBio } from "./BioContext";
import "./AddressList.css";
import SlideUpModal from "./SlideupModel";
import OtpLogin from "./OtpLogin";

import { useFirebaseAuth } from "./FirebaseContext";
const plans = [
    
  {
    id: "silver",
    name: "Silver",
    badge: null,
    price: 1,
    tagline: "Perfect starter for savvy shoppers",
    benefits: [
      { label: "All Tops", member: "₹299", icon: "👕" },
    ],
  },
  {
    id: "gold",
    name: "Gold",
    badge: "BEST VALUE",
    price: 999,
    tagline: "Maximum savings across your wardrobe",
    benefits: [
      { label: "All Tops", member: "₹299", icon: "👕" },
      { label: "All Dresses", member: "₹555", icon: "👗" },
    ],
  },
];

export default function MembershipPage() {
      const { handlenewaddress, handlechooseaddress, deleteandeditaddrress, setshowmeaddress,fetchCoupons, setshowloginpage,showloginpage } = useBio();
      const { user, userDetails, fetchUserDetails } = useFirebaseAuth();
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;
  const isLoggedIn =!!userDetails?._id;

  

  const showToast = (msg, type = "info") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleBecomeMember = async () => {
  if (!selected) {
    showToast("Please select a plan first.", "warn");
    return;
  }
  if(!isLoggedIn){setshowloginpage(true);return;}
  

  setLoading(true);

  try {
     let firebaseToken = null;
        if (user) {
          firebaseToken = await user.getIdToken(true);
        }
    const plan = plans.find((p) => p.id === selected);

    const res = await fetch(`${apiUrl}/member`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(firebaseToken && {
          Authorization: `Bearer ${firebaseToken}`,
        }),
      },
      body: JSON.stringify({
        planId: plan.id,
        planName: plan.name,
        amount: plan.price,
      }),
    });

    if (!res.ok) {
      showToast("Something went wrong", "warn");
      return;
    }

    const data = await res.json();

    if (!data?.tokenUrl) {
      showToast("Payment init failed", "warn");
      return;
    }

    showToast("Opening PhonePe…", "info");

    // ✅ SAME FLOW AS ORDER
    window.location.href = data.tokenUrl;

  } catch (err) {
    console.error("err aya",err);
    showToast("Network error", "warn");
  } finally {
    setLoading(false);
  }

  

};

  const handlePaymentSuccess = (plan) => {
    const membership = {
      plan: plan.id,
      planName: plan.name,
      price: plan.price,
      activatedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
    };
    console.log("Saving to DB:", membership);
    // TODO: POST to your backend
    showToast(`🎉 Welcome to ${plan.name}! Benefits active now.`, "success");
  };

  const selectedPlan = plans.find((p) => p.id === selected);

  return (
    <div className="mp-root">
      {toast && <div className={`mp-toast mp-toast--${toast.type}`}>{toast.msg}</div>}

      {/* ── HERO ── */}
      <section className="mp-hero">
        {/* Speed lines bg */}
        <div className="mp-hero__speedlines" aria-hidden="true">
          {Array.from({ length: 18 }).map((_, i) => (
            <span key={i} className="mp-speedline" style={{ "--i": i }} />
          ))}
        </div>
        {/* Soft glow blobs */}
        <div className="mp-hero__blob mp-hero__blob--1" aria-hidden="true" />
        <div className="mp-hero__blob mp-hero__blob--2" aria-hidden="true" />

        <div className="mp-hero__content">
          {/* Logo */}
          <div className="mp-hero__logo-wrap">
            <img src={lewkoutlogo} alt="Lewkout" className="mp-hero__logo" />
          </div>

          <div className="mp-hero__eyebrow">EXCLUSIVE MEMBER ACCESS</div>

          <h1 className="mp-hero__headline">
            Unlock Exclusive<br />
            <span className="mp-hero__accent">Member Pricing</span>
          </h1>

          <p className="mp-hero__sub">
            Save more on every order — forever. One annual plan, instant benefits.
          </p>

          <div className="mp-hero__pills">
            <span className="mp-pill mp-pill--solid">Save More on Every Order</span>
            <span className="mp-pill mp-pill--ghost">No hidden fees</span>
          </div>
        </div>

        <div className="mp-hero__scroll" aria-hidden="true">↓</div>
      </section>

      {/* ── TICKER ── */}
      <div className="mp-ticker">
        <div className="mp-ticker__inner">
          {["Tops at ₹299", "Dresses at ₹555", "Members-Only Deals", "Instant Activation",
            "Tops at ₹299", "Dresses at ₹555", "Members-Only Deals", "Instant Activation"].map((t, i) => (
            <span key={i} className="mp-ticker__item">
              <span className="mp-ticker__dot" />{t}
            </span>
          ))}
        </div>
      </div>

      {/* ── PLANS ── */}
      <section className="mp-plans">
        <div className="mp-plans__header">
          <span className="mp-tag">CHOOSE YOUR PLAN</span>
          <h2 className="mp-plans__title">One membership.<br />Endless savings.</h2>
          <p className="mp-plans__desc">Pick one plan — only one can be active at a time.</p>
        </div>

        <div className="mp-cards">
          {plans.map((plan) => {
            const isSel = selected === plan.id;
            return (
              <div
                key={plan.id}
                className={`mp-card mp-card--${plan.id}${isSel ? " mp-card--selected" : ""}`}
                onClick={() => setSelected(plan.id)}
                role="radio"
                aria-checked={isSel}
                tabIndex={0}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setSelected(plan.id)}
              >
                {plan.badge && <div className="mp-card__badge">{plan.badge}</div>}

                <div className="mp-card__top">
                  <div className={`mp-radio${isSel ? " mp-radio--on" : ""}`} />
                  <div>
                    <h3 className="mp-card__name">{plan.name} Membership</h3>
                    <p className="mp-card__tagline">{plan.tagline}</p>
                  </div>
                </div>

                {/* <div className="mp-card__pricing">
                  <div className="mp-card__price">
                    <span className="mp-card__cur">₹</span>
                    <span className="mp-card__amt">{plan.price}</span>
                    <span className="mp-card__per">/yr</span>
                  </div>
                  <span className="mp-card__mo">≈ ₹{Math.round(plan.price / 12)}/mo</span>
                </div> */}
                 <ul className="mp-card__benefits">
                  {plan.benefits.map((b, i) => (
                    <li key={i} className="mp-benefit">
                      <span className="mp-benefit__icon">{b.icon}</span>
                      <div className="mp-benefit__body">
                        <span className="mp-benefit__name">{b.label}</span>
                        <span className="mp-benefit__price">Member price <strong>{b.member}</strong></span>
                      </div>
                      <span className="mp-benefit__tick">✓</span>
                    </li>
                  ))}
                </ul>

                <div className="mp-card__divider" />

                {/* <ul className="mp-card__benefits">
                  {plan.benefits.map((b, i) => (
                    <li key={i} className="mp-benefit">
                      <span className="mp-benefit__icon">{b.icon}</span>
                      <div className="mp-benefit__body">
                        <span className="mp-benefit__name">{b.label}</span>
                        <span className="mp-benefit__price">Member price <strong>{b.member}</strong></span>
                      </div>
                      <span className="mp-benefit__tick">✓</span>
                    </li>
                  ))}
                </ul> */}
                <div className="mp-card__pricing" >
                  <div className="mp-card__price" >
                    <span className="mp-card__cur">₹</span>
                    <span className="mp-card__amt">{plan.price}</span>
                    <span className="mp-card__per">/yr</span>
                  </div>
                  <span className="mp-card__mo">≈ ₹{Math.round(plan.price / 365)}/per day</span>
                </div>

                {isSel && <div className="mp-card__chosen">Plan selected ✓</div>}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="mp-cta">
        <div className="mp-cta__card">
          <div className="mp-cta__text">
            <h2 className="mp-cta__title">
              {selectedPlan ? `${selectedPlan.name} plan — let's go!` : "Ready to start saving?"}
            </h2>
            <p className="mp-cta__desc">
              {selectedPlan
                ? `Pay ₹${selectedPlan.price}/year via PhonePe. Benefits unlock instantly.`
                : "Select a plan above, then pay securely via PhonePe."}
            </p>
          </div>
          <button
            className={`mp-cta__btn${!selected ? " mp-cta__btn--dim" : ""}${loading ? " mp-cta__btn--loading" : ""}`}
            onClick={handleBecomeMember}
            disabled={loading}
          >
            {loading ? <span className="mp-spinner" /> : (
              <><span className="mp-cta__p-icon">P</span> Become a Member</>
            )}
          </button>
        </div>
        <p className="mp-cta__fine">Secure · PhonePe · Annual · No hidden fees</p>
      </section>
{/* ── MEMBER BENEFITS ── */}
<section style={styles.benefitsSection}>
  <h2 style={styles.heading}>★ Member Benefits ★</h2>

  {/* BIG DISCOUNTS */}
  <div style={styles.row}>
    <RiMoneyRupeeCircleLine style={styles.icon} />
    <div style={styles.content}>
      <h4 style={styles.title}>BIG DISCOUNTS</h4>
<div style={{display:"flex",width:"100%",gap:"0px",alignItems:"center",justifyContent:"center",padding:"4px 0"}}>
      <div style={{border:"2px solid black",background:"black",width:"5px",height:"5px",borderRadius:"100%"}}></div>

      <div style={{border:"1px solid black",width:"100%",height:"0px"}}></div>
      </div>
      <p style={styles.text}>All tops at ₹299/-</p>
      <p style={styles.text}>All dresses at ₹599/-</p>
    </div>
  </div>

  {/* EARLY ACCESS */}
  <div style={styles.row}>
    <SlLockOpen style={styles.icon} />
    <div style={styles.content}>
      <h4 style={styles.title}>EARLY ACCESS</h4>
      <div style={{display:"flex",width:"100%",gap:"0px",alignItems:"center",justifyContent:"center",padding:"4px 0"}}>
      <div style={{border:"2px solid black",background:"black",width:"5px",height:"5px",borderRadius:"100%"}}></div>

      <div style={{border:"1px solid black",width:"100%",height:"0px"}}></div>
      </div>
      <p style={styles.text}>Get early access to every new drop.</p>
    </div>
  </div>

  {/* NO LIMIT */}
  <div style={styles.row}>
    <BsBoxSeam style={styles.icon} />
    <div style={styles.content}>
      <h4 style={styles.title}>NO LIMIT ADVANTAGE</h4>
      <div style={{display:"flex",width:"100%",gap:"0px",alignItems:"center",justifyContent:"center",padding:"4px 0"}}>
      <div style={{border:"2px solid black",background:"black",width:"5px",height:"5px",borderRadius:"100%"}}></div>

      <div style={{border:"1px solid black",width:"100%",height:"0px"}}></div>
      </div>
      <p style={styles.text}>No limits. Order as much as you want, save every time.</p>
    </div>
  </div>

  {/* INSTANT SAVINGS */}
  <div style={styles.row}>
    <AiOutlineThunderbolt style={styles.icon} />
    <div style={styles.content}>
      <h4 style={styles.title}>INSTANT SAVINGS</h4>
      <div style={{display:"flex",width:"100%",gap:"0px",alignItems:"center",justifyContent:"center",padding:"4px 0"}}>
      <div style={{border:"2px solid black",background:"black",width:"5px",height:"5px",borderRadius:"100%"}}></div>

      <div style={{border:"1px solid black",width:"100%",height:"0px"}}></div>
      </div>
      <p style={styles.text}>Start saving from your very first order.</p>
      <p style={styles.text}>No minimum spend required.</p>
    </div>
  </div>
</section>
{/* ── TERMS & CONDITIONS ── */}
<section style={tcStyles.section}>
  <h2 style={tcStyles.heading}>Terms & Conditions</h2>

  <ul style={tcStyles.list}>
    <li>Membership fee is non-refundable and non-transferable.</li>
    <li>Membership benefits are applicable only on purchases made via the registered account.</li>
    <li>Membership is valid for 3 months from date of purchase.</li>
    <li>Membership benefits cannot be combined with any other offers, discounts, or promotions. Only one offer can be applied per order.</li>
    <li>60-minute delivery is available in select locations and time slots only. Delivery timelines may vary due to external factors beyond control.</li>
    <li>If Lewkout discontinues the membership, a pro-rata refund will be issued based on the unused duration.</li>
    <li>Lewkout reserves the right to suspend or terminate membership if any misuse, fraudulent activity, or abnormal usage patterns are detected.</li>
    <li>Lewkout reserves the right to modify the terms and conditions at any time without prior notice. In case of major changes, Lewkout may refund the last membership amount at its discretion.</li>
    <li>Accounts with unusually high return rates, repeated delivery failures, or abnormal usage may be restricted after review.</li>
  </ul>
</section>
      {/* ── TRUST ── */}
      {/* <footer className="mp-trust">
        {[
          { icon: "🔒", label: "Secure Payments" },
          { icon: "⚡", label: "Instant Activation" },
          { icon: "👥", label: "10,000+ Members" },
          { icon: "💸", label: "Real Savings" },
        ].map((t, i) => (
          <div key={i} className="mp-trust__item">
            <span className="mp-trust__icon">{t.icon}</span>
            <span className="mp-trust__label">{t.label}</span>
          </div>
        ))}
      </footer> */}
        <SlideUpModal show={showloginpage} onClose={() => setshowloginpage(false)}>
                <OtpLogin/>
              </SlideUpModal>
    </div>
  );
}
const styles = {
  benefitsSection: {
    background: "#f9f9f9",
    padding: "40px 20px",
    // marginTop: "40px",
    // border:"2px solid red",
    borderRadius: "12px",
  },
  heading: {
    textAlign: "center",
    marginBottom: "30px",
    fontWeight: "600",
    fontSize: "20px",
  },
  row: {
    display: "flex",
    // border:"2px solid red",
width:"98%",
    alignItems: "flex-start",
    gap: "15px",
    padding: "15px 0",
    borderBottom: "1px solid #ddd",
  },
  icon: {
    fontSize: "28px",
    color: "#000",
    minWidth: "30px",
  },
  content: {
    flex: 1,
  },
  title: {
    margin: 0,
    fontSize: "14px",
    fontWeight: "700",
    letterSpacing: "1px",
  },
  text: {
    margin: "4px 0",
    fontSize: "13px",
    color: "#333",
    fontWeight:"bold",
    lineHeight:"14px"
  },
  textSmall: {
    margin: "2px 0",
    fontSize: "12px",
    color: "#666",
  },
};
const tcStyles = {
  section: {
    background: "#fff",
    padding: "40px 20px",
    marginTop: "30px",
    borderRadius: "12px",
    border: "1px solid #eee",
  },
  heading: {
    textAlign: "center",
    fontSize: "20px",
    fontWeight: "600",
    marginBottom: "20px",
  },
  list: {
    // border:"2px solid red",
    display:"flex",
    flexDirection:"column",
gap:"10px",
    lineHeight: "1.7",
    color: "#444",
    fontSize: "13px",
    lineHeight:"1.2em"
  },
};