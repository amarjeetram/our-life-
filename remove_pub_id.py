import os

file_path = "src/components/AdBanner.tsx"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

target = '<p className="text-slate-400 text-sm">ca-pub-7117465882400046</p>'
if target in content:
    content = content.replace(target, '')
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)
    print("Publisher ID removed")
else:
    print("Target not found")
