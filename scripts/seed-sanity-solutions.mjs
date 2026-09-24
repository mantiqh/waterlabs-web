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

// Import SOLUTIONS_DATA
const { SOLUTIONS_DATA } = await import('../src/data/solutions/index.ts');

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
  const contentType = ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' : ext === '.svg' ? 'image/svg+xml' : 'image/png';
  const filename = path.basename(filePath).replace(/\s+/g, '_');
  const uploadUrl = `https://${projectId}.api.sanity.io/v2024-08-20/assets/images/${dataset}?filename=${encodeURIComponent(filename)}`;

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
  const solutions = Object.values(SOLUTIONS_DATA);
  console.log(`Starting Sanity seeding for ${solutions.length} Solutions...`);

  for (const sol of solutions) {
    console.log(`\nProcessing Solution: ${sol.title} (${sol.slug})...`);

    // Upload hero image
    let heroAssetId = null;
    if (sol.hero.heroImage) {
      try {
        heroAssetId = await uploadImageToSanity(sol.hero.heroImage);
      } catch (err) {
        console.warn(`Hero image upload failed for ${sol.slug}:`, err.message);
      }
    }

    // Upload problem image
    let problemAssetId = null;
    if (sol.problem.image) {
      try {
        problemAssetId = await uploadImageToSanity(sol.problem.image);
      } catch (err) {
        console.warn(`Problem image upload failed for ${sol.slug}:`, err.message);
      }
    }

    // Upload closes image
    let closesAssetId = null;
    if (sol.closes.image) {
      try {
        closesAssetId = await uploadImageToSanity(sol.closes.image);
      } catch (err) {
        console.warn(`Closes image upload failed for ${sol.slug}:`, err.message);
      }
    }

    // Upload human image
    let humanAssetId = null;
    if (sol.statsAndHuman.humanImage) {
      try {
        humanAssetId = await uploadImageToSanity(sol.statsAndHuman.humanImage);
      } catch (err) {
        console.warn(`Human image upload failed for ${sol.slug}:`, err.message);
      }
    }

    // Upload platform image
    let platformAssetId = null;
    if (sol.platformAndFeatures.platformImage) {
      try {
        platformAssetId = await uploadImageToSanity(sol.platformAndFeatures.platformImage);
      } catch (err) {
        console.warn(`Platform image upload failed for ${sol.slug}:`, err.message);
      }
    }

    // Upload feature cards icons
    const threeThingsCardsWithAssets = [];
    for (let i = 0; i < (sol.platformAndFeatures.threeThingsCards || []).length; i++) {
      const card = sol.platformAndFeatures.threeThingsCards[i];
      let iconAssetId = null;
      if (card.icon) {
        try {
          iconAssetId = await uploadImageToSanity(card.icon);
        } catch (err) {
          console.warn(`Card icon upload failed for ${card.title}:`, err.message);
        }
      }
      threeThingsCardsWithAssets.push({
        _key: `card-${i}`,
        title: card.title,
        description: card.description,
        ...(iconAssetId && {
          icon: {
            _type: 'image',
            asset: { _type: 'reference', _ref: iconAssetId },
          },
        }),
      });
    }

    const doc = {
      _id: `solution-${sol.slug}`,
      _type: 'solutionPage',
      title: sol.title,
      slug: {
        _type: 'slug',
        current: sol.slug,
      },
      navLabel: sol.navLabel || sol.title,
      order: sol.order || 99,

      // Hero
      heroEyebrow: sol.hero.eyebrow,
      heroHeadline: sol.hero.headline,
      heroDescription: sol.hero.description,
      heroCtaText: sol.hero.ctaText || 'Get a Demo',
      heroCtaLink: sol.hero.ctaLink || '/contact-us',
      ...(heroAssetId && {
        heroImage: {
          _type: 'image',
          asset: { _type: 'reference', _ref: heroAssetId },
          alt: sol.hero.heroImageAlt || sol.hero.headline,
        },
      }),

      // Problem
      problemTag: sol.problem.tag || 'The problem',
      problemHeadline: sol.problem.headline,
      problemHeadlineHighlight: sol.problem.headlineHighlight || '',
      problemDescription: sol.problem.description,
      ...(sol.problem.descriptionSecondary && {
        problemDescriptionSecondary: sol.problem.descriptionSecondary,
      }),
      ...(sol.problem.quoteText && {
        problemQuoteText: sol.problem.quoteText,
      }),
      ...(sol.problem.quoteAuthor && {
        problemQuoteAuthor: sol.problem.quoteAuthor,
      }),
      ...(problemAssetId && {
        problemImage: {
          _type: 'image',
          asset: { _type: 'reference', _ref: problemAssetId },
          alt: sol.problem.imageAlt || sol.problem.headline,
        },
      }),

      // Closes
      closesSectionTitle: sol.closes.sectionTitle || 'How Waterlabs',
      closesSectionHighlight: sol.closes.sectionTitleHighlight || 'closes the gap',
      closesSubtitle: sol.closes.subtitle,
      ...(closesAssetId && {
        closesImage: {
          _type: 'image',
          asset: { _type: 'reference', _ref: closesAssetId },
          alt: sol.closes.imageAlt || sol.title,
        },
      }),
      closesSteps: (sol.closes.steps || []).map((step, idx) => ({
        _key: `step-${idx}`,
        title: step.title,
        description: step.description,
      })),

      // Stats & Human
      statsTitle: sol.statsAndHuman.statsTitle || 'Our Stats',
      stats: (sol.statsAndHuman.stats || []).map((stat, idx) => ({
        _key: `stat-${idx}`,
        value: stat.value,
        label: stat.label,
      })),
      humanHeading: sol.statsAndHuman.humanHeading,
      humanHeadingHighlight: sol.statsAndHuman.humanHeadingHighlight || 'Human in the loop,',
      humanParagraphs: sol.statsAndHuman.humanParagraphs,
      ...(humanAssetId && {
        humanImage: {
          _type: 'image',
          asset: { _type: 'reference', _ref: humanAssetId },
          alt: sol.statsAndHuman.humanImageAlt || sol.statsAndHuman.humanHeading,
        },
      }),

      // Platform & Three Things
      platformEyebrow: sol.platformAndFeatures.platformEyebrow,
      platformHeading: sol.platformAndFeatures.platformHeading,
      platformDescription: sol.platformAndFeatures.platformDescription,
      platformCtaText: sol.platformAndFeatures.platformCtaText || 'Explore HIMER AI OS',
      platformCtaLink: sol.platformAndFeatures.platformCtaLink || '/products/himer',
      ...(platformAssetId && {
        platformImage: {
          _type: 'image',
          asset: { _type: 'reference', _ref: platformAssetId },
        },
      }),
      threeThingsHeading: sol.platformAndFeatures.threeThingsHeading,
      threeThingsHeadingHighlight: sol.platformAndFeatures.threeThingsHeadingHighlight,
      threeThingsCards: threeThingsCardsWithAssets,

      // CTA
      ctaHeadline: sol.cta.headline,
      ctaButtonText: sol.cta.buttonText || 'Get a Demo',
      ctaButtonLink: sol.cta.buttonLink || '/contact-us',

      // SEO
      metaTitle: sol.seo?.metaTitle,
      metaDescription: sol.seo?.metaDescription,
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
      console.error(`Failed to create solution doc ${sol.slug}:`, mutateData);
    } else {
      console.log(`Successfully created solution: ${sol.title}`);
    }
  }

  console.log('\nSeeding completed successfully!');
}

seed().catch((err) => {
  console.error('Fatal error during seeding:', err);
  process.exit(1);
});
