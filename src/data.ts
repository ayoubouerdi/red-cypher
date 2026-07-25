import { Product } from './types';

export const products: Product[] = [
  {
    id: 'ts-01',
    name: 'VOID WALKER',
    price: 550,
    description: {
      fr: 'Un mélange de coton épais conçu pour ceux qui naviguent dans l\'invisible. Coupe oversize avec ourlet vieilli.',
      ar: 'Toub ghled mkhdoum lnass li kay3oumou f lmajhoul. Fssala 3rida u m9et3a men lte7t.'
    },
    sizes: ['S', 'M', 'L', 'XL'],
    mainImage: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&q=80&w=800'
    ],
    isLimited: true,
    isNew: true,
    lore: {
      fr: 'Né du silence entre les fréquences. Le Void Walker absorbe la lumière et ne reflète que la vérité.',
      ar: 'Tkhleq men sskat li bin lmaoujat. Had t-shirt kaymessa ddo u kay3kess ghir l7a9i9a.'
    },
    reviews: [
      { id: 'r1', user: 'X_AESTHETIC', rating: 5, comment: 'Incredible fit. The fabric weight is perfect for layering.', date: '2026-06-12' },
      { id: 'r2', user: 'CYBER_09', rating: 4, comment: 'Slightly more oversized than expected, but love the quality.', date: '2026-06-05' },
      { id: 'r3', user: 'NEON_SAMURAI', rating: 5, comment: 'A masterpiece. The distressing is exactly as pictured.', date: '2026-07-22' }
    ]
  },
  {
    id: 'ts-02',
    name: 'NEON PROTOCOL',
    price: 450,
    description: {
      fr: 'Standard issue for the underground. Subtle crimson accents on a pitch-black canvas.',
      ar: 'Standard lnass dyal te7t. Lmsat 7emra khfifa f k7ol dlam.'
    },
    sizes: ['S', 'M', 'L'],
    mainImage: 'https://images.unsplash.com/photo-1618354691551-44de113f0164?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1618354691551-44de113f0164?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800'
    ],
    lore: {
      fr: 'An encrypted message woven into the fabric. Only visible under the right spectrum.',
      ar: 'Message mchiffer mensouj f toub. Makayban ghir b ddo lmonasib.'
    },
    reviews: [
      { id: 'r4', user: 'NIGHTRUNNER', rating: 5, comment: 'The crimson accents pop perfectly in low light.', date: '2026-07-01' },
      { id: 'r5', user: 'GLITCH_USER', rating: 4, comment: 'Very stealthy vibe. Runs a bit slim.', date: '2026-06-19' },
      { id: 'r6', user: 'NULL_BYTE', rating: 5, comment: 'Excellent construction. Wash cold to keep the black deep.', date: '2026-07-15' }
    ]
  },
  {
    id: 'ts-03',
    name: 'ECLIPSE HEAVYWEIGHT',
    price: 650,
    description: {
      fr: 'Our thickest garment. Built to withstand the elements and the passage of time. Minimalist drop-shoulder design.',
      ar: 'Aghled toub 3endna. Mkhdoum bash ysbber lwa9t. Fssala tay7a simple.'
    },
    sizes: ['M', 'L', 'XL'],
    mainImage: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?auto=format&fit=crop&q=80&w=800'
    ],
    isLimited: true,
    lore: {
      fr: 'When the sun vanishes, we emerge.',
      ar: 'Melli katghber shemsh, kanbano 7na.'
    },
    reviews: [
      { id: 'r7', user: 'OBSIDIAN_TEARS', rating: 5, comment: 'Worth every penny. The drop shoulder sits perfectly.', date: '2026-07-15' },
      { id: 'r8', user: 'BLCK_OUT', rating: 5, comment: 'Heavy, durable, dark. Exactly what I wanted.', date: '2026-07-10' },
      { id: 'r9', user: 'VOID_ENTITY', rating: 4, comment: 'Super thick, almost feels like a sweater. Great for winter.', date: '2026-07-20' }
    ]
  },
  {
    id: 'ts-04',
    name: 'SILENT NOISE',
    price: 400,
    description: {
      fr: 'A tribute to the static. Features a subtle, tonal print that only reveals itself in motion.',
      ar: 'Ta7iya l hodou2. Fih tba3a khfifa katban ghir melli kat7errek.'
    },
    sizes: ['S', 'M', 'L', 'XL'],
    mainImage: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=800&sat=-100',
    images: [
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=800&sat=-100',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&q=80&w=800&sat=-100'
    ],
    isNew: true,
    lore: {
      fr: 'The loudest thoughts are the ones never spoken.',
      ar: 'A3la l2afkar hiya li 3mrha matgalet.'
    },
    reviews: [
      { id: 'r10', user: 'STATIC_WAVE', rating: 5, comment: 'The tonal print effect is mind-blowing in real life.', date: '2026-07-21' },
      { id: 'r11', user: 'HUSH_99', rating: 4, comment: 'Very subtle. The material is super breathable.', date: '2026-07-18' },
      { id: 'r12', user: 'DATA_GHOST', rating: 5, comment: 'Perfect execution of a minimalist graphic tee.', date: '2026-07-25' }
    ]
  },
  {
    id: 'ts-05',
    name: 'CIPHER BOX TEE',
    price: 500,
    description: {
      fr: 'Boxy fit, cropped slightly at the hem. Perfect structural silhouette for layering.',
      ar: 'Fssala mrbe3a u 9sira shwiya men lte7t. Fssala wa9fa mzyana bash telbessha fo9 7wayej khrin.'
    },
    sizes: ['S', 'M'],
    mainImage: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=800'
    ],
    reviews: [
      { id: 'r13', user: 'GHOST_IN_SHELL', rating: 4, comment: 'Love the crop. A bit stiff at first, softens after washing.', date: '2026-05-20' },
      { id: 'r14', user: 'SYS_ADMIN', rating: 5, comment: 'The boxy proportions are mathematically perfect.', date: '2026-06-11' },
      { id: 'r15', user: 'NEO_TOKYO', rating: 5, comment: 'My go-to layering piece now. So versatile.', date: '2026-07-02' }
    ]
  },
  {
    id: 'ts-06',
    name: 'THE INITIATE',
    price: 350,
    description: {
      fr: 'The entry point into the Red Cipher ecosystem. Clean, unmarked, flawless construction.',
      ar: 'Lbidaya dyal 3alam Red Cipher. Simple, n9a u mafihsh zwa9, mkhdoum mzyan.'
    },
    sizes: ['S', 'M', 'L', 'XL'],
    mainImage: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?auto=format&fit=crop&q=80&w=800'
    ],
    lore: {
      fr: 'Step across the threshold.',
      ar: 'Khtta l3tba u dkhol.'
    },
    reviews: [
      { id: 'r16', user: 'ANON_USER', rating: 5, comment: 'The perfect basic tee.', date: '2026-06-25' },
      { id: 'r17', user: 'VOID_SEEKER', rating: 4, comment: 'Good quality, but I prefer the heavyweight options.', date: '2026-04-10' },
      { id: 'r18', user: 'NEW_BLOOD', rating: 5, comment: 'Great introduction to the brand. Flawless stitching.', date: '2026-07-08' }
    ]
  },
  {
    id: 'ts-07',
    name: 'DATA BREACH HOODIE',
    price: 850,
    description: {
      fr: 'Premium heavy cotton hoodie. Features distressed edges and an oversized hood to maintain anonymity.',
      ar: 'Hoodie 9tn ghled mkhdoum mzyan. Fih hwayj m9t3in u hood kbir bach tkhbi wejhek.'
    },
    sizes: ['M', 'L', 'XL', 'XXL'],
    mainImage: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1509319117193-57bab727e09d?auto=format&fit=crop&q=80&w=800'
    ],
    isNew: true,
    lore: {
      fr: 'Leave no trace behind.',
      ar: 'Makhli hta aatara morak.'
    },
    reviews: [
      { id: 'r19', user: 'HACK_NET', rating: 5, comment: 'The oversized hood is incredible. Total privacy.', date: '2026-07-22' },
      { id: 'r20', user: 'PROXY_WAR', rating: 5, comment: 'Distressed details look authentic. Very heavy and warm.', date: '2026-07-15' },
      { id: 'r21', user: 'ZERO_DAY', rating: 4, comment: 'Runs a bit larger than expected, but fits the aesthetic perfectly.', date: '2026-07-05' }
    ]
  },
  {
    id: 'ts-08',
    name: 'GHOST SHELL JACKET',
    price: 1200,
    description: {
      fr: 'Lightweight technical jacket. Water-resistant matte finish with hidden tactical pockets.',
      ar: 'Jacket khfifa techniciya. Modada lma u fiha jyab mkhabyin.'
    },
    sizes: ['S', 'M', 'L'],
    mainImage: 'https://images.unsplash.com/photo-1559551408-df8090bc1f37?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1559551408-df8090bc1f37?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1559551408-df8090bc1f37?auto=format&fit=crop&q=80&w=800'
    ],
    isLimited: true,
    lore: {
      fr: 'Adapted for the urban sprawl. Remain unseen.',
      ar: 'M9ada llmdina. B9a mkhbi.'
    },
    reviews: [
      { id: 'r22', user: 'STREET_SAMURAI', rating: 5, comment: 'Incredible details, fits perfectly.', date: '2026-07-20' },
      { id: 'r23', user: 'NEON_SHADOW', rating: 5, comment: 'Water-resistant tech works flawlessly in the rain.', date: '2026-07-12' },
      { id: 'r24', user: 'R0N1N', rating: 4, comment: 'Pockets are deep and secure. Great piece.', date: '2026-06-30' }
    ]
  },
  {
    id: 'ts-09',
    name: 'SYSTEM OVERRIDE CARGO',
    price: 950,
    description: {
      fr: 'Articulated cargo pants with modular strap system. Built for mobility in the concrete jungle.',
      ar: 'Srawal cargo b système dyal ssemtat modular. M9ad l7araka f lmdina.'
    },
    sizes: ['28', '30', '32', '34'],
    mainImage: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1517423568366-8b83523034fd?auto=format&fit=crop&q=80&w=800'
    ],
    lore: {
      fr: 'Break the routine. Forge your own path.',
      ar: 'Ksser l3ada. Sme3 tri9ek b ydek.'
    },
    reviews: [
      { id: 'r25', user: 'URBAN_NINJA', rating: 5, comment: 'The articulation on the knees is next level.', date: '2026-07-24' },
      { id: 'r26', user: 'PARKOUR_001', rating: 5, comment: 'Super mobile. The straps actually serve a function.', date: '2026-07-16' },
      { id: 'r27', user: 'TECHWEAR_GOD', rating: 4, comment: 'Amazing silhouette, wish there were more colors.', date: '2026-07-02' }
    ]
  },
  {
    id: 'ts-10',
    name: 'DARK MATTER BEANIE',
    price: 250,
    description: {
      fr: 'Chunky knit beanie made from 100% merino wool. Essential gear for cold nights.',
      ar: 'Trbouch sgheikh mensouj 100% men souf dyal merino. Darouri l layali lbarda.'
    },
    sizes: ['OS'],
    mainImage: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1558234857-789a744cb89a?auto=format&fit=crop&q=80&w=800'
    ],
    isNew: true,
    reviews: [
      { id: 'r28', user: 'FROST_BYTE', rating: 5, comment: 'Merino wool is so soft and warm. Doesn\'t itch.', date: '2026-07-21' },
      { id: 'r29', user: 'WINTER_MUTE', rating: 5, comment: 'Perfect fit. Stays firmly on the head.', date: '2026-07-11' },
      { id: 'r30', user: 'COLD_SNAP', rating: 4, comment: 'Very thick. Definitely for deep winter.', date: '2026-06-25' }
    ]
  },
  {
    id: 'ts-11',
    name: 'ONYX LONG SLEEVE',
    price: 480,
    description: {
      fr: 'Minimalist long sleeve tee with extended sleeves and raw hem. A versatile base layer.',
      ar: 'T-shirt bkmam twal simple, kmam twal bzf u lte7t m9te3. Asass mzyan l lbsa dyalek.'
    },
    sizes: ['S', 'M', 'L', 'XL'],
    mainImage: 'https://images.unsplash.com/photo-1618517351616-3898d28c93de?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1618517351616-3898d28c93de?auto=format&fit=crop&q=80&w=800'
    ],
    lore: {
      fr: 'Form follows function, function dictates form.',
      ar: 'Shkel kaytb3 lwezifa, lwezifa katchret shkel.'
    },
    reviews: [
      { id: 'r31', user: 'SHADOW_WORKER', rating: 5, comment: 'The extended sleeves stack perfectly at the wrist.', date: '2026-07-19' },
      { id: 'r32', user: 'CORE_DUMP', rating: 4, comment: 'Great draping. The raw hem rolls up nicely over time.', date: '2026-07-07' },
      { id: 'r33', user: 'LAYER_0', rating: 5, comment: 'Essential base layer. Buying a second one.', date: '2026-06-28' }
    ]
  },
  {
    id: 'ts-12',
    name: 'GLITCH MATRIX SWEATER',
    price: 700,
    description: {
      fr: 'Jacquard knit sweater with an intricate glitch pattern. Each piece is slightly unique.',
      ar: 'Trikou mensouj b tba3a dyal glitch mkhabl. Koul wahed mkhtalef shwiya.'
    },
    sizes: ['S', 'M', 'L'],
    mainImage: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800'
    ],
    isLimited: true,
    lore: {
      fr: 'Imperfection is the only reality.',
      ar: 'Lna9s howa l7a9i9a lwe7ida.'
    },
    reviews: [
      { id: 'r34', user: 'NEO_AWAKENED', rating: 4, comment: 'Crazy pattern, extremely warm.', date: '2026-01-11' },
      { id: 'r35', user: 'ARTIFACT_HUNTER', rating: 5, comment: 'A piece of wearable art. Gets compliments constantly.', date: '2026-07-23' },
      { id: 'r36', user: 'SYNTH_WEAVER', rating: 5, comment: 'The knit quality is insane. Heavy and substantial.', date: '2026-07-14' }
    ]
  }
];
