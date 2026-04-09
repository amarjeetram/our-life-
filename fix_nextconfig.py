import re

def optimize():
    # 1. Update next.config.ts
    with open('next.config.ts', 'r', encoding='utf-8') as f:
        text = f.read()

    text = text.replace('optimizeCss: true,', "optimizeCss: true,\n    optimizePackageImports: ['lucide-react'],")
    with open('next.config.ts', 'w', encoding='utf-8') as f:
        f.write(text)

    # 2. Add prefetch={false} to Next Links in HomeClient to stop unused JS download from routes
    with open('src/components/HomeClient.tsx', 'r', encoding='utf-8') as f:
        home_text = f.read()

    home_text = home_text.replace('<Link href=', '<Link prefetch={false} href=')
    with open('src/components/HomeClient.tsx', 'w', encoding='utf-8') as f:
        f.write(home_text)

if __name__ == '__main__':
    optimize()
