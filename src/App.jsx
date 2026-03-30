import { useState, useRef } from "react";

const defaultContract = {
  creatorName: "",
  videosPerDay: 2,
  campaignDays: 30,
  monthlyPay: 2000,
  viewThreshold: "350K",
  bonusAmount: 2000,
  bonusThreshold: "1M",
  nonCompeteMonths: 6,
  governingState: "Texas",
};

const formatDate = (date) => {
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const d = date.getDate();
  const suffix = d === 1 || d === 21 || d === 31 ? "st" : d === 2 || d === 22 ? "nd" : d === 3 || d === 23 ? "rd" : "th";
  return `${months[date.getMonth()]} ${d}${suffix}, ${date.getFullYear()}`;
};

const today = formatDate(new Date());

export default function ContractGenerator() {
  const [form, setForm] = useState(defaultContract);
  const [view, setView] = useState("form"); // "form" | "preview"
  const printRef = useRef(null);

  const update = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const handlePrint = () => {
    const content = printRef.current;
    if (!content) return;
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>UGC Agreement - ${form.creatorName || "Creator"}</title>
          <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet">
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            @page { margin: 1in; }
            body { font-family: 'EB Garamond', Georgia, serif; font-size: 13pt; line-height: 1.7; color: #1a1a1a; padding: 0; }
            .contract-body { max-width: 100%; }
            .logo-block { margin-bottom: 32px; }
            .logo-img { width: 48px; height: 48px; border-radius: 10px; }
            .contract-title { font-family: 'DM Sans', sans-serif; font-size: 22pt; font-weight: 600; margin-bottom: 20px; letter-spacing: -0.5px; }
            .preamble { margin-bottom: 24px; padding-bottom: 20px; border-bottom: 1px solid #e0e0e0; }
            .section { margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid #f0f0f0; }
            .section:last-of-type { border-bottom: none; }
            .section-title { font-family: 'DM Sans', sans-serif; font-size: 14pt; font-weight: 600; margin-bottom: 8px; }
            .section p { margin-bottom: 6px; }
            .signatures { margin-top: 36px; page-break-inside: avoid; }
            .sig-block { margin-bottom: 32px; }
            .sig-label { font-family: 'DM Sans', sans-serif; font-weight: 600; font-size: 11pt; margin-bottom: 6px; }
            .sig-line { border-bottom: 1px solid #999; width: 250px; height: 28px; margin: 4px 0; }
            .sig-detail { font-size: 11pt; color: #555; margin-top: 2px; }
          </style>
        </head>
        <body>
          ${content.innerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    setTimeout(() => { printWindow.print(); }, 500);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#faf9f7",
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        input:focus, select:focus { outline: none; border-color: #c41e3a !important; }
      `}</style>

      {/* Header */}
      <div style={{
        borderBottom: "1px solid #e8e6e3",
        background: "#fff",
        padding: "16px 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: "#1a1a1a",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 16,
          }}>🌹</div>
          <span style={{ fontWeight: 600, fontSize: 15, color: "#1a1a1a", letterSpacing: -0.3 }}>
            Magneta Contract Generator
          </span>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={() => setView("form")}
            style={{
              padding: "7px 16px", borderRadius: 8, border: "1px solid #e0e0e0",
              background: view === "form" ? "#1a1a1a" : "#fff",
              color: view === "form" ? "#fff" : "#666",
              fontSize: 13, fontWeight: 500, cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >Edit</button>
          <button
            onClick={() => setView("preview")}
            style={{
              padding: "7px 16px", borderRadius: 8, border: "1px solid #e0e0e0",
              background: view === "preview" ? "#1a1a1a" : "#fff",
              color: view === "preview" ? "#fff" : "#666",
              fontSize: 13, fontWeight: 500, cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >Preview</button>
          {view === "preview" && (
            <button
              onClick={handlePrint}
              style={{
                padding: "7px 20px", borderRadius: 8, border: "none",
                background: "#c41e3a", color: "#fff",
                fontSize: 13, fontWeight: 600, cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >Export PDF</button>
          )}
        </div>
      </div>

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "32px 24px" }}>

        {/* FORM VIEW */}
        {view === "form" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#999", textTransform: "uppercase", letterSpacing: 1, marginBottom: 16 }}>
                Contract Details
              </div>
              <div style={{
                background: "#fff", borderRadius: 12, border: "1px solid #e8e6e3",
                padding: 24, display: "flex", flexDirection: "column", gap: 20,
              }}>
                <Field label="Creator Name" value={form.creatorName} onChange={(v) => update("creatorName", v)} placeholder="e.g. Jake Caringer" />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <Field label="Videos Per Day" value={form.videosPerDay} onChange={(v) => update("videosPerDay", v)} type="number" />
                  <Field label="Campaign Days" value={form.campaignDays} onChange={(v) => update("campaignDays", v)} type="number" />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <Field label="Monthly Pay (USD)" value={form.monthlyPay} onChange={(v) => update("monthlyPay", v)} type="number" prefix="$" />
                  <Field label="View Threshold" value={form.viewThreshold} onChange={(v) => update("viewThreshold", v)} placeholder="e.g. 350K" />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <Field label="Bonus Amount (USD)" value={form.bonusAmount} onChange={(v) => update("bonusAmount", v)} type="number" prefix="$" />
                  <Field label="Bonus Threshold" value={form.bonusThreshold} onChange={(v) => update("bonusThreshold", v)} placeholder="e.g. 1M" />
                </div>
              </div>
            </div>

            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#999", textTransform: "uppercase", letterSpacing: 1, marginBottom: 16 }}>
                Legal
              </div>
              <div style={{
                background: "#fff", borderRadius: 12, border: "1px solid #e8e6e3",
                padding: 24, display: "flex", flexDirection: "column", gap: 20,
              }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <Field label="Non-Compete (months)" value={form.nonCompeteMonths} onChange={(v) => update("nonCompeteMonths", v)} type="number" />
                  <Field label="Governing State" value={form.governingState} onChange={(v) => update("governingState", v)} />
                </div>
              </div>
            </div>

            <div style={{
              background: "#f5f0eb", borderRadius: 12, padding: 20,
              display: "flex", alignItems: "center", gap: 12,
            }}>
              <span style={{ fontSize: 18 }}>📅</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#1a1a1a" }}>
                  Effective Date: {today}
                </div>
                <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>
                  Auto-set to today's date when you generate the contract
                </div>
              </div>
            </div>

            <button
              onClick={() => setView("preview")}
              style={{
                width: "100%", padding: "14px 0", borderRadius: 10, border: "none",
                background: "#1a1a1a", color: "#fff",
                fontSize: 14, fontWeight: 600, cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                opacity: form.creatorName ? 1 : 0.4,
              }}
              disabled={!form.creatorName}
            >
              Preview Contract →
            </button>
          </div>
        )}

        {/* PREVIEW VIEW */}
        {view === "preview" && (
          <div style={{
            background: "#fff", borderRadius: 12, border: "1px solid #e8e6e3",
            padding: "48px 56px",
            boxShadow: "0 2px 20px rgba(0,0,0,0.04)",
          }}>
            <div ref={printRef}>
              <div className="contract-body" style={{ fontFamily: "'EB Garamond', Georgia, serif", color: "#1a1a1a", lineHeight: 1.7 }}>
                {/* Logo */}
                <div style={{ marginBottom: 28 }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 10, background: "#1a1a1a",
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22,
                  }}>🌹</div>
                </div>

                {/* Title */}
                <div style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: 26, fontWeight: 600,
                  marginBottom: 20, letterSpacing: -0.5, color: "#1a1a1a",
                }}>
                  UGC Agreement
                </div>

                {/* Preamble */}
                <div style={{ marginBottom: 24, paddingBottom: 20, borderBottom: "1px solid #e8e6e3" }}>
                  <p style={{ fontSize: 15 }}>
                    This Agreement is entered into on <strong>{today}</strong> ("Effective Date") by and between <strong>Tenacity Labs, LLC</strong> ("Company"), and <strong>{form.creatorName || "[Creator Name]"}</strong> ("Creator").
                  </p>
                </div>

                {/* Sections */}
                <Section num="1" title="Scope of Work">
                  <p>Creator shall post {form.videosPerDay} short-form videos per day for {form.campaignDays} consecutive days ("Campaign Period") to branded <strong>TikTok</strong> and <strong>Instagram</strong> accounts dedicated to promoting the Magneta app.</p>
                </Section>

                <Section num="2" title="Compensation">
                  <p>Company shall pay Creator ${Number(form.monthlyPay).toLocaleString()} USD monthly for surpassing an accumulated {form.viewThreshold} views and a bonus of ${Number(form.bonusAmount).toLocaleString()} for surpassing {form.bonusThreshold} views.</p>
                </Section>

                <Section num="3" title="Confidentiality">
                  <p>Creator shall not disclose confidential information about the Company or its products.</p>
                </Section>

                <Section num="4" title="Malpractice & Authenticity">
                  <p>Creator shall not engage in fraudulent activity (e.g., fake or paid views). If fraud is found, all payments must be refunded within 14 days.</p>
                </Section>

                <Section num="5" title="Termination">
                  <p>If Creator breaches this Agreement, Company may terminate and request a refund.</p>
                  <p>If terminated early by the Company, payment shall be prorated based on videos delivered.</p>
                </Section>

                <Section num="6" title="Governing Law">
                  <p>This Agreement shall be governed by the laws of the State of {form.governingState}.</p>
                </Section>

                <Section num="7" title="Indemnification">
                  <p>Creator shall indemnify and hold harmless the Company and its affiliates from any claims arising from this collaboration.</p>
                </Section>

                <Section num="8" title="Non-Compete">
                  <p>During this Agreement and for {form.nonCompeteMonths} months after, Creator shall not create or post content promoting any competing AI, relationship, or self-improvement apps without the Company's written consent.</p>
                </Section>

                <Section num="9" title="Entire Agreement">
                  <p>This document represents the full agreement and may only be amended in writing signed by both parties.</p>
                </Section>

                <Section num="10" title="Additional Provisions" last>
                  <p>This Agreement is subject to immediate and recurring renewal upon mutual written agreement of both parties.</p>
                </Section>

                {/* Signatures */}
                <div style={{ marginTop: 40, pageBreakInside: "avoid" }}>
                  <div style={{ marginBottom: 36 }}>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14, marginBottom: 4 }}>
                      Tenacity Labs, LLC
                    </div>
                    <div style={{ fontSize: 14, color: "#555", marginBottom: 8 }}>By: Kelechi Onyeama</div>
                    <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
                      <span style={{ fontSize: 14, color: "#555" }}>Signature:</span>
                      <div style={{ borderBottom: "1px solid #999", width: 220, height: 24 }}></div>
                    </div>
                    <div style={{ fontSize: 14, color: "#555", marginTop: 8 }}>Date: {today}</div>
                  </div>

                  <div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14, marginBottom: 4 }}>
                      Creator
                    </div>
                    <div style={{ fontSize: 14, color: "#555", marginBottom: 8 }}>Name: {form.creatorName || "[Creator Name]"}</div>
                    <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
                      <span style={{ fontSize: 14, color: "#555" }}>Signature:</span>
                      <div style={{ borderBottom: "1px solid #999", width: 220, height: 24 }}></div>
                    </div>
                    <div style={{ display: "flex", alignItems: "flex-end", gap: 8, marginTop: 8 }}>
                      <span style={{ fontSize: 14, color: "#555" }}>Date:</span>
                      <div style={{ borderBottom: "1px solid #999", width: 220, height: 24 }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Section({ num, title, children, last }) {
  return (
    <div style={{
      marginBottom: 20,
      paddingBottom: last ? 0 : 16,
      borderBottom: last ? "none" : "1px solid #f0f0f0",
    }}>
      <div style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 16, fontWeight: 600,
        marginBottom: 8, color: "#1a1a1a",
      }}>
        {num}. {title}
      </div>
      <div style={{ fontSize: 15 }}>{children}</div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = "text", prefix }) {
  return (
    <div>
      <div style={{ fontSize: 12, fontWeight: 500, color: "#888", marginBottom: 6 }}>{label}</div>
      <div style={{ position: "relative" }}>
        {prefix && (
          <span style={{
            position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)",
            fontSize: 14, color: "#999", fontWeight: 500,
          }}>{prefix}</span>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(type === "number" ? Number(e.target.value) : e.target.value)}
          placeholder={placeholder}
          style={{
            width: "100%", padding: "10px 12px",
            paddingLeft: prefix ? 24 : 12,
            borderRadius: 8, border: "1px solid #e0e0e0",
            fontSize: 14, fontFamily: "'DM Sans', sans-serif",
            color: "#1a1a1a", background: "#faf9f7",
            transition: "border-color 0.2s",
          }}
        />
      </div>
    </div>
  );
}
