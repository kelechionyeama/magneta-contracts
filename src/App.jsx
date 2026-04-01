import { useState, useRef } from "react";

/* ── Inline SVG rose logo matching the Magneta brand ── */
const ROSE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 300" width="48" height="48">
  <rect width="200" height="300" rx="16" fill="#111111"/>
  <g transform="translate(100,100)">
    <!-- stem -->
    <path d="M0 20 Q-2 60 0 120" stroke="#4CAF50" stroke-width="8" fill="none" stroke-linecap="round"/>
    <!-- left leaf -->
    <path d="M-4 85 Q-35 65 -40 80 Q-35 95 -4 90Z" fill="#4CAF50"/>
    <!-- right leaf -->
    <path d="M4 75 Q35 55 40 70 Q35 85 4 80Z" fill="#4CAF50"/>
    <!-- outer petals -->
    <ellipse cx="-18" cy="2" rx="22" ry="30" fill="#c41e3a" transform="rotate(20)"/>
    <ellipse cx="18" cy="2" rx="22" ry="30" fill="#d32f2f" transform="rotate(-20)"/>
    <ellipse cx="0" cy="-8" rx="20" ry="28" fill="#e53935"/>
    <!-- inner petals -->
    <ellipse cx="-8" cy="-4" rx="14" ry="22" fill="#c41e3a" transform="rotate(10)"/>
    <ellipse cx="8" cy="-4" rx="14" ry="22" fill="#b71c1c" transform="rotate(-10)"/>
    <!-- center spiral -->
    <path d="M0 -10 Q8 -18 4 -8 Q0 0 -4 -8 Q-8 -18 0 -10Z" fill="#8b0000"/>
    <!-- bottom cup petal -->
    <ellipse cx="0" cy="14" rx="24" ry="14" fill="#c41e3a"/>
  </g>
</svg>`;

const ROSE_DATA_URI = `data:image/svg+xml;base64,${typeof btoa !== "undefined" ? btoa(ROSE_SVG) : ""}`;

const defaultContract = {
  creatorName: "",
  totalVideos: 40,
  maxPerDay: 2,
  campaignDays: 30,
  trialDays: 7,
  monthlyPay: 2000,
  viewThreshold: "",
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
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet">
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            @page { margin: 1in; }
            body {
              font-family: 'Lora', Georgia, 'Times New Roman', serif;
              font-size: 12pt;
              line-height: 1.75;
              color: #1a1a1a;
              font-weight: 400;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
            }
            .contract-body { max-width: 100%; }
            .logo-block { margin-bottom: 32px; }
            .logo-img { width: 52px; height: 52px; border-radius: 12px; }
            .contract-title {
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
              font-size: 24pt;
              font-weight: 700;
              margin-bottom: 24px;
              letter-spacing: -0.5px;
              color: #111;
            }
            .preamble {
              margin-bottom: 28px;
              padding-bottom: 24px;
              border-bottom: 1.5px solid #e0e0e0;
              font-size: 12pt;
              line-height: 1.8;
            }
            .section { margin-bottom: 22px; padding-bottom: 18px; border-bottom: 1px solid #eee; }
            .section:last-of-type { border-bottom: none; }
            .section-title {
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
              font-size: 13pt;
              font-weight: 700;
              margin-bottom: 8px;
              color: #111;
              letter-spacing: -0.2px;
            }
            .section p {
              margin-bottom: 6px;
              font-size: 12pt;
              line-height: 1.75;
            }
            .signatures { margin-top: 40px; page-break-inside: avoid; }
            .sig-block { margin-bottom: 36px; }
            .sig-label {
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
              font-weight: 700;
              font-size: 11pt;
              margin-bottom: 6px;
              color: #111;
            }
            .sig-line { border-bottom: 1px solid #999; width: 260px; height: 28px; margin: 4px 0; }
            .sig-detail { font-size: 11pt; color: #444; margin-top: 2px; }
            strong { font-weight: 600; }
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

  /* ── Inline base64 for the rose logo (ensures it works in print) ── */
  const roseDataUri = ROSE_DATA_URI || "";

  return (
    <div style={{
      minHeight: "100vh",
      background: "#faf9f7",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');
        * { box-sizing: border-box; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
        input:focus, select:focus { outline: none; border-color: #c41e3a !important; }
      `}</style>

      {/* ════════ Header Bar ════════ */}
      <div style={{
        borderBottom: "1px solid #e8e6e3",
        background: "#fff",
        padding: "14px 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <img
            src={roseDataUri}
            alt="Magneta"
            style={{ width: 34, height: 34, borderRadius: 8, objectFit: "cover" }}
          />
          <span style={{
            fontWeight: 700, fontSize: 15, color: "#111", letterSpacing: -0.3,
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
          }}>
            Magneta Contract Generator
          </span>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={() => setView("form")}
            style={{
              padding: "7px 18px", borderRadius: 8, border: "1px solid #e0e0e0",
              background: view === "form" ? "#111" : "#fff",
              color: view === "form" ? "#fff" : "#555",
              fontSize: 13, fontWeight: 600, cursor: "pointer",
              fontFamily: "'Inter', sans-serif",
            }}
          >Edit</button>
          <button
            onClick={() => setView("preview")}
            style={{
              padding: "7px 18px", borderRadius: 8, border: "1px solid #e0e0e0",
              background: view === "preview" ? "#111" : "#fff",
              color: view === "preview" ? "#fff" : "#555",
              fontSize: 13, fontWeight: 600, cursor: "pointer",
              fontFamily: "'Inter', sans-serif",
            }}
          >Preview</button>
          {view === "preview" && (
            <button
              onClick={handlePrint}
              style={{
                padding: "7px 22px", borderRadius: 8, border: "none",
                background: "#c41e3a", color: "#fff",
                fontSize: 13, fontWeight: 700, cursor: "pointer",
                fontFamily: "'Inter', sans-serif",
              }}
            >Export PDF</button>
          )}
        </div>
      </div>

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "32px 24px" }}>

        {/* ════════ FORM VIEW ════════ */}
        {view === "form" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div>
              <div style={{
                fontSize: 11, fontWeight: 700, color: "#999", textTransform: "uppercase",
                letterSpacing: 1.2, marginBottom: 14,
                fontFamily: "'Inter', sans-serif",
              }}>
                Contract Details
              </div>
              <div style={{
                background: "#fff", borderRadius: 12, border: "1px solid #e8e6e3",
                padding: 24, display: "flex", flexDirection: "column", gap: 20,
              }}>
                <Field label="Creator Name" value={form.creatorName} onChange={(v) => update("creatorName", v)} placeholder="e.g. Jake Caringer" />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
                  <Field label="Total Videos" value={form.totalVideos} onChange={(v) => update("totalVideos", v)} type="number" />
                  <Field label="Max Per Day" value={form.maxPerDay} onChange={(v) => update("maxPerDay", v)} type="number" />
                  <Field label="Campaign Days" value={form.campaignDays} onChange={(v) => update("campaignDays", v)} type="number" />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
                  <Field label="Trial Period (days)" value={form.trialDays} onChange={(v) => update("trialDays", v)} type="number" />
                  <Field label="Monthly Pay (USD)" value={form.monthlyPay} onChange={(v) => update("monthlyPay", v)} type="number" prefix="$" />
                  <Field label="View Threshold (optional)" value={form.viewThreshold} onChange={(v) => update("viewThreshold", v)} placeholder="e.g. 350K" />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <Field label="Bonus Amount (USD)" value={form.bonusAmount} onChange={(v) => update("bonusAmount", v)} type="number" prefix="$" />
                  <Field label="Bonus Threshold" value={form.bonusThreshold} onChange={(v) => update("bonusThreshold", v)} placeholder="e.g. 1M" />
                </div>
              </div>
            </div>

            <div>
              <div style={{
                fontSize: 11, fontWeight: 700, color: "#999", textTransform: "uppercase",
                letterSpacing: 1.2, marginBottom: 14,
                fontFamily: "'Inter', sans-serif",
              }}>
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
              <span style={{ fontSize: 18 }}>&#128197;</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#111" }}>
                  Effective Date: {today}
                </div>
                <div style={{ fontSize: 12, color: "#888", marginTop: 2, fontWeight: 400 }}>
                  Auto-set to today's date when you generate the contract
                </div>
              </div>
            </div>

            <button
              onClick={() => setView("preview")}
              style={{
                width: "100%", padding: "14px 0", borderRadius: 10, border: "none",
                background: "#111", color: "#fff",
                fontSize: 14, fontWeight: 700, cursor: "pointer",
                fontFamily: "'Inter', sans-serif",
                letterSpacing: -0.2,
                opacity: form.creatorName ? 1 : 0.4,
              }}
              disabled={!form.creatorName}
            >
              Preview Contract
            </button>
          </div>
        )}

        {/* ════════ PREVIEW VIEW ════════ */}
        {view === "preview" && (
          <div style={{
            background: "#fff", borderRadius: 12, border: "1px solid #e8e6e3",
            padding: "52px 60px",
            boxShadow: "0 2px 24px rgba(0,0,0,0.04)",
          }}>
            <div ref={printRef}>
              <div className="contract-body" style={{
                fontFamily: "'Lora', Georgia, 'Times New Roman', serif",
                color: "#1a1a1a",
                lineHeight: 1.75,
                fontSize: 15,
                fontWeight: 400,
              }}>
                {/* Logo */}
                <div style={{ marginBottom: 28 }}>
                  <img
                    src={roseDataUri}
                    alt="Magneta"
                    style={{ width: 52, height: 52, borderRadius: 12 }}
                  />
                </div>

                {/* Title */}
                <div style={{
                  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
                  fontSize: 28,
                  fontWeight: 700,
                  marginBottom: 24,
                  letterSpacing: -0.5,
                  color: "#111",
                }}>
                  UGC Agreement
                </div>

                {/* Preamble */}
                <div style={{ marginBottom: 28, paddingBottom: 24, borderBottom: "1.5px solid #e0e0e0" }}>
                  <p style={{ fontSize: 15, lineHeight: 1.8 }}>
                    This Agreement is entered into on <strong style={{ fontWeight: 700 }}>{today}</strong> ("Effective Date") by and between <strong style={{ fontWeight: 700 }}>Tenacity Labs, LLC</strong> ("Company"), and <strong style={{ fontWeight: 700 }}>{form.creatorName || "[Creator Name]"}</strong> ("Creator").
                  </p>
                </div>

                {/* Sections */}
                <Section num="1" title="Scope of Work">
                  <p>Creator shall deliver a total of {form.totalVideos} short-form videos over a {form.campaignDays}-day Campaign Period, posting no more than {form.maxPerDay} per day, to branded <strong style={{ fontWeight: 600 }}>TikTok</strong> and <strong style={{ fontWeight: 600 }}>Instagram</strong> accounts dedicated to promoting the Magneta app.</p>
                </Section>

                <Section num="2" title="Compensation">
                  <p>Creator shall complete a {form.trialDays}-day Trial Period at the start of the Campaign. Upon successful completion of the Trial Period, Creator shall receive ${Number(form.monthlyPay).toLocaleString()} USD per month, inclusive of the Trial Period, paid at the end of each calendar month.{form.viewThreshold ? ` All view-based compensation requires surpassing an accumulated ${form.viewThreshold} views.` : ""} Creator shall also receive a bonus of ${Number(form.bonusAmount).toLocaleString()} USD for surpassing {form.bonusThreshold} views.</p>
                </Section>

                <Section num="3" title="Confidentiality">
                  <p>Creator shall not disclose confidential information about the Company or its products.</p>
                </Section>

                <Section num="4" title="Malpractice &amp; Authenticity">
                  <p>Creator shall not engage in fraudulent activity (e.g., fake or paid views). If fraud is found, all payments must be refunded within 14 days.</p>
                </Section>

                <Section num="5" title="Termination">
                  <p>If Creator breaches this Agreement, Company may terminate and request a refund.</p>
                  <p style={{ marginTop: 4 }}>If terminated early by the Company, payment shall be prorated based on videos delivered.</p>
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
                <div style={{ marginTop: 44, pageBreakInside: "avoid" }}>
                  <div style={{ marginBottom: 40 }}>
                    <div style={{
                      fontFamily: "'Inter', -apple-system, sans-serif",
                      fontWeight: 700, fontSize: 15, marginBottom: 6, color: "#111",
                    }}>
                      Tenacity Labs, LLC
                    </div>
                    <div style={{ fontSize: 14, color: "#444", marginBottom: 10, fontFamily: "'Lora', serif" }}>
                      By: Kelechi Onyeama
                    </div>
                    <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
                      <span style={{ fontSize: 14, color: "#444", fontFamily: "'Lora', serif" }}>Signature:</span>
                      <div style={{ borderBottom: "1px solid #999", width: 240, height: 26 }}></div>
                    </div>
                    <div style={{ fontSize: 14, color: "#444", marginTop: 10, fontFamily: "'Lora', serif" }}>Date: {today}</div>
                  </div>

                  <div>
                    <div style={{
                      fontFamily: "'Inter', -apple-system, sans-serif",
                      fontWeight: 700, fontSize: 15, marginBottom: 6, color: "#111",
                    }}>
                      Creator
                    </div>
                    <div style={{ fontSize: 14, color: "#444", marginBottom: 10, fontFamily: "'Lora', serif" }}>
                      Name: {form.creatorName || "[Creator Name]"}
                    </div>
                    <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
                      <span style={{ fontSize: 14, color: "#444", fontFamily: "'Lora', serif" }}>Signature:</span>
                      <div style={{ borderBottom: "1px solid #999", width: 240, height: 26 }}></div>
                    </div>
                    <div style={{ display: "flex", alignItems: "flex-end", gap: 8, marginTop: 10 }}>
                      <span style={{ fontSize: 14, color: "#444", fontFamily: "'Lora', serif" }}>Date:</span>
                      <div style={{ borderBottom: "1px solid #999", width: 240, height: 26 }}></div>
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
      marginBottom: 22,
      paddingBottom: last ? 0 : 18,
      borderBottom: last ? "none" : "1px solid #eee",
    }}>
      <div style={{
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
        fontSize: 16,
        fontWeight: 700,
        marginBottom: 8,
        color: "#111",
        letterSpacing: -0.2,
      }}>
        {num}. {title}
      </div>
      <div style={{
        fontSize: 15,
        lineHeight: 1.75,
        fontFamily: "'Lora', Georgia, 'Times New Roman', serif",
      }}>{children}</div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = "text", prefix }) {
  return (
    <div>
      <div style={{
        fontSize: 12, fontWeight: 600, color: "#777", marginBottom: 6,
        fontFamily: "'Inter', sans-serif", letterSpacing: 0.1,
      }}>{label}</div>
      <div style={{ position: "relative" }}>
        {prefix && (
          <span style={{
            position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)",
            fontSize: 14, color: "#999", fontWeight: 500,
            fontFamily: "'Inter', sans-serif",
          }}>{prefix}</span>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(type === "number" ? Number(e.target.value) : e.target.value)}
          placeholder={placeholder}
          style={{
            width: "100%", padding: "10px 14px",
            paddingLeft: prefix ? 26 : 14,
            borderRadius: 8, border: "1px solid #e0e0e0",
            fontSize: 14,
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
            fontWeight: 400,
            color: "#1a1a1a", background: "#faf9f7",
            transition: "border-color 0.2s",
          }}
        />
      </div>
    </div>
  );
}
