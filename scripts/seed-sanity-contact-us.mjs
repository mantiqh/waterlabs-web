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

const { DEFAULT_CONTACT_US_DATA } = await import('../src/data/contact-us/index.ts');

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
  console.log('Starting Sanity seeding for Contact Us Page...');

  const heroDesktopAssetId = await uploadImageToSanity(DEFAULT_CONTACT_US_DATA.heroImageDesktop);
  const heroMobileAssetId = await uploadImageToSanity(DEFAULT_CONTACT_US_DATA.heroImageMobile);
  const operatingInfoBgAssetId = await uploadImageToSanity(DEFAULT_CONTACT_US_DATA.operatingInfoBgImage);
  const formImageAssetId = await uploadImageToSanity(DEFAULT_CONTACT_US_DATA.formImage);
  const ctaDesktopAssetId = await uploadImageToSanity(DEFAULT_CONTACT_US_DATA.ctaBackgroundImageDesktop);
  const ctaMobileAssetId = await uploadImageToSanity(DEFAULT_CONTACT_US_DATA.ctaBackgroundImageMobile);

  const doc = {
    _id: 'contactUsPage',
    _type: 'contactUsPage',
    heroHeading: DEFAULT_CONTACT_US_DATA.heroHeading,
    heroHeadingHighlight: DEFAULT_CONTACT_US_DATA.heroHeadingHighlight,
    heroSubheading: DEFAULT_CONTACT_US_DATA.heroSubheading,
    heroCtaText: DEFAULT_CONTACT_US_DATA.heroCtaText,
    heroCtaLink: DEFAULT_CONTACT_US_DATA.heroCtaLink,
    ...(heroDesktopAssetId && {
      heroImageDesktop: {
        _type: 'image',
        asset: { _type: 'reference', _ref: heroDesktopAssetId },
      },
    }),
    ...(heroMobileAssetId && {
      heroImageMobile: {
        _type: 'image',
        asset: { _type: 'reference', _ref: heroMobileAssetId },
      },
    }),
    locations: DEFAULT_CONTACT_US_DATA.locations.map((loc) => ({
      _key: loc._key || `loc-${Math.random().toString(36).substring(2, 9)}`,
      tag: loc.tag,
      title: loc.title,
      address: loc.address,
      email: loc.email,
      hours: loc.hours,
      buttonText: loc.buttonText,
      href: loc.href,
    })),
    ...(operatingInfoBgAssetId && {
      operatingInfoBgImage: {
        _type: 'image',
        asset: { _type: 'reference', _ref: operatingInfoBgAssetId },
      },
    }),
    formTag: DEFAULT_CONTACT_US_DATA.formTag,
    formHeading: DEFAULT_CONTACT_US_DATA.formHeading,
    ...(formImageAssetId && {
      formImage: {
        _type: 'image',
        asset: { _type: 'reference', _ref: formImageAssetId },
      },
    }),
    orgTypeOptions: DEFAULT_CONTACT_US_DATA.orgTypeOptions,
    newsletterHeading: DEFAULT_CONTACT_US_DATA.newsletterHeading,
    consentText: DEFAULT_CONTACT_US_DATA.consentText,
    disclaimerText: DEFAULT_CONTACT_US_DATA.disclaimerText,
    submitButtonText: DEFAULT_CONTACT_US_DATA.submitButtonText,
    ctaHeading: DEFAULT_CONTACT_US_DATA.ctaHeading,
    ctaHeadingHighlight: DEFAULT_CONTACT_US_DATA.ctaHeadingHighlight,
    ctaButtonText: DEFAULT_CONTACT_US_DATA.ctaButtonText,
    ctaButtonLink: DEFAULT_CONTACT_US_DATA.ctaButtonLink,
    ...(ctaDesktopAssetId && {
      ctaBackgroundImageDesktop: {
        _type: 'image',
        asset: { _type: 'reference', _ref: ctaDesktopAssetId },
      },
    }),
    ...(ctaMobileAssetId && {
      ctaBackgroundImageMobile: {
        _type: 'image',
        asset: { _type: 'reference', _ref: ctaMobileAssetId },
      },
    }),
    metaTitle: DEFAULT_CONTACT_US_DATA.metaTitle,
    metaDescription: DEFAULT_CONTACT_US_DATA.metaDescription,
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
    console.error('Failed to create/update contactUsPage doc:', mutateData);
  } else {
    console.log('Successfully created/updated contactUsPage doc in Sanity!');
  }
}

seed().catch((err) => {
  console.error('Fatal error during contact us seeding:', err);
  process.exit(1);
});
