
    let datosReales = null;
    const charts = {};

    async function cargarDatos() {
      try {
        console.log('Carregant dades des de output.json...');

        const response = await fetch('../model/output.json');
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        datosReales = await response.json();

        console.log('Dades carregades exitosament:', datosReales);

        // Validar que les dades tenen el format esperat
        if (!Array.isArray(datosReales) || datosReales.length === 0) {
          throw new Error('Dades buides o format no vàlid');
        }

        document.getElementById('loading').classList.add('hidden');
        document.getElementById('content').classList.remove('hidden');

        procesarDatosYVisualizar();

      } catch (error) {
        console.error('Error en processar les dades:', error);
        document.getElementById('loading').classList.add('hidden');
        document.getElementById('error').classList.remove('hidden');
      }
    }

    function procesarDatosYVisualizar() {
      if (!datosReales || !Array.isArray(datosReales)) {
        console.error('Dades no vàlides');
        return;
      }

      calcularEstadisticas();
      procesarHipotesis1();
      procesarHipotesis2();
      procesarHipotesis3();
      procesarHipotesis4();
      generarConclusiones();
    }

    function calcularEstadisticas() {
      const total = datosReales.length;

      const porcentajeActivas = Math.round((datosReales.filter(d =>
        d.Miembro_Comunidad_Tech_Mujeres?.includes('activa')).length / total) * 100);

      const porcentajeAumento = Math.round((datosReales.filter(d =>
        d.Aumento_Mujeres_Equipos_Tech?.includes('Sí')).length / total) * 100);

      const porcentajeColaboracion = Math.round((datosReales.filter(d =>
        d.Participacion_Iniciativas_Empresas === 'Sí').length / total) * 100);

      const porcentajeExpansion = Math.round((datosReales.filter(d =>
        d.Expansion_Red_Profesional?.includes('Sí')).length / total) * 100);

      const statsHTML = `
                <div class="text-center">
                    <div class="stat-number">${porcentajeActivas}%</div>
                    <p class="text-gray-600 font-semibold">Participació Activa</p>
                    <p class="text-sm text-gray-500">en comunitats tech</p>
                </div>
                <div class="text-center">
                    <div class="stat-number">${porcentajeAumento}%</div>
                    <p class="text-gray-600 font-semibold">Augment Representació</p>
                    <p class="text-sm text-gray-500">dones en equips</p>
                </div>
                <div class="text-center">
                    <div class="stat-number">${porcentajeColaboracion}%</div>
                    <p class="text-gray-600 font-semibold">Col·laboració Empresarial</p>
                    <p class="text-sm text-gray-500">iniciatives conjuntes</p>
                </div>
                <div class="text-center">
                    <div class="stat-number">${porcentajeExpansion}%</div>
                    <p class="text-gray-600 font-semibold">Expansió de Xarxa</p>
                    <p class="text-sm text-gray-500">professional efectiva</p>
                </div>
            `;

      document.getElementById('stats-container').innerHTML = statsHTML;
      document.getElementById('sample-info').innerHTML =
        `<p><strong>Mostra:</strong> ${total} participants | <strong>Fiabilitat:</strong> 95% | <strong>Metodologia:</strong> Anàlisi correlacional</p>`;
    }

    function procesarHipotesis1() {
      console.log('Processant Hipòtesi 1: Visibilitat i Representació');

      // Helpers
      const norm = v => (v ?? '').toString().trim().toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, ''); // treu accents
      const isYes = v => {
        const t = norm(v);
        return t.includes('si'); // cobreix "sí", "si", "si, parcialment", etc.
      };
      const hasBarriers = v => {
        const t = norm(v);
        if (!t) return false;
        // Considerem "sense barreres" quan apareix alguna d'aquestes paraules
        if (/(ninguna|no|sin|n\/a|na|ningun)/.test(t)) return false;
        return true;
      };

      // Segmentació: Actives vs No actives (passives o no-membre)
      const activas = [];
      const noActivas = [];

      for (const d of datosReales) {
        const miembro = norm(d.Miembro_Comunidad_Tech_Mujeres);
        if (!miembro) continue;

        const activa = /\bactiva\b|activament/.test(miembro);
        const pasiva = /\bpasiva\b/.test(miembro);
        const siMiembro = /^si\b/.test(miembro) || miembro.startsWith('si,'); // "sí" sense detall
        const noMiembro = /^no\b/.test(miembro);

        if (activa) activas.push(d);
        else if (pasiva || siMiembro || noMiembro) noActivas.push(d);
      }

      if (activas.length === 0 && noActivas.length === 0) {
        document.getElementById('analysis-h1').innerHTML = `
            <p class="text-red-600"><strong>⚠️ Error de dades:</strong> No s'han trobat valors vàlids en "Miembro_Comunidad_Tech_Mujeres".</p>
            <p>Revisa que existeixin valors com "activa/passiva/sí/no".</p>
        `;
        return;
      }

      // --- Variables d'anàlisi (representació) ---
      const a = activas.filter(d => isYes(d.Aumento_Mujeres_Equipos_Tech)).length;             // Actives AMB augment
      const c = noActivas.filter(d => isYes(d.Aumento_Mujeres_Equipos_Tech)).length;           // No actives AMB augment
      const b = activas.length - a;                                                             // Actives SENSE augment
      const d = noActivas.length - c;                                                           // No actives SENSE augment

      const pctRepActivas = activas.length ? (a / activas.length) * 100 : 0;
      const pctRepNoActivas = noActivas.length ? (c / noActivas.length) * 100 : 0;

      // --- Barreres (usar columna del dataset: "Barreras_Superadas_Comunidad") ---
      const barrAct = activas.filter(d => hasBarriers(d.Barreras_Superadas_Comunidad)).length;
      const barrNoAct = noActivas.filter(d => hasBarriers(d.Barreras_Superadas_Comunidad)).length;
      const pctBarrAct = activas.length ? (barrAct / activas.length) * 100 : 0;
      const pctBarrNoAct = noActivas.length ? (barrNoAct / noActivas.length) * 100 : 0;

      // --- Chi-quadrat 2x2 (amb correcció de Yates) ---
      const n = a + b + c + d;
      let chi2 = 0;
      if (n > 0) {
        const row1 = a + b, row2 = c + d;
        const col1 = a + c, col2 = b + d;
        const Ea = (row1 * col1) / n, Eb = (row1 * col2) / n, Ec = (row2 * col1) / n, Ed = (row2 * col2) / n;
        const adj = (obs, exp) => Math.max(0, Math.abs(obs - exp) - 0.5); // Yates
        chi2 = (Math.pow(adj(a, Ea), 2) / Ea) + (Math.pow(adj(b, Eb), 2) / Eb) +
          (Math.pow(adj(c, Ec), 2) / Ec) + (Math.pow(adj(d, Ed), 2) / Ed);
      }
      const significativo = chi2 > 3.841; // df=1, p<0.05

      // --- Netejar gràfics previs ---
      if (charts.hipotesis1) charts.hipotesis1.destroy();
      if (charts.hipotesis1b) charts.hipotesis1b.destroy();

      // --- Gràfic 1: Barres (Representació) ---
      const ctx1 = document.getElementById('hipotesis1Chart');
      if (ctx1) {
        charts.hipotesis1 = new Chart(ctx1.getContext('2d'), {
          type: 'bar',
          data: {
            labels: ['Participació Activa', 'No activa'],
            datasets: [{
              label: 'Major Representació Femenina (%)',
              data: [pctRepActivas, pctRepNoActivas],
              backgroundColor: ['rgba(99,102,241,0.8)', 'rgba(200,200,200,0.8)'],
              borderColor: ['rgba(99,102,241,1)', 'rgba(200,200,200,1)'],
              borderWidth: 2
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: { display: true, text: 'Representació Femenina per Tipus de Participació', font: { size: 16, weight: 'bold' } },
              legend: { position: 'top' },
              tooltip: {
                callbacks: {
                  label: (ctx) => {
                    const nGrp = ctx.dataIndex === 0 ? activas.length : noActivas.length;
                    return `${ctx.parsed.y.toFixed(1)}% (n=${nGrp})`;
                  }
                }
              }
            },
            scales: {
              y: { beginAtZero: true, max: 100, title: { display: true, text: 'Percentatge que reporta augment' } }
            }
          }
        });
      }

      // --- Gràfic 2: Doughnut "corona" (Barreres) ---
      const ctx1b = document.getElementById('hipotesis1bChart');
      if (ctx1b) {
        charts.hipotesis1b = new Chart(ctx1b.getContext('2d'), {
          type: 'doughnut',
          data: {
            labels: [
              'Actives amb Barreres', 'Actives sense Barreres',
              'No actives amb Barreres', 'No actives sense Barreres'
            ],
            datasets: [{
              // Fem servir COMPTES (no %), perquè la suma tingui sentit en un doughnut
              data: [
                barrAct,
                Math.max(0, activas.length - barrAct),
                barrNoAct,
                Math.max(0, noActivas.length - barrNoAct)
              ],
              backgroundColor: [
                'rgba(239,68,68,0.85)',
                'rgba(34,197,94,0.85)',
                'rgba(249,115,22,0.85)',
                'rgba(156,163,175,0.85)'
              ],
              borderWidth: 2
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '65%', // efecte de "corona"
            plugins: {
              title: { display: true, text: 'Percepció de Barreres de Gènere', font: { size: 16, weight: 'bold' } },
              legend: { position: 'bottom' },
              tooltip: {
                callbacks: {
                  label: (ctx) => {
                    const total = activas.length + noActivas.length;
                    const val = ctx.parsed;
                    const pct = total ? (val / total) * 100 : 0;
                    return `${ctx.label}: ${val} (${pct.toFixed(1)}%)`;
                  }
                }
              }
            }
          }
        });
      }

      // --- Interpretació i UI ---
      const dif = pctRepActivas - pctRepNoActivas; // diferència absoluta en punts
      const efecto = Math.abs(dif);

      const etiquetaCorrel = efecto >= 15 ? 'Correlació Forta'
        : efecto >= 5 ? 'Correlació Moderada'
          : 'Correlació Feble';
      const claseCorrel = efecto >= 15 ? 'correlation-strong'
        : efecto >= 5 ? 'correlation-medium'
          : 'correlation-weak';

      const corrEl = document.getElementById('correlacion-h1');
      if (corrEl) {
        corrEl.textContent = etiquetaCorrel;
        corrEl.className = `correlation-indicator ${claseCorrel}`;
      }

      // IC95% para % de activas (normal aprox.)
      const icAct = activas.length
        ? 1.96 * Math.sqrt((pctRepActivas / 100) * (1 - pctRepActivas / 100) / activas.length) * 100
        : 0;

      document.getElementById('analysis-h1').innerHTML = `
    <p>
    La <strong>Hipòtesi 1</strong> planteja que la participació activa de les dones en comunitats professionals de tecnologia s’associa amb una major representació femenina en els equips de treball i amb la reducció de barreres de gènere en les seves trajectòries. Els resultats descriptius mostren una forta associació: el <strong>78% de les dones membres actives</strong> perceben un augment en la presència femenina en equips, enfront de només el <strong>12% de les que no són membres</strong>. Així mateix, les enquestades van assenyalar que les comunitats les ajuden a superar obstacles rellevants, essent les barreres més esmentades la <em>manca de mentoria (25,5%)</em> i les <em>xarxes professionals limitades (22,7%)</em>, seguides de barreres culturals i biaixos en la feina. Aquestes troballes reforcen el paper de les comunitats com a eines efectives per impulsar l’equitat i oferir suport tangible a la carrera professional de les dones en tecnologia.
</p>
<p class="mt-4">
    L’anàlisi inferencial va confirmar amb solidesa la hipòtesi. La prova de <strong>Chi-quadrat va donar un valor de χ² = 50,08</strong>, molt superior al valor crític (3,841, α=0,05), cosa que va permetre <strong>rebutjar la hipòtesi nul·la</strong> i validar la hipòtesi d’investigació amb una alta significança estadística. Això demostra que la participació en comunitats de dones en tecnologia està fortament associada amb la percepció de major representació femenina en equips de treball. A més, el rol de les comunitats en la reducció de barreres com la manca de mentoria i referents consolida la conclusió que són un motor clau per a l’avanç professional i la igualtat de gènere en el sector.
</p>

`;

    }



    function procesarHipotesis2() {
      // Análisis de estructuras organizativas vs equidad
      const estructuras = {};

      datosReales.forEach(item => {
        const estructura = item.Estructura_Organizativa_Comunidad || 'No especificada';
        const equidad = item.Estructura_Colaborativa_Equidad || 'No especificada';

        if (!estructuras[estructura]) {
          estructuras[estructura] = { total: 0, altaEquidad: 0 };
        }

        estructuras[estructura].total++;
        if (equidad.includes('mucho') || equidad.includes('bastante')) {
          estructuras[estructura].altaEquidad++;
        }
      });

      const labels = Object.keys(estructuras);
      const porcentajesEquidad = labels.map(e =>
        (estructuras[e].altaEquidad / estructuras[e].total) * 100
      );

      const ctx2 = document.getElementById('hipotesis2Chart').getContext('2d');
      charts.hipotesis2 = new Chart(ctx2, {
        type: 'radar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Equitat de gènere (%)',
            data: porcentajesEquidad,
            backgroundColor: 'rgba(139, 92, 246, 0.2)',
            borderColor: 'rgba(139, 92, 246, 1)',
            borderWidth: 3,
            pointBackgroundColor: 'rgba(139, 92, 246, 1)',
            pointBorderColor: '#fff',
            pointBorderWidth: 2
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: { display: true, text: 'quitat de gènere per Estructura Organizativa' }
          },
          scales: {
            r: {
              beginAtZero: true,
              max: 100
            }
          }
        }
      });

      document.getElementById('analysis-h2').innerHTML = `
    <p>
        La hipòtesi 2 proposava que les comunitats amb estructures organitzatives col·laboratives afavoririen majors nivells d’equitat de gènere que aquelles amb estructures jeràrquiques o informals. L’anàlisi descriptiva va mostrar que l’estructura més comuna a la mostra va ser la <strong>col·laborativa (38,9%)</strong>, seguida d’un alt nombre de respostes que indicaven desconeixement sobre l’organització (26,3%). Malgrat aquestes diferències, la percepció d’equitat va resultar aclaparadorament positiva en gairebé tots els tipus d’estructura, assolint el <strong>96,8% de valoracions positives</strong>. Aquest patró reflecteix un “efecte sostre”: la gran majoria de participants ja percep alts nivells d’equitat, cosa que limita la variabilitat de les respostes i redueix la capacitat de distingir diferències clares entre estructures.
</p>
    </p>
    <p class="mt-4">
         En l’anàlisi inferencial, després de reagrupar categories i aplicar el <strong>Test exacte de Fisher</strong>, el p-valor obtingut va ser <strong>0,3</strong>, superior al llindar de significança (α=0,05). Això implica que <strong>no es pot rebutjar la hipòtesi nul·la</strong>, és a dir, no es va trobar una associació estadísticament significativa entre el tipus d’estructura organitzativa i la percepció d’equitat de gènere. Encara que la hipòtesi d’investigació no es valida en aquesta mostra, s’observa que l’únic cas de percepció no positiva correspon a una estructura jeràrquica/informal, la qual cosa, si bé no és concloent, suggereix una tendència que podria explorar-se amb una mostra més gran i variables més sensibles.
    </p>
`;
    }

    function procesarHipotesis3() {
      // Colaboración empresarial vs iniciativas de inclusión
      const colaboradores = datosReales.filter(d => d.Participacion_Iniciativas_Empresas === 'Sí');
      const noColaboradores = datosReales.filter(d => d.Participacion_Iniciativas_Empresas === 'No');

      const iniciativasColaboradores = colaboradores.filter(d =>
        d.Iniciativas_Empresas_Inclusion_Laboral?.includes('Sí')).length;
      const iniciativasNoColaboradores = noColaboradores.filter(d =>
        d.Iniciativas_Empresas_Inclusion_Laboral?.includes('Sí')).length;

      // Gráfico 1: Comparación de iniciativas
      const ctx3 = document.getElementById('hipotesis3Chart').getContext('2d');
      charts.hipotesis3 = new Chart(ctx3, {
        type: 'bar',
        data: {
          labels: ['Amb Colaboració Empresarial', 'Sense Colaboració Empresarial'],
          datasets: [{
            label: 'Iniciativas de Inclusión Implementadas (%)',
            data: [
              (iniciativasColaboradores / colaboradores.length) * 100,
              (iniciativasNoColaboradores / noColaboradores.length) * 100
            ],
            backgroundColor: ['rgba(16, 185, 129, 0.8)', 'rgba(107, 114, 128, 0.8)'],
            borderWidth: 2,
            borderColor: ['rgba(16, 185, 129, 1)', 'rgba(107, 114, 128, 1)']
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: { display: true, text: 'Impact de la Colaboració en Iniciativas' }
          },
          scales: {
            y: { beginAtZero: true, max: 100 }
          }
        }
      });

      // Gráfico 2: Tipos de iniciativas
      // ===== Renderizar Nube de Palabras en lugar de hipotesis3bChart =====
      function renderizarWordCloud() {
        const conceptosClave = {
          "contractar": 15, "dones": 28, "inclusió": 18, "diversitat": 12,
          "mentoria": 8, "polítiques": 10, "empreses": 25, "oportunitats": 11,
          "equitat": 9, "talent": 8, "cultura": 7, "formació": 9, "visibilitat": 8,
          "lideratge": 6, "networking": 5, "espais": 8, "col·laboració": 7,
          "programes": 9, "patrocini": 4, "quotes": 4, "transparència": 5,
          "pressupost": 4, "esdeveniments": 8, "comunitats": 10, "aliances": 5,
          "biaixos": 4, "desenvolupament": 6, "capacitación": 6, "promoció": 4,
          "igualtat": 5, "innovació": 4, "respecte": 3, "confiança": 3, "suport": 7,
          "participació": 5, "equips": 6, "tecnologia": 12, "estratègies": 4,
          "reclutament": 3, "sous": 3, "startup": 2, "consultores": 3,
          "universitats": 2, "referents": 3, "seguretat": 3, "comunicació": 2,
          "objectius": 3, "escolta": 3, "feedback": 2, "sponsor": 3, "plantilla": 2,
          "diagnòstic": 2, "reconeixement": 2
        };

        const colores = ['color-1', 'color-2', 'color-3', 'color-4'];
        const rotaciones = ['', 'rotate-1', 'rotate-2', 'rotate-3', 'rotate-4', 'rotate-5',
          'rotate-6', 'rotate-7', 'rotate-8', 'rotate-9', 'rotate-10'];
        function getTamano(f) { return f >= 20 ? 'size-1' : f >= 15 ? 'size-2' : f >= 10 ? 'size-3' : f >= 7 ? 'size-4' : f >= 4 ? 'size-5' : 'size-6'; }
        function getColor(f) { return f >= 15 ? 'color-frequent' : colores[Math.floor(Math.random() * colores.length)]; }
        function getRotation(f) { return f >= 15 ? '' : rotaciones[Math.floor(Math.random() * rotaciones.length)]; }

        const wordCloud = document.getElementById('wordCloud');
        const palabrasOrdenadas = Object.entries(conceptosClave);
        const elementosCreados = [];
        let contadorFrecuentes = 0;
        const palabrasFrecuentes = palabrasOrdenadas.filter(([, f]) => f >= 15);
        const palabrasNormales = palabrasOrdenadas.filter(([, f]) => f < 15);

        // Fisher-Yates shuffle
        for (let i = palabrasNormales.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1));[palabrasNormales[i], palabrasNormales[j]] = [palabrasNormales[j], palabrasNormales[i]]; }

        const todasLasPalabras = [...palabrasFrecuentes, ...palabrasNormales];

        todasLasPalabras.forEach(([palabra, frecuencia], index) => {
          const wordElement = document.createElement('div');
          wordElement.className = `word ${getTamano(frecuencia)} ${getColor(frecuencia)} ${getRotation(frecuencia)}`;
          wordElement.textContent = palabra;
          wordElement.title = `"${palabra}" - ${frecuencia} menciones`;
          wordElement.style.opacity = '0';
          wordElement.style.position = 'absolute';
          wordCloud.appendChild(wordElement);

          setTimeout(() => {
            // posición aleatoria simple (puedes reutilizar la función avanzada si prefieres)
            const x = Math.random() * (wordCloud.offsetWidth - 100);
            const y = Math.random() * (wordCloud.offsetHeight - 50);
            wordElement.style.left = x + 'px';
            wordElement.style.top = y + 'px';
            wordElement.style.transition = 'opacity 0.5s ease';
            wordElement.style.opacity = '1';
            elementosCreados.push(wordElement);
          }, index * 150);

          wordElement.addEventListener('click', () => alert(`"${palabra}" fue mencionado ${frecuencia} veces`));
        });
      }
      renderizarWordCloud();

      // Interpretación y UI
      const diffIniciativas = ((iniciativasColaboradores / colaboradores.length) - (iniciativasNoColaboradores / noColaboradores.length)) * 100;
      const efecto = Math.abs(diffIniciativas);

      const etiquetaCorrel = efecto >= 15 ? 'Correlació Forta'
        : efecto >= 5 ? 'Correlación Moderada'
          : 'Correlación Débil';
      const claseCorrel = efecto >= 15 ? 'correlation-strong'
        : efecto >= 5 ? 'correlation-medium'
          : 'correlation-weak';

      const corrEl = document.getElementById('correlacion-h3');
      if (corrEl) {
        corrEl.textContent = etiquetaCorrel;
        corrEl.className = `correlation-indicator ${claseCorrel}`;
      }

      document.getElementById('analysis-h3').innerHTML = `
          <p>
    La recerca se centra en la hipòtesi que la col·laboració entre comunitats professionals de dones i empreses tecnològiques a Barcelona impulsa iniciatives d’igualtat de gènere, promovent un entorn laboral més inclusiu i equitatiu. Per avaluar aquesta hipòtesi, es va realitzar una anàlisi descriptiva i una anàlisi estadística inferencial utilitzant un test de Chi-quadrat. Es van establir dues variables clau: la participació en iniciatives amb empreses (categòrica binària: Col·labora vs. No col·labora) i la percepció d’augment de dones en equips tecnològics (categòrica binària: Augment vs. No augment). Els resultats van mostrar que, d’una mostra de 92 respostes vàlides, 68 participants que col·laboren amb empreses perceben un augment en la representació femenina, en comparació amb només 11 d’aquells que no col·laboren.
</p>
<p class="mt-4">
    El valor calculat de l’estadístic χ² va ser de 14,06, superant el valor crític de 3,841 per a un nivell de significança de α=0,05, fet que va portar a rebutjar la hipòtesi nul·la (H₀) d’independència. Això indica una associació significativa entre la col·laboració amb empreses i la percepció d’augment de dones en equips tecnològics, donant suport a la hipòtesi alternativa (H₁). Aquestes troballes suggereixen que la col·laboració activa entre comunitats de dones i empreses tecnològiques és un factor crucial per fomentar iniciatives d’inclusió laboral, contribuint a un entorn més equitatiu en el sector tecnològic.
</p>
<p class="mt-4">
    Els comentaris qualitatius sobre accions futures d’inclusió reforcen la importància d’aquesta col·laboració, destacant la necessitat de més contractació de dones, programes de mentoria, entorns laborals inclusius i polítiques clares d’inclusió. L’evidència empírica valida fermament la hipòtesi de recerca, confirmant que la col·laboració amb empreses és un factor impulsor crucial per a iniciatives d’igualtat de gènere, resultant en un augment tangible de la representació femenina en el sector tecnològic. Aquestes troballes subratllen la rellevància de fomentar aliances estratègiques entre comunitats i empreses per avançar cap a un entorn laboral més equitatiu.
</p>

            `;
    }

    function procesarHipotesis4() {
      // Frecuencia de participación vs oportunidades laborales
      const frecuenciaMap = {
        'Semanalment': 5,
        'Mensualment': 4,
        'Regularment (4–10 vagadas al any)': 3,
        'Ocasionalment (1-3 vagadas al any)': 2,
        'Nunca': 1
      };

      const frecuenciaLabels = ['Nunca', 'Ocasional', 'Regular', 'Mensual', 'Semanal'];

      const datosFrecuencia = {};
      frecuenciaLabels.forEach(label => {
        datosFrecuencia[label] = { total: 0, oportunidades: 0, expansion: 0 };
      });

      datosReales.forEach(item => {
        const frecuenciaTexto = item.Frecuencia_Participacion_Comunidad;
        const oportunidades = item.Acceso_Oportunidades_Laborales === 'Sí';
        const expansion = item.Expansion_Red_Profesional?.includes('Sí');

        let categoria = 'Nunca';
        if (frecuenciaTexto?.includes('Semanalmente')) categoria = 'Semanal';
        else if (frecuenciaTexto?.includes('Mensualmente')) categoria = 'Mensual';
        else if (frecuenciaTexto?.includes('Regularmente')) categoria = 'Regular';
        else if (frecuenciaTexto?.includes('Ocasionalmente')) categoria = 'Ocasional';

        datosFrecuencia[categoria].total++;
        if (oportunidades) datosFrecuencia[categoria].oportunidades++;
        if (expansion) datosFrecuencia[categoria].expansion++;
      });

      const oportunidadesData = frecuenciaLabels.map(f =>
        datosFrecuencia[f].total > 0 ? (datosFrecuencia[f].oportunidades / datosFrecuencia[f].total) * 100 : 0
      );
      const expansionData = frecuenciaLabels.map(f =>
        datosFrecuencia[f].total > 0 ? (datosFrecuencia[f].expansion / datosFrecuencia[f].total) * 100 : 0
      );

      const ctx4 = document.getElementById('hipotesis4Chart').getContext('2d');
      charts.hipotesis4 = new Chart(ctx4, {
        type: 'line',
        data: {
          labels: frecuenciaLabels,
          datasets: [
            {
              label: 'Oportunitats Laborals (%)',
              data: oportunidadesData,
              borderColor: 'rgba(99, 102, 241, 1)',
              backgroundColor: 'rgba(99, 102, 241, 0.1)',
              tension: 0.4,
              fill: true,
              pointRadius: 6,
              pointBorderWidth: 3
            },
            {
              label: 'Expansió de la Xarxa (%)',
              data: expansionData,
              borderColor: 'rgba(236, 72, 153, 1)',
              backgroundColor: 'rgba(236, 72, 153, 0.1)',
              tension: 0.4,
              fill: true,
              pointRadius: 6,
              pointBorderWidth: 3
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: { display: true, text: 'Correlación Frecuencia-Oportunidades' },
            legend: { position: 'top' }
          },
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
              title: { display: true, text: 'Porcentaje de Impacto Positivo' }
            },
            x: {
              title: { display: true, text: 'Frecuencia de Participación' }
            }
          }
        }
      });

      // Calcular correlación
      const correlacionOportunidades = oportunidadesData[4] - oportunidadesData[0]; // Semanal vs Nunca
      const correlacionExpansion = expansionData[4] - expansionData[0];
      const correlacionPromedio = (correlacionOportunidades + correlacionExpansion) / 2;

      document.getElementById('correlacion-h4').textContent = correlacionPromedio > 30 ? 'Correlació Forta' : correlacionPromedio > 15 ? 'Correlació Moderada' : 'Correlació Feble';
      document.getElementById('correlacion-h4').className = `correlation-indicator ${correlacionPromedio > 30 ? 'correlation-strong' : correlacionPromedio > 15 ? 'correlation-medium' : 'correlation-weak'}`;

      document.getElementById('analysis-h4').innerHTML = `
    
       <p class="mt-4">
    La <strong>Hipòtesi 4</strong> planteja que la participació freqüent en esdeveniments comunitaris de tecnologia està associada amb una major expansió de xarxes professionals i l’accés a més oportunitats laborals. Els resultats quantitatius evidencien una relació significativa: les dones que participen de manera freqüent en esdeveniments presenten una probabilitat <strong>3,47 vegades més gran</strong> d’accedir a oportunitats laborals que aquelles amb menor participació. L’anàlisi estadística va mostrar un <em>V de Cramer = 0,286</em> (mida de l’efecte mitjana) i un <em>Odds Ratio de 3,47</em>, la qual cosa confirma la rellevància pràctica d’aquesta relació. Aquestes troballes validen la hipòtesi de recerca, subratllant el paper dels esdeveniments com a catalitzadors de mobilitat professional i equitat en el sector tecnològic.
</p>
<p class="mt-4">
    L’anàlisi qualitativa complementa i reforça aquesta conclusió. Les respostes obertes van assenyalar que els esdeveniments i les aliances entre comunitats i empreses generen beneficis en diferents dimensions: creació d’<strong>espais segurs de suport (80%)</strong>, <strong>visibilitat de dones líders (74,5%)</strong>, oportunitats de <strong>networking (70%)</strong>, i programes de <strong>mentoria i formació (65%)</strong>. Aquestes iniciatives no només enforteixen les xarxes professionals, sinó que també impulsen transformacions estructurals en contractació, lideratge i conciliació. En conjunt, els resultats destaquen que la participació en esdeveniments és un motor clau per ampliar les oportunitats laborals, consolidar referents femenins i fomentar entorns inclusius i sostenibles.
</p>

    </p>
`;

    }

    function generarConclusiones() {
      const conclusionesHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">

          <!-- Hipótesis -->
<div class="space-y-4">
    <h3 class="text-2xl font-bold text-gray-800">Hipòtesi</h3>
    <div class="space-y-3">

        <!-- Hipótesis 1 -->
        <div class="p-4 bg-green-50 border-l-8 border-green-600 rounded shadow-md">
            <p class="font-bold text-green-900 uppercase tracking-wide">Hipòtesi 1: Confirmada</p>
            <p class="text-green-800">La participació activa efectivament s'associa amb més representació femenina.</p>
        </div>

        <!-- Hipótesis 2 -->
        <div class="p-4 bg-red-50 border-l-8 border-red-600 rounded shadow-md">
            <p class="font-bold text-red-900 uppercase tracking-wide">Hipótesis 2: No Confirmada</p>
            <p class="text-red-800">No es va trobar evidència suficient per demostrar que la capacitació interna per si mateixa incrementa la retenció.</p>
        </div>

        <!-- Hipótesis 3 -->
        <div class="p-4 bg-yellow-50 border-l-8 border-yellow-500 rounded shadow-md">
            <p class="font-bold text-yellow-800 uppercase tracking-wide">Hipòtesi 3: Confirmada</p>
            <p class="text-yellow-700">L'accés a la mentoria incrementa la retenció de dones en rols tècnics.</p>
        </div>

        <!-- Hipótesis 4 -->
        <div class="p-4 bg-blue-50 border-l-8 border-blue-600 rounded shadow-md">
            <p class="font-bold text-blue-900 uppercase tracking-wide">Hipòtesi 4: Fuertemente Confirmada</p>
            <p class="text-blue-800">Clara correlació entre freqüència de participació i oportunitats laborals.</p>
        </div>

    </div>
</div>

<!-- Insights Clave -->
<div class="space-y-4">
    <h3 class="text-2xl font-bold text-gray-800">Insights</h3>
    <div class="space-y-3">

        <div class="p-4 bg-purple-50 border-l-8 border-purple-600 rounded shadow-md">
            <p class="font-bold text-purple-900 uppercase tracking-wide">Participació Activa</p>
            <p class="text-purple-800">Les dones actives en comunitats tecnològiques mostren consistentment millors indicadors professionals.</p>
        </div>

        <div class="p-4 bg-pink-50 border-l-8 border-pink-600 rounded shadow-md">
            <p class="font-bold text-pink-900 uppercase tracking-wide">Col·laboració Empresa-Comunitat</p>
            <p class="text-pink-800">La sinergia públic-privada és crucial per impulsar iniciatives d’inclusió efectives.</p>
        </div>

        <div class="p-4 bg-green-50 border-l-8 border-green-600 rounded shadow-md">
            <p class="font-bold text-green-900 uppercase tracking-wide">Creixement en Representació</p>
            <p class="text-green-800">La participació femenina en el sector tecnològic a Barcelona va passar del 14% al 28% en quatre anys.</p>
        </div>

        <div class="p-4 bg-yellow-50 border-l-8 border-yellow-600 rounded shadow-md">
            <p class="font-bold text-yellow-900 uppercase tracking-wide">Networking i Mentoria</p>
            <p class="text-yellow-800">Els programes de mentoria i xarxes professionals són clau per ampliar oportunitats laborals.</p>
        </div>

    </div>
</div>
        </div>
       <!-- Recomanacions Estratègiques -->
<div class="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
    <h3 class="text-2xl font-bold text-gray-800 mb-4">Recomanacions Estratègiques</h3>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="text-center">
            <img src="../../assets/images/participation.ico" alt="Icona participació" class="w-12 h-12 mx-auto mb-2">
            <p class="font-bold">Fomentar Participació Activa</p>
            <p class="text-sm text-gray-600">Crear incentius per a la participació regular i compromesa</p>
        </div>
        <div class="text-center">
            <img src="../../assets/images/aliance.ico" alt="Icona col·laboració" class="w-12 h-12 mx-auto mb-2">
            <p class="font-bold">Enfortir Aliances</p>
            <p class="text-sm text-gray-600">Establir col·laboracions estructurades empresa-comunitat</p>
        </div>
        <div class="text-center">
            <img src="../../assets/images/impact.ico" alt="Icona impacte" class="w-12 h-12 mx-auto mb-2">
            <p class="font-bold">Mesurar Impacte</p>
            <p class="text-sm text-gray-600">Implementar mètriques per avaluar l’efectivitat de les iniciatives</p>
        </div>
    </div>
</div>
    `;

      document.getElementById('conclusiones-generales').innerHTML = conclusionesHTML;
    }

    // Inicializar cuando la página esté lista
    document.addEventListener('DOMContentLoaded', cargarDatos);

