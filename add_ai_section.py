import os

file_path = "src/components/HomeClient.tsx"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

target = "                    {/* OTHER TOOLS SECTION */}"

new_section = """                    {/* AI TOOLS SECTION */}
                    <div id="ai-tools" style={{ textAlign: "center", marginBottom: "40px" }}>
                        <span style={{ display: "block", fontSize: "12px", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "#3b82f6", marginBottom: "12px" }}>
                            AI Tools
                        </span>
                        <h2 style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 900, color: "#0f172a", letterSpacing: "-0.03em", lineHeight: 1.15 }}>
                            Prompt Generators
                        </h2>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))", gap: "24px", marginBottom: "72px" }}>
                        {[
                            {
                                route: '/ai-prompts/gemini-prompt-generator', title: 'Gemini Prompt Generator',
                                desc: 'Craft the perfect AI prompt for Google Gemini to get highly accurate and tailored responses.',
                                tags: ['AI Tool', 'Gemini', 'Prompts']
                            },
                            {
                                route: '/ai-prompts', title: 'View All AI Tools',
                                desc: 'Explore all AI prompt generators and utility tools to maximize your AI productivity.',
                                tags: ['View All', 'Free']
                            }
                        ].map((tool, index) => (
                            <div
                                key={tool.route}
                                className={
ative-fade-in delay- + str((index % 5 + 1) * 100).replace("'", "")}
                            >
                                <Link prefetch={false} href={tool.route} style={{
                                    display: "flex", flexDirection: "column", height: "100%",
                                    background: "#ffffff", borderRadius: "24px",
                                    border: "1px solid #f1f5f9",
                                    boxShadow: "0 4px 24px rgba(99,102,241,0.06), 0 1px 3px rgba(0,0,0,0.02)",
                                    overflow: "hidden", textDecoration: "none",
                                    transition: "transform 0.2s, box-shadow 0.2s",
                                }}
                                >
                                    <div style={{ height: "4px", background: "linear-gradient(90deg, #6366f1, #8b5cf6, #a855f7, #ec4899)" }} />
                                    <div style={{ padding: "32px", display: "flex", flexDirection: "column", gap: "16px", flexGrow: 1 }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "4px" }}>
                                            <div style={{
                                                width: "52px", height: "52px", borderRadius: "16px",
                                                background: "linear-gradient(135deg, #ede9fe, #dbeafe)",
                                                display: "flex", alignItems: "center", justifyContent: "center",
                                                color: "#6366f1", flexShrink: 0,
                                                boxShadow: "0 2px 10px rgba(99,102,241,0.15)"
                                            }}>
                                                <Zap size={22} />
                                            </div>
                                            <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#0f172a", letterSpacing: "-0.01em" }}>
                                                {tool.title}
                                            </h3>
                                        </div>
                                        <p style={{ fontSize: "15px", color: "#64748b", lineHeight: 1.6 }}>
                                            {tool.desc}
                                        </p>
                                        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "auto", paddingTop: "8px" }}>
                                            {tool.tags.map(tag => (
                                                <span key={tag} style={{
                                                    padding: "4px 10px", borderRadius: "100px",
                                                    background: "#f8faff", border: "1px solid #e0e7ff",
                                                    fontSize: "11px", fontWeight: 700, color: "#4338ca"
                                                }}>{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div style={{
                                        background: "#fafbff", borderTop: "1px solid #f1f5f9",
                                        padding: "16px 32px", display: "flex", alignItems: "center", justifyContent: "space-between",
                                        color: "#3730a3", fontWeight: 800, fontSize: "14px"
                                    }}>
                                        <span>Use Tool Free</span>
                                        <ArrowRight size={16} />
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>

"""

new_section = new_section.replace(" + str((index % 5 + 1) * 100).replace(\"'\", \"\")", "${(index % 5 + 1) * 100}")

if target in content and "AI TOOLS SECTION" not in content:
    content = content.replace(target, new_section + target)
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)
    print("Section added successfully")
else:
    print("Section already exists or target not found")
