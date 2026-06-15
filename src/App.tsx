import { useMemo, useState } from "react";
import "./App.css";

type DemoForm = {
  businessName: string;
  industry: string;
  whatTheySell: string;
  targetCustomer: string;
  brandTone: string;
  packageType: string;
  primaryColor: string;
  contactEmail: string;
  packagePrice: string;
  depositDue: string;
};

type SavedDemo = {
  id: string;
  businessName: string;
  industry: string;
  packageType: string;
  savedAt: string;
  form: DemoForm;
  pitch: string;
};

const starterForm: DemoForm = {
  businessName: "Blue Ridge Apparel",
  industry: "Clothing Brand",
  whatTheySell: "premium hoodies, tees, branded merch",
  targetCustomer: "style-focused customers who want quality streetwear",
  brandTone: "Premium, bold, modern",
  packageType: "Pro Storefront + Dashboard",
  primaryColor: "#d4af37",
  contactEmail: "awolf4277@gmail.com",
  packagePrice: "1500",
  depositDue: "500",
};

function splitItems(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 3);
}

function priceForIndex(index: number) {
  const prices = ["$49", "$99", "$149"];
  return prices[index] || "$99";
}

function gmailComposeUrl(to: string, subject: string, body: string) {
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    to
  )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function App() {
  const [form, setForm] = useState<DemoForm>(starterForm);
  const [copied, setCopied] = useState("");
  const [saved, setSaved] = useState("");

  const [savedDemos, setSavedDemos] = useState<SavedDemo[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("client-demo-generator:demos") || "[]");
    } catch {
      return [];
    }
  });

  const items = useMemo(() => {
    const parsed = splitItems(form.whatTheySell);

    if (parsed.length) return parsed;

    return ["signature product", "starter package", "premium offer"];
  }, [form.whatTheySell]);

  const generated = useMemo(() => {
    const businessName = form.businessName.trim() || "Your Business";
    const industry = form.industry.trim() || "Small Business";
const targetCustomer =
      form.targetCustomer.trim() || "customers who want a clean buying experience";
    const brandTone = form.brandTone.trim() || "Premium, clean, modern";
    const packageType = form.packageType.trim() || "Starter Storefront";

    const headline = `Launch a premium storefront for ${businessName}.`;

    const subheadline = `${businessName} can showcase ${
      form.whatTheySell || "products and services"
    }, capture buyer interest, and manage orders from a simple owner dashboard.`;

    const ownerSummary = `Owner dashboard for ${businessName}: products, orders, inventory, buyer leads, setup requests, and site analytics in one command center.`;

    const pitch = `I made a custom demo concept for ${businessName}, a ${industry}.

The demo is designed for ${targetCustomer} and uses a ${brandTone} brand direction.

It includes:
- Customer storefront
- Product/service cards
- Cart and checkout flow
- Owner dashboard
- Orders and inventory
- Buyer lead capture
- Site analytics

Recommended package: ${packageType}

This can be customized and deployed as a working storefront + owner system.`;

    const outreach = `Hey, I made a custom storefront + owner dashboard demo concept for ${businessName}.

It includes:
- Customer storefront
- Product/service cards
- Cart and checkout flow
- Owner dashboard
- Orders and inventory
- Buyer lead capture
- Site analytics

I can customize and deploy something like this for your business.

Want me to show you the demo?`;

    const legalNotice = `Legal / Use Notice for ${businessName}

This demo is a concept preview created to show what a storefront, checkout flow, buyer lead capture, owner dashboard, inventory tools, and analytics could look like for the business.

This demo is not a final contract, guarantee, financial promise, or legal agreement. Final features, pricing, timelines, payment setup, hosting, integrations, design, and business rules must be confirmed in writing before production work begins.

All brand names, product names, images, copy, prices, and business details should be reviewed and approved by the business owner before public launch.

Third-party services such as hosting, email, payment processors, domains, analytics tools, or integrations may require separate accounts, fees, terms, and approvals.

The demo system, layout, code structure, sales workflow, and WOLF OS / I AM THE ONE presentation are created by Andrew Wolverton unless otherwise agreed in writing. Client-specific content can be customized for the buyer after agreement.`;

    const proposalSummary = `Proposal Summary for ${businessName}

Business Type:
${industry}

Recommended Package:
${form.packageType}

Pricing:
Package Price: ${new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(Number(form.packagePrice || 0))}
Deposit Due: ${new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(Number(form.depositDue || 0))}
Remaining Balance: ${new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(Math.max(Number(form.packagePrice || 0) - Number(form.depositDue || 0), 0))}

Demo Direction:
A ${form.brandTone || "clean, professional"} storefront and owner dashboard system designed for ${targetCustomer}.

Core Build Includes:
- Custom customer storefront
- Product or service offer cards
- Cart and checkout/request flow
- Owner dashboard
- Orders and inventory/service controls
- Buyer lead capture
- Site analytics
- Legal / use notice copy

Goal:
Give ${businessName} a clean online buying experience and a simple owner command center to manage customer interest, offers, and activity.

Next Step:
Confirm desired features, final pricing, timeline, content, payment method, and launch plan before production buildout begins.`;
return {
      headline,
      subheadline,
      ownerSummary,
      pitch,
      outreach,
      legalNotice,
      proposalSummary,
      cards: items.map((item, index) => ({
        name: item,
        price: priceForIndex(index),
        description: `Demo-ready ${item} offer for ${businessName}.`,
      })),
    };
  }, [form, items]);

  function updateField(field: keyof DemoForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setCopied("");
    setSaved("");
  }

  async function copyPitch() {
    await navigator.clipboard.writeText(generated.pitch);
    setCopied("Demo pitch copied.");
    setSaved("");
  }

  async function copyOutreachMessage() {
    await navigator.clipboard.writeText(generated.outreach);
    setCopied("Short outreach message copied.");
    setSaved("");
  }
  async function copyLegalNotice() {
    await navigator.clipboard.writeText(generated.legalNotice);
    setCopied("Legal notice copied.");
    setSaved("");
  }
  function getBuyerEmail() {
    const name = form.businessName.trim() || "your business";
    const customer = form.targetCustomer.trim() || "your customers";
    const tone = form.brandTone.trim() || "clean, professional";
    const contact = form.contactEmail.trim() || "awolf4277@gmail.com";

    return `Subject: ${name} storefront + owner dashboard demo

Hi ${name} team,

I put together a custom storefront + owner dashboard demo concept for ${name}.

The demo is built for ${customer} and uses a ${tone} brand direction.

Here is the proposal summary:

${generated.proposalSummary}

I can walk you through the demo, adjust the package, and confirm the final features, pricing, timeline, content, payment method, and launch plan before any production buildout begins.

Thanks,
Andrew Wolverton
${contact}`;
  }
  function getBuyerEmailSubject() {
    return getBuyerEmail().split("\n")[0].replace(/^Subject:\s*/i, "").trim();
  }

  function getBuyerEmailBody() {
    return getBuyerEmail().split("\n").slice(2).join("\n").trim();
  }

  function getBuyerEmailLink() {
    const to = form.contactEmail.trim() || "awolf4277@gmail.com";

    return `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(
      getBuyerEmailSubject()
    )}&body=${encodeURIComponent(getBuyerEmailBody())}`;
  }
  async function copyBuyerEmail() {
    await navigator.clipboard.writeText(getBuyerEmail());
    setCopied("Buyer email copied.");
    setSaved("");
  }
  function getFullCloseKit() {
    const name = form.businessName.trim() || "Client";

    return `FULL CLOSE KIT — ${name}

==============================
GENERATED PITCH
==============================

${generated.pitch}

==============================
PROPOSAL SUMMARY
==============================

${generated.proposalSummary}

==============================
BUYER EMAIL
==============================

${getBuyerEmail()}

==============================
LEGAL / USE NOTICE
==============================

${generated.legalNotice}

==============================
NEXT STEP
==============================

Confirm desired features, final pricing, timeline, content, payment method, launch plan, and buyer approval before production buildout begins.`;
  }

  async function copyFullCloseKit() {
    await navigator.clipboard.writeText(getFullCloseKit());
    setCopied("Full close kit copied.");
    setSaved("");
  }
  function downloadFullCloseKitHtml() {
    const safeName =
      form.businessName
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "") || "client";

    const titleName = form.businessName.trim() || "Client";

    const escapeHtml = (value: string) =>
      value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

    const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(titleName)} Full Close Kit</title>
  <style>
    body {
      margin: 0;
      font-family: Arial, sans-serif;
      background: #0f172a;
      color: #e5e7eb;
      line-height: 1.6;
    }
    main {
      max-width: 920px;
      margin: 0 auto;
      padding: 48px 20px;
    }
    .hero,
    .card {
      background: #111827;
      border: 1px solid #334155;
      border-radius: 22px;
      padding: 28px;
      margin-bottom: 20px;
      box-shadow: 0 24px 80px rgba(0, 0, 0, 0.28);
    }
    .kicker {
      color: #93c5fd;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      font-size: 12px;
      font-weight: 700;
      margin: 0 0 8px;
    }
    h1 {
      margin: 0 0 12px;
      font-size: 38px;
      line-height: 1.1;
    }
    h2 {
      margin-top: 0;
      color: #ffffff;
    }
    pre {
      white-space: pre-wrap;
      font-family: inherit;
      margin: 0;
      color: #e5e7eb;
    }
    .footer {
      color: #94a3b8;
      font-size: 13px;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <main>
    <section class="hero">
      <p class="kicker">Full Close Kit</p>
      <h1>${escapeHtml(titleName)}</h1>
      <p>Generated buyer-ready sales package for review, outreach, and close follow-up.</p>
    </section>

    <section class="card">
      <p class="kicker">Generated Pitch</p>
      <h2>Sales Pitch</h2>
      <pre>${escapeHtml(generated.pitch)}</pre>
    </section>

    <section class="card">
      <p class="kicker">Proposal Summary</p>
      <h2>Build Proposal</h2>
      <pre>${escapeHtml(generated.proposalSummary)}</pre>
    </section>

    <section class="card">
      <p class="kicker">Buyer Email</p>
      <h2>Ready-to-send Email</h2>
      <pre>${escapeHtml(getBuyerEmail())}</pre>
    </section>

    <section class="card">
      <p class="kicker">Protection</p>
      <h2>Legal / Use Notice</h2>
      <pre>${escapeHtml(generated.legalNotice)}</pre>
    </section>

    <section class="card">
      <p class="kicker">Next Step</p>
      <h2>Close Action</h2>
      <pre>Confirm desired features, final pricing, timeline, content, payment method, launch plan, and buyer approval before production buildout begins.</pre>
    </section>

    <p class="footer">Generated with WOLF OS / I AM THE ONE sales workflow by Andrew Wolverton.</p>
  </main>
</body>
</html>`;

    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `${safeName}-full-close-kit.html`;
    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
    setCopied("Full close kit HTML downloaded.");
    setSaved("");
  }
  function getClientAgreement() {
    const name = form.businessName.trim() || "Client";

    const packagePrice = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(Number(form.packagePrice || 0));

    const depositDue = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(Number(form.depositDue || 0));

    const remainingBalance = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(
      Math.max(Number(form.packagePrice || 0) - Number(form.depositDue || 0), 0)
    );

    return `Client Approval / Next Step Agreement for ${name}

Selected Package:
${form.packageType}

Package Price:
${packagePrice}

Deposit Due:
${depositDue}

Remaining Balance:
${remainingBalance}

To move forward, ${name} should confirm:

- Selected package and requested features
- Package price, deposit amount, and remaining balance
- Payment method and payment timing
- Business logo, photos, product/service details, copy, and contact info
- Domain, hosting, email, analytics, and third-party account needs
- Target launch timeline
- Final approval before production buildout begins

This agreement note is not a final contract by itself. It is a next-step checklist to confirm scope, pricing, timeline, content, payment, and launch requirements in writing before production work begins.`;
  }

  function downloadClientAgreementHtml() {
    const safeName =
      form.businessName
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "") || "client";

    const titleName = form.businessName.trim() || "Client";

    const escapeHtml = (value: string) =>
      value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

    const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(titleName)} Client Agreement</title>
  <style>
    body {
      margin: 0;
      font-family: Arial, sans-serif;
      background: #0f172a;
      color: #e5e7eb;
      line-height: 1.6;
    }
    main {
      max-width: 860px;
      margin: 0 auto;
      padding: 48px 20px;
    }
    .card {
      background: #111827;
      border: 1px solid #334155;
      border-radius: 22px;
      padding: 28px;
      box-shadow: 0 24px 80px rgba(0, 0, 0, 0.28);
    }
    .kicker {
      color: #93c5fd;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      font-size: 12px;
      font-weight: 700;
      margin: 0 0 8px;
    }
    h1 {
      margin: 0 0 12px;
      font-size: 36px;
      line-height: 1.1;
    }
    pre {
      white-space: pre-wrap;
      font-family: inherit;
      margin: 0;
      color: #e5e7eb;
    }
    .footer {
      color: #94a3b8;
      font-size: 13px;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <main>
    <section class="card">
      <p class="kicker">Client Approval</p>
      <h1>${escapeHtml(titleName)} Next Step Agreement</h1>
      <pre>${escapeHtml(getClientAgreement())}</pre>
    </section>

    <p class="footer">Generated with WOLF OS / I AM THE ONE sales workflow by Andrew Wolverton.</p>
  </main>
</body>
</html>`;

    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `${safeName}-client-agreement.html`;
    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
    setCopied("Client agreement HTML downloaded.");
    setSaved("");
  }
  async function copyClientAgreement() {
    await navigator.clipboard.writeText(getClientAgreement());
    setCopied("Client approval agreement copied.");
    setSaved("");
  }
  async function copyProposalSummary() {
    await navigator.clipboard.writeText(generated.proposalSummary);
    setCopied("Proposal summary copied.");
    setSaved("");
  }

  function saveDemo() {
    const savedAt = new Date().toISOString();

    const demo: SavedDemo = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      businessName: form.businessName.trim() || "Untitled Client",
      industry: form.industry.trim() || "Business",
      packageType: form.packageType,
      savedAt,
      form,
      pitch: generated.pitch,
    };

    const next = [demo, ...savedDemos].slice(0, 25);

    setSavedDemos(next);
    localStorage.setItem("client-demo-generator:demos", JSON.stringify(next));
    localStorage.setItem("client-demo-generator:last-demo", JSON.stringify(demo));

    setSaved("Demo saved to library.");
    setCopied("");
  }

  function loadDemo(demo: SavedDemo) {
    setForm({ ...starterForm, ...demo.form });
    setCopied("");
    setSaved(`Loaded ${demo.businessName}.`);
  }

  function deleteDemo(id: string) {
    const next = savedDemos.filter((demo) => demo.id !== id);

    setSavedDemos(next);
    localStorage.setItem("client-demo-generator:demos", JSON.stringify(next));

    setCopied("");
    setSaved("Saved demo removed.");
  }

  function exportJson() {
    const payload = {
      form,
      generated,
      exported_at: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    const safeName =
      form.businessName
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "") || "client-demo";

    link.href = url;
    link.download = `${safeName}-demo.json`;
    link.click();

    URL.revokeObjectURL(url);
  }

  function resetDemo() {
    setForm(starterForm);
    setCopied("");
    setSaved("");
  }

  return (
    <main className="app-shell">
      <section className="hero">
        <div>
          <p className="kicker">WOLF OS™ Sales Tool</p>
          <h1>Client Demo Generator</h1>
          <div className="sales-mode-banner">
            <strong>Live Demo Mode / Sales Mode</strong>
            <span>
              This generator creates buyer-facing storefront proposals, close kits,
              email drafts, legal-use notes, and client approval checklists. No client
              data is sent to a backend.
            </span>
          </div>
          <p>
            Generate custom buyer-facing demo copy, offer cards, and a clean sales
            pitch in under 60 seconds.
          </p>
        </div>

        <div className="hero-card">
          <span>Mode</span>
          <strong>Frontend-only MVP</strong>
          <small>No backend. No risk to the SaaS platform.</small>
        </div>
      </section>

      <section className="workspace">
        <form className="generator-form">
          <div className="panel-heading">
            <p className="kicker">Input</p>
            <h2>Client Details</h2>
          </div>

          <label>
            Business name
            <input
              value={form.businessName}
              onChange={(event) => updateField("businessName", event.target.value)}
              placeholder="Elite Cuts Barbershop"
            />
          </label>

          <label>
            Industry
            <input
              value={form.industry}
              onChange={(event) => updateField("industry", event.target.value)}
              placeholder="Barbershop, clothing brand, trainer..."
            />
          </label>

          <label>
            What they sell
            <input
              value={form.whatTheySell}
              onChange={(event) => updateField("whatTheySell", event.target.value)}
              placeholder="haircuts, beard trims, VIP grooming"
            />
            <small>Separate 2–3 offers with commas.</small>
          </label>

          <label>
            Target customer
            <input
              value={form.targetCustomer}
              onChange={(event) => updateField("targetCustomer", event.target.value)}
              placeholder="busy professionals, local shoppers..."
            />
          </label>

          <label>
            Brand tone
            <select
              value={form.brandTone}
              onChange={(event) => updateField("brandTone", event.target.value)}
            >
              <option>Premium, bold, modern</option>
              <option>Clean, calm, trustworthy</option>
              <option>Luxury, minimal, high-end</option>
              <option>Streetwear, energetic, sharp</option>
              <option>Local, friendly, approachable</option>
            </select>
          </label>

          <label>
            Package
            <select
              value={form.packageType}
              onChange={(event) => updateField("packageType", event.target.value)}
            >
              <option>Starter Storefront</option>
              <option>Pro Storefront + Dashboard</option>
              <option>Custom SaaS Buildout</option>
            </select>
          </label>

          <label>
            Accent color
            <input
              type="color"
              value={form.primaryColor}
              onChange={(event) => updateField("primaryColor", event.target.value)}
            />
          </label>          <label>
            Package price
            <input
              value={form.packagePrice}
              onChange={(event) => updateField("packagePrice", event.target.value)}
              placeholder="1500"
              inputMode="numeric"
            />
          </label>

          <label>
            Deposit due
            <input
              value={form.depositDue}
              onChange={(event) => updateField("depositDue", event.target.value)}
              placeholder="500"
              inputMode="numeric"
            />
          </label>


          <label>
            Contact email
            <input
              value={form.contactEmail}
              onChange={(event) => updateField("contactEmail", event.target.value)}
              placeholder="awolf4277@gmail.com"
            />
          </label>

          <div className="button-row">
            <button type="button" onClick={copyPitch}>
              Copy Pitch
            </button>

            <button type="button" onClick={copyOutreachMessage}>
              Copy Outreach
            </button>

            <button type="button" onClick={copyLegalNotice}>
              Copy Legal
            </button>

            <button type="button" onClick={copyProposalSummary}>
              Copy Proposal
            </button>

            <button type="button" onClick={copyBuyerEmail}>
              Buyer Email Generator
            </button>

            <a className="email-action" href={getBuyerEmailLink()}>
              Open Email Draft
            </a>
            <button type="button" onClick={saveDemo}>
              Save Local
            </button>

            <button type="button" onClick={exportJson}>
              Export JSON
            </button>

            <button type="button" className="ghost" onClick={resetDemo}>
              Reset
            </button>
          </div>

          {copied ? <p className="success">{copied}</p> : null}
          {saved ? <p className="success">{saved}</p> : null}

          <div className="saved-demo-library">
            <div className="panel-heading compact">
              <p className="kicker">Saved</p>
              <h3>Demo Library</h3>
            </div>

            {savedDemos.length ? (
              <div className="saved-demo-list">
                {savedDemos.map((demo) => (
                  <article className="saved-demo-card" key={demo.id}>
                    <div>
                      <strong>{demo.businessName}</strong>
                      <span>
                        {demo.industry} · {demo.packageType}
                      </span>
                    </div>

                    <div className="saved-demo-actions">
                      <button type="button" onClick={() => loadDemo(demo)}>
                        Load
                      </button>

                      <button
                        type="button"
                        className="ghost"
                        onClick={() => deleteDemo(demo.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <p className="empty-note">No saved demos yet.</p>
            )}
          </div>
        </form>

        <section className="preview">
          <div className="preview-top" style={{ borderColor: form.primaryColor }}>
            <p className="kicker">Live Preview</p>
            <h2>{generated.headline}</h2>
            <p>{generated.subheadline}</p>

            <div className="preview-actions">
              <a
                href={gmailComposeUrl(
                  form.contactEmail || "awolf4277@gmail.com",
                  `${form.businessName || "Client"} demo concept`,
                  generated.pitch
                )}
                target="_blank"
                rel="noreferrer"
              >
                Email Owner
              </a>

              <button type="button" onClick={copyPitch}>
                Copy Demo Pitch
              </button>
            </div>
          </div>

          <div className="cards">
            {generated.cards.map((card) => (
              <article className="offer-card" key={card.name}>
                <span className="dot" style={{ background: form.primaryColor }} />
                <h3>{card.name}</h3>
                <strong>{card.price}</strong>
                <p>{card.description}</p>
              </article>
            ))}
          </div>

          <div className="owner-preview">
            <p className="kicker">Owner Dashboard Summary</p>
            <h3>What the owner gets</h3>
            <p>{generated.ownerSummary}</p>

            <div className="mini-metrics">
              <span>Products</span>
              <strong>{generated.cards.length}</strong>
              <span>Leads</span>
              <strong>Ready</strong>
              <span>Package</span>
              <strong>{form.packageType}</strong>
            </div>
          </div>

          <div className="pitch-box">
            <p className="kicker">Generated Pitch</p>
            <pre>{generated.pitch}</pre>
          </div>

          <div className="proposal-box">
            <div>
              <p className="kicker">Close Kit</p>
              <h3>Proposal Summary</h3>
            </div>

            <pre>{generated.proposalSummary}</pre>

            <button type="button" onClick={copyProposalSummary}>
              Copy Proposal Summary
            </button>
            <button type="button" onClick={copyFullCloseKit}>
              Copy Full Close Kit
            </button>
            <button type="button" onClick={downloadFullCloseKitHtml}>
              Download Full Close Kit HTML
            </button>

            <div className="legal-box">
              <div>
                <p className="kicker">Client Approval</p>
                <h3>Next Step Agreement</h3>
              </div>

              <pre>{getClientAgreement()}</pre>

              <button type="button" onClick={copyClientAgreement}>
                Copy Client Agreement
              </button>
              <button type="button" onClick={downloadClientAgreementHtml}>
                Download Client Agreement HTML
              </button>
            </div>
          </div>

          <div className="legal-box">
            <div>
              <p className="kicker">Protection</p>
              <h3>Legal / Use Notice</h3>
            </div>

            <pre>{generated.legalNotice}</pre>

            <button type="button" onClick={copyLegalNotice}>
              Copy Legal Notice
            </button>
          </div>
        </section>
      </section>
    </main>
  );
}

export default App;