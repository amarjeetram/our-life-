export interface Tool {
    id: string;
    title: string;
    description: string;
    route: string;
    category: ToolCategory;
    iconName?: string;
    tags: string[];
    isPopular?: boolean;
    isNew?: boolean;
    featured?: boolean;
}

export type ToolCategory =
    | "AI Tools"
    | "Image Tools"
    | "Govt Exam Tools"
    | "YouTube Tools"
    | "Instagram Tools"
    | "Calculators"
    | "Unit Converters"
    | "Date & Time Tools"
    | "SEO Tools"
    | "Love & Relationship";

export const CATEGORIES: { id: ToolCategory; label: string; icon: string; count: number; desc: string }[] = [
    { id: "Image Tools", label: "Image Tools", icon: "ImageIcon", count: 12, desc: "Compress, resize, and convert images instantly." },
    { id: "Govt Exam Tools", label: "Govt Exam Tools", icon: "ShieldCheck", count: 8, desc: "Official photo & signature presets for SSC, UPSC, NEET, RRB & PAN." },
    { id: "YouTube Tools", label: "YouTube Tools", icon: "Youtube", count: 5, desc: "Extract tags, titles, descriptions & design channel art." },
    { id: "Instagram Tools", label: "Instagram Tools", icon: "Instagram", count: 4, desc: "Generate catchy bios, hashtags & profile tools." },
    { id: "Calculators", label: "Calculators", icon: "Calculator", count: 10, desc: "Math, gaming, Blooket & GPA calculators." },
    { id: "Unit Converters", label: "Unit Converters", icon: "ArrowLeftRight", count: 6, desc: "Convert MB to KB, GB to MB, storage & digital units." },
    { id: "Date & Time Tools", label: "Date & Time Tools", icon: "Calendar", count: 6, desc: "Calculate days from today, date differences & deadlines." },
    { id: "SEO Tools", label: "SEO Tools", icon: "Search", count: 4, desc: "Website audit, keyword research & web utilities." },
    { id: "Love & Relationship", label: "Love & Fun", icon: "Heart", count: 5, desc: "Couple name maker, FLAMES & love percentage calculators." },
    { id: "AI Tools", label: "AI Tools", icon: "Sparkles", count: 4, desc: "AI prompt generators & intelligent tools." },
];

export const ALL_TOOLS: Tool[] = [
    // Image Tools
    {
        id: "image-compressor-20kb",
        title: "Image Compressor to 20KB",
        description: "Perfect for UPSC, SSC & govt portals. Guaranteed compression under 20KB without quality loss.",
        route: "/image-compressor-to-20kb",
        category: "Image Tools",
        tags: ["UPSC", "SSC", "Compression", "Govt"],
        isPopular: true,
        featured: true,
    },
    {
        id: "compress-image-50kb",
        title: "Compress Image to 50KB",
        description: "Shrink images down to 50KB for online forms and job applications.",
        route: "/compress-image-to-50kb",
        category: "Image Tools",
        tags: ["Forms", "Compression", "50KB"],
        isPopular: true,
    },
    {
        id: "compress-image-100kb",
        title: "Compress Image to 100KB",
        description: "Standard high-quality compression for professional document uploads and passport photos.",
        route: "/compress-image-to-100kb",
        category: "Image Tools",
        tags: ["Documents", "Passport", "100KB"],
        featured: true,
    },
    {
        id: "compress-image-200kb",
        title: "Compress Image to 200KB",
        description: "Optimized compression for HD images required by official web portals.",
        route: "/compress-image-to-200kb",
        category: "Image Tools",
        tags: ["HD", "Images", "200KB"],
    },
    {
        id: "photo-compressor-30kb",
        title: "Photo Compressor to 30KB",
        description: "Strictly under 30KB photo resizer for state exam compliance.",
        route: "/photo-compressor-to-30kb",
        category: "Image Tools",
        tags: ["Compliance", "30KB", "State Exams"],
    },
    {
        id: "mb-to-kb-image-converter",
        title: "MB to KB Image Converter",
        description: "Shrink massive megabyte photos down to lightweight kilobytes instantly in browser.",
        route: "/mb-to-kb-image-converter",
        category: "Image Tools",
        tags: ["Converter", "MB to KB", "Browser"],
        isPopular: true,
        featured: true,
    },

    // Govt Exam Tools
    {
        id: "signature-resize",
        title: "Signature Resizer",
        description: "Resize your signature to exact pixel dimensions & KB limits for UPSC, SSC & IBPS.",
        route: "/govt-exam-tools/signature-resize",
        category: "Govt Exam Tools",
        tags: ["Signature", "UPSC", "SSC", "IBPS"],
        isPopular: true,
        featured: true,
    },
    {
        id: "pan-card-photo-resize",
        title: "PAN Card Photo Resizer",
        description: "Resize photo and signature for UTI / NSDL PAN Card applications (213x213px preset).",
        route: "/govt-exam-tools/pan-card-photo-resize",
        category: "Govt Exam Tools",
        tags: ["PAN Card", "UTI", "NSDL", "213x213"],
        isPopular: true,
        featured: true,
    },
    {
        id: "neet-photo-resizer",
        title: "NEET Photo Resizer",
        description: "Resize passport & postcard size photos for NEET 2026. Official dimensions & KB limits.",
        route: "/govt-exam-tools/neet-photo-resizer",
        category: "Govt Exam Tools",
        tags: ["NEET 2026", "NTA", "Postcard Photo"],
        featured: true,
    },
    {
        id: "rrb-signature-resizer",
        title: "RRB Signature Resizer",
        description: "Resize signature to exact 140x60 pixels and 10-20KB for Railway recruitment exams.",
        route: "/govt-exam-tools/rrb-signature-resizer",
        category: "Govt Exam Tools",
        tags: ["RRB", "Railway", "140x60"],
    },
    {
        id: "uti-photo-resize",
        title: "UTI Photo Resize",
        description: "Crop and resize photo for UTI PAN portal with official dimensions.",
        route: "/govt-exam-tools/uti-photo-resize",
        category: "Govt Exam Tools",
        tags: ["UTI", "PAN", "Crop"],
    },
    {
        id: "tnpsc-photo-compressor",
        title: "TNPSC Photo Compressor",
        description: "Compress TNPSC photo (20-50KB) and signature (10-20KB) as per TNPSC requirements.",
        route: "/govt-exam-tools/tnpsc-photo-compressor",
        category: "Govt Exam Tools",
        tags: ["TNPSC", "Tamil Nadu", "Govt Exam"],
    },

    // YouTube Tools
    {
        id: "youtube-tag-extractor",
        title: "YouTube Tag Extractor",
        description: "Extract SEO-optimized tags from any YouTube video to boost your video ranking.",
        route: "/youtube-tag-extractor",
        category: "YouTube Tools",
        tags: ["SEO", "Tags", "Video Growth"],
        isPopular: true,
        featured: true,
    },
    {
        id: "youtube-banner-maker",
        title: "YouTube Banner Maker (1024x576)",
        description: "Resize images to perfect 1024x576 YouTube channel art banner size instantly.",
        route: "/youtube-tools/1024x576-youtube-banner-maker",
        category: "YouTube Tools",
        tags: ["Banner", "Channel Art", "1024x576"],
        featured: true,
    },
    {
        id: "youtube-description-extractor",
        title: "YouTube Description Extractor",
        description: "Extract complete video descriptions, tags & title details for SEO research.",
        route: "/youtube-description-extractor",
        category: "YouTube Tools",
        tags: ["Description", "SEO Research"],
    },
    {
        id: "youtube-title-extractor",
        title: "YouTube Title Extractor",
        description: "Copy and analyze YouTube video titles for competitor research.",
        route: "/youtube-title-extractor",
        category: "YouTube Tools",
        tags: ["Title", "Competitor"],
    },

    // Instagram Tools
    {
        id: "instagram-bio-generator",
        title: "Instagram Bio Generator",
        description: "Generate catchy, stylish bios with emojis for Instagram profiles in seconds.",
        route: "/instagram-tools/instagram-bio-generator",
        category: "Instagram Tools",
        tags: ["Bio", "Instagram", "Social"],
        isPopular: true,
        featured: true,
    },

    // Calculators
    {
        id: "blooket-calculator",
        title: "Blooket Token & Pack Calculator",
        description: "Calculate exact token costs and pull probabilities for rare and chroma blooks in Blooket 2026.",
        route: "/calculators/blooket-calculator",
        category: "Calculators",
        tags: ["Blooket", "Gaming", "Probability"],
        isPopular: true,
        featured: true,
    },
    {
        id: "derivative-calculator",
        title: "Derivative Calculator",
        description: "Free online symbolic derivative calculator. Compute derivatives step-by-step.",
        route: "/calculators/derivative-calculator",
        category: "Calculators",
        tags: ["Calculus", "Math", "Symbolic"],
    },
    {
        id: "integral-calculator",
        title: "Integral Calculator",
        description: "Compute indefinite and definite integrals with instant symbolic step solutions.",
        route: "/calculators/integral-calculator",
        category: "Calculators",
        tags: ["Integral", "Calculus", "Math"],
    },
    {
        id: "cgpa-calculator",
        title: "CGPA Calculator",
        description: "Universal CGPA to percentage and grade point calculator for college & school students.",
        route: "/cgpa-calculator",
        category: "Calculators",
        tags: ["CGPA", "GPA", "Education"],
        isPopular: true,
    },
    {
        id: "gpa-to-cgpa-calculator",
        title: "GPA to CGPA Calculator",
        description: "Convert grade point average to cumulative grade point average accurately.",
        route: "/gpa-to-cgpa-calculator",
        category: "Calculators",
        tags: ["GPA", "CGPA", "Grades"],
    },

    // Unit Converters
    {
        id: "mb-to-kb-unit-converter",
        title: "MB to KB Unit Converter",
        description: "Convert megabytes to kilobytes instantly. 1 MB = 1,024 KB.",
        route: "/unit-converters/mb-to-kb",
        category: "Unit Converters",
        tags: ["MB to KB", "Storage", "Data"],
        isPopular: true,
        featured: true,
    },
    {
        id: "gb-to-mb-converter",
        title: "GB to MB Converter",
        description: "Convert gigabytes to megabytes accurately for digital storage planning.",
        route: "/unit-converters/gb-to-mb",
        category: "Unit Converters",
        tags: ["GB to MB", "Data", "Storage"],
    },

    // Date & Time Tools
    {
        id: "days-from-today",
        title: "Days From Today Calculator",
        description: "Calculate what exact date will be X days from today instantly.",
        route: "/date-time-tools/day-calculators/days-from-today",
        category: "Date & Time Tools",
        tags: ["Date", "Future Date", "Planning"],
        isPopular: true,
        featured: true,
    },
    {
        id: "30-days-from-today",
        title: "30 Days From Today",
        description: "Find the exact date 30 days from today for deadlines and billing cycles.",
        route: "/date-time-tools/day-calculators/30-days-from-today",
        category: "Date & Time Tools",
        tags: ["30 Days", "Deadline"],
    },
    {
        id: "date-difference-calculator",
        title: "Date Difference Calculator",
        description: "Calculate exact number of days, weeks & months between any two calendar dates.",
        route: "/date-time-tools/day-calculators/date-difference",
        category: "Date & Time Tools",
        tags: ["Days Between", "Calendar"],
    },
    {
        id: "90-days-from-today",
        title: "90 Days From Today",
        description: "Calculate exact date 90 days (3 months) from today for notice periods.",
        route: "/date-time-tools/day-calculators/90-days-from-today",
        category: "Date & Time Tools",
        tags: ["90 Days", "Quarterly"],
    },

    // SEO Tools
    {
        id: "website-audit",
        title: "Website Audit Tool",
        description: "Analyze SEO, speed, accessibility and performance of any website.",
        route: "/seo-tools/website-audit",
        category: "SEO Tools",
        tags: ["SEO", "Audit", "Website"],
        isPopular: true,
        featured: true,
    },

    // Love & Relationship
    {
        id: "stylish-couple-name-maker",
        title: "Couple Name Maker",
        description: "Blend two names into a stylish, emoji-filled romantic couple name.",
        route: "/stylish-couple-name-maker",
        category: "Love & Relationship",
        tags: ["Couple", "Names", "Romantic"],
        isPopular: true,
        featured: true,
    },
    {
        id: "love-percentage-calculator",
        title: "Love Percentage Calculator",
        description: "Test love compatibility between two names with fun algorithm score.",
        route: "/calculators/fun/love-percentage-calculator-by-name",
        category: "Love & Relationship",
        tags: ["Love", "Compatibility"],
    },
    {
        id: "flames-calculator",
        title: "FLAMES Calculator Online",
        description: "Classic relationship predictor: Friends, Lovers, Affection, Marriage, Enemies, Siblings.",
        route: "/calculators/fun/flames-calculator",
        category: "Love & Relationship",
        tags: ["FLAMES", "Fun Game"],
    },

    // AI Tools
    {
        id: "ai-prompts-generator",
        title: "AI Prompt Studio",
        description: "Generate optimized ChatGPT, Gemini & Midjourney prompts for maximum quality results.",
        route: "/ai-prompts",
        category: "AI Tools",
        tags: ["ChatGPT", "Gemini", "Prompts"],
        isNew: true,
        featured: true,
    },
];
