document.addEventListener('DOMContentLoaded', () => {
    // Cargar los datos del JSON generado por Python
    const chartDataElement = document.getElementById('chart-data');
    const data = JSON.parse(chartDataElement.textContent);

    console.log("Datos cargados para gráficos:", data);

    // Actualizar las estadísticas principales
    document.getElementById('total-responses').textContent = data.totalResponses;
    document.getElementById('active-members').textContent = `${data.activeMembersPercentage}%`;
    document.getElementById('avg-age').textContent = data.avgAge;
    document.getElementById('inclusion-impact').textContent = `${data.inclusionImpactPercentage}%`;

    // Variables para almacenar las instancias de los gráficos
    let rolesChartInstance, participationChartInstance, belongingChartInstance,
        ageChartInstance, barriersChartInstance, actionsChartInstance,
        networkChartInstance, continuityChartInstance;

    // Función para crear o actualizar un gráfico
    function createOrUpdateChart(chartId, chartType, chartData, options = {}) {
        const ctx = document.getElementById(chartId).getContext('2d');
        let chartInstance;

        // Destruir la instancia existente si la hay
        if (window[chartId + 'Instance']) {
            window[chartId + 'Instance'].destroy();
        }

        chartInstance = new Chart(ctx, {
            type: chartType,
            data: chartData,
            options: options
        });
        window[chartId + 'Instance'] = chartInstance; // Almacenar la instancia en el objeto global window
        return chartInstance;
    }

    // Función para renderizar todos los gráficos
    function renderCharts(filteredData) {
        // Colores para los gráficos
        const primaryColor = 'rgba(75, 192, 192, 0.8)';
        const secondaryColor = 'rgba(153, 102, 255, 0.8)';
        const tertiaryColor = 'rgba(255, 159, 64, 0.8)';
        const borderColor = 'rgba(75, 192, 192, 1)';

        // Gráfico de Roles Técnicos
        rolesChartInstance = createOrUpdateChart('rolesChart', 'bar', {
            labels: filteredData.rolesData.labels,
            datasets: [{
                label: 'Número de Respuestas',
                data: filteredData.rolesData.data,
                backgroundColor: primaryColor,
                borderColor: borderColor,
                borderWidth: 1
            }]
        }, {
            indexAxis: 'y', // Barras horizontales
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { beginAtZero: true }
            }
        });

        // Gráfico de Nivel de Participación en Comunidades
        participationChartInstance = createOrUpdateChart('participationChart', 'pie', {
            labels: filteredData.participationData.labels,
            datasets: [{
                label: 'Frecuencia de Participación',
                data: filteredData.participationData.data,
                backgroundColor: [primaryColor, secondaryColor, tertiaryColor, 'rgba(255, 99, 132, 0.8)', 'rgba(54, 162, 235, 0.8)'],
                borderColor: '#fff',
                borderWidth: 1
            }]
        }, {
            responsive: true,
            maintainAspectRatio: false,
        });

        // Gráfico de Impacto en Sentido de Pertenencia
        belongingChartInstance = createOrUpdateChart('belongingChart', 'doughnut', {
            labels: filteredData.belongingData.labels,
            datasets: [{
                label: 'Impacto en Pertenencia',
                data: filteredData.belongingData.data,
                backgroundColor: [primaryColor, secondaryColor, tertiaryColor, 'rgba(255, 99, 132, 0.8)'],
                borderColor: '#fff',
                borderWidth: 1
            }]
        }, {
            responsive: true,
            maintainAspectRatio: false,
        });

        // Gráfico de Distribución por Edad
        ageChartInstance = createOrUpdateChart('ageChart', 'bar', {
            labels: filteredData.ageData.labels,
            datasets: [{
                label: 'Número de Respuestas',
                data: filteredData.ageData.data,
                backgroundColor: secondaryColor,
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1
            }]
        }, {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true }
            }
        });

        // Gráfico de Barreras Identificadas
        barriersChartInstance = createOrUpdateChart('barriersChart', 'bar', {
            labels: filteredData.barriersData.labels,
            datasets: [{
                label: 'Número de Respuestas',
                data: filteredData.barriersData.data,
                backgroundColor: tertiaryColor,
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 1
            }]
        }, {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { beginAtZero: true }
            }
        });

        // Gráfico de Acciones Más Efectivas para Promover Equidad de Género
        actionsChartInstance = createOrUpdateChart('actionsChart', 'bar', {
            labels: filteredData.actionsData.labels,
            datasets: [{
                label: 'Número de Respuestas',
                data: filteredData.actionsData.data,
                backgroundColor: primaryColor,
                borderColor: borderColor,
                borderWidth: 1
            }]
        }, {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { beginAtZero: true }
            }
        });

        // Gráfico de Expansión de Red Profesional
        networkChartInstance = createOrUpdateChart('networkChart', 'pie', {
            labels: filteredData.networkData.labels,
            datasets: [{
                label: 'Expansión de Red Profesional',
                data: filteredData.networkData.data,
                backgroundColor: [primaryColor, secondaryColor, tertiaryColor],
                borderColor: '#fff',
                borderWidth: 1
            }]
        }, {
            responsive: true,
            maintainAspectRatio: false,
        });

        // Gráfico de Influencia en Continuidad en el Sector
        continuityChartInstance = createOrUpdateChart('continuityChart', 'doughnut', {
            labels: filteredData.continuityData.labels,
            datasets: [{
                label: 'Influencia en Continuidad',
                data: filteredData.continuityData.data,
                backgroundColor: [primaryColor, secondaryColor, tertiaryColor],
                borderColor: '#fff',
                borderWidth: 1
            }]
        }, {
            responsive: true,
            maintainAspectRatio: false,
        });
    }

    // Renderizar los gráficos iniciales
    renderCharts(data);

    // Lógica de filtrado (simplificada, ya que los datos JSON están pre-agregados)
    // Para implementar un filtrado dinámico real, necesitarías cargar los datos brutos
    // en JavaScript y realizar las agregaciones aquí, o tener múltiples JSONs pre-agregados.
    // Por ahora, los filtros no afectarán los gráficos, solo son placeholders visuales.
    const roleFilter = document.getElementById('role-filter');
    const experienceFilter = document.getElementById('experience-filter');

    function applyFilters() {
        const selectedRole = roleFilter.value;
        const selectedExperience = experienceFilter.value;
        console.log(`Filtros aplicados: Rol - ${selectedRole}, Experiencia - ${selectedExperience}`);
        // Aquí iría la lógica para re-filtrar y re-renderizar los gráficos
        // Esto requeriría que 'data' contenga los datos brutos o más granularidad.
        // Para este ejemplo, los gráficos se basan en los datos agregados por Python.
    }

    roleFilter.addEventListener('change', applyFilters);
    experienceFilter.addEventListener('change', applyFilters);
});

