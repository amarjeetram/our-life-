import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "180+ Stylish Instagram Bio for Boys with Attitude (2026)",
  description: "Find 180+ best Instagram bio for boys — stylish, attitude, Hindi, English, funny, aesthetic & hobby-based bios. Copy, paste & own your profile today.",
  keywords: [
    "instagram bio for boys",
    "bio for instagram for boy",
    "instagram bio for boys attitude",
    "stylish bio for instagram for boy",
    "instagram bio for boys stylish",
    "instagram bio for boys simple",
    "instagram bio for boys hindi",
    "instagram bio for boys english",
    "instagram bio for boys attitude stylish",
    "instagram bio for boys in hindi",
    "simple instagram bio for boys",
  ],
  alternates: { canonical: "https://smarttoolswala.com/blog/stylish-instagram-bio-for-boys" },
  openGraph: {
    title: "180+ Stylish Instagram Bio for Boys with Attitude (2026)",
    description: "Find 180+ best Instagram bio for boys — stylish, attitude, Hindi, English, funny, aesthetic & hobby-based bios. Copy, paste & own your profile today.",
    url: "https://smarttoolswala.com/blog/stylish-instagram-bio-for-boys",
    type: "article",
  },
};

const CSS = `
  .bio-page { max-width: 860px; margin: 0 auto; padding: 120px 16px 80px; font-family: system-ui, -apple-system, sans-serif; }
  .page-h1 { font-size: clamp(1.7rem, 4vw, 2.5rem); font-weight: 900; color: #1a1a2e; margin: 0 0 8px; line-height: 1.25; letter-spacing: -0.02em; }
  .page-subtitle { font-size: 1rem; color: #666; margin: 0 0 24px; font-weight: 500; }
  h2.sec { font-size: clamp(1.35rem, 3vw, 1.9rem); font-weight: 850; color: #1a1a2e; margin: 3.2rem 0 1.2rem; border-left: 5px solid #2563eb; padding-left: 16px; letter-spacing: -0.02em; line-height: 1.3; }
  h3.sub { font-size: clamp(1.05rem, 2.3vw, 1.3rem); font-weight: 750; color: #2d2d44; margin: 2rem 0 0.7rem; }
  p.txt { font-size: 1.05rem; line-height: 1.85; color: #3d3d5c; margin-bottom: 1.2rem; }
  ul.ul, ol.ol { padding-left: 1.5rem; margin-bottom: 1.2rem; }
  ul.ul li, ol.ol li { font-size: 1.02rem; line-height: 1.8; color: #3d3d5c; margin-bottom: 6px; }

  .breadcrumb { display: flex; align-items: center; gap: 8px; font-size: 0.9rem; color: #888; margin-bottom: 28px; flex-wrap: wrap; }
  .breadcrumb a { color: #2563eb; text-decoration: none; font-weight: 600; }

  .author-box { display: flex; align-items: center; gap: 16px; background: white; border: 1.5px solid #dbeafe; border-radius: 18px; padding: 24px; margin: 24px 0; }
  .author-name { margin: 0; font-weight: 800; color: #1a1a2e; }
  .author-meta { margin: 0; color: #666; font-size: 0.85rem; }
  .author-avatar { width: 56px; height: 56px; border-radius: 50%; background: linear-gradient(135deg, #2563eb, #7c3aed); display: flex; align-items: center; justify-content: center; color: white; font-size: 1.5rem; font-weight: 900; flex-shrink: 0; }

  .stats-bar { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin: 32px 0; }
  @media (max-width: 640px) { .stats-bar { grid-template-columns: 1fr; } }
  .stat-card { background: white; border: 1.5px solid #dbeafe; border-radius: 16px; padding: 20px; text-align: center; box-shadow: 0 4px 12px rgba(37,99,235,0.04); }
  .stat-num { font-size: 2.2rem; font-weight: 900; background: linear-gradient(135deg, #2563eb, #7c3aed); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
  .stat-label { font-size: 0.9rem; color: #666; margin-top: 6px; font-weight: 700; }

  .toc-box { background: linear-gradient(135deg, #eff6ff 0%, #f5f3ff 100%); border-radius: 20px; border: 1.5px solid #bfdbfe; padding: 28px; margin: 32px 0; }
  .toc-box h2 { margin-top: 0; font-size: 1.15rem; color: #2563eb; font-weight: 800; border: none; padding: 0; margin-bottom: 18px; display: flex; align-items: center; gap: 8px; }
  .toc-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; }
  @media (max-width: 600px) { .toc-grid { grid-template-columns: 1fr; } }
  .toc-item { display: flex; align-items: center; gap: 10px; padding: 10px 14px; border-radius: 12px; background: rgba(255,255,255,0.6); border: 1px solid rgba(37,99,235,0.12); text-decoration: none; transition: all 0.2s; font-size: 0.9rem; font-weight: 600; color: #1e3a8a; }
  .toc-item:hover { background: rgba(37,99,235,0.08); border-color: rgba(37,99,235,0.3); transform: translateX(3px); color: #2563eb; }
  .toc-icon { font-size: 1.1rem; flex-shrink: 0; }
  .toc-item span:nth-child(2) { flex: 1; }
  .toc-arrow { color: #2563eb; opacity: 0.5; transition: opacity 0.2s, transform 0.2s; }
  .toc-item:hover .toc-arrow { opacity: 1; transform: translateX(3px); }

  .tip-box { background: linear-gradient(135deg, #eff6ff 0%, #f5f3ff 100%); border-left: 4px solid #2563eb; border-radius: 14px; padding: 20px 24px; margin: 24px 0; }
  .tip-box.tip-blue { border-left-color: #2563eb; }
  .tip-box p { margin: 0; font-size: 1rem; color: #3d3d5c; line-height: 1.7; }

  .bio-card { background: white; border: 1.5px solid #dbeafe; border-radius: 16px; padding: 22px 26px; margin-bottom: 18px; position: relative; transition: box-shadow 0.2s, border-color 0.2s; }
  .bio-card:hover { box-shadow: 0 6px 24px rgba(37,99,235,0.08); border-color: #93c5fd; }
  .bio-card-label { font-size: 0.78rem; font-weight: 800; color: #2563eb; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 10px; }
  .bio-card-text { font-size: 1rem; line-height: 1.9; color: #1e293b; white-space: pre-line; font-family: system-ui, sans-serif; }
  .copy-note { font-size: 0.78rem; color: #94a3b8; margin-top: 10px; }

  .bio-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
  @media (max-width: 640px) { .bio-grid { grid-template-columns: 1fr; } }

  .faq-item { border: 1px solid #dbeafe; border-radius: 16px; margin-bottom: 16px; overflow: hidden; background: white; }
  .faq-q { background: linear-gradient(135deg, #eff6ff 0%, #f5f3ff 100%); padding: 18px 24px; font-weight: 750; color: #1a1a2e; font-size: 1.05rem; border-bottom: 1px solid #bfdbfe; margin: 0; }
  .faq-a { background: white; padding: 16px 24px; color: #4a4a6a; font-size: 1rem; line-height: 1.8; }

  .divider { height: 2px; background: linear-gradient(90deg, #2563eb, #7c3aed, #06b6d4); border: none; border-radius: 2px; margin: 48px 0; }

  .tips-list { list-style: none; padding: 0; margin: 16px 0; }
  .tips-list li { display: flex; gap: 12px; align-items: flex-start; padding: 10px 0; border-bottom: 1px solid #eff6ff; font-size: 1.02rem; color: #3d3d5c; line-height: 1.7; }
  .tips-list li::before { content: "✦"; color: #2563eb; flex-shrink: 0; margin-top: 3px; }

  .bio-page-footer { margin-top: 40px; border-top: 1px solid #dbeafe; padding-top: 20px; text-align: center; color: #888; font-size: 0.85rem; }

  /* ── DARK MODE ── */
  .dark .page-h1 { color: #e0eaff; }
  .dark .page-subtitle { color: #a0aec0; }
  .dark h2.sec { color: #e0eaff; border-left-color: #60a5fa; }
  .dark h3.sub { color: #c7d7f0; }
  .dark p.txt { color: #b8c8dc; }
  .dark ul.ul li, .dark ol.ol li { color: #b8c8dc; }
  .dark .breadcrumb { color: #6b7a88; }
  .dark .author-box { background: rgba(255,255,255,0.04); border-color: rgba(37,99,235,0.2); }
  .dark .author-name { color: #e0eaff; }
  .dark .author-meta { color: #8898aa; }
  .dark .stat-card { background: rgba(255,255,255,0.04); border-color: rgba(37,99,235,0.2); }
  .dark .stat-label { color: #90a0b0; }
  .dark .toc-box { background: linear-gradient(135deg, rgba(37,99,235,0.08) 0%, rgba(124,58,237,0.08) 100%); border-color: rgba(37,99,235,0.25); }
  .dark .toc-box h2 { color: #60a5fa; }
  .dark .toc-item { background: rgba(255,255,255,0.04); border-color: rgba(37,99,235,0.15); color: #c0d0e0; }
  .dark .toc-item:hover { background: rgba(37,99,235,0.1); border-color: rgba(37,99,235,0.3); color: #60a5fa; }
  .dark .toc-arrow { color: #60a5fa; }
  .dark .tip-box { background: rgba(37,99,235,0.08); }
  .dark .tip-box p { color: #b0c4dc; }
  .dark .bio-card { background: rgba(255,255,255,0.04); border-color: rgba(37,99,235,0.18); }
  .dark .bio-card:hover { border-color: rgba(37,99,235,0.35); box-shadow: 0 6px 24px rgba(0,0,0,0.3); }
  .dark .bio-card-text { color: #c8daee; }
  .dark .bio-card-label { color: #60a5fa; }
  .dark .copy-note { color: #607080; }
  .dark .faq-item { background: rgba(255,255,255,0.03); border-color: rgba(37,99,235,0.2); }
  .dark .faq-q { background: rgba(37,99,235,0.08); color: #e0eaff; border-bottom-color: rgba(37,99,235,0.15); }
  .dark .faq-a { background: rgba(255,255,255,0.02); color: #a0b4c8; }
  .dark .tips-list li { color: #b8c8dc; border-bottom-color: rgba(37,99,235,0.1); }
  .dark .bio-page-footer { border-top-color: rgba(37,99,235,0.2); color: #60708090; }
`;

function BioCard({ num, text }: { num: number; text: string }) {
  return (
    <div className="bio-card">
      <div className="bio-card-label">Bio {num}</div>
      <div className="bio-card-text">{text}</div>
      <div className="copy-note">📋 Copy &amp; paste ready</div>
    </div>
  );
}

const SIMPLE_BIOS = [
  `😎 Simple Guy, Real Thoughts
📖 Reader by habit
☕ Coffee first, everything else later
🎯 Focused on my own lane
❤️ Family above everything
🙏 Grateful every single day`,

  `🌅 Early riser, big dreamer
🏠 Home is where my people are
🎧 Music helps me think
💪 Working on myself daily
📍 Small town, big goals
🔥 Still figuring it out — and that's okay`,

  `👟 Sneakers and silence
🌿 Nature over noise
🍕 Food is always the answer
📷 Capturing everyday moments
💭 Mind full, heart full
🙌 Living, not just existing`,

  `📱 Not always online, always alive
🎮 Gamer on weekends
🚶 Long walks clear my head
💡 Ideas over impressions
❤️ Mom's favourite boy
🌙 Night owl by nature`,

  `🤝 Real one, rare breed
📚 Learning something new every month
🎯 Chasing goals, not clout
☕ Tea person in a coffee world
💬 Less words, more meaning
😌 Content and consistent`,

  `🌱 Growing every single day
🏏 Cricket on weekends
🎵 Playlist always on shuffle
💙 Honest to the bone
🙏 Faith keeps me going
😎 Just me, nothing more`,

  `🐾 Animal lover first
🎨 Creative at odd hours
☀️ Optimist even on tough days
📖 Currently reading: life
🙏 God's plan beats mine always
😊 Simple guy, solid character`,

  `🌄 Sunrise energy, midnight thoughts
🧠 Overthinker with good intentions
🍉 Fruit over junk food always
📍 Somewhere between a dream and reality
💪 Gym three days a week, at least
🔒 Private circle, public profile`,
];

const ATTITUDE_BIOS = [
  `🗿 I don't explain myself
💥 Results speak louder than words
🔥 Pressure makes diamonds
😎 Built different, not better
👊 Respect is earned, not asked
⚡ Watch how I move`,

  `👑 Not everyone gets access to me
😏 Selective with my energy
🏆 I compete with yesterday's me
🧊 Cool when provoked
🔥 Fire when motivated
💀 Underestimate me — I dare you`,

  `🚫 Not here to impress
✅ Here to progress
💣 Silent but explosive
🔒 Trust is a privilege, not a right
🎯 One target at a time
🗿 Unbothered. Focused. Built.`,

  `😤 I don't do fake
🧠 Think before you approach me
💪 Hard work is my style
🛡️ Ego? No. Confidence? Always.
🌪️ Storm in human form
👁️ I see everything`,

  `⚔️ I walk alone but I walk far
🔕 Silence is my loudest answer
💼 Business before everything
🏔️ Pressure? I am made of it
🦅 Eagles don't flock
🔥 The fire inside me is real`,

  `🧱 Built on failures no one saw
💡 Ideas in the dark, results in daylight
😎 Unbothered by opinions
🏋️ Discipline is my attitude
🌊 Calm on the surface, ocean underneath
🏆 I was never supposed to make it — yet here I am`,

  `💀 I don't hold grudges
🕐 I just remember faces
🔥 My patience has limits
🧊 My anger is ice cold
🎯 Every move is calculated
👑 I don't rush — I arrive`,

  `🌑 Dark side exists, never shown
🔮 Trust the process, not the timeline
⚡ Energy cannot be faked
🗿 Stone-faced for a reason
💪 Built in silence
🔥 Revealed in results`,
];

const COOL_BIOS = [
  `🎧 Vibes on max
☕ Coffee and conversations
🌍 Curious about everything
📸 Shoot first, caption later
😎 Cool enough to ignore the noise
🎯 Moving with purpose`,

  `🏄 Going with the flow but knowing the direction
🎵 Music in everything I do
🌅 Golden hour person
🤙 Low maintenance, high standards
💡 Always thinking
🔋 Recharged by good people`,

  `🛹 Street style, real mind
🎮 Games, goals, grind
🍔 Eating well is self-respect
📱 Offline more than you think
🌙 Midnight thoughts hit different
😎 Too cool to overthink it`,

  `⚡ Fast thinker, slow talker
🎯 Precision over speed
🌊 Water energy — adaptable
🤍 White sneakers and real talk
📷 Life through a lens
🔥 Always something cooking`,

  `🧃 Fresh perspective daily
🌿 Nature first, phone second
🎨 Creativity is currency
🤝 Loyalty is my language
📚 Bookmarked in someone's memory
😌 Calm is the new cool`,

  `🎤 Speaks only when worth it
🌃 City lights at night
☕ Morning person building night plans
🏆 Winning quietly
🔇 Less noise, more output
🤙 Catch me when I'm free`,

  `🌐 Global mindset, local roots
💬 Authentic conversations only
🎯 Every day is a new target
🧠 Brain runs 24/7
🏋️ Body follows the mind
😎 Too real to be anything else`,

  `🌟 Not famous, just focused
🎵 Playlist heavier than my problems
🚗 Long drives solve everything
💭 Thoughts run deep
🤝 My circle is small and solid
🔥 Quietly becoming who I need to be`,
];

const STYLISH_BIOS = [
  `❣☬●▬▬๑♦️๑▬▬●☬❣
👑 𝐑𝐨𝐲𝐚𝐥 𝐀𝐭𝐭𝐢𝐭𝐮𝐝𝐞
😎 𝐈 𝐝𝐨𝐧'𝐭 𝐜𝐨𝐦𝐩𝐞𝐭𝐞
🏆 𝐈 𝐝𝐨𝐦𝐢𝐧𝐚𝐭𝐞
🗿 𝐋𝐞𝐬𝐬 𝐭𝐚𝐥𝐤
💥 𝐌𝐨𝐫𝐞 𝐚𝐜𝐭𝐢𝐨𝐧
❣☬●▬▬๑♦️๑▬▬●☬❣`,

  `━━━━━━━━━━━━━━━
🔥 ᴮᵁᴵᴸᵀ ᴵᴺ ˢᴵᴸᴱᴺᶜᴱ
⚡ ᴿᴱᵛᴱᴬᴸᴱᴰ ᴵᴺ ᴿᴱˢᵁᴸᵀˢ
💎 ᴺᴼ ᴱˣᶜᵁˢᴱˢ. ᴶᵁˢᵀ ᵂᴼᴿᴷ.
━━━━━━━━━━━━━━━`,

  `𝓢𝓽𝔂𝓵𝓮 𝓲𝓼 𝓪 𝓵𝓪𝓷𝓰𝓾𝓪𝓰𝓮
😎 𝓘 𝓼𝓹𝓮𝓪𝓴 𝓲𝓽 𝓯𝓵𝓾𝓮𝓷𝓽𝓵𝔂
🔥 𝓝𝓸 𝓰𝓾𝓲𝓭𝓮, 𝓳𝓾𝓼𝓽 𝓿𝓲𝓫𝓮𝓼
👑 𝓐𝓵𝔀𝓪𝔂𝓼 𝓸𝓷 𝓶𝔂 𝓸𝔀𝓷 𝓵𝓮𝓿𝓮𝓵`,

  `⋆.˚ 🌙 𝗡𝗶𝗴𝗵𝘁 𝗠𝗼𝗱𝗲 𝗔𝗰𝘁𝗶𝘃𝗲
💻 𝗕𝘂𝗶𝗹𝗱𝗶𝗻𝗴 𝘀𝗼𝗺𝗲𝘁𝗵𝗶𝗻𝗴 𝗿𝗲𝗮𝗹
🎯 𝗠𝗶𝗻𝗱 𝗼𝗻 𝘁𝗵𝗲 𝗴𝗼𝗮𝗹
🔕 𝗦𝗶𝗹𝗲𝗻𝗰𝗲 𝗶𝘀 𝗴𝗼𝗹𝗱
⋆.˚ ✨`,

  `◈ ᴬᴳᴵᴿᴸ ᴿᴱᴬᴸ ᴳᵁʸ ◈
💯 ɴᴏ ꜰᴀᴋᴇ ᴘᴇʀꜱᴏɴᴀ
🔥 ᴊᴜꜱᴛ ᴘᴜʀᴇ ɢʀɪɴᴅ
👊 ᴍᴇ ᴀɴᴅ ᴍʏ ᴀᴍʙɪᴛɪᴏɴꜱ
◈━━━━━━━━━━━━◈`,

  `꧁ 𝕭𝖔𝖗𝖓 𝖙𝖔 𝕭𝖊 𝖁𝖆𝖑𝖚𝖆𝖇𝖑𝖊 ꧂
😎 Not here to fit in
💎 Quality over quantity always
🔥 Fuelled by rejection
👑 The upgrade never stops`,

  `𝙼𝚢 𝚟𝚒𝚋𝚎 ≠ 𝚢𝚘𝚞𝚛 𝚟𝚒𝚋𝚎
⚡ And that's completely fine
🧊 Ice cold with real ones
🔥 Warm heart inside
🎯 Purpose-driven since day one`,

  `▓▓▓ 𝗦𝗧𝗔𝗧𝗨𝗦: 𝗚𝗥𝗜𝗡𝗗𝗜𝗡𝗚 ▓▓▓
📵 Not available for drama
💼 Available for real moves
🧠 Mind sharp, goals clear
⏳ Every second counts`,
];

const VIP_BIOS = [
  `👑 Not everyone can sit at my table
💎 Quality is non-negotiable
🥂 Selective. Classy. Always ready.
🌍 Built for bigger things
🤍 Premium in every detail
🏆 VIP isn't a title — it's a standard`,

  `🎩 Gentleman by nature
💰 Building wealth in silence
🌐 Thinking globally, acting precisely
🥃 Single malt and sharp decisions
🔒 Privacy is a luxury I protect
💎 Rare. Refined. Ready.`,

  `✦ Class is permanent
🛫 Destinations over excuses
🤍 Well-dressed, well-read
🧭 Compass always pointing forward
💼 Business is my lifestyle
👑 Excellence is the baseline`,

  `🌙 Understated luxury
💡 Brilliant in boardrooms and silence
📖 Reads more than he posts
🧊 Cool under every kind of pressure
🎯 Every decision has intention
🔱 Not for everyone — and okay with that`,

  `⌚ Time is the real currency
💼 Every room I enter, I belong in
🤍 Minimalist in everything
🧠 IQ higher than my follower count
🌍 The world is my office
👑 Quiet confidence. Loud results.`,

  `🏛️ Built on principles, not trends
🍷 Taste everything with class
🎓 Education before entertainment
✈️ Passport full, mind fuller
🤝 My handshake is my contract
💎 Precious things come without price tags`,

  `🕊️ Peaceful but powerful
🏠 My home, my rules
🌟 Not chasing stars — becoming one
💰 Financial goals, emotional wisdom
🔐 Loyal to very few
👑 The standard is set by me, not them`,

  `⚜️ Old soul, new goals
🧴 Groomed mind, groomed life
📱 Offline more. Richer more.
🌐 Global perspective, personal discipline
💙 Deep connections, shallow social feed
🏆 Quietly winning every single round`,
];

const FUNNY_BIOS = [
  `😅 My plans: 99%
😴 My execution: 1%
🍕 Pizza: 100%
📱 Screen time: concerning
🧠 Potential: untapped
😂 Seriously though, I'm trying`,

  `🤦 Still waiting for the glow-up
📸 My camera roll tells lies
💤 Professional napper
🍕 Gym membership: bought
🏋️ Gym attendance: rare
😂 Send help (and food)`,

  `😎 My confidence > my bank account
🧃 Running on juice and delusion
📖 College student (theoretically)
🎮 Gamer (practically)
😅 Responsible adult? Loading...
🤞 Pray for me`,

  `🤷 Opinion: I have one
📣 Sharing it: when asked
😤 Unsolicited advice: not welcome
🧠 My brain at 3am: poetry
🧠 My brain at 9am: what
😂 We're managing`,

  `🙄 My vibe is: okay fine whatever
🎯 My aim: excellent
🏹 My execution: depends on the day
😂 My excuses: creative
☕ Coffee dependency: severe
🌟 But the spirit? Unbreakable.`,

  `🐢 Running late since 2002
📸 Photos exist where I don't look terrible
🍕 Pizza solves 80% of problems
😅 Therapy solves the other 20%
🎮 Currently defeating fictional enemies
😂 Real life is on hold`,

  `💡 Full of ideas
😴 Short on energy
🍕 Long on hunger
📅 Calendar: chaotic
🧠 Mind: scattered but brilliant
😂 Results pending`,

  `🤡 Professional overthinker
😎 Amateur at everything else
🎯 Vision: crystal clear
🏋️ Discipline: sometimes
☕ Caffeine: always
😂 Still somehow making it work`,
];

const ENGLISH_BIOS = [
  `🌍 Here for growth, not likes
📖 Reader, thinker, doer
🎯 One goal at a time
☕ Coffee in hand, plan in mind
🤝 Real connections only
⚡ Quietly making moves`,

  `🏙️ City energy, grounded soul
💡 Ideas never stop coming
🎵 Music is the only therapy
🤍 Honest and proud of it
📷 Life is the best content
🌟 Just getting started`,

  `🚀 Ambitious but patient
💬 Words matter — I choose mine
🌿 Simplicity is underrated
🤝 My handshake means something
📚 Always learning
🔥 Fuelled by purpose`,

  `🧠 Mind over everything
💪 Body trained, spirit unbroken
🌅 Every morning is a reset
🎯 Clarity over chaos
🤍 Relationships built on honesty
🌙 Rest is part of the strategy`,

  `⚡ Energy speaks before I do
🎨 Creativity is in my DNA
🌐 Open to the world
💼 Professional in the streets
😌 Relaxed in my own skin
🔥 Becoming, every day`,

  `🏔️ Heights don't scare me — mediocrity does
💡 Think different, act deliberate
🤙 Laid back with ambitious plans
📱 Digital minimalist
☕ Morning rituals are sacred
🌟 Building something worth remembering`,

  `🧭 Direction is everything
🌊 Flowing but not aimless
🎯 Precision in everything I do
🤍 Softness is not weakness
💬 My silence means I'm thinking
🔥 Results are coming`,

  `🌱 Growth every single month
📸 Documenting the journey
🎵 Ears always open to new music
🚴 Movement clears the mind
💙 Depth over drama
🌟 This is only the beginning`,
];

const HINDI_BIOS = [
  `🔥 जो दिखता है वो नहीं होता
😎 जो होता है वो दिखता नहीं
💪 खुद पे भरोसा रख
👑 बाकी सब छोड़ दे
🙏 माँ की दुआ साथ है
⚡ बस चलते रहो`,

  `🗿 मेरी औकात मत आँको
💣 मैं बहुत महंगा पड़ूँगा
😎 Attitude मेरा जन्मजात है
🔥 चाहे जल जाओ — मुझे फर्क नहीं
👑 अपनी दुनिया का मालिक हूँ
💯 बाकी झोल है`,

  `🌙 रात भर सोचता हूँ
☀️ सुबह उठके करता हूँ
💪 यही मेरा routine है
🎯 लक्ष्य तय है मेरा
🙏 महादेव का आशीर्वाद है
🔥 अब रोकने वाला कोई नहीं`,

  `😎 Zindagi apni marzi se
💀 Kisi ke baap se nahi darta
🏆 Mehnat karta hoon, dikhata nahi
🔥 Andar se aag hai
💧 Bahar se shant hoon
👑 Asli Raja tab pata chalta hai jab waqt aata hai`,

  `🙏 Mahadev ka bhakt hoon
⚡ Par kamzor bilkul nahi
💪 Gym ka jadoo chalta hai
🎯 Goal set hai, kaam shuru hai
🌙 Raat ko sochta hoon
☀️ Din ko karta hoon`,

  `🔥 Teri soch meri seema nahi
😏 Tu jo socha — main usse aage hoon
💎 Diamond banta hoon pressure mein
👊 Takkar leni ho toh aa
🏆 Par pehle khud ko dekh
😎 Main apni khabar mein hoon`,

  `🌹 Dil mein pyaar, aankh mein aag
😤 Koi bhi rok nahi sakta
💪 Mehnat meri zubaan hai
🎵 Music meri duniya hai
❤️ Maa ki dua sabse badi hai
🙏 Baki sab Rab pe chhod diya`,

  `💡 Sapne bade hain
😅 Pocket chhoti hai abhi
🔥 Par iraada paakka hai
📚 Padh raha hoon, seekh raha hoon
🏆 Ek din sab dikhaunga
💪 Abhi bas kaam karo`,
];

const AESTHETIC_BIOS = [
  `🌿 Quiet mornings over loud nights
📖 Books and black coffee
🎞️ Film photography enthusiast
🌫️ Fog person. Mountain soul.
🤍 Minimalism as a lifestyle
✦ Less, but better`,

  `🌙 Midnight clarity
🕯️ Candles over neon lights
🎵 Vinyl records and slow walks
📝 Journals more than feeds
🌧️ Rain is my favourite season
🤍 Still. Calm. Present.`,

  `☁️ Soft life, strong mind
🍂 Autumn energy always
📷 Black and white only
🎶 Lo-fi on repeat
🌱 Growing in the background
🤍 Aesthetic is intentional`,

  `🌸 Clean lines, clear mind
☕ Matcha over everything
📚 Three books going simultaneously
🪴 Plants are the best roommates
🌤️ Soft mornings, productive evenings
✦ Curating my own universe`,

  `🌊 Ocean-minded on dry land
🎨 Colours chosen carefully
📸 One perfect shot over ten average ones
🕊️ Peacefulness is the goal
🌿 Organic over artificial
🤍 Beauty in the details`,

  `🌑 Dark academia vibes
📖 Old books, new thoughts
☕ Black coffee, no sugar
🎻 Classical music at midnight
🌙 Philosophical by nature
✦ Form follows feeling`,

  `🏔️ Altitude and solitude
🌫️ Fog on mountain roads
📷 Landscape over selfies
🧥 Muted tones always
🌿 Wild things kept close
🤍 Aesthetic isn't performance — it's identity`,

  `🕯️ Candlelit evenings
📝 Handwritten notes
🌿 Herbs and houseplants
🎵 Instrumentals only while working
☁️ Slow Sundays
🤍 The world runs fast — I don't`,
];

const CRICKET_BIOS = [
  `🏏 Bat in hand, mind in game
🟢 Green pitch or dusty track — I play
🎯 Every ball is a decision
💪 Fitness is non-negotiable
🔥 Passion for the game since childhood
🏆 Team first, always`,

  `🏏 Four runs or wicket — both are lessons
🧢 Cap on, headphones in, warm-up done
💪 Nets every morning, no excuses
🌟 Inspired by the greats
🎯 Playing for more than just scores
🏆 Cricket teaches you life`,

  `🟢 On the field I'm different
😎 Off the field — still me
🏏 Bat talks when I don't
💪 Strength training + cricket = life
🏆 Playing to win, training to improve
🔥 The crease is where I belong`,

  `🎯 Bat straight. Think straight.
🏏 Swing plays — always ready
🧢 Middle stump is the target
💪 Consistency over talent
🌅 Early mornings at practice
🏆 The game humbles you — that's the gift`,

  `🏏 Cricket is my first language
🔥 Pace or spin — bring both
🌟 Idol in every format
🧢 Never stop training
🎯 One more run, one more wicket
💪 Obsessed with improvement`,

  `🟢 Field set. Mind set. Ready.
🏏 Fast bowling? Respect it.
😎 Batting against it? Love it.
💪 Toughest sport builds toughest minds
🏆 District level and climbing
🔥 The pitch is my classroom`,

  `🏏 Been playing since I could walk
🧢 Cricket doesn't care about your mood
💪 Train harder than yesterday
🎯 Dot balls are battles won
🌟 Watch the pros, think like one
🏆 The love for the game never fades`,

  `🔥 Willow and leather — perfect partnership
🏏 Inside-out drive is art
💪 Fitness is the foundation of cricket
🎯 Process over scorecard
🧢 Bad days in cricket = lessons in life
🏆 Still learning, always playing`,
];

const BIKE_BIOS = [
  `🏍️ Born to ride, forced to work
🛣️ The road is the only therapist I need
🔥 Engine roars louder than my problems
⛽ Fuelled by passion, not petrol alone
🧥 Riding jacket > any other outfit
🌅 Sunrise rides hit different`,

  `🏍️ Two wheels, full freedom
🌍 Every highway is a new chapter
🔧 Wrenches and dreams
💨 Speed is honest — it never lies
🛞 Miles over miles, never enough
🔥 Bike is family`,

  `🛣️ Roads I haven't taken yet: many
🏍️ Kilometres on the odometer: growing
🌄 Views from the saddle: priceless
⛽ Tank full, mind clear
🤍 Solo rides clear everything
🔥 The journey is the destination`,

  `🏍️ Not just a hobby, it's my identity
🌧️ Riding in rain hits different
⛽ Fuel stops and chai breaks
🛞 Every bend is a decision
💪 Strong rider, stronger mind
🔥 The machine understands me`,

  `🛣️ Highways at 5am are sacred
🏍️ My bike knows my mood
💨 Wind in the helmet, thoughts in order
🌄 Mountain passes over city traffic
🔧 Maintain your machine, it'll save you
🔥 Riding is my moving meditation`,

  `🏍️ Bike name: saved. Bike service: up to date.
🎯 Trip planned: always yes
🌍 Destination: wherever the road goes
☕ Chai at the dhaba? Mandatory.
🤝 Riding group: small but solid
🔥 Bikes don't judge — they go`,

  `⚡ Electric or petrol — both are freedom
🏍️ Two-stroke nostalgia, four-stroke power
🌄 Himachal is calling again
🛞 Mileage doesn't matter — memories do
🔥 Every bike has a personality
💪 Every rider has a story`,

  `🏍️ Parked at interesting places
📷 Bike photos are the best photos
🌅 Early morning, open road, no traffic
🔧 DIY maintenance is a lifestyle
⛽ Fuel budget: high priority
🔥 Born to ride — still riding`,
];

const GYM_BIOS = [
  `🏋️ The gym doesn't lie
💪 Show up when you don't feel like it
⏰ 5am is the secret
🥗 Diet is 70%, gym is 30%
🔥 Rest days are part of the plan
🏆 Consistent > Intense`,

  `💪 Iron therapy every morning
🥩 Protein first, everything second
🏋️ PR chase is never ending
🔥 Soreness means something happened
🎯 Physique is a project, not a phase
⏰ No off days — just rest days`,

  `🏋️ Lifting heavy, thinking light
🧠 Mental health starts at the gym
💪 Every rep is a choice
🍗 Meal prep Sunday is sacred
🔥 Transformation takes time — give it time
🏆 Built slowly, built to last`,

  `⚡ Pre-workout kicked in
🏋️ Nothing stops this session
💪 Progressive overload is the only rule
🥗 Macros tracked, goals set
🔥 Gym is where I solve everything
🏆 Body transformation = mindset transformation`,

  `🌅 5am alarm hits different when there's a goal
🏋️ Barbell over everything
💪 Consistency is the cheat code
🍗 Eating is part of the work
🔥 Pain today = performance tomorrow
🏆 The grind is real, the results are realer`,

  `💪 Fitness is not a season — it's a lifestyle
🏋️ Compound lifts first, everything else after
🧠 Mind-muscle connection is underrated
🥩 Lean bulk in progress
🔥 Slow and steady wins the physique
⏰ Every gym day is a good day`,

  `🏋️ No music needed — just iron
💪 Deadlifts tell the truth
🔥 Form first, weight later
🥗 Nutritional discipline before gym discipline
🏆 Six months in? Just warming up.
⚡ Energy is earned, not given`,

  `💪 Gym is my most honest relationship
🏋️ Never missed a Monday
🔥 Tired? Good. Push anyway.
🧠 Train smart, not just hard
🥩 Protein goal: achieved daily
🏆 The person in the mirror is improving`,
];

const TWO_LINE_BIOS = [
  `😎 Simple mind, complex results
🔥 Quiet in person, loud in work`,

  `👑 Not everyone gets a second chance to impress me
💪 First impressions stick — make yours count`,

  `🎯 Focused on what matters, blind to what doesn't
⚡ The rest is just noise`,

  `🌙 Chasing dreams at night, working on them by day
🔥 The gap between both is getting smaller`,

  `😏 My attitude isn't for everyone
🏆 But my results speak to all`,

  `📚 Reading between the lines of life
💡 Writing my own version of it`,

  `🤍 Soft where it counts, strong where it matters
💎 That balance took years to build`,

  `🌅 Every morning I choose the same thing: growth
🙏 Every night I'm grateful it's working`,
];

const NAME_BIOS = [
  `👑 [Your Name] — Original, not a copy
🔥 Living life my way since day one
💪 Every day is another level unlocked
🎯 Goals set. [Your Name] moving.
😎 Unapologetically me`,

  `🌟 [Your Name] in progress
📚 Learning. Building. Becoming.
💡 The world hasn't seen the full version yet
🔥 Stay tuned — it's getting better
🙏 Grateful for every step`,

  `💥 [Your Name] — Made differently
🏆 Not competing — just becoming
😎 My lane is clear, my focus is set
🔥 Nobody does it like [Your Name]
⚡ Watch the journey unfold`,

  `❤️ [Your Name]
🏠 Born small town
🌍 Dreaming worldwide
💪 Building daily
🙏 God's timing is the best timing`,

  `😏 Mess with [Your Name]? Bold move.
🔥 Respect [Your Name]? Smart move.
👑 Know [Your Name]? Lucky move.
🏆 Become [Your Name]? Impossible.
💎 One of one. Original only.`,

  `📷 [Your Name] | Behind the lens
🎯 Capturing life one frame at a time
🌅 Golden hour is my hour
🤍 Photos tell what words can't
⚡ Always creating, never stopping`,

  `🎵 [Your Name] runs on music
🎧 Playlist > everything else
🔥 Beat drops change my whole energy
🤍 Music is the only language I never forget
🌙 Midnight sessions are the best sessions`,

  `🏋️ [Your Name] | Gym every day
💪 In the process of becoming unstoppable
🎯 One rep closer every session
🔥 Hard work is the only shortcut
🏆 Progress report: on track`,
];

const PHOTO_BIOS = [
  `📷 Light chaser, shadow lover
🌅 Golden hour is the only hour
🎞️ Film or digital — both tell truth
🤍 Every photo is a small decision
🌿 Nature as the backdrop always
📸 Capturing before the moment fades`,

  `🎞️ Film photography is patience in practice
📷 Manual settings only
🌧️ Rain, fog, and dramatic light please
🤍 I shoot what I feel, not what I see
🌅 Sunsets are never the same
📸 One keeper per thousand clicks`,

  `📸 Street photography over studio always
🏙️ Cities have stories on every corner
👁️ I look for what others walk past
🎯 The decisive moment is real
📷 Black and white has more colour
🤍 Photography is how I slow down`,

  `🌿 Botanical photography is therapy
📷 Macro lens reveals the world within the world
🤍 Soft light, soft subjects
🎞️ Grain is personality
🌸 Flowers say what I can't
📸 Every frame is intentional`,

  `📷 Travel + camera = purpose
🌍 Every country has a different light
🎞️ Document before you forget
🤍 The best photographers are observers first
🌅 Chasing light across time zones
📸 One day I'll run out of frames — not yet`,

  `🎞️ Analogue in a digital world
📷 No filters — just skill
🤍 Photography taught me to look twice
🌙 Night photography is underrated
📸 35mm is my favourite perspective
🌿 Growing one shot at a time`,

  `📸 Architecture and geometry
🏛️ Old buildings have the best stories
📷 Symmetry is satisfying in real life
🤍 Urban decay is unexpectedly beautiful
🌃 City at night is cinema
🎞️ Every building is a portrait`,

  `🤍 Portrait photographer
👤 I capture people when they forget the camera
📷 Candid over posed every time
🌿 Natural light only
🎞️ The emotion matters more than the exposure
📸 Faces tell lifetimes`,
];

const MUSIC_BIOS = [
  `🎵 Music is where my feelings live
🎧 Playlist longer than my problems
🥁 Rhythm first, lyrics second
🌙 Midnight listening sessions are sacred
🎸 Guitar strings and real thoughts
🤍 Music never judges`,

  `🎧 Headphones = Do Not Disturb
🎵 Genre: depends on my mood
🎸 Learning to play what I feel
🌅 Morning music sets the whole day
🔊 Volume and intention matter equally
🤍 Every song is a conversation`,

  `🥁 Drummer with a lot of opinions
🎵 Rhythm is everywhere once you hear it
🎸 Bass lines hit the soul hardest
🌙 Late night sessions are when it happens
🎧 Music recommendation? Always ready.
🤍 Every genre teaches something different`,

  `🎵 Classical on Monday
🎸 Rock on Friday
🥁 Everything in between as needed
🌍 Music is the only universal language
🎧 My Spotify tells my whole personality
🤍 Songs I can't stop repeating: constantly`,

  `🎸 Self-taught guitarist
🎵 Covers to originals — the journey
🌙 Writes music at 2am
🎧 Produces beats when nobody's watching
🤍 One day the world will hear it
⚡ For now: practice, practice, practice`,

  `🎵 Lo-fi beats while working
🌿 Jazz while thinking
🔊 Hip-hop while creating
🥁 Silence only when sleeping
🎧 Music is my co-founder
🤍 Never worked without it`,

  `🎸 Concert photographer's dream subject
🎵 Front row energy, back row soul
🌙 After-show conversations are the best
🎧 Lyrics hit different when you know the story
🤍 Music tourism is real and valid
⚡ Discovered three new artists this week`,

  `🎵 Music producer in the making
🥁 DAW open: always
🎸 Samples from unexpected places
🌍 Influences from every continent
🎧 The drop is just the beginning
🤍 Sound design is art`,
];

const TRAVEL_BIOS = [
  `✈️ Passport > savings account
🌍 Seen 12 countries. Planning the next 12.
📷 Every city teaches something different
🎒 Backpack and a budget — enough
🌅 Sunrise in a new place: unmatched
🗺️ The map keeps getting more lines`,

  `🗺️ Adventure first, comfort second
🏔️ Mountains reset my mind
🌊 Oceans reset my soul
✈️ The aisle seat is always mine
📷 Photos only I took
🌍 Solo travel changed everything`,

  `🏕️ Camping over resorts
🔥 Campfire over room service
🌄 Views earned, not booked
🎒 Pack light, experience heavy
🌍 National parks are the real luxury
✈️ See you wherever I go next`,

  `🌍 Moved to 3 cities in 5 years
🏙️ Each one taught a different lesson
✈️ Tickets booked before plans are made
📷 Streets > touristy spots
☕ Café in every new city: ritual
🗺️ Home is where the next adventure is`,

  `🏔️ High altitude is high on my list
🌨️ Cold weather travel person
✈️ Window seat, earphones in, world below
📷 Landscape photography en route
🎒 Two pairs of shoes: enough
🌙 Best nights were under foreign skies`,

  `🌊 Coastal road trips are the answer
🏍️ Two wheels, long roads
🌅 Chasing sunsets across states
☕ Chai at every dhaba stop
📷 Phone camera works fine
🌍 India is a different world every 100km`,

  `✈️ Long-haul flights are my kind of alone time
🌍 Culture first, hotel second
🍜 Eating local is non-negotiable
📷 Every trip has one defining photo
🗺️ The list of places keeps growing
🌅 Still haven't seen enough`,

  `🏕️ Weekend camping is the weekly reset
🌄 Sunrise hikes earned every view
🎒 Minimal packing took years to master
🌍 Every trip comes with a lesson
📷 Albums full of places, not poses
🔥 Adventure is where I recharge`,
];

const STUDENT_BIOS = [
  `📚 Student by day, planner by night
🎯 Clear goal: graduation with skills
☕ Caffeine-dependent but managing
💡 Ideas in class that nobody asked for
🤝 Study group but also solo work
🔥 The degree is just the beginning`,

  `🏫 College years: underpaid, over-caffeinated
📖 Reading for exams + reading for life
💪 Building alongside studying
🎯 GPA matters. Network matters more.
🌱 Growing professionally before graduating
📱 LinkedIn more than Instagram rn`,

  `📚 Engineering/Commerce/Arts — the grind is same
☕ Library is my second home
💡 Curious about everything related to my field
🎯 Internship locked. Placement coming.
🤝 Collaborating with smart people
🔥 Pressure is the curriculum nobody teaches`,

  `🎓 Final year. Real pressure.
📖 Notes > social media rn
💪 Discipline I never had before
🎯 One exam at a time
🌱 Figuring out what I actually want
☕ The grind is temporary. The degree is not.`,

  `📚 Student + self-improvement project
💡 Skill + degree = actual value
☕ Morning pages before morning classes
🎯 Five-year plan drafted at age 20
🌍 Studying to travel more
🔥 The hustle starts before graduation`,

  `🏫 Campus life > textbook life
📖 Attends every lecture: almost
☕ Canteen conversations are the real classes
🎯 Placement season: focused
💪 Building portfolio alongside syllabus
🌱 Still figuring it out — and that's allowed`,

  `📚 Night owl during exams
🌅 Early bird when motivated
☕ In between? Just surviving.
💡 Learning things the syllabus skipped
🎯 Long-term goals to survive short-term stress
🔥 Student now. Something bigger later.`,

  `📖 Books that change perspective
💡 Classes that occasionally do the same
☕ Budget: mostly caffeine
🎯 Career clarity coming soon (hopefully)
🤝 Found my people in the chaos
🌱 The learning never stops after graduation either`,
];

const MORE_ATTITUDE_BIOS = [
  `🔇 Hear me when I'm silent
💣 Fear me when I speak
🧊 Cold decisions, warm intentions
🎯 Precision in every move
🔥 The game respects the grinder
👁️ Always watching. Always calculating.`,

  `⚡ I don't explain my moves
🏆 I let the outcomes explain them
🧱 Built on things that failed
💀 What didn't kill me — trained me
🔥 Pressure is where I grew up
🗿 Unbreakable is an understatement`,

  `🌑 Stay humble in public
🌟 Stay hungry in private
🎯 Never let them see the work
💥 Only let them see the result
🔒 The process is personal
👑 The product speaks for itself`,

  `💼 Everything is a transaction of energy
🧠 I invest mine wisely
🚫 Negative people? Declined.
✅ Growth-oriented? Accepted.
🔥 My environment reflects my standards
💎 Quality takes time to collect`,

  `😶 I don't argue with noise
🧊 Ice doesn't melt for drama
🏆 I've been working while they've been talking
🔥 The score is visible now
💪 Years of invisible effort
🗿 Patience was always the strategy`,

  `🌙 Night shifts on my own goals
☀️ Day shifts on someone else's
🔥 The gap is closing fast
💡 One day, only my goals
🎯 Timeline: sooner than expected
⚡ Momentum is everything right now`,

  `🦅 High altitude, less company
🌪️ Storm-tested, still standing
💎 Cut deep — shine bright
🔥 The harder it gets, the sharper I become
🎯 Not a sprint. Not even a marathon. A lifestyle.
👑 Built to last, not to trend`,

  `🧠 Smart enough to stay quiet
🔥 Motivated enough to stay moving
💪 Disciplined enough to stay consistent
😎 Confident enough to stay humble
🏆 Patient enough to wait for the right moment
⚡ Dangerous enough when that moment comes`,
];

const faqs = [
  {
    q: "What should I write in my Instagram bio as a boy?",
    a: "Write something that genuinely reflects who you are — your personality, hobbies, values, or goals. You can include a tagline, your interests (cricket, music, gym, travel), your mood, or a short attitude line. Avoid generic phrases and aim for something specific to you. Use emojis to break up lines and add visual personality.",
  },
  {
    q: "How long should an Instagram bio be for boys?",
    a: "Instagram allows up to 150 characters in the bio field. Most effective bios use 5–7 short lines with line breaks for readability. You don't need to fill all 150 characters — a short, punchy bio often performs better than a long, crowded one.",
  },
  {
    q: "Which type of Instagram bio is most popular for boys?",
    a: "Attitude and stylish bios tend to be most popular among boys, particularly those that balance confidence with authenticity. Hindi/Hinglish bios are extremely popular in India. Aesthetic and simple bios are growing in popularity among older or more minimalist users.",
  },
  {
    q: "Can I use emojis in my Instagram bio?",
    a: "Yes, and you should. Emojis add personality, break up text visually, and make your bio easier to scan. Use them naturally — one or two per line works well. Avoid using so many emojis that the text becomes hard to read.",
  },
  {
    q: "How often should I update my Instagram bio?",
    a: "Update your bio whenever your personality, interests, or situation changes — roughly every few months is healthy. If you've achieved a new goal, started a new hobby, or your vibe has shifted, update it. A stale bio from three years ago doesn't represent who you are today.",
  },
];

const tocItems = [
  { href: "#simple", icon: "😊", label: "Simple Bios" },
  { href: "#attitude", icon: "🔥", label: "Attitude Bios" },
  { href: "#cool", icon: "😎", label: "Cool Bios" },
  { href: "#stylish", icon: "✨", label: "Stylish Bios" },
  { href: "#vip", icon: "👑", label: "VIP Bios" },
  { href: "#funny", icon: "😂", label: "Funny Bios" },
  { href: "#english", icon: "🌍", label: "English Bios" },
  { href: "#hindi", icon: "🇮🇳", label: "Hindi Bios" },
  { href: "#aesthetic", icon: "🌿", label: "Aesthetic Bios" },
  { href: "#cricket", icon: "🏏", label: "Cricket Lovers" },
  { href: "#bikes", icon: "🏍️", label: "Bike Lovers" },
  { href: "#gym", icon: "💪", label: "Gym & Fitness" },
  { href: "#twoline", icon: "✦", label: "Two-Line Bios" },
  { href: "#namestyle", icon: "📛", label: "Name Style Bios" },
  { href: "#photography", icon: "📷", label: "Photography Lovers" },
  { href: "#music", icon: "🎵", label: "Music Lovers" },
  { href: "#travel", icon: "✈️", label: "Travel Lovers" },
  { href: "#student", icon: "📚", label: "Student Bios" },
  { href: "#moreattitude", icon: "💥", label: "More Attitude Bios" },
  { href: "#tips", icon: "💡", label: "Tips to Write Your Bio" },
];

function Section({ id, title, bios, cols = 2 }: { id: string; title: string; bios: string[]; cols?: 1 | 2 }) {
  return (
    <section id={id}>
      <h2 className="sec">{title}</h2>
      <div className={cols === 1 ? "" : "bio-grid"}>
        {bios.map((bio, i) => (
          <BioCard key={i} num={i + 1} text={bio} />
        ))}
      </div>
    </section>
  );
}

export default function InstagramBioForBoysPage() {
  return (
    <>
      <style>{CSS}</style>
      <main className="bio-page">
        {/* Breadcrumb */}
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link><span>/</span>
          <Link href="/blog">Blog</Link><span>/</span>
          <span>Stylish Instagram Bio For Boys</span>
        </nav>

        {/* H1 */}
        <h1 className="page-h1">180+ Stylish Instagram Bio for Boys with Attitude (2026)</h1>
        <p className="page-subtitle">Copy &amp; Paste Ready | Attitude, Hindi, English, Stylish &amp; Hobby Bios | Updated 2026</p>

        {/* Author */}
        <div className="author-box">
          <div className="author-avatar">A</div>
          <div>
            <p className="author-name">Arjun Mehta</p>
            <p className="author-meta">Social Media Strategist &amp; Content Creator • August 2026</p>
          </div>
        </div>

        {/* Stats */}
        <div className="stats-bar">
          <div className="stat-card">
            <div className="stat-num">180+</div>
            <div className="stat-label">Unique Bios</div>
          </div>
          <div className="stat-card">
            <div className="stat-num">20+</div>
            <div className="stat-label">Categories</div>
          </div>
          <div className="stat-card">
            <div className="stat-num">2026</div>
            <div className="stat-label">Updated</div>
          </div>
        </div>

        {/* Intro */}
        <p className="txt">
          Your Instagram profile gets judged in about three seconds. Before someone checks your posts, before they notice your follower count — they read your bio. A well-written bio tells the world who you are, what you stand for, and whether you&apos;re worth a follow.
        </p>
        <p className="txt">
          This article is built specifically around <strong>instagram bio for boys</strong> — meaning every single example here is crafted for guys who want their profile to reflect their actual personality. Whether you&apos;re looking for something stylish, attitude-packed, simple and clean, aesthetic, funny, or written in Hindi — you&apos;ll find it here. Each bio is copy-paste ready. You can use them as-is, or swap in your name, city, or hobby to make it yours.
        </p>

        {/* Tip box */}
        <div className="tip-box tip-blue">
          <p>✍️ <strong>Design Your Own Bio:</strong> Want a fully customized bio using your name, username, and specific keywords? Try our free <Link href="/instagram-tools/instagram-bio-generator" style={{ color: "#2563eb", fontWeight: "bold", textDecoration: "underline" }}>Instagram Bio Generator Tool</Link> to generate bios instantly with a live mobile preview!</p>
        </div>

        {/* Why section */}
        <section id="why">
          <h2 className="sec">Why Your Instagram Bio Actually Matters More Than You Think</h2>
          <p className="txt">
            Think of your bio as a handshake. When someone lands on your profile for the first time — from a Reel, a tag, a mutual friend — the bio is the first thing they actually read. It takes less than five seconds for them to decide if they want to explore further or scroll away.
          </p>
          <ul className="ul">
            <li><strong>It communicates personality.</strong> Are you someone with attitude? A gym guy? A traveler? A student grinding toward something? Your bio signals this immediately.</li>
            <li><strong>It filters your audience.</strong> When your bio is specific, the right people follow you. Generic bios attract nobody in particular.</li>
            <li><strong>It creates a lasting first impression.</strong> People remember the profiles that said something interesting — and forget the ones that said &quot;living life&quot; for the twentieth time.</li>
            <li><strong>It reflects growth.</strong> A bio updated regularly shows that the person behind the profile is evolving, which is always more interesting than a static snapshot from 2022.</li>
          </ul>
        </section>

        {/* TOC */}
        <div className="toc-box">
          <h2>📋 Table of Contents</h2>
          <div className="toc-grid">
            {tocItems.map((item) => (
              <a key={item.href} href={item.href} className="toc-item">
                <span className="toc-icon">{item.icon}</span>
                <span>{item.label}</span>
                <span className="toc-arrow">→</span>
              </a>
            ))}
          </div>
        </div>

        <hr className="divider" />

        <Section id="simple" title="Simple Instagram Bio for Boys" bios={SIMPLE_BIOS} />
        <hr className="divider" />
        <Section id="attitude" title="Attitude Instagram Bio for Boys" bios={ATTITUDE_BIOS} />
        <hr className="divider" />
        <Section id="cool" title="Cool Instagram Bio for Boys" bios={COOL_BIOS} />
        <hr className="divider" />
        <Section id="stylish" title="Stylish Instagram Bio for Boys" bios={STYLISH_BIOS} />
        <hr className="divider" />
        <Section id="vip" title="VIP Instagram Bio for Boys" bios={VIP_BIOS} />
        <hr className="divider" />
        <Section id="funny" title="Funny Instagram Bio for Boys" bios={FUNNY_BIOS} />
        <hr className="divider" />
        <Section id="english" title="Instagram Bio for Boys in English" bios={ENGLISH_BIOS} />
        <hr className="divider" />
        <Section id="hindi" title="Attitude Instagram Bio for Boys in Hindi" bios={HINDI_BIOS} />
        <hr className="divider" />
        <Section id="aesthetic" title="Aesthetic Instagram Bio for Boys" bios={AESTHETIC_BIOS} />
        <hr className="divider" />
        <Section id="cricket" title="Instagram Bio for Boys Who Love Cricket" bios={CRICKET_BIOS} />
        <hr className="divider" />
        <Section id="bikes" title="Instagram Bio for Boys Who Love Bikes" bios={BIKE_BIOS} />
        <hr className="divider" />
        <Section id="gym" title="Instagram Bio for Boys Who Love Gym and Fitness" bios={GYM_BIOS} />
        <hr className="divider" />

        {/* Two-line bios — 1 column */}
        <section id="twoline">
          <h2 className="sec">Instagram Bio for Boys in Two Lines</h2>
          <div>
            {TWO_LINE_BIOS.map((bio, i) => (
              <BioCard key={i} num={i + 1} text={bio} />
            ))}
          </div>
        </section>
        <hr className="divider" />

        <Section id="namestyle" title="Instagram Bio for Boys with Name Style" bios={NAME_BIOS} />
        <hr className="divider" />
        <Section id="photography" title="Instagram Bio for Boys Who Love Photography" bios={PHOTO_BIOS} />
        <hr className="divider" />
        <Section id="music" title="Instagram Bio for Boys Who Love Music" bios={MUSIC_BIOS} />
        <hr className="divider" />
        <Section id="travel" title="Instagram Bio for Boys Who Love Travel" bios={TRAVEL_BIOS} />
        <hr className="divider" />
        <Section id="student" title="Instagram Bio for Boys Who Are Students" bios={STUDENT_BIOS} />
        <hr className="divider" />
        <Section id="moreattitude" title="More Attitude Bios to Round It Up" bios={MORE_ATTITUDE_BIOS} />
        <hr className="divider" />

        {/* Tips Section */}
        <section id="tips">
          <h2 className="sec">Tips to Write Your Own Instagram Bio for Boys</h2>
          <p className="txt">
            The best bio is the one that sounds like you — not like a template. Here is how to write one that works.
          </p>
          <ul className="tips-list">
            <li><strong>Choose your personality first.</strong> Before writing a single word, ask yourself: what do you want people to feel when they read your bio? Confident? Funny? Chill? Ambitious? Your tone follows that answer.</li>
            <li><strong>Keep it short and readable.</strong> Instagram limits you to 150 characters. Use 5–7 short lines with line breaks. White space makes bios more readable, not less serious.</li>
            <li><strong>Use emojis as visual punctuation.</strong> One emoji per line keeps things clean. More than two per line starts to look cluttered. Pick emojis that actually match the line — not random decorations.</li>
            <li><strong>Add something specific to you.</strong> &quot;Gym lover&quot; is generic. &quot;Deadlifts every Monday. No excuses.&quot; is specific and memorable. The detail makes the difference.</li>
            <li><strong>Mention your city or location when useful.</strong> For creators, photographers, and travellers, location adds context. &quot;📍 Mumbai&quot; tells people where you are operating from.</li>
            <li><strong>Add a personal tagline.</strong> One line that captures your philosophy. Examples: &quot;Progress over perfection.&quot; or &quot;Silence is my loudest answer.&quot; This becomes a signature.</li>
            <li><strong>Use stylish fonts selectively.</strong> Unicode fonts look cool in small doses. An entire bio in 𝓼𝓽𝔂𝓵𝓲𝓼𝓱 𝓯𝓸𝓷𝓽 becomes hard to read and may not display correctly on all devices.</li>
            <li><strong>Avoid too many symbols.</strong> Lines like &quot;▓▓🔥▓▓🔥▓▓&quot; look busy rather than cool. Symbols should support your words, not replace them.</li>
            <li><strong>Keep the profile authentic.</strong> Do not claim things you are not. If you are working toward something, say that. &quot;Aspiring filmmaker&quot; is more credible than &quot;Professional filmmaker&quot; when you are still learning.</li>
            <li><strong>Update it regularly.</strong> A bio from two years ago that lists a hobby you dropped does not represent who you are. Refresh it when your life, goals, or personality shifts.</li>
          </ul>
          <div className="tip-box">
            <p>💡 <strong>Quick formula:</strong> [What you are] + [What you love/do] + [Something personal] + [Optional tagline or location]. That structure alone creates a solid bio for most people.</p>
          </div>
        </section>

        <hr className="divider" />

        {/* Final Words */}
        <section>
          <h2 className="sec">Final Words</h2>
          <p className="txt">
            Your Instagram bio is small in size but significant in impact. It is the first thing that represents you to every new person who finds your profile. Whether you want to come across as confident and sharp, laid-back and aesthetic, funny and relatable, or driven and goal-oriented — there is a version of a bio that fits you perfectly.
          </p>
          <p className="txt">
            This collection covers every personality type an <strong>instagram bio for boys</strong> could represent — from the cricket fanatic and the bike rider to the student grinding for placement and the night-owl who produces music alone. Browse through the categories, pick what resonates, and make it your own. The best bio is the one that sounds like you wrote it — because in the end, you did.
          </p>
        </section>

        <hr className="divider" />

        {/* FAQs */}
        <section>
          <h2 className="sec">FAQs About Instagram Bio for Boys</h2>
          {faqs.map((faq, i) => (
            <div key={i} className="faq-item">
              <h3 className="faq-q">{faq.q}</h3>
              <div className="faq-a">{faq.a}</div>
            </div>
          ))}
        </section>

        <div className="bio-page-footer">
          <p>© 2026 SmartToolsWala · Updated August 2026 · All bios are original and free to use.</p>
        </div>
      </main>
    </>
  );
}
