import { SectionLayout, UIElementNode } from '../types.js';

/**
 * Intelligent Adaptive Mock AI Engine
 * Extracts counts, status pills/badges, modifiers (dark, split, cards), and intent
 * from ANY natural language prompt to construct tailored, responsive JSON AST trees.
 */

export function generateMockLayout(prompt: string): SectionLayout {
  const p = prompt.toLowerCase();
  const timestamp = new Date().toISOString();
  const id = `sec_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

  // 1. FAQ / Accordion / Questions
  if (p.includes('faq') || p.includes('question') || p.includes('accordion') || p.includes('q&a') || p.includes('help') || p.includes('answers')) {
    return generateFAQLayout(id, prompt, timestamp);
  }

  // 2. Pricing / Plans / Tiers / Subscriptions
  if (p.includes('pricing') || p.includes('tier') || p.includes('plan') || p.includes('cost') || p.includes('subscription')) {
    return generatePricingLayout(id, prompt, timestamp);
  }

  // 3. Testimonials / Reviews / Ratings
  if (p.includes('testimonial') || p.includes('review') || p.includes('rating') || p.includes('star') || p.includes('client') || p.includes('customer') || p.includes('quote')) {
    return generateTestimonialsLayout(id, prompt, timestamp);
  }

  // 4. Features / Capabilities / Services
  if (p.includes('feature') || p.includes('service') || p.includes('grid') || p.includes('benefit') || p.includes('capability') || p.includes('why')) {
    return generateFeaturesLayout(id, prompt, timestamp);
  }

  // 5. Team / People / Employees
  if (p.includes('team') || p.includes('member') || p.includes('staff') || p.includes('leadership') || p.includes('founder')) {
    return generateTeamLayout(id, prompt, timestamp);
  }

  // 6. Stats / Metrics / Numbers / KPI
  if (p.includes('stat') || p.includes('metric') || p.includes('number') || p.includes('kpi') || p.includes('growth')) {
    return generateStatsLayout(id, prompt, timestamp);
  }

  // 7. Call to Action / Newsletter / Signup
  if (p.includes('cta') || p.includes('newsletter') || p.includes('subscribe') || p.includes('signup') || p.includes('action') || p.includes('contact') || p.includes('form')) {
    return generateCTALayout(id, prompt, timestamp);
  }

  // 8. Universal Adaptive Fallback for any other custom prompt
  return generateUniversalCustomLayout(id, prompt, timestamp);
}

// Extract item counts (e.g. "5 status pills", "8 stars", "4 tiers", "6 features")
function extractNumber(prompt: string, defaultVal: number): number {
  const match = prompt.match(/(\d+)\s*(-|\s)?(pill|badge|star|tier|plan|card|column|feature|review|item|question|stat|step|member)?/i);
  if (match && match[1]) {
    const n = parseInt(match[1], 10);
    if (n > 0 && n <= 10) return n;
  }
  return defaultVal;
}

// Check if badges / status pills are requested
function hasStatusPills(prompt: string): boolean {
  const p = prompt.toLowerCase();
  return p.includes('pill') || p.includes('badge') || p.includes('status') || p.includes('tag') || p.includes('anomaly') || p.includes('po');
}

// Extract star rating
function extractStars(prompt: string): string {
  const starCount = extractNumber(prompt, 5);
  return '★'.repeat(starCount);
}

// 1. FAQ / Accordion Section (Supports dynamic count and status pills)
function generateFAQLayout(id: string, prompt: string, timestamp: string): SectionLayout {
  const count = extractNumber(prompt, 3);
  const includePills = hasStatusPills(prompt);

  const faqData = [
    {
      q: 'How does the recursive rendering engine work?',
      a: 'The frontend receives a structured JSON AST from the Express backend and recursively traverses the node hierarchy, rendering corresponding semantic React components dynamically.',
      pill: 'SYSTEM ARCHITECTURE',
      pillType: 'bronze',
    },
    {
      q: 'Can I edit any text directly on the canvas?',
      a: 'Yes! Simply click on any heading, badge, number, or paragraph. The inline editor activates with formatting controls and updates the internal JSON tree state in real time.',
      pill: 'INLINE SYNC',
      pillType: 'success',
    },
    {
      q: 'How do I save my modified section to backend storage?',
      a: 'Click "Save Changes" in the top right. The updated JSON tree state is sent to the Express backend and persisted to server storage.',
      pill: 'PERSISTENCE',
      pillType: 'navy',
    },
    {
      q: 'Does it support custom prompts and dynamic parameterization?',
      a: 'Absolutely! You can specify counts, star ratings, and custom layouts (e.g. "5 status pills", "8-star reviews", "5-tier pricing").',
      pill: 'CUSTOM PROMPTS',
      pillType: 'alert',
    },
    {
      q: 'What design palette and typography standards are used?',
      a: 'Built with Cream Canvas (#FBF9F6), Navy Ink (#202940), Warm Bronze (#8B6240), Emerald (#1DA851), Terracotta (#C94C3D), Space Grotesk, and Inter.',
      pill: 'DESIGN SYSTEM',
      pillType: 'bronze',
    },
    {
      q: 'Can I export clean React JSX code or pure HTML markup?',
      a: 'Yes! The AST structure maps cleanly to production-ready React components and responsive CSS layouts.',
      pill: 'EXPORT READY',
      pillType: 'success',
    },
  ];

  const selectedItems = faqData.slice(0, Math.min(count, faqData.length));
  // If user asked for more items than available in sample, generate dynamic ones
  while (selectedItems.length < count && selectedItems.length < 8) {
    const idx = selectedItems.length + 1;
    selectedItems.push({
      q: `Custom Question #${idx}: How to customize dynamic layout parameters?`,
      a: `Specify your custom parameters in the prompt bar and our generator engine will compose the responsive section AST accordingly.`,
      pill: `STATUS #${idx}`,
      pillType: idx % 2 === 0 ? 'success' : 'alert',
    });
  }

  const items: UIElementNode[] = selectedItems.map((item, idx) => {
    const cardChildren: UIElementNode[] = [];

    // Add status pill if requested or if prompt mentions pills/badges
    if (includePills || idx === 0) {
      cardChildren.push({
        id: `${id}_faq_${idx}_pill`,
        type: 'badge',
        content: item.pill,
        props: { badgeType: item.pillType as any },
      });
    }

    cardChildren.push({
      id: `${id}_q${idx}_title`,
      type: 'heading',
      content: item.q,
      props: { tag: 'h3', size: 'lg', weight: 'bold', textColor: '#202940' },
    });

    cardChildren.push({
      id: `${id}_q${idx}_ans`,
      type: 'paragraph',
      content: item.a,
      props: { size: 'sm', textColor: 'rgba(32,41,64,0.75)' },
    });

    return {
      id: `${id}_faq_card_${idx}`,
      type: 'card',
      props: { borderRadius: 'xl', padding: 'lg', bgColor: '#FFFFFF', borderColor: 'rgba(32,41,64,0.12)' },
      children: cardChildren,
    };
  });

  return {
    id,
    title: `Frequently Asked Questions (${count} items)`,
    category: 'faq',
    promptUsed: prompt,
    createdAt: timestamp,
    updatedAt: timestamp,
    root: {
      id: `${id}_root`,
      type: 'section',
      props: { bgColor: '#FBF9F6', padding: '2xl', align: 'center' },
      children: [
        {
          id: `${id}_badge`,
          type: 'badge',
          content: 'GOT QUESTIONS?',
          props: { badgeType: 'alert' },
        },
        {
          id: `${id}_heading`,
          type: 'heading',
          content: 'Frequently Asked Questions',
          props: { tag: 'h2', size: '4xl', weight: 'bold', textColor: '#202940', align: 'center' },
        },
        {
          id: `${id}_subheading`,
          type: 'paragraph',
          content: `Everything you need to know about the generator engine with ${count} active query sections.`,
          props: { size: 'lg', textColor: 'rgba(32,41,64,0.7)', align: 'center' },
        },
        {
          id: `${id}_faq_stack`,
          type: 'stack',
          props: { direction: 'col', gap: 'md', padding: 'lg', align: 'stretch' },
          children: items,
        },
      ],
    },
  };
}

// 2. Pricing Matrix (Supports dynamic tier count from 1 to 5 tiers)
function generatePricingLayout(id: string, prompt: string, timestamp: string): SectionLayout {
  const tierCount = extractNumber(prompt, 3);
  const includePills = hasStatusPills(prompt);

  const allTiers = [
    {
      id: `${id}_t_free`,
      name: 'Free Community',
      badge: 'FREE FOREVER',
      badgeType: 'navy',
      desc: 'Ideal for individuals experimenting with rapid layout generation.',
      price: '$0',
      features: ['✓ 3 Saved Layouts', '✓ Standard AST Parser', '✓ Basic Export (JSON)'],
      btnText: 'Start Free',
      variant: 'outline',
      highlighted: false,
    },
    {
      id: `${id}_t_starter`,
      name: 'Starter',
      badge: 'POPULAR CHOICE',
      badgeType: 'bronze',
      desc: 'Essential tools for agile builders and early-stage founders.',
      price: '$10',
      features: ['✓ 15 Workspaces & Projects', '✓ Real-time Inline Editor', '✓ HTML & JSON Export', '✓ Standard Support'],
      btnText: 'Choose Starter',
      variant: 'outline',
      highlighted: false,
    },
    {
      id: `${id}_t_pro`,
      name: 'Pro Tier',
      badge: 'MOST POPULAR',
      badgeType: 'bronze',
      desc: 'Comprehensive section generator suite for growing teams.',
      price: '$29',
      features: ['✓ Unlimited AI Generations', '✓ Full React JSX & Next.js Export', '✓ Priority SLA Assistance', '✓ Live Multi-viewport Canvas'],
      btnText: 'Get Started with Pro',
      variant: 'amber',
      highlighted: true,
    },
    {
      id: `${id}_t_biz`,
      name: 'Business Growth',
      badge: 'HIGH SCALE',
      badgeType: 'success',
      desc: 'Advanced controls, team collaboration, and high throughput.',
      price: '$49',
      features: ['✓ Dedicated Cloud Cluster', '✓ Unlimited Team Seats', '✓ Custom CSS Design Systems', '✓ 99.99% Uptime Guarantee'],
      btnText: 'Upgrade to Business',
      variant: 'outline',
      highlighted: false,
    },
    {
      id: `${id}_t_ent`,
      name: 'Enterprise',
      badge: 'CUSTOM SCALE',
      badgeType: 'alert',
      desc: 'Custom infrastructure, private models, and enterprise SLA.',
      price: '$99',
      features: ['✓ Private Dedicated Instance', '✓ Custom Model Fine-Tuning', '✓ SSO & Audit Logging', '✓ 24/7 Solutions Engineer'],
      btnText: 'Contact Enterprise',
      variant: 'outline',
      highlighted: false,
    },
  ];

  let selectedTiers = allTiers.slice(0, Math.min(tierCount, 5));
  if (tierCount === 3) {
    selectedTiers = [allTiers[1], allTiers[2], allTiers[4]];
  }

  const cards: UIElementNode[] = selectedTiers.map((t) => ({
    id: `${t.id}_card`,
    type: 'card',
    props: {
      borderRadius: '2xl',
      padding: tierCount >= 5 ? 'lg' : 'xl',
      bgColor: '#FFFFFF',
      borderColor: t.highlighted ? '#8B6240' : 'rgba(32,41,64,0.12)',
      highlighted: t.highlighted,
    },
    children: [
      ...(t.highlighted || includePills
        ? [
            {
              id: `${t.id}_badge_node`,
              type: 'badge' as const,
              content: t.badge,
              props: { badgeType: t.badgeType as any },
            },
          ]
        : []),
      {
        id: `${t.id}_name_node`,
        type: 'heading',
        content: t.name,
        props: { tag: 'h3', size: tierCount >= 5 ? 'xl' : '2xl', weight: 'bold', textColor: '#202940' },
      },
      {
        id: `${t.id}_desc_node`,
        type: 'paragraph',
        content: t.desc,
        props: { size: 'xs', textColor: 'rgba(32,41,64,0.7)' },
      },
      {
        id: `${t.id}_price_wrap`,
        type: 'stack',
        props: { direction: 'row', align: 'center', gap: 'xs' },
        children: [
          {
            id: `${t.id}_price_node`,
            type: 'heading',
            content: t.price,
            props: {
              tag: 'h2',
              size: tierCount >= 5 ? '3xl' : '4xl',
              weight: 'extrabold',
              textColor: t.highlighted ? '#8B6240' : '#202940',
            },
          },
          {
            id: `${t.id}_period_node`,
            type: 'paragraph',
            content: '/month',
            props: { size: 'xs', textColor: 'rgba(32,41,64,0.6)' },
          },
        ],
      },
      {
        id: `${t.id}_features_stack`,
        type: 'stack',
        props: { direction: 'col', gap: 'xs', padding: 'sm' },
        children: t.features.map((feat, fIdx) => ({
          id: `${t.id}_f_${fIdx}`,
          type: 'paragraph' as const,
          content: feat,
          props: { size: 'xs', textColor: '#202940' },
        })),
      },
      {
        id: `${t.id}_btn_node`,
        type: 'button',
        content: t.btnText,
        props: { variant: t.variant as any, size: 'sm', textColor: '#202940' },
      },
    ],
  }));

  return {
    id,
    title: `${tierCount}-Tier Pricing Matrix`,
    category: 'pricing',
    promptUsed: prompt,
    createdAt: timestamp,
    updatedAt: timestamp,
    root: {
      id: `${id}_root`,
      type: 'section',
      props: { bgColor: '#FBF9F6', padding: '2xl', align: 'center' },
      children: [
        {
          id: `${id}_header_stack`,
          type: 'stack',
          props: { align: 'center', direction: 'col', gap: 'sm' },
          children: [
            { id: `${id}_badge`, type: 'badge', content: 'FLEXIBLE PLANS', props: { badgeType: 'bronze' } },
            { id: `${id}_heading`, type: 'heading', content: 'Simple, Transparent Pricing', props: { tag: 'h2', size: '4xl', weight: 'bold', textColor: '#202940' } },
            { id: `${id}_subheading`, type: 'paragraph', content: `Scale your operations seamlessly with ${tierCount} transparent tiers.`, props: { size: 'lg', textColor: '#202940', align: 'center' } },
          ],
        },
        {
          id: `${id}_grid`,
          type: 'grid',
          props: { columns: tierCount, gap: tierCount >= 5 ? 'sm' : 'lg', padding: 'xl' },
          children: cards,
        },
      ],
    },
  };
}

// 3. Dynamic Testimonials (Supports star rating & card count)
function generateTestimonialsLayout(id: string, prompt: string, timestamp: string): SectionLayout {
  const starString = extractStars(prompt);
  const cardCount = Math.min(extractNumber(prompt, 3), 4);
  const includePills = hasStatusPills(prompt);

  const testimonialsData = [
    {
      name: 'Sarah Jenkins',
      role: 'Head of Growth, Arc Studio',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      quote: '"This section generator cut our landing page iteration cycle from 3 days to literally 5 minutes."',
      pill: 'VERIFIED CUSTOMER',
    },
    {
      name: 'Marcus Vance',
      role: 'Senior Staff Engineer, TechFlow',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
      quote: '"The recursive AST renderer and inline text editing make this the cleanest UI generator I have ever tested."',
      pill: 'ENTERPRISE USER',
    },
    {
      name: 'Elena Rostova',
      role: 'VP of Product, Apex Digital',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena',
      quote: '"Exporting straight to clean React JSX code and saving JSON state seamlessly saved us hours of boilerplate."',
      pill: 'PRO SUBSCRIBER',
    },
    {
      name: 'David Kim',
      role: 'Founder & CEO, ScaleFast',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
      quote: '"Unbelievably fast workflow. The dynamic property controls and instant saving are a game changer for our team."',
      pill: 'EARLY ADOPTER',
    },
  ];

  const cards: UIElementNode[] = testimonialsData.slice(0, cardCount).map((item, idx) => ({
    id: `${id}_test_${idx}`,
    type: 'card',
    props: { borderRadius: '2xl', padding: 'xl', bgColor: '#FFFFFF', borderColor: 'rgba(32,41,64,0.12)' },
    children: [
      ...(includePills
        ? [
            {
              id: `${id}_t${idx}_pill`,
              type: 'badge' as const,
              content: item.pill,
              props: { badgeType: idx === 0 ? 'success' : 'bronze' as any },
            },
          ]
        : []),
      { id: `${id}_t${idx}_stars`, type: 'paragraph', content: starString, props: { textColor: '#8B6240', size: 'lg', weight: 'bold' } },
      { id: `${id}_t${idx}_quote`, type: 'paragraph', content: item.quote, props: { size: 'md', textColor: '#202940' } },
      {
        id: `${id}_t${idx}_author_stack`,
        type: 'stack',
        props: { direction: 'row', align: 'center', gap: 'md' },
        children: [
          { id: `${id}_t${idx}_avatar`, type: 'avatar', props: { src: item.avatar } },
          {
            id: `${id}_t${idx}_info`,
            type: 'stack',
            props: { direction: 'col', gap: 'none' },
            children: [
              { id: `${id}_t${idx}_name`, type: 'heading', content: item.name, props: { tag: 'h4', size: 'sm', weight: 'bold', textColor: '#202940' } },
              { id: `${id}_t${idx}_role`, type: 'paragraph', content: item.role, props: { size: 'xs', textColor: 'rgba(32,41,64,0.6)' } },
            ],
          },
        ],
      },
    ],
  }));

  return {
    id,
    title: 'Customer Testimonials & Social Proof',
    category: 'testimonials',
    promptUsed: prompt,
    createdAt: timestamp,
    updatedAt: timestamp,
    root: {
      id: `${id}_root`,
      type: 'section',
      props: { bgColor: '#FBF9F6', padding: '2xl', align: 'center' },
      children: [
        {
          id: `${id}_badge`,
          type: 'badge',
          content: 'TRUSTED BY INNOVATORS',
          props: { badgeType: 'success' },
        },
        {
          id: `${id}_heading`,
          type: 'heading',
          content: 'Loved by Product Teams Worldwide',
          props: { tag: 'h2', size: '4xl', weight: 'bold', textColor: '#202940', align: 'center' },
        },
        {
          id: `${id}_grid`,
          type: 'grid',
          props: { columns: cardCount, gap: 'lg', padding: 'lg' },
          children: cards,
        },
      ],
    },
  };
}

// 4. Team Showcase
function generateTeamLayout(id: string, prompt: string, timestamp: string): SectionLayout {
  const count = Math.min(extractNumber(prompt, 4), 4);
  const teamMembers = [
    { name: 'Alex Rivera', role: 'Chief Executive Officer', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex', badge: 'FOUNDER' },
    { name: 'Samantha Wu', role: 'Head of Product Design', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Samantha', badge: 'DESIGN LEAD' },
    { name: 'Dmitri Petrov', role: 'Principal Architect', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dmitri', badge: 'TECH LEAD' },
    { name: 'Leila Faris', role: 'Director of AI Research', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Leila', badge: 'AI LEAD' },
  ];

  return {
    id,
    title: 'Executive Leadership & Team',
    category: 'custom',
    promptUsed: prompt,
    createdAt: timestamp,
    updatedAt: timestamp,
    root: {
      id: `${id}_root`,
      type: 'section',
      props: { bgColor: '#FBF9F6', padding: '2xl', align: 'center' },
      children: [
        { id: `${id}_badge`, type: 'badge', content: 'OUR TEAM', props: { badgeType: 'bronze' } },
        { id: `${id}_heading`, type: 'heading', content: 'Meet the Builders', props: { tag: 'h2', size: '4xl', weight: 'bold', textColor: '#202940', align: 'center' } },
        {
          id: `${id}_grid`,
          type: 'grid',
          props: { columns: count, gap: 'lg', padding: 'lg' },
          children: teamMembers.slice(0, count).map((m, idx) => ({
            id: `${id}_team_${idx}`,
            type: 'card',
            props: { borderRadius: '2xl', padding: 'xl', bgColor: '#FFFFFF', borderColor: 'rgba(32,41,64,0.12)', align: 'center' },
            children: [
              { id: `${id}_m${idx}_avatar`, type: 'avatar', props: { src: m.avatar } },
              { id: `${id}_m${idx}_badge`, type: 'badge', content: m.badge, props: { badgeType: 'success' } },
              { id: `${id}_m${idx}_name`, type: 'heading', content: m.name, props: { tag: 'h3', size: 'lg', weight: 'bold', textColor: '#202940' } },
              { id: `${id}_m${idx}_role`, type: 'paragraph', content: m.role, props: { size: 'xs', textColor: 'rgba(32,41,64,0.7)' } },
            ],
          })),
        },
      ],
    },
  };
}

// 5. Dynamic Features
function generateFeaturesLayout(id: string, prompt: string, timestamp: string): SectionLayout {
  const count = Math.min(extractNumber(prompt, 3), 4);
  const items = [
    { badge: 'AST PARSER', title: 'Recursive Rendering Engine', desc: 'Traverses hierarchical JSON nodes recursively to construct semantic HTML with zero hardcoded templates.' },
    { badge: 'DIRECT EDIT', title: 'Inline Text Synchronization', desc: 'Click any headline, paragraph, or badge directly on canvas to edit text inline with two-way AST state updates.' },
    { badge: 'PERSISTENCE', title: 'File & Memory JSON Store', desc: 'Instant backend serialization and revision history to safeguard your generated layout modifications.' },
    { badge: 'EXPORT ENGINE', title: 'Multi-Format Code Exporter', desc: 'Download clean React JSX, pure HTML/CSS, or raw JSON AST trees with one click.' },
  ];

  return {
    id,
    title: 'Core Engine Capabilities',
    category: 'features',
    promptUsed: prompt,
    createdAt: timestamp,
    updatedAt: timestamp,
    root: {
      id: `${id}_root`,
      type: 'section',
      props: { bgColor: '#FBF9F6', padding: '2xl', align: 'center' },
      children: [
        { id: `${id}_badge`, type: 'badge', content: 'SYSTEM ARCHITECTURE', props: { badgeType: 'success' } },
        { id: `${id}_heading`, type: 'heading', content: 'Engineered for Real-time Precision', props: { tag: 'h2', size: '4xl', weight: 'bold', textColor: '#202940', align: 'center' } },
        { id: `${id}_subheading`, type: 'paragraph', content: 'Explore the high-performance building blocks powering our dynamic visual generator.', props: { size: 'lg', textColor: 'rgba(32,41,64,0.7)', align: 'center' } },
        {
          id: `${id}_grid`,
          type: 'grid',
          props: { columns: count, gap: 'lg', padding: 'lg' },
          children: items.slice(0, count).map((item, idx) => ({
            id: `${id}_feat_${idx}`,
            type: 'card',
            props: { borderRadius: '2xl', padding: 'xl', bgColor: '#FFFFFF', borderColor: 'rgba(32,41,64,0.12)' },
            children: [
              { id: `${id}_f${idx}_badge`, type: 'badge', content: item.badge, props: { badgeType: idx === 0 ? 'bronze' : idx === 1 ? 'success' : 'navy' } },
              { id: `${id}_f${idx}_title`, type: 'heading', content: item.title, props: { tag: 'h3', size: 'xl', weight: 'bold', textColor: '#202940' } },
              { id: `${id}_f${idx}_desc`, type: 'paragraph', content: item.desc, props: { size: 'sm', textColor: 'rgba(32,41,64,0.7)' } },
            ],
          })),
        },
      ],
    },
  };
}

// 6. Dynamic Stats Showcase
function generateStatsLayout(id: string, prompt: string, timestamp: string): SectionLayout {
  const count = Math.min(extractNumber(prompt, 4), 4);
  const stats = [
    { num: '99.99%', label: 'Renderer Uptime', color: '#8B6240' },
    { num: '14ms', label: 'Average AST Parse Time', color: '#1DA851' },
    { num: '2.4M+', label: 'Dynamic Nodes Rendered', color: '#202940' },
    { num: '100%', label: 'Zero Hardcoded Templates', color: '#C94C3D' },
  ];

  return {
    id,
    title: 'Key Metrics & Growth Showcase',
    category: 'stats',
    promptUsed: prompt,
    createdAt: timestamp,
    updatedAt: timestamp,
    root: {
      id: `${id}_root`,
      type: 'section',
      props: { bgColor: '#FBF9F6', padding: '2xl', align: 'center' },
      children: [
        { id: `${id}_badge`, type: 'badge', content: 'PROVEN PERFORMANCE', props: { badgeType: 'success' } },
        { id: `${id}_heading`, type: 'heading', content: 'Engineered for Enterprise Reliability', props: { tag: 'h2', size: '4xl', weight: 'bold', textColor: '#202940', align: 'center' } },
        {
          id: `${id}_grid`,
          type: 'grid',
          props: { columns: count, gap: 'lg', padding: 'xl' },
          children: stats.slice(0, count).map((s, idx) => ({
            id: `${id}_stat_${idx}`,
            type: 'card',
            props: { borderRadius: '2xl', padding: 'xl', bgColor: '#FFFFFF', borderColor: 'rgba(32,41,64,0.12)' },
            children: [
              { id: `${id}_s${idx}_num`, type: 'heading', content: s.num, props: { tag: 'h3', size: '4xl', weight: 'extrabold', textColor: s.color } },
              { id: `${id}_s${idx}_label`, type: 'paragraph', content: s.label, props: { size: 'sm', textColor: '#202940', weight: 'semibold' } },
            ],
          })),
        },
      ],
    },
  };
}

// 7. Dynamic CTA
function generateCTALayout(id: string, prompt: string, timestamp: string): SectionLayout {
  return {
    id,
    title: 'High-Conversion Call to Action',
    category: 'cta',
    promptUsed: prompt,
    createdAt: timestamp,
    updatedAt: timestamp,
    root: {
      id: `${id}_root`,
      type: 'section',
      props: { bgColor: '#202940', padding: '2xl', align: 'center', borderRadius: '2xl' },
      children: [
        { id: `${id}_badge`, type: 'badge', content: 'READY TO SHIP?', props: { badgeType: 'bronze' } },
        { id: `${id}_heading`, type: 'heading', content: 'Start Generating Dynamic Sections Today', props: { tag: 'h2', size: '4xl', weight: 'bold', textColor: '#FBF9F6', align: 'center' } },
        { id: `${id}_subheading`, type: 'paragraph', content: 'Join thousands of builders designing and exporting production-ready layouts in seconds.', props: { size: 'lg', textColor: 'rgba(251,249,246,0.8)', align: 'center' } },
        {
          id: `${id}_input_group`,
          type: 'stack',
          props: { direction: 'row', align: 'center', gap: 'sm', padding: 'md' },
          children: [
            { id: `${id}_email_input`, type: 'input', props: { placeholder: 'Enter your work email...', size: 'lg' } },
            { id: `${id}_submit_btn`, type: 'button', content: 'Get Early Access', props: { variant: 'amber', size: 'lg' } },
          ],
        },
      ],
    },
  };
}

// 8. Dynamic Universal Fallback for ANY custom prompt
function generateUniversalCustomLayout(id: string, prompt: string, timestamp: string): SectionLayout {
  const cleanTitle = prompt
    .replace(/^(build|create|make|generate|a|an)\s+/i, '')
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  const count = extractNumber(prompt, 3);
  const includePills = hasStatusPills(prompt);

  return {
    id,
    title: cleanTitle || 'Custom Generated Section',
    category: 'custom',
    promptUsed: prompt,
    createdAt: timestamp,
    updatedAt: timestamp,
    root: {
      id: `${id}_root`,
      type: 'section',
      props: { bgColor: '#FBF9F6', padding: '2xl', align: 'center' },
      children: [
        { id: `${id}_badge`, type: 'badge', content: 'AI GENERATED AST', props: { badgeType: 'bronze' } },
        { id: `${id}_heading`, type: 'heading', content: cleanTitle || 'Custom Dynamic Layout', props: { tag: 'h1', size: '4xl', weight: 'bold', textColor: '#202940', align: 'center' } },
        { id: `${id}_subheading`, type: 'paragraph', content: 'Dynamically rendered from your customized prompt parameters and JSON AST hierarchy.', props: { size: 'lg', textColor: 'rgba(32,41,64,0.7)', align: 'center' } },
        {
          id: `${id}_grid`,
          type: 'grid',
          props: { columns: Math.min(count, 4), gap: 'lg', padding: 'lg' },
          children: Array.from({ length: count }, (_, idx) => ({
            id: `${id}_card_${idx}`,
            type: 'card' as const,
            props: { borderRadius: '2xl' as const, padding: 'xl' as const, bgColor: '#FFFFFF', borderColor: 'rgba(32,41,64,0.12)' },
            children: [
              ...(includePills
                ? [
                    {
                      id: `${id}_c${idx}_pill`,
                      type: 'badge' as const,
                      content: `STATUS #${idx + 1}`,
                      props: { badgeType: idx === 0 ? 'bronze' : idx === 1 ? 'success' : 'alert' as any },
                    },
                  ]
                : []),
              { id: `${id}_c${idx}_title`, type: 'heading' as const, content: `Section Component #${idx + 1}`, props: { tag: 'h3' as const, size: 'xl' as const, weight: 'bold' as const, textColor: '#202940' } },
              { id: `${id}_c${idx}_desc`, type: 'paragraph' as const, content: `Custom dynamic component generated to match prompt intent for component #${idx + 1}.`, props: { size: 'sm' as const, textColor: 'rgba(32,41,64,0.7)' } },
              { id: `${id}_c${idx}_btn`, type: 'button' as const, content: 'Interactive Action', props: { variant: 'outline' as const, size: 'sm' as const, textColor: '#202940' } },
            ],
          })),
        },
      ],
    },
  };
}
