const communities = [
    {
        name: "LIDERA",
        description: "Entorn de creixement i networking per a dones professionals i emprenedores.",
        link: "https://emprenedoria.barcelonactiva.cat/es/lidera-mujeres-emprendedoras",
        categories: ["networking", "emprenedoria"],
        scope: "local",
        tags: ["local", "networking", "emprenedoria"]
    },
    {
        name: "TechBcn4Women",
        description: "Projecte de Tech Barcelona que promou la igualtat en el sector tecnològic.",
        link: "https://www.techbarcelona.com/techbcn4women/",
        categories: ["igualtat", "tecnologia"],
        scope: "local",
        tags: ["local", "igualtat"]
    },
    {
        name: "TechnoLatinas",
        description: "Xarxa que dona suport a dones en àrees STEAM per tancar bretxes de gènere.",
        link: "https://technolatinas.org/",
        categories: ["steam", "diversitat"],
        scope: "global",
        tags: ["global", "steam"]
    },
    {
        name: "Women Who Code",
        description: "Comunitat global que ofereix recursos i networking per a dones en tecnologia.",
        link: "https://womenwhocode.com/",
        categories: ["programació", "networking"],
        scope: "global",
        tags: ["global", "networking"]
    },
    {
        name: "Girls Who Code",
        description: "Programa de classes de programació per a nenes, fomentant l'interès per la tecnologia.",
        link: "https://girlswhocode.com/",
        categories: ["educació", "programació"],
        scope: "global",
        tags: ["global", "formació"]
    },
    {
        name: "SheTech Spain",
        description: "Xarxa nacional amb esdeveniments i tallers per a dones en tecnologia.",
        link: "https://www.eventbrite.com/o/shetech-6376818437",
        categories: ["esdeveniments", "formació"],
        scope: "global",
        tags: ["global", "formació"]
    },
    {
        name: "Women Techmakers Barcelona",
        description: "Iniciativa de Google per visibilitzar i empoderar dones en tecnologia.",
        link: "https://women-in-tech.org/barcelona/",
        categories: ["google", "empoderament"],
        scope: "local",
        tags: ["local", "networking"]
    },
    {
        name: "Barcelona Tech Spirit (Women Track)",
        description: "Esdeveniment anual amb enfocament en dones en tecnologia i emprenedoria.",
        link: "https://techspirit.barcelona/",
        categories: ["esdeveniments", "emprenedoria"],
        scope: "local",
        tags: ["local", "esdeveniments"]
    },
    {
        name: "Talent Garden Barcelona (Women in Tech)",
        description: "Comunitat dins del coworking Talent Garden per a la diversitat de gènere.",
        link: "https://talentgarden.com/en/coworking/barcelona",
        categories: ["coworking", "diversitat"],
        scope: "local",
        tags: ["local", "networking"]
    },
    {
        name: "Women in Blockchain Barcelona",
        description: "Comunitat que impulsa la participació femenina en blockchain.",
        link: "https://www.meetup.com/es-ES/topics/women-in-blockchain/es/",
        categories: ["blockchain", "tecnologia"],
        scope: "local",
        tags: ["local", "tecnologia"]
    },
    {
        name: "Tech Women Barcelona",
        description: "Grup local de networking i formació per a dones professionals en tecnologia.",
        link: "#",
        categories: ["networking", "formació"],
        scope: "local",
        tags: ["local", "networking"]
    },
    {
        name: "Women Who Code Barcelona",
        description: "Branca local de Women Who Code amb esdeveniments i recursos a Barcelona.",
        link: "https://womenwhocode.com/",
        categories: ["programació", "recursos"],
        scope: "local",
        tags: ["local", "formació"]
    },
    {
        name: "Aticco Women",
        description: "Comunitat dins del coworking Aticco per impulsar projectes i networking femení.",
        link: "https://aticco.com/",
        categories: ["coworking", "projectes"],
        scope: "local",
        tags: ["local", "networking"]
    },
    {
        name: "Impact Hub Barcelona - Women Entrepreneurs Network",
        description: "Xarxa per a dones emprenedores amb enfocament en projectes tecnològics.",
        link: "https://barcelona.impacthub.net/en/",
        categories: ["emprenedoria", "impacte"],
        scope: "local",
        tags: ["local", "emprenedoria"]
    },
    {
        name: "FemCoders Club",
        description: "Comunitat de dones programadores que ofereix bootcamps, tallers i esdeveniments de networking en tecnologia.",
        link: "https://www.femcodersclub.com/",
        categories: ["programació", "formació"],
        scope: "global",
        tags: ["global", "formació"]
    },
    {
        name: "TechFems",
        description: "Xarxa de dones en tecnologia enfocada a crear connexions professionals i oportunitats de creixement.",
        link: "https://techfems.org/",
        categories: ["networking", "tecnologia"],
        scope: "local",
        tags: ["local", "networking"]
    },
    {
        name: "Donestech",
        description: "Cooperativa feminista que investiga la relació entre dones, tecnologia i gènere des d'una perspectiva crítica.",
        link: "https://donestech.net/",
        categories: ["recerca", "feminisme"],
        scope: "local",
        tags: ["local", "recerca"]
    },
    {
        name: "Code Women",
        description: "Comunitat dedicada a empoderar dones en programació i desenvolupament de programari.",
        link: "https://codewomen.plus/en/",
        categories: ["programació", "empoderament"],
        scope: "global",
        tags: ["global", "formació"]
    },
    {
        name: "Lean In Network - Barcelona",
        description: "Xarxa global de cercles professionals per a dones, amb presència en el sector tecnològic.",
        link: "https://www.leaninbarcelona.com/",
        categories: ["lideratge", "networking"],
        scope: "global",
        tags: ["global", "networking"]
    },
    {
        name: "Dona TIC",
        description: "Associació catalana que promou la participació de les dones en les tecnologies de la informació.",
        link: "https://politiquesdigitals.gencat.cat/ca/ciutadania/donatic/",
        categories: ["promoció", "tic"],
        scope: "local",
        tags: ["local", "igualtat"]
    },
    {
        name: "PyLadies Barcelona",
        description: "Capítol local de PyLadies, comunitat internacional que promou Python entre dones programadores.",
        link: "https://www.meetup.com/es-ES/pyladies-bcn/",
        categories: ["python", "programació"],
        scope: "local",
        tags: ["local", "formació"]
    },
    {
        name: "Alumni Le Wagon",
        description: "Xarxa de graduades del bootcamp Le Wagon, connectant dones desenvolupadores i emprenedores tech.",
        link: "https://www.lewagon.com/es-ES/graduates",
        categories: ["bootcamp", "networking"],
        scope: "local",
        tags: ["local", "networking"]
    },
    {
        name: "Women Techmakers Barcelona (Meetup)",
        description: "Grup oficial de Meetup de Google que dona visibilitat a dones en tecnologia amb esdeveniments regulars.",
        link: "https://www.meetup.com/es-ES/wtmbcn/",
        categories: ["meetup", "google"],
        scope: "local",
        tags: ["local", "esdeveniments"]
    },
    {
        name: "Barcelona Women in Technology (Meetup)",
        description: "Meetup que organitza esdeveniments per a dones apassionades per la tecnologia amb xerrades i networking.",
        link: "https://www.meetup.com/es-ES/barcelona-women-in-technology-new-relic/",
        categories: ["meetup", "networking"],
        scope: "local",
        tags: ["local", "esdeveniments"]
    },
    {
        name: "TechFems (Meetup)",
        description: "Comunitat inclusiva de més de 700 dones+ en tecnologia amb activitats presencials a Barcelona des del 2023.",
        link: "https://www.meetup.com/techfems/",
        categories: ["meetup", "inclusiu"],
        scope: "local",
        tags: ["local", "networking"]
    },
    {
        name: "FemDevs",
        description: "FemDevs és una associació sense ànim de lucre que té com a objectiu promoure l'interès, la participació i la presència de les dones en la cultura del desenvolupament de videojocs.",
        link: "https://femdevs.es/",
        categories: ["FemDevs", "videojocs"],
        scope: "local",
        tags: ["local", "formació"]
    },
    {
        name: "OutGeekWomen Barcelona",
        description: "Esdeveniments especialitzats a Eventbrite per a professionals mid/senior en tecnologia, enfocats en networking i recerca de feina.",
        link: "https://www.eventbrite.com/e/women-in-tech-barcelona-outgeekwomen-tickets-748721254427",
        categories: ["eventbrite", "professional"],
        scope: "local",
        tags: ["local", "esdeveniments"]
    },
];

let filteredCommunities = [...communities];

function renderCommunities(communitiesToRender = communities) {
    const container = document.getElementById('communitiesGrid');
    const noResults = document.getElementById('noResults');
    const resultsCount = document.getElementById('resultsCount');

    container.innerHTML = '';

    if (communitiesToRender.length === 0) {
        noResults.style.display = 'block';
        resultsCount.textContent = 'No s\'han trobat resultats';
        return;
    }

    noResults.style.display = 'none';
    resultsCount.textContent = `S'estan mostrant ${communitiesToRender.length} de ${communities.length} comunitats`;

    communitiesToRender.forEach(community => {
        const card = document.createElement('div');
        card.className = 'community-card';

        const tags = community.tags.map(tag =>
            `<span class="tag ${tag}">${getTagLabel(tag)}</span>`
        ).join('');

        card.innerHTML = `
            <div class="community-name">${community.name}</div>
            <div class="community-description">${community.description}</div>
            <div class="community-tags">${tags}</div>
            <a href="${community.link}" class="community-link" target="_blank">
                📄 Més informació →
            </a>
        `;

        container.appendChild(card);
    });
}

function getTagLabel(tag) {
    const labels = {
        'local': 'Local BCN',
        'global': 'Global',
        'networking': 'Networking',
        'formació': 'Formació',
        'emprendimiento': 'Emprenedoria',
        'tecnologia': 'Tecnologia',
        'eventos': 'Esdeveniments',
        'mentoring': 'Mentoria',
        'igualdad': 'Igualtat',
        'steam': 'STEAM',
        'seguridad': 'Seguretat',
        'bootcamp': 'Bootcamp',
        'python': 'Python',
        'feminismo': 'Feminisme',
        'tic': 'TIC',
        'promocion': 'Promoció',
        'meetup': 'Meetup',
        'eventbrite': 'Eventbrite',
        'inclusivo': 'Inclusiu',
        'profesional': 'Professional'
    };
    return labels[tag] || tag;
}

function applySearch() {
    const searchTerm = document.getElementById('searchBox').value.toLowerCase();
    filteredCommunities = communities.filter(community => {
        return community.name.toLowerCase().includes(searchTerm) ||
            community.description.toLowerCase().includes(searchTerm);
    });
    renderCommunities(filteredCommunities);
}

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('searchBox').addEventListener('input', applySearch);
    renderCommunities();
});

