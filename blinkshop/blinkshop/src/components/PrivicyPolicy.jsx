// import React from "react";

/**
 * Mobile-only Privacy Policy page for Lewkout
 * - Pure React + inline CSS (no external CSS/Tailwind)
 * - Mobile-first layout (single column, big tap targets, readable text)
 * - Drop-in component: <PrivacyPolicyMobile email="support@lewkout.com" phone="+91-00000-00000" />
 */
export default function PrivacyPolicy({ email = "[team.lewkout@gmail.com]", phone = "[7014996104]" }) {
  const styles = {
    page: {
      marginTop: "80px",
      fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
      color: "#111827",
      background: "#ffffff",
      minHeight: "100vh",
      margin: 0,
      padding: 0,
      WebkitTextSizeAdjust: "100%",
    },
    container: {
      maxWidth: 720,
      margin: "0 auto",
      padding: "20px 16px 40px",
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
      cursor: "pointer",
    },
    titleBox: {
      padding: "8px 14px 2px 14px",
    },
    title: {
      fontSize: 24,
      fontWeight: 700,
      margin: 0,
      textAlign: "center",
    },
    subtitle: {
      margin: "6px 0 0 0",
      fontSize: 13,
      color: "#6b7280",
      textAlign: "center",
    },
    section: {
      marginTop: 24,
      background: "#ffffff",
      border: "1px solid #f3f4f6",
      borderRadius: 12,
      padding: "16px 18px",
      boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
      textAlign: "left",
    },
    h2: {
      margin: "0 0 10px 0",
      fontSize: 18,
      fontWeight: 700,
      color: "#111827",
    },
    p: {
      margin: "8px 0",
      fontSize: 15,
      lineHeight: 1.65,
      color: "#374151",
    },
    list: {
      margin: "8px 0 8px 20px",
      padding: 0,
    },
    li: {
      margin: "6px 0",
      fontSize: 15,
      lineHeight: 1.55,
      color: "#374151",
    },
    contactCard: {
      marginTop: 20,
      background: "#f9fafb",
      border: "1px dashed #e5e7eb",
      borderRadius: 10,
      padding: "14px 16px",
    },
    link: {
      color: "#2563eb",
      textDecoration: "none",
    },
    footerNote: {
      marginTop: 30,
      fontSize: 13,
      color: "#6b7280",
      textAlign: "center",
    },
  };

  const effectiveDate = "August 30, 2025"; // update when policy changes

  return (
    <div style={styles.page}>
  <div style={styles.headerWrap}>
    <div style={styles.backBar}>
      <button
        aria-label="Go back"
        onClick={() => window.history.back()}
        style={styles.backBtn}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
      </button>
      <div>
        <div style={styles.titleBox}>
          <h1 style={styles.title}>Privacy Policy</h1>
          {/* <p style={styles.subtitle}>Effective Date: {effectiveDate}</p> */}
        </div>
      </div>
    </div>
  </div>

  <main style={styles.container}>
    <section style={styles.section}>
      <p style={styles.p}>
        It is Lewkout's policy to respect your privacy regarding any information we may collect while operating our website. 
        This Privacy Policy applies to Lewkout.com (hereinafter, "us", "we", or "Lewkout.com"). We respect your privacy and are 
        committed to protecting personally identifiable information you may provide us through the Website. We have adopted this 
        privacy policy ("Privacy Policy") to explain what information may be collected on our Website, how we use this information, 
        and under what circumstances we may disclose the information to third parties. This Privacy Policy applies only to 
        information we collect through the Website and does not apply to our collection of information from other sources.
      </p>
      <p style={styles.p}>
        This Privacy Policy, together with the Terms of service posted on our Website, set forth the general rules and policies 
        governing your use of our Website. Depending on your activities when visiting our Website, you may be required to agree to 
        additional terms of service.
      </p>
    </section>

    <section style={styles.section}>
      <h2 style={styles.h2}>1. Website Visitors</h2>
      <p style={styles.p}>
        Like most website operators, Lewkout collects non-personally-identifying information of the sort that web browsers and servers typically make available, such as the browser type, language preference, referring site, and the date and time of each visitor request. 
        Lewkout's purpose in collecting non-personally identifying information is to better understand how Lewkout's visitors use its website. 
        From time to time, Lewkout may release non-personally-identifying information in the aggregate, e.g., by publishing a report on trends in the usage of its website. 
        Lewkout also collects potentially personally-identifying information like Internet Protocol (IP) addresses for logged in users and for users leaving comments on http://Lewkout.com blog posts. 
        Lewkout only discloses logged in user and commenter IP addresses under the same circumstances that it uses and discloses personally-identifying information as described below.
      </p>
    </section>

    <section style={styles.section}>
      <h2 style={styles.h2}>2. Personally-Identifying Information</h2>
      <p style={styles.p}>
        Certain visitors to Lewkout's websites choose to interact with Lewkout in ways that require Lewkout to gather personally-identifying information. 
        The amount and type of information that Lewkout gathers depends on the nature of the interaction. 
        For example, we ask visitors who leave a comment at http://Lewkout.com to provide a username and email address.
      </p>
    </section>

    <section style={styles.section}>
      <h2 style={styles.h2}>3. Security</h2>
      <p style={styles.p}>
        The security of your Personal Information is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. 
        While we strive to use commercially acceptable means to protect your Personal Information, we cannot guarantee its absolute security.
      </p>
    </section>

    <section style={styles.section}>
      <h2 style={styles.h2}>4. Protection of Certain Personally-Identifying Information</h2>
      <p style={styles.p}>
        Lewkout discloses potentially personally-identifying and personally-identifying information only to those of its employees, contractors and affiliated organizations that 
        (i) need to know that information in order to process it on Lewkout's behalf or to provide services available at Lewkout's website, and 
        (ii) that have agreed not to disclose it to others. Some of those employees, contractors and affiliated organizations may be located outside of your home country; 
        by using Lewkout's website, you consent to the transfer of such information to them. 
        Lewkout will not rent or sell potentially personally-identifying and personally-identifying information to anyone. 
        Other than to its employees, contractors and affiliated organizations, as described above, Lewkout discloses potentially personally-identifying and personally-identifying information 
        only in response to a subpoena, court order or other governmental request, or when Lewkout believes in good faith that disclosure is reasonably necessary to protect the property 
        or rights of Lewkout, third parties or the public at large.
      </p>
      <p style={styles.p}>
        If you are a registered user of http://Lewkout.com and have supplied your email address, Lewkout may occasionally send you an email to tell you about new features, solicit your feedback, 
        or just keep you up to date with what's going on with Lewkout and our products. 
        We primarily use our blog to communicate this type of information, so we expect to keep this type of email to a minimum. 
        If you send us a request (for example via a support email or via one of our feedback mechanisms), we reserve the right to publish it in order to help us clarify or respond to your request 
        or to help us support other users. 
        Lewkout takes all measures reasonably necessary to protect against the unauthorized access, use, alteration or destruction of potentially personally-identifying and personally-identifying information.
      </p>
    </section>

    <section style={styles.section}>
      <h2 style={styles.h2}>5. Aggregated Statistics</h2>
      <p style={styles.p}>
        Lewkout may collect statistics about the behavior of visitors to its website. Lewkout may display this information publicly or provide it to others. 
        However, Lewkout does not disclose your personally-identifying information.
      </p>
    </section>

    <section style={styles.section}>
      <h2 style={styles.h2}>6. Cookies</h2>
      <p style={styles.p}>
        To enrich and perfect your online experience, Lewkout uses "Cookies", similar technologies and services provided by others to display personalized content, appropriate advertising and store your preferences on your computer.
        A cookie is a string of information that a website stores on a visitor's computer, and that the visitor's browser provides to the website each time the visitor returns. 
        Lewkout uses cookies to help Lewkout identify and track visitors, their usage of http://Lewkout.com, and their website access preferences. 
        Lewkout visitors who do not wish to have cookies placed on their computers should set their browsers to refuse cookies before using Lewkout's websites, with the drawback that certain features of Lewkout's websites may not function properly without the aid of cookies.
        By continuing to navigate our website without changing your cookie settings, you hereby acknowledge and agree to Lewkout's use of cookies.
      </p>
    </section>

    <section style={styles.section}>
      <h2 style={styles.h2}>7. E-commerce</h2>
      <p style={styles.p}>
        Those who engage in transactions with Lewkout by purchasing Lewkout's services or products, are asked to provide additional information, including as necessary the personal and financial information required to process those transactions. 
        In each case, Lewkout collects such information only insofar as is necessary or appropriate to fulfill the purpose of the visitor's interaction with Lewkout. 
        Lewkout does not disclose personally-identifying information other than as described below. 
        And visitors can always refuse to supply personally-identifying information, with the caveat that it may prevent them from engaging in certain website-related activities.
      </p>
      <p style={styles.p}>
        📧 Company Mail ID: <a style={styles.link} href="mailto:team.lewkout@gmail.com">team.lewkout@gmail.com</a>
      </p>
    </section>

    <section style={styles.section}>
      <h2 style={styles.h2}>8. Privacy Policy Changes</h2>
      <p style={styles.p}>
        Although most changes are likely to be minor, Lewkout may change its Privacy Policy from time to time, and in Lewkout's sole discretion. 
        Lewkout encourages visitors to frequently check this page for any changes to its Privacy Policy. 
        Your continued use of this site after any change in this Privacy Policy will constitute your acceptance of such change.
      </p>
    </section>

    <p style={styles.footerNote}>© {new Date().getFullYear()} Lewkout. All rights reserved.</p>
  </main>
</div>

  );
}
