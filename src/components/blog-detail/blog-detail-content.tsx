'use client';

import React, { useEffect, useRef, useState } from 'react';

import BlogDetailTOC, { BLOG_DETAIL_TOPICS, TOCItem } from './blog-detail-toc';

export interface BlogArticleSection {
  id: string;
  title: string;
  paragraphs: string[];
}

export const DEFAULT_BLOG_SECTIONS: BlogArticleSection[] = [
  {
    id: 'what-does-agentic-rcm-actually-mean',
    title: 'What does agentic RCM actually mean?',
    paragraphs: [
      'Agentic RCM is the application of agentic AI, systems that perceive, reason, plan, and act autonomously, to the end-to-end revenue cycle. An agent does not wait for a human to trigger each step. It pursues a goal, such as getting a claim paid, and chooses the actions to get there.',
      'McKinsey draws the line clearly. Agentic AI is characterized by its ability to autonomously make decisions and execute complex end-to-end processes, unlike generative AI, which primarily provides advisory support. In effect, it can function more like a coworker than a tool.',
      'That distinction is the whole story. A predictive model tells you a claim will probably be denied. An agent stops the denial, or resolves it after the fact, without a person in the loop for every step. An agentic system does not create a worklist. It works the worklist.',
    ],
  },
  {
    id: 'how-is-agentic-rcm-different-from-rpa-and-generative-ai',
    title: 'How is agentic RCM different from RPA and generative AI?',
    paragraphs: [
      'Three waves of automation have moved through the revenue cycle, and they are not the same thing. Confusing them is the most common mistake buyers make.',
      "**Robotic process automation (RPA)** follows fixed scripts. It is fast on structured, repetitive tasks, and it breaks the moment anything changes. RPA breaks the moment a process changes. Unstructured data or any scenario requiring interpretation will stop a bot cold. That fragility carries a hidden cost. Gartner's 2024 Critical Capabilities for Automation found enterprises relying solely on legacy RPA face a maintenance tax consuming 40 to 50% of their automation budget.",
      '**Generative AI** understands context and produces language. It can draft an appeal or read a clinical note, but it advises. It waits for direction.',
      '**Agentic AI** reasons and acts. It plans a sequence, querying eligibility, mapping codes, generating an appeal, submitting it through the right payer portal, then executes and monitors the outcome to decide what to do next. It handles the variability and judgment that stops RPA cold.',
      'The consequence shows up in results. A predictive denial model might cut denial write-offs by 15 to 20%. An agentic system that autonomously resolves denials can reduce them by 40 to 60%, because it removes the bottleneck: human bandwidth.',
    ],
  },
  {
    id: 'why-is-agentic-rcm-emerging-now',
    title: 'Why is agentic RCM emerging now?',
    paragraphs: [
      'Two pressures made the old model untenable, and one technology arrived to answer them.',
      'The first pressure is denials. The industry-wide initial denial rate hit 11.8 percent in 2024, up from 10.2 percent in 2020, with $262 billion in claims initially denied each year. Most of that money is never recovered. MGMA estimates 50 to 65 percent of denied claims are never reworked, and reworking a single claim costs between $25 and $118 in administrative labor.',
      'The second pressure is people. The labor market for billing and coding staff tightened after 2020 and never loosened. Health systems carrying open RCM roles are not just paying more per hire, they are leaving work undone that surfaces later as aged AR and write-offs.',
      'Agentic AI is the first technology credible enough to close both gaps at once. McKinsey estimates that using AI to enable the revenue cycle could lead to a 30 to 60 percent reduction in cost to collect, faster cash realization, and a workforce refocused on patient value rather than administrative tasks.',
    ],
  },
  {
    id: 'what-can-agentic-rcm-do-today',
    title: 'What can agentic RCM do today?',
    paragraphs: [
      'This is where honesty matters, because the category is loud with overclaiming. The credible wins in production are specific and measurable, not total autonomy across the whole cycle.',
      'Reported outcomes cluster in a consistent range. Analysis of 2024 to 2025 deployments shows agents reduce manual touch by 40 to 70% on routine workflows, with results clustering around 30 to 50% reduction in denial rate on auto-deniable categories and 20 to 40% reduction in days in AR for the workflows agents touch directly.',
      'The functions where agents deliver first are consistent across the market: eligibility verification, prior authorization, denial triage and appeals, and AR follow-up. These are high-volume, rules-heavy, and administrative, which makes them both safe to automate and expensive to leave manual. At Waterlabs, these run as applications on a single operating system, which is what lets them work together rather than in isolation. More on that below.',
    ],
  },
  {
    id: 'does-agentic-rcm-replace-the-revenue-cycle-team',
    title: 'Does agentic RCM replace the revenue cycle team?',
    paragraphs: [
      'No, and any vendor who says otherwise is selling a fantasy. Agents change the composition of the team, not its existence.',
      "The pattern in production is a division of labor. Agents own the high-volume, routine workflows. Humans own clinical appeals, complex denials, hardship cases, and the exceptions that require judgment. As one 2025 deployment analysis noted, the split changes the team's composition, not its existence.",
      'Waterlabs designs for exactly this split. No agent runs unsupervised. Each one operates inside strict limits, and a human stays in the loop on every exception. The goal is not an empty office. It is a smaller, more senior team pointed at the work that actually needs a person.',
    ],
  },
  {
    id: 'what-are-the-risks-and-limits-of-agentic-rcm',
    title: 'What are the risks and limits of agentic RCM?',
    paragraphs: [
      'The technology is real, but the governance bar is high, and most failures will be governance failures rather than technical ones. McKinsey analysis warns that around 40% of agentic initiatives could be abandoned by 2027 due to governance failures rather than technical limitations.',
      'Three risks deserve attention before any deployment.',
      '**Payer policy drift.** Payers change adjudication rules constantly, often without notice. An agent that is not refreshed against those changes degrades silently, and rework quietly eats the automation gains.',
      '**Autonomy creep.** Letting agents make decisions on clinical appeals, where judgment is required, is where trouble starts. Autonomy boundaries have to be explicit.',
      '**Auditability.** Because agentic systems make decisions rather than follow scripts, every decision needs a reconstructable trail. Explainable decisions, reconstructable audit trails, defined autonomy boundaries, and monitoring separate a system that survives a payer audit from one that does not.',
    ],
  },
  {
    id: 'where-does-data-security-fit-into-agentic-rcm',
    title: 'Where does data security fit into agentic RCM?',
    paragraphs: [
      'It sits at the center, and the reason is recent. In February 2024, a ransomware attack on Change Healthcare became the largest healthcare data breach ever reported to federal regulators, ultimately affecting 192.7 million individuals. The parent company recorded $2.457 billion in total cyberattack impacts. Because a single processor touched one in three patient records, one breach froze revenue operations for thousands of providers at once.',
      "That event reset the security bar for every RCM vendor. The lesson was concentration risk: when everything routes through one exposed point, one failure becomes everyone's failure. Any serious agentic RCM system now has to answer where patient data lives and what happens to it during processing, before it answers anything about features.",
      'This is a founding principle at Waterlabs, not a bolt-on. Patient data never leaves the client\'s environment. The agents do the work by reading the screen in the moment, the way a person would, and the trace is gone when the task is done. Nothing is copied out, stored, or used to train a model. The agents themselves run inside a sovereign cloud that Waterlabs built and owns, housed entirely in the United States, isolated per client so no two share a space. After Change Healthcare, that architecture is not a premium feature. It is the price of working in healthcare at all.',
    ],
  },
  {
    id: 'how-does-agentic-rcm-differ-from-a-single-ai-point-solution',
    title: 'How does agentic RCM differ from a single AI point solution?',
    paragraphs: [
      'Most vendors automate one function. They sell an eligibility bot, or a coding engine, or a denial tool. Each works its slice and hands the rest back to you, which means the handoffs, the gaps between systems, stay exactly where they always were.',
      'The more powerful model treats the entire cycle as one system with one shared memory. When a denial traces back to a coding error, that link is only visible if coding and denial management run on the same foundation. On a stack of point solutions, the signal is lost.',
      'This is the thesis Waterlabs was built on. Rather than shipping agents as features, Waterlabs built HIMER, an operating system for the revenue cycle where every function, prior auth, eligibility, denials, AR, runs as an application on one shared foundation. Super agents supervise teams of agents and work every stage in parallel rather than one after another. When an agent meets an exception it has not seen, a specialist resolves it once and the system keeps that resolution permanently, so the same denial does not happen twice. The knowledge compounds instead of leaving when a staff member does. Coding runs through CurieCode, built on its own global codebook, on the same foundation. Built by operators who spent two decades inside revenue cycle work before writing a line of code, that architecture is what turns a set of agents into a revenue cycle that genuinely runs.',
    ],
  },
  {
    id: 'how-does-a-health-system-start-with-agentic-rcm',
    title: 'How does a health system start with agentic RCM?',
    paragraphs: [
      'The proven path is narrow and specific, not a big-bang replacement. Start with one workflow on one payer mix, baseline the manual cost, instrument the agent, then expand across payers and functions once the results hold.',
      'Waterlabs is built for that entry. You can hand over the whole cycle or start with the single function that is costing you most and judge the system on it. Deployment runs in about two and a half weeks, with no development fee, and billing starts only once the agents are productive. A company that is certain about the outcome is willing to prove it before it charges.',
    ],
  },
  {
    id: 'the-bottom-line-on-agentic-rcm',
    title: 'The bottom line on agentic RCM',
    paragraphs: [
      'Agentic RCM is the first credible path to a revenue cycle that runs itself, not because the marketing says so, but because autonomous agents finally do the work instead of queuing it for humans. The evidence supports 30 to 50% denial reduction and 30 to 60% lower cost to collect on the workflows agents touch. The limits are real too: payer drift, autonomy boundaries, audit trails, and data security separate the systems that last from the ones abandoned by 2027.',
      'The health systems that win with agentic RCM will treat it as infrastructure, not a feature, and demand proof before they pay. That is the standard Waterlabs was built to meet.',
      'Want to see what agentic RCM would do on your payer mix? Talk to Waterlabs.',
    ],
  },
];

export const renderFormattedText = (text: string) => {
  if (!text) return null;
  // If markdown **bold** is present, parse it
  if (text.includes('**')) {
    const parts = text.split(/(\*\*[\s\S]*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="font-bold text-[#111111]">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  }

  return text;
};

interface BlogDetailContentProps {
  sections?: BlogArticleSection[];
  topics?: TOCItem[];
}

export const BlogDetailContent: React.FC<BlogDetailContentProps> = ({
  sections = DEFAULT_BLOG_SECTIONS,
  topics = BLOG_DETAIL_TOPICS,
}) => {
  const [activeTopic, setActiveTopic] = useState<string>(topics[0]?.id || '');
  const [isSticky, setIsSticky] = useState<boolean>(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const isManualScrollRef = useRef<boolean>(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Responsive scroll-spy logic with calibrated trigger threshold
  useEffect(() => {
    const handleScroll = () => {
      const isMobile = window.innerWidth < 1024;

      // Check if mobile indicator reached sticky top-[60px]
      if (sentinelRef.current) {
        const sentinelRect = sentinelRef.current.getBoundingClientRect();
        setIsSticky(sentinelRect.top <= 61);
      }

      // If user recently clicked a TOC item, let the smooth scroll finish without jitter
      if (isManualScrollRef.current) {
        return;
      }

      // If near the top of the page, activate the first section
      if (window.scrollY < 160 && topics.length > 0) {
        setActiveTopic(topics[0].id);
        return;
      }

      // If user has scrolled near the bottom of the page, activate the last section
      const scrollPosition = window.innerHeight + window.scrollY;
      const bottomThreshold = document.documentElement.scrollHeight - 120;
      if (scrollPosition >= bottomThreshold && topics.length > 0) {
        setActiveTopic(topics[topics.length - 1].id);
        return;
      }

      // Check the last section: if its heading has reached into the viewport (upper 70%),
      // activate it so concluding sections are promptly and accurately highlighted
      if (topics.length > 0) {
        const lastTopic = topics[topics.length - 1];
        const lastEl = document.getElementById(lastTopic.id);
        if (lastEl) {
          const lastRect = lastEl.getBoundingClientRect();
          if (lastRect.top <= window.innerHeight * 0.7) {
            setActiveTopic(lastTopic.id);
            return;
          }
        }
      }

      // Trigger threshold: A section activates when its heading enters the reading zone
      // (upper 55% of viewport on desktop, 50% on mobile), matching what the reader is viewing.
      const targetY = isMobile
        ? window.innerHeight * 0.5
        : window.innerHeight * 0.55;

      // Check sections from bottom to top to find the section currently in the reading zone
      let activeId = topics[0]?.id || '';
      for (let i = topics.length - 1; i >= 0; i--) {
        const el = document.getElementById(topics[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= targetY) {
            activeId = topics[i].id;
            break;
          }
        }
      }
      setActiveTopic(activeId);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [topics]);

  // Smooth scroll to selected topic with navbar offset
  const scrollToTopic = (id: string) => {
    setActiveTopic(id);
    isManualScrollRef.current = true;
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    scrollTimeoutRef.current = setTimeout(() => {
      isManualScrollRef.current = false;
    }, 800);

    const element = document.getElementById(id);
    if (element) {
      const isMobile = window.innerWidth < 1024;
      const yOffset = isMobile ? -115 : -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full bg-white rounded-tr-[30px] rounded-br-[30px] lg:rounded-tr-[60px] lg:rounded-br-[60px] pb-[80px] lg:pb-[80px]">
      {/* Sentinel for detecting when mobile TOC hits sticky position */}
      <div ref={sentinelRef} className="block lg:hidden h-[1px] w-full pointer-events-none" />

      {/* 
        =============================================================================
        MOBILE / TABLET STICKY INDICATOR BAR
        - When unscrolled: sits inside page padding as rounded card
        - When scrolled: expands to full width (px-0) with border-y directly below fixed navbar
        =============================================================================
      */}
      <div
        className={`block lg:hidden sticky top-[60px] z-40 w-full transition-all duration-300 ${
          isSticky
            ? 'px-0 bg-transparent'
            : 'max-w-[1320px] mx-auto px-[20px] md:px-[40px] pt-[16px] pb-[8px]'
        }`}
      >
        <BlogDetailTOC
          activeTopic={activeTopic}
          onSelectTopic={scrollToTopic}
          topics={topics}
          isSticky={isSticky}
        />
      </div>

      <div className="w-full px-[20px] md:px-[40px] lg:px-[60px]">
        <div className="w-full max-w-[1320px] mx-auto pt-[40px] lg:pt-[60px] flex flex-col lg:flex-row items-start justify-between gap-[32px] lg:gap-[40px]">
          
          {/* 
            =============================================================================
            LEFT COLUMN: STICKY TABLE OF CONTENTS (Desktop: Frame 2147226736: 305px wide)
            =============================================================================
          */}
          <aside className="hidden lg:block w-[305px] shrink-0 sticky top-[100px] z-20">
            <BlogDetailTOC
              activeTopic={activeTopic}
              onSelectTopic={scrollToTopic}
              topics={topics}
            />
          </aside>

          {/* 
            =============================================================================
            RIGHT COLUMN: BLOG ARTICLE BODY CONTENT (Frame 2147226791: 975px wide)
            =============================================================================
          */}
          <div className="w-full lg:max-w-[975px] flex-1 flex flex-col gap-[32px] lg:gap-[60px]">
            {sections.map((section) => (
              <article
                key={section.id}
                id={section.id}
                className="flex flex-col items-start gap-[20px] lg:gap-[32px] scroll-mt-[120px]"
              >
                {/* Heading: Display/H4 */}
                <h4 className="type-h4 text-[#111111] max-w-[975px]">
                  {section.title}
                </h4>

                {/* Paragraphs: Body/Body-XS */}
                <div className="flex flex-col items-start gap-[16px] lg:gap-[20px] max-w-[975px]">
                  {section.paragraphs.map((para, pIdx) => (
                    <p key={pIdx} className="type-body-xs text-[#2A2A2A]">
                      {renderFormattedText(para)}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default BlogDetailContent;
