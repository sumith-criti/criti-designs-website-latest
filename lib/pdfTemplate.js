import { formatCurrency } from './calculateEstimate';

function renderList(items) {
  return items
    .map((item) => `<li style="margin-bottom: 6px;">${item}</li>`)
    .join('');
}

export function buildEstimatePdfTemplate({ formData, estimate }) {
  const {
    clientName,
    clientEmail,
    clientPhone,
    projectLocation,
    builtUpArea,
    projectType,
    timelinePreference,
    service,
    addons = [],
  } = formData;

  const { minEstimate, maxEstimate, breakdown, timelineLabel, marginPercentage } = estimate;

  const inclusions = [
    'Concept-to-completion support from Criti Designs specialists',
    'Dedicated project manager and quality assurance checkpoints',
    'Detailed BOQ and material specifications at later stages',
    'Access to our vetted contractor and vendor network',
  ];

  const exclusions = [
    'Government approvals, permits, and statutory fees',
    'Site access preparation and temporary accommodations',
    'Scope changes requested after project commencement',
    'Land purchase and registration costs',
  ];

  const addonLabels = {
    modularKitchen: 'Modular Kitchen',
    wardrobes: 'Wardrobes',
    falseCeiling: 'False Ceiling',
    landscaping: 'Landscaping',
    smartHome: 'Smart Home',
    solar: 'Solar',
    hvac: 'HVAC',
  };

  const addonDisplay = addons.length
    ? addons.map((addon) => addonLabels[addon] ?? addon).join(', ')
    : 'No add-ons selected';

  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Criti Designs | Project Estimate</title>
    <style>
      body {
        margin: 0;
        font-family: 'Inter', 'Segoe UI', sans-serif;
        background: #f5f7fb;
        color: #1f2933;
      }
      .wrapper {
        padding: 32px;
      }
      .card {
        background: #ffffff;
        border-radius: 16px;
        box-shadow: 0 16px 40px rgba(15, 23, 42, 0.1);
        padding: 32px;
        margin-bottom: 24px;
      }
      .brand {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 24px;
      }
      .brand h1 {
        font-size: 20px;
        font-weight: 600;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: #4338ca;
      }
      .badge {
        background: #eef2ff;
        color: #4338ca;
        border-radius: 9999px;
        padding: 6px 16px;
        font-size: 12px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.08em;
      }
      h2 {
        font-size: 18px;
        margin: 0 0 16px;
        color: #111827;
      }
      .grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 16px;
      }
      .label {
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: #6b7280;
        margin-bottom: 4px;
      }
      .value {
        font-size: 15px;
        font-weight: 600;
        color: #111827;
      }
      .estimate-range {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: linear-gradient(135deg, #4338ca, #6366f1);
        color: white;
        border-radius: 16px;
        padding: 32px;
      }
      .estimate-range h2 {
        color: white;
      }
      .estimate-range .amounts {
        font-size: 24px;
        font-weight: 700;
      }
      .two-col {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 24px;
      }
      .list {
        margin: 0;
        padding-left: 18px;
        font-size: 13px;
        line-height: 1.6;
      }
      .footer {
        text-align: center;
        font-size: 12px;
        color: #4b5563;
        margin-top: 24px;
      }
    </style>
  </head>
  <body>
    <div class="wrapper">
      <div class="card">
        <div class="brand">
          <h1>Criti Designs</h1>
          <span class="badge">Preliminary Estimate</span>
        </div>
        <p style="margin: 0; color: #4b5563;">
          Hi ${clientName || 'there'}, thank you for exploring your project with Criti Designs.
          Based on the information shared, here is a preliminary cost snapshot for your
          ${service || 'selected'} scope.
        </p>
      </div>

      <div class="card estimate-range">
        <div>
          <h2>Estimated Investment Range</h2>
          <div class="amounts">
            ${formatCurrency(minEstimate)} – ${formatCurrency(maxEstimate)}
          </div>
          <p style="margin: 12px 0 0; font-size: 12px; letter-spacing: 0.06em;">
            Includes a ${marginPercentage}% planning margin
          </p>
        </div>
        <div style="text-align: right;">
          <div class="label">Projected Timeline</div>
          <div class="value">${timelineLabel}</div>
        </div>
      </div>

      <div class="card">
        <h2>Project Snapshot</h2>
        <div class="grid">
          <div>
            <div class="label">Client</div>
            <div class="value">${clientName || 'Not provided'}</div>
          </div>
          <div>
            <div class="label">Contact</div>
            <div class="value">${clientEmail || '—'} | ${clientPhone || '—'}</div>
          </div>
          <div>
            <div class="label">Location</div>
            <div class="value">${projectLocation || 'Not provided'}</div>
          </div>
          <div>
            <div class="label">Built-up Area</div>
            <div class="value">${builtUpArea || '—'} sq ft</div>
          </div>
          <div>
            <div class="label">Project Type</div>
            <div class="value">${projectType || 'Not specified'}</div>
          </div>
          <div>
            <div class="label">Timeline Preference</div>
            <div class="value">${timelinePreference === 'fast-track' ? 'Fast Track' : 'Normal'}</div>
          </div>
          <div>
            <div class="label">Selected Service</div>
            <div class="value">${service || 'Not selected'}</div>
          </div>
          <div>
            <div class="label">Chosen Add-ons</div>
            <div class="value">${addonDisplay}</div>
          </div>
        </div>
      </div>

      <div class="card">
        <h2>Cost Breakdown</h2>
        <div class="two-col">
          <div>
            <div class="label">Construction</div>
            <div class="value">${formatCurrency(breakdown.constructionCost)}</div>
          </div>
          <div>
            <div class="label">Interiors</div>
            <div class="value">${formatCurrency(breakdown.interiorCost)}</div>
          </div>
          <div>
            <div class="label">Add-ons & Extras</div>
            <div class="value">${formatCurrency(breakdown.extrasCost)}</div>
          </div>
          <div>
            <div class="label">Total (Before Margin)</div>
            <div class="value">${formatCurrency(breakdown.totalBaseCost)}</div>
          </div>
        </div>
      </div>

      <div class="card">
        <h2>Inclusions & Exclusions</h2>
        <div class="two-col">
          <div>
            <div class="label">Inclusions</div>
            <ul class="list">
              ${renderList(inclusions)}
            </ul>
          </div>
          <div>
            <div class="label">Exclusions</div>
            <ul class="list">
              ${renderList(exclusions)}
            </ul>
          </div>
        </div>
      </div>

      <div class="card">
        <h2>Next Steps</h2>
        <p style="margin: 0 0 12px; color: #4b5563;">
          This estimate provides an indicative range. Once we conduct a site walkthrough and
          align on design intent, we can issue a detailed proposal with a refined budget.
        </p>
        <p style="margin: 0; font-weight: 600; color: #111827;">
          Book a site visit with the Criti Designs team to convert this vision into a detailed plan.
        </p>
      </div>

      <div class="footer">
        © ${new Date().getFullYear()} Criti Designs · critidesigns.com · +91-00000 00000
      </div>
    </div>
  </body>
</html>
  `;
}


