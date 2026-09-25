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

const { DEFAULT_HOME_DATA } = await import('../src/data/home/index.ts');

const assetCache = new Map();

async function uploadImageToSanity(webPath) {
  if (!webPath) return null;
  const decodedPath = decodeURIComponent(webPath.replace(/^\//, ''));
  const filePath = path.join(process.cwd(), 'public', decodedPath.replace(/^public\//, ''));

  if (!fs.existsSync(filePath)) {
    console.warn(`File not found on disk: ${filePath}`);
    return null;
  }

  if (assetCache.has(filePath)) {
    return assetCache.get(filePath);
  }

  const fileBuffer = fs.readFileSync(filePath);
  const ext = path.extname(filePath).toLowerCase();
  const contentType =
    ext === '.jpg' || ext === '.jpeg'
      ? 'image/jpeg'
      : ext === '.svg'
      ? 'image/svg+xml'
      : 'image/png';
  const filename = path.basename(filePath).replace(/\s+/g, '_');
  const uploadUrl = `https://${projectId}.api.sanity.io/v2024-08-20/assets/images/${dataset}?filename=${encodeURIComponent(
    filename
  )}`;

  const res = await fetch(uploadUrl, {
    method: 'POST',
    headers: {
      'Content-Type': contentType,
      Authorization: `Bearer ${token}`,
    },
    body: fileBuffer,
  });

  const data = await res.json();
  if (!res.ok) {
    console.warn(`Failed to upload ${filePath}:`, data);
    return null;
  }

  assetCache.set(filePath, data.document._id);
  return data.document._id;
}

async function seed() {
  console.log('Starting Sanity seeding for Home Page...');

  // Hero assets
  const heroDesktopId = await uploadImageToSanity(DEFAULT_HOME_DATA.heroBackgroundImageDesktop);
  const heroMobileId = await uploadImageToSanity(DEFAULT_HOME_DATA.heroBackgroundImageMobile);

  // Marquee assets
  const marqueeItems = [];
  for (const item of DEFAULT_HOME_DATA.marqueeItems) {
    const imgId = await uploadImageToSanity(item.image);
    marqueeItems.push({
      _key: item._key,
      text: item.text,
      ...(imgId && {
        image: {
          _type: 'image',
          asset: { _type: 'reference', _ref: imgId },
        },
      }),
    });
  }
  const bannerDesktopId = await uploadImageToSanity(DEFAULT_HOME_DATA.bannerImageDesktop);
  const bannerMobileId = await uploadImageToSanity(DEFAULT_HOME_DATA.bannerImageMobile);

  // Brand logos
  const brandLogos = [];
  for (const brand of DEFAULT_HOME_DATA.brandLogos) {
    const logoId = await uploadImageToSanity(brand.logo);
    brandLogos.push({
      _key: brand._key,
      name: brand.name,
      ...(logoId && {
        logo: {
          _type: 'image',
          asset: { _type: 'reference', _ref: logoId },
        },
      }),
    });
  }

  // Products
  const prod1ImgId = await uploadImageToSanity(DEFAULT_HOME_DATA.product1.image);
  const prod2ImgId = await uploadImageToSanity(DEFAULT_HOME_DATA.product2.image);

  // Eligibility
  const diagImgId = await uploadImageToSanity(DEFAULT_HOME_DATA.eligibilityDiagramImage);
  const eligBgDesktopId = await uploadImageToSanity(DEFAULT_HOME_DATA.eligibilityBgDesktop);
  const eligBgMobileId = await uploadImageToSanity(DEFAULT_HOME_DATA.eligibilityBgMobile);

  // Features
  const card1ImgId = await uploadImageToSanity(DEFAULT_HOME_DATA.card1Image);
  const card2ImgId = await uploadImageToSanity(DEFAULT_HOME_DATA.card2Image);
  const secImgId = await uploadImageToSanity(DEFAULT_HOME_DATA.securityImage);

  const stats = [];
  for (const s of DEFAULT_HOME_DATA.stats) {
    const iconId = await uploadImageToSanity(s.icon);
    stats.push({
      _key: s._key,
      stat: s.stat,
      unit: s.unit,
      label: s.label,
      ...(iconId && {
        icon: {
          _type: 'image',
          asset: { _type: 'reference', _ref: iconId },
        },
      }),
    });
  }

  const caseImgId = await uploadImageToSanity(DEFAULT_HOME_DATA.caseStudyImage);

  // Testimonials
  const testimonials = [];
  for (const t of DEFAULT_HOME_DATA.testimonials) {
    const imgId = await uploadImageToSanity(t.image);
    testimonials.push({
      _key: t._key,
      name: t.name,
      role: t.role,
      quote: t.quote,
      ...(imgId && {
        image: {
          _type: 'image',
          asset: { _type: 'reference', _ref: imgId },
        },
      }),
    });
  }

  // Calculate
  const calcImgId = await uploadImageToSanity(DEFAULT_HOME_DATA.calculateImage);

  // CTA
  const ctaBgId = await uploadImageToSanity(DEFAULT_HOME_DATA.ctaBackgroundImage);

  const doc = {
    _id: 'homePage',
    _type: 'homePage',

    // 01 · Hero Section
    heroSubheading: DEFAULT_HOME_DATA.heroSubheading,
    heroHeading: DEFAULT_HOME_DATA.heroHeading,
    heroDescription: DEFAULT_HOME_DATA.heroDescription,
    heroCtaText: DEFAULT_HOME_DATA.heroCtaText,
    heroCtaLink: DEFAULT_HOME_DATA.heroCtaLink,
    heroSecondaryCtaText: DEFAULT_HOME_DATA.heroSecondaryCtaText,
    heroSecondaryCtaLink: DEFAULT_HOME_DATA.heroSecondaryCtaLink,
    ...(heroDesktopId && {
      heroBackgroundImageDesktop: {
        _type: 'image',
        asset: { _type: 'reference', _ref: heroDesktopId },
      },
    }),
    ...(heroMobileId && {
      heroBackgroundImageMobile: {
        _type: 'image',
        asset: { _type: 'reference', _ref: heroMobileId },
      },
    }),

    // 02 · Marquee / Video
    marqueeItems,
    marqueeMobileText: DEFAULT_HOME_DATA.marqueeMobileText,
    ...(bannerDesktopId && {
      bannerImageDesktop: {
        _type: 'image',
        asset: { _type: 'reference', _ref: bannerDesktopId },
      },
    }),
    ...(bannerMobileId && {
      bannerImageMobile: {
        _type: 'image',
        asset: { _type: 'reference', _ref: bannerMobileId },
      },
    }),

    // 03 · Trusted Brands
    brandHeading: DEFAULT_HOME_DATA.brandHeading,
    brandHeadingHighlight: DEFAULT_HOME_DATA.brandHeadingHighlight,
    brandLogos,

    // 04 · Products
    productsHeadingPart1: DEFAULT_HOME_DATA.productsHeadingPart1,
    productsHeadingHighlight: DEFAULT_HOME_DATA.productsHeadingHighlight,
    product1: {
      name: DEFAULT_HOME_DATA.product1.name,
      description: DEFAULT_HOME_DATA.product1.description,
      ctaText: DEFAULT_HOME_DATA.product1.ctaText,
      ctaLink: DEFAULT_HOME_DATA.product1.ctaLink,
      ...(prod1ImgId && {
        image: {
          _type: 'image',
          asset: { _type: 'reference', _ref: prod1ImgId },
        },
      }),
    },
    product2: {
      name: DEFAULT_HOME_DATA.product2.name,
      description: DEFAULT_HOME_DATA.product2.description,
      ctaText: DEFAULT_HOME_DATA.product2.ctaText,
      ctaLink: DEFAULT_HOME_DATA.product2.ctaLink,
      ...(prod2ImgId && {
        image: {
          _type: 'image',
          asset: { _type: 'reference', _ref: prod2ImgId },
        },
      }),
    },

    // 05 · Eligibility to Coding
    eligibilityTag: DEFAULT_HOME_DATA.eligibilityTag,
    eligibilityHeading: DEFAULT_HOME_DATA.eligibilityHeading,
    eligibilitySubtag: DEFAULT_HOME_DATA.eligibilitySubtag,
    eligibilitySubheading: DEFAULT_HOME_DATA.eligibilitySubheading,
    ...(diagImgId && {
      eligibilityDiagramImage: {
        _type: 'image',
        asset: { _type: 'reference', _ref: diagImgId },
      },
    }),
    eligibilityDescription: DEFAULT_HOME_DATA.eligibilityDescription,
    ...(eligBgDesktopId && {
      eligibilityBgDesktop: {
        _type: 'image',
        asset: { _type: 'reference', _ref: eligBgDesktopId },
      },
    }),
    ...(eligBgMobileId && {
      eligibilityBgMobile: {
        _type: 'image',
        asset: { _type: 'reference', _ref: eligBgMobileId },
      },
    }),

    // 06 · Features & Stats
    featuresTag: DEFAULT_HOME_DATA.featuresTag,
    featuresHeading: DEFAULT_HOME_DATA.featuresHeading,
    featuresHeadingHighlight: DEFAULT_HOME_DATA.featuresHeadingHighlight,
    featuresDescription: DEFAULT_HOME_DATA.featuresDescription,
    card1Title: DEFAULT_HOME_DATA.card1Title,
    card1Description: DEFAULT_HOME_DATA.card1Description,
    ...(card1ImgId && {
      card1Image: {
        _type: 'image',
        asset: { _type: 'reference', _ref: card1ImgId },
      },
    }),
    card2Title: DEFAULT_HOME_DATA.card2Title,
    card2Description: DEFAULT_HOME_DATA.card2Description,
    ...(card2ImgId && {
      card2Image: {
        _type: 'image',
        asset: { _type: 'reference', _ref: card2ImgId },
      },
    }),
    securityTag: DEFAULT_HOME_DATA.securityTag,
    securityHeadingHighlight: DEFAULT_HOME_DATA.securityHeadingHighlight,
    securityHeading: DEFAULT_HOME_DATA.securityHeading,
    securityDescription: DEFAULT_HOME_DATA.securityDescription,
    ...(secImgId && {
      securityImage: {
        _type: 'image',
        asset: { _type: 'reference', _ref: secImgId },
      },
    }),
    statsTag: DEFAULT_HOME_DATA.statsTag,
    statsHeading: DEFAULT_HOME_DATA.statsHeading,
    stats,
    caseStudyTitle: DEFAULT_HOME_DATA.caseStudyTitle,
    caseStudySubtitle: DEFAULT_HOME_DATA.caseStudySubtitle,
    ...(caseImgId && {
      caseStudyImage: {
        _type: 'image',
        asset: { _type: 'reference', _ref: caseImgId },
      },
    }),
    caseStudyCtaText: DEFAULT_HOME_DATA.caseStudyCtaText,
    caseStudyCtaLink: DEFAULT_HOME_DATA.caseStudyCtaLink,

    // 07 · Testimonials
    testimonials,

    // 08 · Calculate Section
    calculateHeading: DEFAULT_HOME_DATA.calculateHeading,
    ...(calcImgId && {
      calculateImage: {
        _type: 'image',
        asset: { _type: 'reference', _ref: calcImgId },
      },
    }),

    // 09 · Billing Model
    billingTag: DEFAULT_HOME_DATA.billingTag,
    billingHeadingHighlight: DEFAULT_HOME_DATA.billingHeadingHighlight,
    billingHeading: DEFAULT_HOME_DATA.billingHeading,
    billingDescription: DEFAULT_HOME_DATA.billingDescription,
    billingSteps: DEFAULT_HOME_DATA.billingSteps,
    billingPoints: DEFAULT_HOME_DATA.billingPoints,

    // 10 · CTA Section
    ctaTag: DEFAULT_HOME_DATA.ctaTag,
    ctaHeading: DEFAULT_HOME_DATA.ctaHeading,
    ctaPrimaryButtonText: DEFAULT_HOME_DATA.ctaPrimaryButtonText,
    ctaPrimaryButtonLink: DEFAULT_HOME_DATA.ctaPrimaryButtonLink,
    ctaSecondaryButtonText: DEFAULT_HOME_DATA.ctaSecondaryButtonText,
    ctaSecondaryButtonLink: DEFAULT_HOME_DATA.ctaSecondaryButtonLink,
    ...(ctaBgId && {
      ctaBackgroundImage: {
        _type: 'image',
        asset: { _type: 'reference', _ref: ctaBgId },
      },
    }),

    // 11 · SEO
    metaTitle: DEFAULT_HOME_DATA.metaTitle,
    metaDescription: DEFAULT_HOME_DATA.metaDescription,
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
    console.error('Failed to create/update homePage doc:', mutateData);
  } else {
    console.log('Successfully created/updated homePage doc in Sanity!');
  }
}

seed().catch((err) => {
  console.error('Fatal error during home page seeding:', err);
  process.exit(1);
});
