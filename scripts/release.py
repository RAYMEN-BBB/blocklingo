"""Create a portable, allowlisted source archive. No private notes or host identity."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
files = [Path(x) for x in ['README.md', 'LICENSE', 'CONTENT-LICENSE.md', 'package.json', 'site.config.json', '.gitignore']]
for folder in ['src', 'scripts', 'deployment']:
    files.extend(p for p in Path(folder).rglob('*') if p.is_file() and '__pycache__' not in p.parts)
with ZipFile('dist/blocklingo-source.zip', 'w', ZIP_DEFLATED) as z:
    for p in sorted(set(files)):
        z.write(p, 'blocklingo/' + str(p))
print(f'Source archive: {len(files)} files')
