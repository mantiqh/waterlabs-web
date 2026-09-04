import fs from 'fs';
import path from 'path';

// Read .env.local
const envContent = fs.readFileSync('.env.local', 'utf8');
const env = {};
envContent.split('\n').forEach((line) => {
  const parts = line.split('=');
  if (parts.length >= 2) env[parts[0].trim()] = parts.slice(1).join('=').trim();
});

const projectId = env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = env.NEXT_PUBLIC_SANITY_DATASET;
const token = env.NEXT_PUBLIC_SANITY_TOKEN;

if (!projectId || !dataset || !token) {
  console.error('Missing Sanity credentials in .env.local');
  process.exit(1);
}

// Case studies definitions matching src/data/case-studies
const caseStudiesConfig = [
  {
    id: 'case-study-1-rural-health',
    order: 1,
    imagePath: 'public/images/case-study/case-study-1-multi-state/Frame 2147226953.png',
    data: {
      slug: 'multi-state-rural-health-system',
      categoryTag: 'Case Study · Rural Health System',
      title: 'How a multi-state rural health system used Waterlabs to cut claim release from 10 days to under 24 hours.',
      titleHighlight: 'release from 10 days to under 24 hours.',
      subtitle: 'Hospitals and physician groups across the United States, running 13 specialties on a single revenue cycle.',
      heroImageAlt: 'Rural health system command center monitoring claims with Waterlabs',
      tags: ['Rural Health System', 'Multi-specialty', 'Claim Release', 'HIMER AI OS'],
      client: {
        name: 'Multi-State Rural Health Alliance',
        specialties: '13 Clinical Specialties',
        systemType: 'Acute & Ambulatory Health Network',
      },
      clientSummary:
        'A large rural health system operates hospitals and physician groups across several states. Coding was not the issue; paperwork delayed claim submission for up to a week.',
      statBadges: [
        { text: '$2B+ net revenue' },
        { text: '13 specialties' },
        { text: '8,000 to 12,000 held claims a month' },
      ],
      challenge:
        'Following a major RCM transition, thousands of coded claims were held due to missing documentation. Common issues included unsigned notes, missing provider signatures, unsigned operative reports, unclosed encounters, missing provider identification, incomplete attestations, and absent supporting documents.\n\nThese issues appeared across all specialties, with providers resolving them at different times and making readiness hard to predict. Downstream staff could not identify when a claim was ready without manually checking each one.\n\nAs a result, claims were repeatedly reviewed, often 5 to 10 times before release. Each month, 8,000 to 12,000 claims cycled through this process, requiring entire teams to monitor deficiency queues. Revenue already earned was delayed while completed paperwork awaited processing.',
      whatWaterlabsDid:
        'Waterlabs implemented agentic AI to continuously monitor documentation. Our agents track held claims and provider updates in real time, ensuring claims are processed promptly once ready.\n\nDaily claim surveillance: Our agents review all held claims each day, recording deficiency type, specialty, provider, duration, and documentation status. Previously, staff manually opened each claim to determine its status.\n\nDocumentation verification: Our agents operate within the EHR and coding workflow, identifying updates as soon as they occur, such as added signatures, finalized notes, completed attestations, filled provider names, signed operative reports, or closed encounters. Readiness was previously visible only through manual review.\n\nAutonomous decisioning: Once a claim is complete, our agents remove the hold, update its status, and release it for billing without human intervention. Resolved claims previously waited for the next manual review cycle.\n\nException management: Only claims requiring human judgment, such as those with conflicting documentation, medical necessity questions, audit flags, or high-risk coding, are escalated to staff. Specialists now focus on these cases instead of reviewing every claim.',
      resultsBlock: {
        headline: '5 to 10 days → under 24 hours',
        subheadline:
          'Cut time to release a resolved claim by 80% to 90%, reducing unnecessary waiting time.',
        details:
          'Staff monitoring deficiency queues dropped from 10–12 to 2. Our agents now perform over 90% of status checks autonomously.\n\n$500,000 in annual labor savings. Ten positions were reassigned to work requiring human expertise.\n\n$72 million in annual claim value is processed 3 to 5 days sooner, based on approximately $6 million flowing through this workflow each month, directly impacting Days in A/R.\n\nBilling delays decreased by 15% to 25%, so patients received determinations, EOBs, and final statements more quickly, resulting in fewer inquiries.\n\nOver 2,500 hours were returned to providers and clinical staff annually, creating capacity for an additional 1,500 to 2,000 visits without new hires.',
      },
      outcomes:
        'Operationally, workflow is no longer dependent on staff availability. Our agents operate continuously, ensuring consistent performance across all 13 specialties.\n\nFinancially, coded work is converted to billed claims more quickly, accelerating cash flow and reducing Days in A/R. Growth can now occur without additional hiring.\n\nStrategically, providers remain accountable for their records, reducing revenue loss between coding and billing. The health system now has a proven model for implementing agentic AI in other areas, with measurable returns in months rather than years.',
      bottomLine:
        'A backlog that previously required entire teams is now managed autonomously. Staff who once chased signatures now focus on accounts requiring real decisions, so earned revenue reaches the bank promptly instead of aging in queues.',
      metrics: [
        { value: '24 hrs', label: 'Claim release turnaround down from 10 days', change: '-90%' },
        { value: '98.6%', label: 'First-pass clean claim rate across all facilities', change: '+14%' },
        { value: '$3.4M', label: 'Cash flow acceleration unlocked in first 90 days', change: 'Accelerated' },
      ],
      cta: {
        tagText: 'Talk to us.',
        headline: 'Schedule a 15-minute call to see how Waterlabs can impact your organization’s results.',
        buttonText: 'Get a Demo',
        buttonHref: '/contact-us',
      },
    },
  },
  {
    id: 'case-study-2-enterprise-rcm',
    order: 2,
    imagePath: 'public/images/case-study/case-study-2-enterprise/Frame 2147226953 (1).png',
    data: {
      slug: 'enterprise-rcm-organization',
      categoryTag: 'Case Study · Enterprise RCM Organization',
      title: 'How an enterprise RCM organization used Waterlabs to cut unbilled claims by 40% and accelerate revenue by 4 to 6 days.',
      titleHighlight: 'cut unbilled claims by 40%',
      subtitle: 'Coding operations nationwide, spanning health systems, physician groups, and community hospitals across 7 specialties.',
      heroImageAlt: 'Enterprise RCM operations dashboard showing autonomous documentation matching',
      tags: ['Enterprise RCM', 'Multi-facility', 'Documentation Surveillance', 'Unbilled Claims'],
      client: {
        name: 'National Healthcare RCM Partners',
        specialties: '7 Coding Specialties Nationwide',
        systemType: 'Enterprise RCM Services Provider',
      },
      clientSummary:
        'An enterprise revenue cycle management organization codes for providers nationwide. Its portfolio spans health systems, physician groups, and community hospitals across outpatient, emergency department, professional fee, surgery, radiology, evaluation and management, and multi-specialty physician coding.',
      statBadges: [
        { text: '350+ certified coders' },
        { text: '7 coding specialties' },
        { text: '15,000 to 20,000 held encounters a month' },
      ],
      challenge:
        'The organization coded accurately, but encounters consistently stalled in documentation deficiency queues. Coders could not finalize accounts without signed operative reports, missing pathology reports, secondary provider attestations, unclosed clinical encounters, and required pre-authorization attachments.\n\nAcross multiple client EHR systems and facilities, each client used different documentation processes and followed unique provider communication rules.\n\nCoders spent up to 25% of their daily time re-reviewing held accounts just to see if missing items had been uploaded, reducing productive coding hours.',
      whatWaterlabsDid:
        'Waterlabs deployed autonomous documentation surveillance agents across all client EHR instances to continuously inspect deficiency queues and match incoming clinical records in real time.\n\nMulti-EHR Surveillance: Our agents connect to diverse client EHR environments (Epic, Cerner, MEDITECH, Athena) simultaneously, scanning held encounters 24/7.\n\nAutomated Document Matching: Using clinical language processing, agents inspect newly filed clinical documents and automatically verify required signatures, attestations, and pathology findings against pending encounters.\n\nQueue Clearance & Autonomous Unholding: When all criteria are met, the agent clears documentation holds instantly and places the account directly in the coder’s active queue with an audit trail note.\n\nProvider Escalation Routing: Incomplete records nearing timely filing limits are automatically routed to designated provider liaisons with pre-formatted deficiency summaries.',
      resultsBlock: {
        headline: '40% reduction in unbilled inventory',
        subheadline: 'Accelerated revenue realization by 4 to 6 business days across all client accounts.',
        details:
          'Coder productivity rose by 22%, saving an average of 1.8 hours per coder per day previously lost to repetitive re-checking.\n\n$18M in monthly cash flow advanced by nearly a full week, significantly strengthening client satisfaction and retention.\n\nClean claim handoff rates increased from 82% to 97.4%, practically eliminating secondary documentation queries after coding.\n\nClient onboarding time for new health systems cut from 6 weeks to 10 days for documentation workflows.',
      },
      outcomes:
        'Operationally, the RCM firm scaled encounter volume by 30% without adding administrative queue-monitoring personnel.\n\nFinancially, improved turnaround times triggered performance bonuses across three major hospital contracts.\n\nStrategically, the firm positioned itself as a technology-forward leader, winning competitive enterprise bids against traditional offshore RCM vendors.',
      bottomLine:
        'Automating documentation hold surveillance transformed unbilled inventory from an unpredictable bottleneck into an agile, real-time pipeline.',
      metrics: [
        { value: '40%', label: 'Reduction in unbilled documentation inventory', change: '-40%' },
        { value: '4–6 Days', label: 'Average acceleration in cash collection velocity', change: 'Faster' },
        { value: '22%', label: 'Coder productivity increase across all 7 specialties', change: '+22%' },
      ],
      cta: {
        tagText: 'Talk to us.',
        headline: 'See how Waterlabs can transform your enterprise RCM operations.',
        buttonText: 'Get a Demo',
        buttonHref: '/contact-us',
      },
    },
  },
  {
    id: 'case-study-3-physical-therapy',
    order: 3,
    imagePath: 'public/images/case-study/case-study-3-multi-site/Frame 2147226953 (2).png',
    data: {
      slug: 'multi-site-physical-therapy-practice',
      categoryTag: 'Case Study · Physical Therapy Group',
      title: 'How a 45-clinic physical therapy group used Waterlabs to resolve 92% of plan-of-care certification delays.',
      titleHighlight: 'resolve 92% of plan-of-care certification delays.',
      subtitle: 'Over 200 physical and occupational therapists managing 35,000 monthly patient encounters across three Midwestern states.',
      heroImageAlt: 'Physical therapy clinic rehabilitation workspace using automated compliance tracking',
      tags: ['Physical Therapy', 'Plan of Care', 'Certification Compliance', 'Outpatient Rehab'],
      client: {
        name: 'Midwest Physical Rehabilitation Partners',
        specialties: 'Physical, Occupational & Speech Therapy',
        systemType: 'Outpatient Multi-Site Practice Group',
      },
      clientSummary:
        'A high-growth outpatient rehabilitation network operating 45 locations across three Midwestern states. The practice delivers orthopedic, pediatric, and neurological therapy services, handling high encounter volume with stringent payer compliance windows.',
      statBadges: [
        { text: '45 clinics' },
        { text: '200+ clinicians' },
        { text: '35,000 monthly visits' },
      ],
      challenge:
        'Therapy compliance mandates that a signed Plan of Care (POC) from the referring physician be obtained within 30 to 90 days. Thousands of visits were held prior to billing because external physician signatures had not been returned.\n\nFront-desk clinic coordinators spent hours faxing, calling, and emailing physician offices manually, often receiving little response until claims approached filing deadlines.\n\nUnbilled receivables exceeded $1.4M at any given time, creating severe cash flow fluctuations and sporadic claim denials.',
      whatWaterlabsDid:
        'Waterlabs deployed automated clinician liaison agents designed specifically for therapy compliance workflows.\n\nEHR-Triggered Order Generation: When an initial evaluation is finalized, the agent formats the POC document according to the specific physician’s preferred communication method (secure fax, portal, or direct EHR integration).\n\nIntelligent Follow-Up Cadence: Agents track delivery confirmation and execute multi-touch reminders at optimal intervals (Day 7, 14, 21), tailoring urgency based on payer-specific timely filing deadlines.\n\nInbound Signature Verification: Returned signed faxes are automatically matched to the patient account using OCR and signature detection, updating billing hold flags immediately.\n\nAudit Defense Packaging: Complete signature trails and attestation records are bundled directly into the encounter file for audit defense.',
      resultsBlock: {
        headline: '92% of POC signatures secured in < 14 days',
        subheadline: 'Down from an average lag of 38 days, reducing held therapy claims by over $1.1 million.',
        details:
          'Unbilled therapy claims dropped from $1.4M to under $250,000 within 60 days of deployment.\n\nOver 1,200 administrative hours saved every month across clinic staff, allowing coordinators to refocus on patient scheduling and intake.\n\nPOC-related denial rate fell from 8.4% to less than 0.5%.\n\nDays Sales Outstanding (DSO) shortened by 14 days company-wide.',
      },
      outcomes:
        'Operationally, clinic coordinators were liberated from tracking fax machines and phone tags, dramatically improving clinic workplace culture.\n\nFinancially, cash flow stabilization enabled the practice group to acquire and integrate 8 additional regional clinics without increasing centralized billing headcount.\n\nStrategically, referral relationships strengthened because external physician practices received organized, non-duplicative reminder summaries.',
      bottomLine:
        'Automated physician communication turned the industry-wide burden of therapy POC certifications into an automated background operational engine.',
      metrics: [
        { value: '92%', label: 'Plan of Care certifications secured in under 14 days', change: '+68%' },
        { value: '$1.1M+', label: 'Cash flow unlocked from unbilled POC holds', change: 'Unlocked' },
        { value: '0.5%', label: 'POC-related claim denial rate down from 8.4%', change: '-94%' },
      ],
      cta: {
        tagText: 'Talk to us.',
        headline: 'Discover how Waterlabs eliminates certification delays for your outpatient practices.',
        buttonText: 'Get a Demo',
        buttonHref: '/contact-us',
      },
    },
  },
  {
    id: 'case-study-4-behavioral-health',
    order: 4,
    imagePath: 'public/images/case-study/case-study-4-behavioral/Frame 2147226953 (3).png',
    data: {
      slug: 'regional-behavioral-health-network',
      categoryTag: 'Case Study · Behavioral Health Network',
      title: 'How a regional behavioral health network automated prior auth tracking and cut denial rates by 78%.',
      titleHighlight: 'cut denial rates by 78%.',
      subtitle: 'Inpatient facilities, residential treatment centers, and intensive outpatient programs across 18 regional locations.',
      heroImageAlt: 'Behavioral healthcare team conducting patient intake with automated prior authorization',
      tags: ['Behavioral Health', 'Prior Authorization', 'Concurrent Review', 'Denials Prevention'],
      client: {
        name: 'Horizon Behavioral Health Systems',
        specialties: 'Psychiatric, Addiction Medicine & Intensive Outpatient',
        systemType: 'Regional Behavioral Health Network',
      },
      clientSummary:
        'A comprehensive behavioral health provider operating inpatient crisis centers, residential substance use facilities, and intensive outpatient clinics. The organization serves over 12,000 patients annually with complex payer approval requirements.',
      statBadges: [
        { text: '18 facilities' },
        { text: '12,000+ patients annually' },
        { text: '35+ commercial and Medicaid payers' },
      ],
      challenge:
        'Behavioral health reimbursements require continuous concurrent reviews, authorizations, and length-of-stay extensions. Payers grant authorizations in short increments (2 to 5 days), requiring constant re-submission of clinical notes.\n\nMissed authorization windows caused retro-active coverage denials that were nearly impossible to overturn upon appeal.\n\nUtilization review (UR) coordinators spent 80% of their workday logging into 25 different payer portals, checking expiration dates and manually uploading clinical progress summaries.',
      whatWaterlabsDid:
        'Waterlabs deployed specialized Utilization Review AI agents that synchronize clinical progress notes directly with payer authorization criteria.\n\nContinuous Expiration Monitoring: Agents monitor authorization end dates across all admitted patients, flagging expirations 72 hours in advance.\n\nClinical Summarization: The agent synthesizes therapist progress notes, nursing assessments, and psychiatric evaluations into standard ASAM/medical necessity criteria reports.\n\nPayer Portal Submission: Formatted review requests and clinical attachments are transmitted autonomously via API or secure portal automation.\n\nApproval Capture & EHR Update: Payer responses and newly authorized date spans are automatically scraped and committed directly into the EHR billing module.',
      resultsBlock: {
        headline: '78% reduction in authorization-related denials',
        subheadline: 'Protected $2.8 million in high-risk behavioral health care reimbursements in year one.',
        details:
          'Zero missed concurrent review deadlines across all 18 inpatient facilities over 12 consecutive months.\n\nUR coordinators reclaimed 20 hours per week each, shifting focus from data entry to peer-to-peer clinical defense.\n\nLength of stay coverage authorization rate reached 96.2%, eliminating gaps in covered bed-days.\n\nMedicaid compliance audit passed with 100% documentation completeness rating.',
      },
      outcomes:
        'Operationally, clinical staff can admit patients in crisis without worrying about immediate administrative clerical delays.\n\nFinancially, operating margins improved by 4.2% as retro-denials dropped to near zero.\n\nStrategically, the network successfully expanded its adolescent psychiatric unit knowing its administrative infrastructure could support increased case volume.',
      bottomLine:
        'Automating concurrent review tracking protected vulnerable clinical revenue and allowed clinicians to focus entirely on patient recovery.',
      metrics: [
        { value: '78%', label: 'Reduction in authorization-related claim denials', change: '-78%' },
        { value: '$2.8M', label: 'Annual reimbursement revenue protected from retro-denials', change: 'Protected' },
        { value: '96.2%', label: 'First-submission concurrent review approval rate', change: '+21%' },
      ],
      cta: {
        tagText: 'Talk to us.',
        headline: 'Automate utilization reviews and protect behavioral health reimbursements.',
        buttonText: 'Get a Demo',
        buttonHref: '/contact-us',
      },
    },
  },
  {
    id: 'case-study-5-emergency-department',
    order: 5,
    imagePath: 'public/images/case-study/case-study-5-hospital/Frame 2147226957.png',
    data: {
      slug: 'community-hospital-emergency-department',
      categoryTag: 'Case Study · Hospital Emergency Department',
      title: 'How an acute community hospital reduced ED chart lag from 6 days to 18 hours using autonomous reconciliation.',
      titleHighlight: 'reduced ED chart lag from 6 days to 18 hours',
      subtitle: 'A 320-bed regional hospital managing 65,000 annual emergency room visits across adult and pediatric departments.',
      heroImageAlt: 'Hospital emergency department monitoring and clinical documentation workflow',
      tags: ['Emergency Medicine', 'Chart Completion', 'ED Physician Documentation', 'EHR Interoperability'],
      client: {
        name: 'St. Jude Community Hospital & Trauma Center',
        specialties: 'Emergency Medicine & Trauma Services',
        systemType: 'Non-Profit Community Acute Care Hospital',
      },
      clientSummary:
        'A bustling 320-bed non-profit hospital providing trauma, surgical, and emergency care to a diverse metropolitan population. The emergency department handles over 180 patient arrivals daily.',
      statBadges: [
        { text: '320 acute beds' },
        { text: '65,000 annual ED visits' },
        { text: '40+ emergency physicians' },
      ],
      challenge:
        'Emergency physicians treat patients rapidly and often move between acute trauma cases without finalizing charts immediately. Diagnostic results (CT scans, labs, radiology reads) trickle in after discharge.\n\nCharts sat open awaiting post-discharge diagnostic reconciliation and physician attestations for 5 to 7 days on average.\n\nProfessional fee and facility coding were delayed simultaneously, stretching cash flow and inflating Days in Unbilled A/R.',
      whatWaterlabsDid:
        'Waterlabs deployed Emergency Department Documentation Agents that actively bridge clinical diagnostics and physician queues in real time.\n\nDiagnostic Result Ingestion: Agents monitor PACS and lab results in real time, auto-correlating final reports with open ED encounter records.\n\nMicro-Deficiency Notification: Instead of sending physicians long deficiency spreadsheets weekly, the system sends targeted, non-intrusive mobile alerts within the provider’s EHR interface the moment a chart is ready for final signoff.\n\nE/M Level Readiness Verification: Autonomous validation ensures all required E/M components (MDM, historical elements, procedural notes) are present before alerting the doctor.\n\nImmediate Coding Release: Upon signature, the chart is released into the medical coding queue in seconds.',
      resultsBlock: {
        headline: 'ED chart turnaround: 6 days → 18 hours',
        subheadline: '85% faster chart completion enabling same-day coding and rapid claim generation.',
        details:
          'Physician documentation deficiency backlog reduced by 82% within the first month.\n\nFacility and professional fee billing cycle accelerated by 4.5 days, improving hospital cash reserves.\n\nEmergency physician overtime spent on charting dropped by 3.5 hours per physician per week.\n\nAudit compliance score improved to 99.1% across all diagnostic attachments.',
      },
      outcomes:
        'Operationally, the emergency department eliminated friction between medical records staff and busy trauma physicians.\n\nFinancially, faster billing lowered Days in Accounts Receivable by 8 days for emergency services.\n\nStrategically, the hospital established a modern documentation benchmark that is now being rolled out to surgical and inpatient units.',
      bottomLine:
        'Continuous diagnostic matching and intelligent physician notifications eradicated ED chart backlog without disrupting clinical urgency.',
      metrics: [
        { value: '18 hrs', label: 'Average ED chart completion time down from 6 days', change: '-85%' },
        { value: '82%', label: 'Reduction in open physician documentation queue', change: '-82%' },
        { value: '8 Days', label: 'Reduction in Emergency Medicine Days in A/R', change: 'Faster' },
      ],
      cta: {
        tagText: 'Talk to us.',
        headline: 'Accelerate ED chart completion and eliminate documentation lag.',
        buttonText: 'Get a Demo',
        buttonHref: '/contact-us',
      },
    },
  },
  {
    id: 'case-study-6-multi-specialty',
    order: 6,
    imagePath: 'public/images/case-study/case-study-6-multi-specialty/Frame 2147226958.png',
    data: {
      slug: 'multi-specialty-physician-foundation',
      categoryTag: 'Case Study · Multi-Specialty Foundation',
      title: 'How a 350-provider medical foundation eliminated $4.2M in annual documentation write-offs.',
      titleHighlight: 'eliminated $4.2M in annual documentation write-offs.',
      subtitle: 'Spanning cardiology, orthopedics, neurology, oncology, and primary care across 28 clinic locations.',
      heroImageAlt: 'Multi-specialty outpatient medical clinic and physicians consultation suite',
      tags: ['Physician Foundation', 'Medical Specialties', 'Denial Prevention', 'Revenue Protection'],
      client: {
        name: 'Pacific Medical Physicians Foundation',
        specialties: '22 Adult & Pediatric Medical Specialties',
        systemType: 'Integrated Multi-Specialty Physician Foundation',
      },
      clientSummary:
        'An integrated healthcare foundation representing 350 physicians and 150 advanced practice providers across 28 outpatient medical centers. The organization provides comprehensive primary and sub-specialty clinical care.',
      statBadges: [
        { text: '350+ physicians' },
        { text: '22 medical specialties' },
        { text: '28 clinic locations' },
      ],
      challenge:
        'With 22 distinct specialties, documentation standards varied wildly between departments. High-dollar surgical and cardiology procedures frequently encountered strict payer documentation demands (e.g. conservative therapy documentation before surgery, specific implant logs, operative duration stamps).\n\nWhen paperwork fell short, claims were written off as non-reimbursable administrative defects rather than appealed.\n\nAnnual write-offs attributable directly to preventable documentation defects exceeded $4.2 million.',
      whatWaterlabsDid:
        'Waterlabs deployed specialty-specific clinical rule engines powered by agentic AI to inspect encounters prior to claim generation.\n\nPre-Billing Specialty Rules: High-risk specialties (cardiology, orthopedics, oncology) are evaluated against 450+ payer-specific criteria before coding begins.\n\nMissing Item Auto-Discovery: If an implant sticker, pre-operative conservative care note, or second-opinion consult is missing, the agent queries the health system’s master records to locate and attach it automatically.\n\nProvider Clinical Inquiries: If a clinical element is truly absent, the agent drafts a concise, context-aware query for the physician, requiring only a one-click response.\n\nAutomated Appeal Dossier Creation: In cases where payers improperly deny claims despite adequate records, agents assemble an end-to-end appeal dossier with cited medical guidelines.',
      resultsBlock: {
        headline: '$4.2M in annual write-offs eliminated',
        subheadline: 'Preventable documentation-related write-offs plummeted by 94% across all 22 medical specialties.',
        details:
          'Over $350,000 in monthly revenue recovered and successfully billed on clean first passes.\n\nPhysician query response time improved from 11 days to under 24 hours due to targeted single-click prompts.\n\nClean claim submission rate reached 98.9% for complex outpatient surgeries.\n\nFoundation achieved highest clinical documentation improvement (CDI) rating in its regional peer group.',
      },
      outcomes:
        'Operationally, the CDI and coding departments achieved seamless alignment with clinic leadership.\n\nFinancially, write-off prevention translated directly to bottom-line margin growth and increased physician compensation pools.\n\nStrategically, the foundation gained deep visibility into payer behavior, allowing leadership to renegotiate payer contracts from a position of data-backed confidence.',
      bottomLine:
        'Autonomous pre-billing documentation verification turned lost revenue into protected margins across every clinical specialty.',
      metrics: [
        { value: '$4.2M', label: 'Annual documentation-related write-offs eliminated', change: 'Saved' },
        { value: '98.9%', label: 'First-pass clean claim submission rate for complex surgeries', change: '+16%' },
        { value: '< 24 hrs', label: 'Physician query response turnaround time down from 11 days', change: '-91%' },
      ],
      cta: {
        tagText: 'Talk to us.',
        headline: 'Protect your practice revenue from preventable documentation write-offs.',
        buttonText: 'Get a Demo',
        buttonHref: '/contact-us',
      },
    },
  },
];

async function uploadImageToSanity(filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  const filename = path.basename(filePath).replace(/\s+/g, '_');
  const uploadUrl = `https://${projectId}.api.sanity.io/v2024-08-20/assets/images/${dataset}?filename=${encodeURIComponent(filename)}`;

  const res = await fetch(uploadUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'image/png',
      Authorization: `Bearer ${token}`,
    },
    body: fileBuffer,
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(`Failed to upload ${filePath}: ${JSON.stringify(data)}`);
  }
  return data.document._id;
}

async function seed() {
  console.log(`Starting Sanity seeding for ${caseStudiesConfig.length} Case Studies...`);

  for (const item of caseStudiesConfig) {
    console.log(`\nProcessing: ${item.data.slug}...`);

    let assetId = null;
    try {
      console.log(`Uploading hero image: ${item.imagePath}`);
      assetId = await uploadImageToSanity(item.imagePath);
      console.log(`Image uploaded successfully! Asset ID: ${assetId}`);
    } catch (err) {
      console.warn(`Could not upload image for ${item.id}:`, err.message);
    }

    const doc = {
      _id: item.id,
      _type: 'caseStudy',
      title: item.data.title,
      slug: {
        _type: 'slug',
        current: item.data.slug,
      },
      categoryTag: item.data.categoryTag,
      titleHighlight: item.data.titleHighlight,
      subtitle: item.data.subtitle,
      tags: item.data.tags,
      client: item.data.client,
      clientSummary: item.data.clientSummary,
      statBadges: (item.data.statBadges || []).map((b, i) => ({
        _key: `badge-${i}`,
        text: b.text,
      })),
      challenge: item.data.challenge,
      whatWaterlabsDid: item.data.whatWaterlabsDid,
      resultsBlock: item.data.resultsBlock,
      outcomes: item.data.outcomes,
      bottomLine: item.data.bottomLine,
      metrics: (item.data.metrics || []).map((m, i) => ({
        _key: `metric-${i}`,
        value: m.value,
        label: m.label,
        change: m.change,
      })),
      cta: item.data.cta,
      order: item.order,
      ...(assetId && {
        heroImage: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: assetId,
          },
          alt: item.data.heroImageAlt,
        },
      }),
    };

    const mutateUrl = `https://${projectId}.api.sanity.io/v2024-08-20/data/mutate/${dataset}`;
    const mutation = {
      mutations: [
        {
          createOrReplace: doc,
        },
      ],
    };

    const mutateRes = await fetch(mutateUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(mutation),
    });

    const mutateData = await mutateRes.json();
    if (!mutateRes.ok) {
      console.error(`Error saving document ${item.id}:`, mutateData);
    } else {
      console.log(`Document ${item.id} saved successfully to Sanity! Transaction:`, mutateData.transactionId);
    }
  }

  console.log('\nSeeding completed successfully!');
}

seed().catch((err) => {
  console.error('Fatal error during seeding:', err);
  process.exit(1);
});
