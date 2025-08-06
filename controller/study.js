
        // Configuración común para todos los gráficos
        Chart.defaults.font.family = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
        Chart.defaults.font.size = 14;

        // Colores personalizados
        const colors = {
            primary: '#667eea',
            secondary: '#764ba2',
            accent: '#f8f9ff',
            gradient: ['#667eea', '#764ba2', '#9575cd', '#7986cb', '#64b5f6', '#4fc3f7', '#4dd0e1', '#4db6ac']
        };

        // Datos procesados del CSV
        const data = {
            roles: {
                'Fullstack Developer': 8,
                'Frontend Developer': 6,
                'Data Analyst': 5,
                'Backend Developer': 4,
                'UX/UI Designer': 4,
                'Project/Product Manager': 3,
                'Otros': 7
            },
            participation: {
                'Regularmente (4-10 veces/año)': 15,
                'Ocasionalmente (1-3 veces/año)': 12,
                'Mensualmente': 8,
                'Semanalmente': 3,
                'Más de 10 veces/año': 5
            },
            belonging: {
                'Sí, significativamente': 18,
                'Sí, en parte': 16,
                'No': 3,
                'No aplica': 6
            },
            age: {
                '25-30': 8,
                '31-35': 11,
                '36-40': 10,
                '41-45': 8,
                '46-50': 6,
                '50+': 5
            },
            barriers: {
                'Redes profesionales limitadas': 22,
                'Sesgos de género': 18,
                'Barreras culturales': 12,
                'Falta de mentoría': 15,
                'Barreras económicas': 8,
                'Síndrome de la impostora': 6
            },
            actions: {
                'Eventos de networking': 28,
                'Programas de mentoría': 24,
                'Espacios seguros de apoyo': 20,
                'Talleres de formación': 18,
                'Visibilidad de mujeres líderes': 16,
                'Políticas inclusivas': 14,
                'Flexibilidad y conciliación': 12
            },
            network: {
                'Sí, mucho': 15,
                'Sí, algo': 18,
                'No': 12
            },
            continuity: {
                'Sí, significativamente': 12,
                'Sí, en parte': 22,
                'No': 8,
                'No sé/No aplica': 6
            }
        };

        // Función para crear gráfico de roles
        function createRolesChart() {
            const ctx = document.getElementById('rolesChart').getContext('2d');
            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: Object.keys(data.roles),
                    datasets: [{
                        data: Object.values(data.roles),
                        backgroundColor: colors.gradient,
                        borderWidth: 3,
                        borderColor: '#fff'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                padding: 20,
                                usePointStyle: true
                            }
                        }
                    },
                    animation: {
                        animateRotate: true,
                        duration: 2000
                    }
                }
            });
        }

        // Función para crear gráfico de participación
        function createParticipationChart() {
            const ctx = document.getElementById('participationChart').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: Object.keys(data.participation),
                    datasets: [{
                        data: Object.values(data.participation),
                        backgroundColor: colors.gradient,
                        borderRadius: 8,
                        borderSkipped: false
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: 'rgba(0,0,0,0.1)'
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            }
                        }
                    },
                    animation: {
                        duration: 2000,
                        easing: 'easeOutBounce'
                    }
                }
            });
        }

        // Función para crear gráfico de pertenencia
        function createBelongingChart() {
            const ctx = document.getElementById('belongingChart').getContext('2d');
            new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: Object.keys(data.belonging),
                    datasets: [{
                        data: Object.values(data.belonging),
                        backgroundColor: [colors.primary, colors.secondary, '#ff6b6b', '#ffd93d'],
                        borderWidth: 3,
                        borderColor: '#fff'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                padding: 20,
                                usePointStyle: true
                            }
                        }
                    },
                    animation: {
                        animateRotate: true,
                        duration: 2000
                    }
                }
            });
        }

        // Función para crear gráfico de edad
        function createAgeChart() {
            const ctx = document.getElementById('ageChart').getContext('2d');
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: Object.keys(data.age),
                    datasets: [{
                        label: 'Distribución por Edad',
                        data: Object.values(data.age),
                        borderColor: colors.primary,
                        backgroundColor: colors.primary + '20',
                        fill: true,
                        tension: 0.4,
                        pointBackgroundColor: colors.primary,
                        pointBorderColor: '#fff',
                        pointBorderWidth: 3,
                        pointRadius: 6
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: 'rgba(0,0,0,0.1)'
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            }
                        }
                    },
                    animation: {
                        duration: 2000,
                        easing: 'easeInOutQuart'
                    }
                }
            });
        }

        // Función para crear gráfico de barreras
        function createBarriersChart() {
            const ctx = document.getElementById('barriersChart').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: Object.keys(data.barriers),
                    datasets: [{
                        label: 'Número de menciones',
                        data: Object.values(data.barriers),
                        backgroundColor: colors.gradient,
                        borderRadius: 8,
                        borderSkipped: false
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    indexAxis: 'y',
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        x: {
                            beginAtZero: true,
                            grid: {
                                color: 'rgba(0,0,0,0.1)'
                            }
                        },
                        y: {
                            grid: {
                                display: false
                            }
                        }
                    },
                    animation: {
                        duration: 2000,
                        easing: 'easeOutQuart'
                    }
                }
            });
        }

        // Función para crear gráfico de acciones
        function createActionsChart() {
            const ctx = document.getElementById('actionsChart').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: Object.keys(data.actions),
                    datasets: [{
                        label: 'Nivel de efectividad percibida',
                        data: Object.values(data.actions),
                        backgroundColor: colors.gradient,
                        borderRadius: 8,
                        borderSkipped: false
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: 'rgba(0,0,0,0.1)'
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            },
                            ticks: {
                                maxRotation: 45,
                                minRotation: 45
                            }
                        }
                    },
                    animation: {
                        duration: 2000,
                        easing: 'easeOutQuart'
                    }
                }
            });
        }

        // Función para crear gráfico de red
        function createNetworkChart() {
            const ctx = document.getElementById('networkChart').getContext('2d');
            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: Object.keys(data.network),
                    datasets: [{
                        data: Object.values(data.network),
                        backgroundColor: [colors.primary, colors.secondary, '#ff6b6b'],
                        borderWidth: 3,
                        borderColor: '#fff'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                padding: 20,
                                usePointStyle: true
                            }
                        }
                    },
                    animation: {
                        animateRotate: true,
                        duration: 2000
                    }
                }
            });
        }

        // Función para crear gráfico de continuidad
        function createContinuityChart() {
            const ctx = document.getElementById('continuityChart').getContext('2d');
            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: Object.keys(data.continuity),
                    datasets: [{
                        data: Object.values(data.continuity),
                        backgroundColor: [colors.primary, colors.secondary, '#ff6b6b', '#ffd93d'],
                        borderWidth: 3,
                        borderColor: '#fff'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                padding: 20,
                                usePointStyle: true
                            }
                        }
                    },
                    animation: {
                        animateRotate: true,
                        duration: 2000
                    }
                }
            });
        }

        // Inicializar todos los gráficos
        function initializeCharts() {
            createRolesChart();
            createParticipationChart();
            createBelongingChart();
            createAgeChart();
            createBarriersChart();
            createActionsChart();
            createNetworkChart();
            createContinuityChart();
        }

        // Animaciones de entrada
        function animateElements() {
            const elements = document.querySelectorAll('.animate-in');
            elements.forEach((el, index) => {
                setTimeout(() => {
                    el.style.opacity = '0';
                    el.style.transform = 'translateY(30px)';
                    el.style.transition = 'all 0.6s ease';
                    
                    setTimeout(() => {
                        el.style.opacity = '1';
                        el.style.transform = 'translateY(0)';
                    }, 100);
                }, index * 200);
            });
        }

        // Inicializar cuando se carga la página
        window.addEventListener('load', () => {
            setTimeout(initializeCharts, 500);
            animateElements();
        });

        // Event listeners para filtros (funcionalidad básica)
        document.getElementById('role-filter').addEventListener('change', function() {
            console.log('Filtro de rol cambiado:', this.value);
        });

        document.getElementById('experience-filter').addEventListener('change', function() {
            console.log('Filtro de experiencia cambiado:', this.value);
        });
    