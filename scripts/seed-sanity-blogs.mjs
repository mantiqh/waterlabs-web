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

const blogArticles = [
  {
    id: 'blog-post-what-is-agentic-rcm',
    order: 0,
    title: 'What Is Agentic RCM? The Definitive Guide to the Autonomous Revenue Cycle',
    titleAccent: 'What Is Agentic RCM?',
    titleRest: ' The Definitive Guide to the Autonomous Revenue Cycle',
    slug: 'what-is-agentic-rcm',
    category: 'Features',
    tag: 'Article',
    subTag: 'Jun 26, 2025',
    publishedAt: '2025-06-26T10:00:00.000Z',
    excerpt: 'Agentic RCM is revenue cycle management run by autonomous AI agents that do the work themselves, reading payer rules, submitting claims, resolving denials, and following up.',
    desktopImagePath: 'public/images/blog-detail/hero-banner-desktop.png',
    mobileImagePath: 'public/images/blog-detail/hero-banner-mobile.png',
    heroBannerDesktopPath: 'public/images/blog-detail/hero-banner-desktop.png',
    heroBannerMobilePath: 'public/images/blog-detail/hero-banner-mobile.png',
    heroParagraphs:
      'Agentic RCM is revenue cycle management run by autonomous AI agents that do the work themselves, reading payer rules, submitting claims, resolving denials, and following up, rather than flagging tasks for humans to complete.\n\nIt is the difference between software that builds a worklist and software that works the list. This guide, from the team at Waterlabs, explains what agentic RCM is, how it differs from the automation that came before it, what it changes for a health system, and where its real limits sit.\n\nThe shift is happening fast. A revenue cycle survey found that 80% of health systems were exploring, piloting, or implementing generative AI tools for RCM, a 38-percentage-point increase in under two years. Agentic RCM is the frontier of that shift, and the term is new enough that most definitions still get it wrong.',
    sections: [
      {
        _key: 'sec-1',
        title: 'What does agentic RCM actually mean?',
        id: 'what-does-agentic-rcm-actually-mean',
        content:
          'Agentic RCM is the application of agentic AI, systems that perceive, reason, plan, and act autonomously, to the end-to-end revenue cycle. An agent does not wait for a human to trigger each step. It pursues a goal, such as getting a claim paid, and chooses the actions to get there.\n\nMcKinsey draws the line clearly. Agentic AI is characterized by its ability to autonomously make decisions and execute complex end-to-end processes, unlike generative AI, which primarily provides advisory support. In effect, it can function more like a coworker than a tool.\n\nThat distinction is the whole story. A predictive model tells you a claim will probably be denied. An agent stops the denial, or resolves it after the fact, without a person in the loop for every step. An agentic system does not create a worklist. It works the worklist.',
      },
      {
        _key: 'sec-2',
        title: 'How is agentic RCM different from RPA and generative AI?',
        id: 'how-is-agentic-rcm-different-from-rpa-and-generative-ai',
        content:
          "Three waves of automation have moved through the revenue cycle, and they are not the same thing. Confusing them is the most common mistake buyers make.\n\n**Robotic process automation (RPA)** follows fixed scripts. It is fast on structured, repetitive tasks, and it breaks the moment anything changes. RPA breaks the moment a process changes. Unstructured data or any scenario requiring interpretation will stop a bot cold. That fragility carries a hidden cost. Gartner's 2024 Critical Capabilities for Automation found enterprises relying solely on legacy RPA face a maintenance tax consuming 40 to 50% of their automation budget.\n\n**Generative AI** understands context and produces language. It can draft an appeal or read a clinical note, but it advises. It waits for direction.\n\n**Agentic AI** reasons and acts. It plans a sequence, querying eligibility, mapping codes, generating an appeal, submitting it through the right payer portal, then executes and monitors the outcome to decide what to do next. It handles the variability and judgment that stops RPA cold.\n\nThe consequence shows up in results. A predictive denial model might cut denial write-offs by 15 to 20%. An agentic system that autonomously resolves denials can reduce them by 40 to 60%, because it removes the bottleneck: human bandwidth.",
      },
      {
        _key: 'sec-3',
        title: 'Why is agentic RCM emerging now?',
        id: 'why-is-agentic-rcm-emerging-now',
        content:
          'Two pressures made the old model untenable, and one technology arrived to answer them.\n\nThe first pressure is denials. The industry-wide initial denial rate hit 11.8 percent in 2024, up from 10.2 percent in 2020, with $262 billion in claims initially denied each year. Most of that money is never recovered. MGMA estimates 50 to 65 percent of denied claims are never reworked, and reworking a single claim costs between $25 and $118 in administrative labor.\n\nThe second pressure is people. The labor market for billing and coding staff tightened after 2020 and never loosened. Health systems carrying open RCM roles are not just paying more per hire, they are leaving work undone that surfaces later as aged AR and write-offs.\n\nAgentic AI is the first technology credible enough to close both gaps at once. McKinsey estimates that using AI to enable the revenue cycle could lead to a 30 to 60 percent reduction in cost to collect, faster cash realization, and a workforce refocused on patient value rather than administrative tasks.',
      },
      {
        _key: 'sec-4',
        title: 'What can agentic RCM do today?',
        id: 'what-can-agentic-rcm-do-today',
        content:
          'This is where honesty matters, because the category is loud with overclaiming. The credible wins in production are specific and measurable, not total autonomy across the whole cycle.\n\nReported outcomes cluster in a consistent range. Analysis of 2024 to 2025 deployments shows agents reduce manual touch by 40 to 70% on routine workflows, with results clustering around 30 to 50% reduction in denial rate on auto-deniable categories and 20 to 40% reduction in days in AR for the workflows agents touch directly.\n\nThe functions where agents deliver first are consistent across the market: eligibility verification, prior authorization, denial triage and appeals, and AR follow-up. These are high-volume, rules-heavy, and administrative, which makes them both safe to automate and expensive to leave manual. At Waterlabs, these run as applications on a single operating system, which is what lets them work together rather than in isolation. More on that below.',
      },
      {
        _key: 'sec-5',
        title: 'Does agentic RCM replace the revenue cycle team?',
        id: 'does-agentic-rcm-replace-the-revenue-cycle-team',
        content:
          "No, and any vendor who says otherwise is selling a fantasy. Agents change the composition of the team, not its existence.\n\nThe pattern in production is a division of labor. Agents own the high-volume, routine workflows. Humans own clinical appeals, complex denials, hardship cases, and the exceptions that require judgment. As one 2025 deployment analysis noted, the split changes the team's composition, not its existence.\n\nWaterlabs designs for exactly this split. No agent runs unsupervised. Each one operates inside strict limits, and a human stays in the loop on every exception. The goal is not an empty office. It is a smaller, more senior team pointed at the work that actually needs a person.",
      },
      {
        _key: 'sec-6',
        title: 'What are the risks and limits of agentic RCM?',
        id: 'what-are-the-risks-and-limits-of-agentic-rcm',
        content:
          'The technology is real, but the governance bar is high, and most failures will be governance failures rather than technical ones. McKinsey analysis warns that around 40% of agentic initiatives could be abandoned by 2027 due to governance failures rather than technical limitations.\n\nThree risks deserve attention before any deployment.\n\n**Payer policy drift.** Payers change adjudication rules constantly, often without notice. An agent that is not refreshed against those changes degrades silently, and rework quietly eats the automation gains.\n\n**Autonomy creep.** Letting agents make decisions on clinical appeals, where judgment is required, is where trouble starts. Autonomy boundaries have to be explicit.\n\n**Auditability.** Because agentic systems make decisions rather than follow scripts, every decision needs a reconstructable trail. Explainable decisions, reconstructable audit trails, defined autonomy boundaries, and monitoring separate a system that survives a payer audit from one that does not.',
      },
      {
        _key: 'sec-7',
        title: 'Where does data security fit into agentic RCM?',
        id: 'where-does-data-security-fit-into-agentic-rcm',
        content:
          "It sits at the center, and the reason is recent. In February 2024, a ransomware attack on Change Healthcare became the largest healthcare data breach ever reported to federal regulators, ultimately affecting 192.7 million individuals. The parent company recorded $2.457 billion in total cyberattack impacts. Because a single processor touched one in three patient records, one breach froze revenue operations for thousands of providers at once.\n\nThat event reset the security bar for every RCM vendor. The lesson was concentration risk: when everything routes through one exposed point, one failure becomes everyone's failure. Any serious agentic RCM system now has to answer where patient data lives and what happens to it during processing, before it answers anything about features.\n\nThis is a founding principle at Waterlabs, not a bolt-on. Patient data never leaves the client's environment. The agents do the work by reading the screen in the moment, the way a person would, and the trace is gone when the task is done. Nothing is copied out, stored, or used to train a model. The agents themselves run inside a sovereign cloud that Waterlabs built and owns, housed entirely in the United States, isolated per client so no two share a space. After Change Healthcare, that architecture is not a premium feature. It is the price of working in healthcare at all.",
      },
      {
        _key: 'sec-8',
        title: 'How does agentic RCM differ from a single AI point solution?',
        id: 'how-does-agentic-rcm-differ-from-a-single-ai-point-solution',
        content:
          'Most vendors automate one function. They sell an eligibility bot, or a coding engine, or a denial tool. Each works its slice and hands the rest back to you, which means the handoffs, the gaps between systems, stay exactly where they always were.\n\nThe more powerful model treats the entire cycle as one system with one shared memory. When a denial traces back to a coding error, that link is only visible if coding and denial management run on the same foundation. On a stack of point solutions, the signal is lost.\n\nThis is the thesis Waterlabs was built on. Rather than shipping agents as features, Waterlabs built HIMER, an operating system for the revenue cycle where every function, prior auth, eligibility, denials, AR, runs as an application on one shared foundation. Super agents supervise teams of agents and work every stage in parallel rather than one after another. When an agent meets an exception it has not seen, a specialist resolves it once and the system keeps that resolution permanently, so the same denial does not happen twice. The knowledge compounds instead of leaving when a staff member does. Coding runs through CurieCode, built on its own global codebook, on the same foundation. Built by operators who spent two decades inside revenue cycle work before writing a line of code, that architecture is what turns a set of agents into a revenue cycle that genuinely runs.',
      },
      {
        _key: 'sec-9',
        title: 'How does a health system start with agentic RCM?',
        id: 'how-does-a-health-system-start-with-agentic-rcm',
        content:
          'The proven path is narrow and specific, not a big-bang replacement. Start with one workflow on one payer mix, baseline the manual cost, instrument the agent, then expand across payers and functions once the results hold.\n\nWaterlabs is built for that entry. You can hand over the whole cycle or start with the single function that is costing you most and judge the system on it. Deployment runs in about two and a half weeks, with no development fee, and billing starts only once the agents are productive. A company that is certain about the outcome is willing to prove it before it charges.',
      },
      {
        _key: 'sec-10',
        title: 'The bottom line on agentic RCM',
        id: 'the-bottom-line-on-agentic-rcm',
        content:
          'Agentic RCM is the first credible path to a revenue cycle that runs itself, not because the marketing says so, but because autonomous agents finally do the work instead of queuing it for humans. The evidence supports 30 to 50% denial reduction and 30 to 60% lower cost to collect on the workflows agents touch. The limits are real too: payer drift, autonomy boundaries, audit trails, and data security separate the systems that last from the ones abandoned by 2027.\n\nThe health systems that win with agentic RCM will treat it as infrastructure, not a feature, and demand proof before they pay. That is the standard Waterlabs was built to meet.\n\nWant to see what agentic RCM would do on your payer mix? Talk to Waterlabs.',
      },
    ],
  },
  {
    id: 'blog-post-denial-management',
    order: 1,
    title: 'Denial Management in Revenue Cycle Management: The Complete Guide',
    slug: 'denial-management-revenue-cycle-management-complete-guide',
    category: 'Features',
    tag: 'Lorem',
    subTag: 'Lorem Ipsum',
    publishedAt: '2025-06-26T10:00:00.000Z',
    excerpt: 'The complete guide to modern denial management in healthcare revenue cycle management.',
    desktopImagePath: 'public/images/blogs/tabs/img_denial_management_inrevenue.png',
    mobileImagePath: 'public/images/blogs/tabs/img_denial_management_inrevenue_mobile (1).png',
  },
  {
    id: 'blog-post-prior-authorization',
    order: 2,
    title: 'Prior Authorization Automation: Fixing the Most Broken Process in Healthcare',
    slug: 'prior-authorization-automation-broken-process-healthcare',
    category: 'Use Cases',
    tag: 'Lorem',
    subTag: 'Lorem Ipsum',
    publishedAt: '2025-06-25T10:00:00.000Z',
    excerpt: 'Fixing the most broken administrative process in healthcare through autonomous agentic AI.',
    desktopImagePath: 'public/images/blogs/tabs/img_prior_authorization.png',
    mobileImagePath: 'public/images/blogs/tabs/img_prior_authorization_mobile (1).png',
  },
  {
    id: 'blog-post-autonomous-medical-coding',
    order: 3,
    title: 'Autonomous Medical Coding: Accuracy, Compliance, and What Replaces Computer-Assisted Coding',
    slug: 'autonomous-medical-coding-accuracy-compliance',
    category: 'Features',
    tag: 'Lorem',
    subTag: 'Lorem Ipsum',
    publishedAt: '2025-06-24T10:00:00.000Z',
    excerpt: 'Understanding accuracy, compliance, and why autonomous AI is replacing traditional CAC tools.',
    desktopImagePath: 'public/images/blogs/tabs/img_medical_coding.png',
    mobileImagePath: 'public/images/blogs/tabs/img_medical_coding_mobile (1).png',
  },
  {
    id: 'blog-post-economics-of-revenue-cycle',
    order: 4,
    title: 'The Economics of the Revenue Cycle: Cost to Collect, KPIs, and Why Most RCM AI Never Shows ROI',
    slug: 'economics-of-revenue-cycle-cost-to-collect-kpis',
    category: 'Case Studies',
    tag: 'Lorem',
    subTag: 'Lorem Ipsum',
    publishedAt: '2025-06-23T10:00:00.000Z',
    excerpt: 'Analyzing cost to collect, key performance indicators, and the economic fundamentals of autonomous RCM.',
    desktopImagePath: 'public/images/blogs/tabs/img_economics_of_revenue_cyle_mobile.png',
    mobileImagePath: 'public/images/blogs/tabs/img_economics_of_revenue_cyle_mobile (1).png',
  },
];

async function uploadImageToSanity(filePath) {
  if (!filePath || !fs.existsSync(filePath)) {
    console.warn(`File does not exist: ${filePath}`);
    return null;
  }
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

async function seedBlogs() {
  console.log(`Starting Sanity seeding for ${blogArticles.length} Blog Articles...`);

  const mutations = [];

  for (let i = 0; i < blogArticles.length; i++) {
    const article = blogArticles[i];
    console.log(`\n[${i + 1}/${blogArticles.length}] Processing article: "${article.title}"...`);

    console.log(`  Uploading desktop image: ${article.desktopImagePath}...`);
    const desktopAssetId = await uploadImageToSanity(article.desktopImagePath);

    let mobileAssetId = null;
    if (article.mobileImagePath) {
      console.log(`  Uploading mobile image: ${article.mobileImagePath}...`);
      mobileAssetId = await uploadImageToSanity(article.mobileImagePath);
    }

    let heroBannerDesktopId = null;
    if (article.heroBannerDesktopPath) {
      console.log(`  Uploading hero desktop banner: ${article.heroBannerDesktopPath}...`);
      heroBannerDesktopId = await uploadImageToSanity(article.heroBannerDesktopPath);
    }

    let heroBannerMobileId = null;
    if (article.heroBannerMobilePath) {
      console.log(`  Uploading hero mobile banner: ${article.heroBannerMobilePath}...`);
      heroBannerMobileId = await uploadImageToSanity(article.heroBannerMobilePath);
    }

    const doc = {
      _id: article.id,
      _type: 'blogPost',
      title: article.title,
      slug: {
        _type: 'slug',
        current: article.slug,
      },
      category: article.category,
      tag: article.tag,
      subTag: article.subTag,
      titleAccent: article.titleAccent,
      titleRest: article.titleRest,
      order: article.order,
      publishedAt: article.publishedAt,
      excerpt: article.excerpt,
      heroParagraphs: article.heroParagraphs,
      desktopImage: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: desktopAssetId,
        },
      },
      ...(mobileAssetId && {
        mobileImage: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: mobileAssetId,
          },
        },
      }),
      ...(heroBannerDesktopId && {
        heroBannerDesktop: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: heroBannerDesktopId,
          },
        },
      }),
      ...(heroBannerMobileId && {
        heroBannerMobile: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: heroBannerMobileId,
          },
        },
      }),
      ...(article.sections && {
        sections: article.sections,
      }),
    };

    const draftDoc = {
      ...doc,
      _id: `drafts.${article.id}`,
    };

    mutations.push({ createOrReplace: doc });
    mutations.push({ createOrReplace: draftDoc });
  }

  // Also seed blogsPage settings document
  const blogsPageDoc = {
    _id: 'blogsPage',
    _type: 'blogsPage',
    categories: ['Features', 'Use Cases', 'Company News', 'Case Studies'],
    searchPlaceholder: 'Search',
    filterByLabel: 'Filter by',
    readBlogButtonText: 'Read blog',
  };

  mutations.push({ createOrReplace: blogsPageDoc });
  mutations.push({ createOrReplace: { ...blogsPageDoc, _id: 'drafts.blogsPage' } });

  console.log(`\nSubmitting ${mutations.length} mutations to Sanity dataset "${dataset}"...`);

  const mutateUrl = `https://${projectId}.api.sanity.io/v2024-08-20/data/mutate/${dataset}`;
  const mutateRes = await fetch(mutateUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ mutations }),
  });

  const mutateData = await mutateRes.json();
  if (!mutateRes.ok) {
    throw new Error(`Failed to mutate Sanity dataset: ${JSON.stringify(mutateData)}`);
  }

  console.log('Successfully saved to Sanity! Transaction ID:', mutateData.transactionId);
  console.log('\nSeeding completed successfully! All Blog Articles (including What Is Agentic RCM detail article) and Blogs Page Settings are now live in CMS!');
}

seedBlogs().catch((err) => {
  console.error('Fatal error during seeding:', err);
  process.exit(1);
});
