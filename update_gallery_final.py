import re

with open('index.html', 'r') as f:
    content = f.read()

# Lista de imagens (vamos usar placeholders primeiro)
images = [
    "assets/images/works/cidadecorreriapeca.jpg",
    "assets/images/works/doccidadecorreria.jpg", 
    "assets/images/works/humornegro.jpg",
    "assets/images/works/pabloeluisao.jpg",
    "assets/images/works/programazorra.jpg",
    "assets/images/works/originais.jpg"
]

# Verificar quais imagens realmente existem
import os
existing_images = []
for img in images:
    if os.path.exists(img):
        existing_images.append(img)
    else:
        # Se não existir, usar a foto de perfil
        existing_images.append("assets/images/profile/patrick-perfil2.jpg")

# Criar nova galeria
new_gallery = '''            <div class="works-grid">'''

work_names = ["Cidade Correria", "Documentário CC", "Humor Negro", "Pablo & Luizão", "Programa Zorra", "Projetos Originais"]
work_descs = ["Peça teatral inovadora", "Documentário criativo", "Comédia social", "Série de vídeos", "Participação TV", "Sites autorais"]
work_cats = ["teatro", "video", "teatro", "video", "video", "web"]

for i in range(6):
    img_path = existing_images[i] if i < len(existing_images) else "assets/images/profile/patrick-perfil2.jpg"
    
    new_gallery += f'''
                <!-- Trabalho {i+1} -->
                <div class="work-card" data-category="{work_cats[i]}">
                    <div class="work-image">
                        <img src="{img_path}" alt="{work_names[i]}">
                        <div class="work-overlay">
                            <a href="#" class="work-link">
                                <i class="fas fa-external-link-alt"></i>
                            </a>
                        </div>
                    </div>
                    <div class="work-info">
                        <h3>{work_names[i]}</h3>
                        <p class="work-desc">{work_descs[i]}</p>
                        <div class="work-meta">
                            <span class="work-category">{work_cats[i]}</span>
                            <span class="work-year">202{3-i}</span>
                        </div>
                    </div>
                </div>'''

new_gallery += '''
            </div>'''

# Substituir a galeria antiga
# Encontrar a seção works-grid
pattern = r'(<div class="works-grid">.*?</div>\s*</div>\s*</section>)'
match = re.search(pattern, content, re.DOTALL)

if match:
    content = content.replace(match.group(0), new_gallery + "\n        </div>\n    </section>")
    print("✅ Galeria atualizada!")
else:
    print("⚠️  Não encontrei a galeria para substituir")
    # Tentar encontrar de outra forma
    pattern2 = r'(<section id="works".*?<div class="works-grid">.*?</div>.*?</section>)'
    match2 = re.search(pattern2, content, re.DOTALL)
    if match2:
        # Extrair o início e fim da seção
        section_start = match2.group(0).split('<div class="works-grid">')[0] + '<div class="works-grid">'
        section_end = '</section>'
        new_section = section_start + new_gallery + "\n        </div>\n    </section>"
        content = content.replace(match2.group(0), new_section)
        print("✅ Galeria atualizada (método alternativo)")

with open('index.html', 'w') as f:
    f.write(content)
