
// Chart.js for Diversity Chart
const ctx = document.getElementById('diversityChart').getContext('2d');
const diversityChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Desarrollo', 'Data Science', 'Ciberseguridad', 'UX/UI', 'Gestión de Proyectos', 'QA'],
        datasets: [{
            label: '% Mujeres',
            data: [18, 25, 12, 35, 28, 20],
            backgroundColor: [
                'rgba(102, 126, 234, 0.7)', // --primary
                'rgba(118, 75, 162, 0.7)', // --secondary
                'rgba(240, 147, 251, 0.7)', // --accent
                'rgba(78, 205, 196, 0.7)', // --success
                'rgba(252, 227, 138, 0.7)', // --warning
                'rgba(44, 62, 80, 0.7)' // --dark
            ],
            borderColor: [
                'rgba(102, 126, 234, 1)',
                'rgba(118, 75, 162, 1)',
                'rgba(240, 147, 251, 1)',
                'rgba(78, 205, 196, 1)',
                'rgba(252, 227, 138, 1)',
                'rgba(44, 62, 80, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: 'Distribución de Mujeres en Roles Tech (Barcelona)',
                color: '#2c3e50',
                font: {
                    size: 16
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Porcentaje',
                    color: '#2c3e50'
                },
                ticks: {
                    color: '#2c3e50'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Rol Tech',
                    color: '#2c3e50'
                },
                ticks: {
                    color: '#2c3e50'
                }
            }
        }
    }
});

// Add Intersection Observer for animations
const animateElements = document.querySelectorAll('.animate-in');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up-active');
        }
    });
}, {
    threshold: 0.1
});

animateElements.forEach(element => {
    observer.observe(element);
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
