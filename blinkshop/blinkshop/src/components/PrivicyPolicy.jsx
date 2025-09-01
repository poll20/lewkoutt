import React from "react";

/**
 * Mobile-only Privacy Policy page for Lewkout
 * - Pure React + inline CSS (no external CSS/Tailwind)
 * - Mobile-first layout (single column, big tap targets, readable text)
 * - Drop-in component: <PrivacyPolicyMobile email="support@lewkout.com" phone="+91-00000-00000" />
 */
export default function PrivacyPolicy({ email = "[Your Business Email]", phone = "[Your Business Contact Number]" }) {
  const styles = {
    page: {
        marginTop:"100px",
      fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
      color: "#111827",
      background: "#ffffff",
      minHeight: "100vh",
      margin: 0,
      padding: 0,
      WebkitTextSizeAdjust: "100%",
    },
    container: {
      maxWidth: 640,
      margin: "0 auto",
      padding: "16px 14px 28px 14px",
    },
    headerWrap: {
      position: "sticky",
      top: 0,
      zIndex: 10,
      background: "rgba(255,255,255,0.95)",
      backdropFilter: "saturate(180%) blur(8px)",
      borderBottom: "1px solid #f3f4f6",
    },
    backBar: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: 12,
    },
    backBtn: {
      width: 36,
      height: 36,
      borderRadius: 999,
      border: "1px solid #e5e7eb",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#fff",
      outline: "none",
      cursor: "pointer",
    },
    titleBox: {
      padding: "8px 14px 2px 14px",
    },
    title: {
      fontSize: 22,
      fontWeight: 700,
      letterSpacing: -0.2,
      margin: 0,
    },
    subtitle: {
      margin: "6px 0 0 0",
      fontSize: 13,
      color: "#6b7280",
    },
    section: {
      marginTop: 18,
      background: "#ffffff",
      border: "1px solid #f3f4f6",
      borderRadius: 14,
      padding: 14,
      boxShadow: "0 1px 1px rgba(0,0,0,0.02)",
    },
    h2: {
      margin: 0,
      fontSize: 16,
      fontWeight: 700,
    },
    p: {
      margin: "10px 0 0 0",
      fontSize: 15,
      lineHeight: 1.6,
    },
    list: {
      margin: "10px 0 0 16px",
      padding: 0,
    },
    li: {
      margin: "6px 0",
      fontSize: 15,
      lineHeight: 1.55,
    },
    footerNote: {
      marginTop: 18,
      fontSize: 12,
      color: "#6b7280",
      textAlign: "center",
    },
    contactCard: {
      marginTop: 18,
      background: "#f9fafb",
      border: "1px dashed #e5e7eb",
      borderRadius: 12,
      padding: 12,
    },
    link: {
      color: "#2563eb",
      textDecoration: "none",
    },
  };

  const effectiveDate = "August 30, 2025"; // update when policy changes

  return (
    <div style={styles.page} >
      <div style={styles.headerWrap}>
        <div style={styles.backBar}>
          <button
            aria-label="Go back"
            onClick={() => window.history.back()}
            style={styles.backBtn}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <div>
            <div style={styles.titleBox}>
              <h1 style={styles.title}>Privacy Policy</h1>
              <p style={styles.subtitle}>Effective Date: {effectiveDate}</p>
            </div>
          </div>
        </div>
      </div>

      <main style={styles.container}>
        {/* Intro */}
        <section style={styles.section}>
          <p style={styles.p}>
            Lewkout respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and protect the information you share with us when you use our website, mobile app, or any of our services.
          </p>
        </section>

        {/* 1. Information We Collect */}
        <section style={styles.section}>
          <h2 style={styles.h2}>1. Information We Collect</h2>
          <p style={styles.p}>We may collect the following types of information when you interact with Lewkout:</p>
          <ul style={styles.list}>
            <li style={styles.li}><strong>Personal Information:</strong> Name, phone number, email address, delivery address, billing details.</li>
            <li style={styles.li}><strong>Order Information:</strong> Items purchased, payment method, transaction details.</li>
            <li style={styles.li}><strong>Location Data:</strong> If you enable location access, we may collect your device location to provide faster delivery.</li>
          </ul>
        </section>

        {/* 2. How We Use Your Information */}
        <section style={styles.section}>
          <h2 style={styles.h2}>2. How We Use Your Information</h2>
          <p style={styles.p}>We use your information for purposes such as:</p>
          <ul style={styles.list}>
            <li style={styles.li}>To process and deliver your orders.</li>
            <li style={styles.li}>To provide customer support.</li>
            <li style={styles.li}>To improve our website, app, and services.</li>
            <li style={styles.li}>To send you updates, promotions, and offers (only if you opt in).</li>
            <li style={styles.li}>To prevent fraud, unauthorized access, and ensure secure transactions.</li>
          </ul>
        </section>

        {/* 3. Sharing of Information */}
        <section style={styles.section}>
          <h2 style={styles.h2}>3. Sharing of Information</h2>
          <p style={styles.p}>We do not sell your personal information. However, we may share your data with:</p>
          <ul style={styles.list}>
            <li style={styles.li}>Delivery Partners & Vendors to fulfill your orders.</li>
            <li style={styles.li}>Payment Gateways to process secure payments.</li>
            <li style={styles.li}>Service Providers for analytics, hosting, and marketing support.</li>
            <li style={styles.li}>Legal Authorities if required by law or to protect our rights.</li>
          </ul>
        </section>

        {/* 4. Data Security */}
        <section style={styles.section}>
          <h2 style={styles.h2}>4. Data Security</h2>
          <p style={styles.p}>We use industry-standard encryption and security measures to protect your data. However, no method of transmission over the internet is 100% secure, so we cannot guarantee absolute security.</p>
        </section>

        {/* 5. Cookies & Tracking */}
        <section style={styles.section}>
          <h2 style={styles.h2}>5. Cookies & Tracking</h2>
          <p style={styles.p}>Our website/app uses cookies and similar technologies to improve user experience, analyze traffic, and show relevant offers. You can disable cookies from your browser settings, but some features may not work properly.</p>
        </section>

        {/* 6. Your Rights */}
        <section style={styles.section}>
          <h2 style={styles.h2}>6. Your Rights</h2>
          <ul style={styles.list}>
            <li style={styles.li}>Access the personal data we hold about you.</li>
            <li style={styles.li}>Request corrections or updates.</li>
            <li style={styles.li}>Opt out of promotional emails/messages anytime.</li>
          </ul>
        </section>

        {/* 7. Updates to This Policy */}
        <section style={styles.section}>
          <h2 style={styles.h2}>7. Updates to This Policy</h2>
          <p style={styles.p}>We may update this Privacy Policy from time to time. The updated version will be posted on our website with the “Effective Date.”</p>
        </section>

        {/* 8. Third-Party Links */}
        <section style={styles.section}>
          <h2 style={styles.h2}>8. Third-Party Links</h2>
          <p style={styles.p}>Lewkout may contain links to third-party websites. We are not responsible for their privacy practices or content.</p>
        </section>

        {/* Contact Us */}
        <section style={styles.section}>
          <h2 style={styles.h2}>Contact Us</h2>
          <div style={styles.contactCard}>
            <p style={styles.p}>
              For questions or concerns about this Privacy Policy, you can reach us at:
            </p>
            <p style={styles.p}>
              📧 Email: {" "}
              <a style={styles.link} href={`mailto:${email}`}>{email}</a>
              <br />
              📞 Phone: {" "}
              <a style={styles.link} href={`tel:${phone}`}>{phone}</a>
            </p>
          </div>
        </section>

        <p style={styles.footerNote}>© {new Date().getFullYear()} Lewkout. All rights reserved.</p>
      </main>
    </div>
  );
}
