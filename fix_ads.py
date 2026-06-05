import os
import re

file1 = "src/components/CompressImageClient.tsx"
with open(file1, "r", encoding="utf-8") as f:
    c1 = f.read()

c1 = re.sub(r'[ \t]*<AdBanner dataAdSlot="slot_compress_top" className="mt-8 mb-2" />\r?\n', '', c1)
pattern = r'(                    </div>\r?\n                </div>\r?\n\r?\n                \{\/\* .*?Trust Bar.*? \*\/\})'
replacement = r'                    </div>\n                </div>\n\n                <AdBanner dataAdSlot="slot_compress_top" className="mt-8 mb-4" />\n\n                {/* Trust Bar */}'
c1 = re.sub(pattern, replacement, c1)

with open(file1, "w", encoding="utf-8") as f:
    f.write(c1)

file2 = "src/app/blog/[slug]/page.tsx"
with open(file2, "r", encoding="utf-8") as f:
    c2 = f.read()

if "import AdBanner" not in c2:
    c2 = re.sub(r"(import CoupleNameClient from '@\/components\/CoupleNameClient';)", r"\1\nimport AdBanner from '@/components/AdBanner';", c2)

c2 = re.sub(r'(<MDXRemote)', r'<AdBanner dataAdSlot="slot_blog_top" className="mb-8" />\n                                \1', c2)
c2 = re.sub(r'(<MDXRemote [^>]*/>)', r'\1\n                                <AdBanner dataAdSlot="slot_blog_bottom" className="mt-8 mb-4" />', c2)

with open(file2, "w", encoding="utf-8") as f:
    f.write(c2)

print("Edits done")
