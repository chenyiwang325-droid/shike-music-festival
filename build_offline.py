"""Bundle authored sources and images into a double-clickable local demo.
The regular dist directory remains the maintainable source of truth.
"""
from pathlib import Path
import base64
root=Path(__file__).resolve().parent
source=root/'dist'
html=(source/'index.html').read_text()
css=(source/'style.css').read_text()
app=(source/'app.js').read_text()
# Replace computed asset map with embedded data URLs, keeping source files canonical.
assets={}
for path in source.joinpath('assets').glob('*.png'):
    if path.stem.startswith(('v4_',)):
        assets[path.stem]='data:image/png;base64,'+base64.b64encode(path.read_bytes()).decode('ascii')
import json
start=app.index('const imageFiles=');end=app.index('const images={}',start)
app=app[:start]+'const imageFiles='+json.dumps(assets)+';\n'+app[end:]
html=html.replace('<link rel="stylesheet" href="style.css">','<style>'+css+'</style>')
# These scripts execute after the document, as defer did in the source page.
scripts=[]
for name in ['assets/qrcode.js','core.js','renderer.js','app.js']:
    html=html.replace('<script defer src="'+name+'"></script>','')
    code=app if name=='app.js' else (source/name).read_text()
    scripts.append('<script>'+code.replace('</script','<\\/script')+'</script>')
html=html.replace('href="./"','href="离线体验.html"')
html=html.replace('</body>','\n'+''.join(scripts)+'\n</body>')
(root/'离线体验.html').write_text(html)
print('Offline single-file demo written:',(root/'离线体验.html').stat().st_size,'bytes')
