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

const leadersList = [
  {
    name: 'Daphne Oberlander',
    title: 'Chief Revenue Officer',
    imagePath: 'public/images/about-us/leadership/img_daphne_berlander.png',
  },
  {
    name: 'Sravan Aditya',
    title: 'Chief Technology Officer',
    imagePath: 'public/images/about-us/leadership/img_sravan_aditya.png',
  },
  {
    name: 'Robert A. Miller',
    title: 'Chief of Strategy & Partnerships',
    imagePath: 'public/images/about-us/leadership/img_robert_A._miller.png',
  },
  {
    name: 'Megha Bhouraskar',
    title: 'General Counsel',
    imagePath: 'public/images/about-us/leadership/img_megha_bhouraskar.png',
  },
  {
    name: 'Nick Tombrella',
    title: 'Senior Vice President Sales',
    imagePath: 'public/images/about-us/leadership/img_nick_tombrella.png',
  },
  {
    name: 'Ales Cejka',
    title: 'SVP RCM, Coding and Compliance',
    imagePath: 'public/images/about-us/leadership/img_ales_cejka.png',
  },
  {
    name: 'Devanand Bangaru',
    title: 'Associate Vice President – Technology & Compliance',
    imagePath: 'public/images/about-us/leadership/img_devanand_bangaru.png',
  },
  {
    name: 'Santhosh Kumar',
    title: 'Vice President – Human Resources',
    imagePath: 'public/images/about-us/leadership/img_santhosh_kumar.png',
  },
  {
    name: 'Rajgopal Keshava',
    title: 'Associate Vice President',
    imagePath: 'public/images/about-us/leadership/img_rajgopal_keshava.png',
  },
  {
    name: 'Sheen Patel',
    title: 'Chief of Staff & Strategic Projects Management',
    imagePath: 'public/images/about-us/leadership/img_sheen_patel.png',
  },
  {
    name: 'Vinay Khot',
    title: 'Vice President – Agentic AI & Platform Engineering',
    imagePath: 'public/images/about-us/leadership/img_vinay_khot.png',
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

async function seedLeadership() {
  console.log(`Starting Sanity seeding for ${leadersList.length} Leadership members...`);

  const leadersWithAssets = [];

  for (let i = 0; i < leadersList.length; i++) {
    const leader = leadersList[i];
    console.log(`[${i + 1}/${leadersList.length}] Uploading image for ${leader.name}...`);
    const assetId = await uploadImageToSanity(leader.imagePath);
    console.log(`Uploaded! Asset ID: ${assetId}`);

    leadersWithAssets.push({
      _key: `leader-${i + 1}`,
      _type: 'leader',
      name: leader.name,
      title: leader.title,
      image: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: assetId,
        },
      },
    });
  }

  const doc = {
    _id: 'aboutUsPage',
    _type: 'aboutUsPage',
    leadersTag: 'Leadership',
    leaders: leadersWithAssets,
  };

  const draftDoc = {
    ...doc,
    _id: 'drafts.aboutUsPage',
  };

  const mutateUrl = `https://${projectId}.api.sanity.io/v2024-08-20/data/mutate/${dataset}`;
  const mutation = {
    mutations: [
      {
        createOrReplace: doc,
      },
      {
        createOrReplace: draftDoc,
      },
    ],
  };

  console.log('\nWriting aboutUsPage document and drafts.aboutUsPage to Sanity...');
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
    throw new Error(`Failed to save aboutUsPage document: ${JSON.stringify(mutateData)}`);
  }

  console.log('Successfully saved to Sanity! Transaction ID:', mutateData.transactionId);
  console.log('\nSeeding completed successfully! All 11 leaders are now live in CMS!');
}

seedLeadership().catch((err) => {
  console.error('Fatal error during seeding:', err);
  process.exit(1);
});
