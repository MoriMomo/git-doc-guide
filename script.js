document.addEventListener('DOMContentLoaded', function () {

    const fileData = {
        'README.md': {
            title: 'README.md',
            description: 'The primary entry point for any repository. It provides a comprehensive overview of the project, including installation instructions, usage examples, and links to more detailed documentation.',
            benefit: 'Attracts contributors and facilitates smoother onboarding by acting as a marketing and guidance document.'
        },
        'LICENSE.md': {
            title: 'LICENSE.md',
            description: 'Critically important for open-source projects, this file legally defines the terms under which the software can be used, distributed, and modified. Without it, default copyright laws apply.',
            benefit: 'Provides legal clarity, protects intellectual property, and encourages reuse and further development.'
        },
        'CITATION.cff': {
            title: 'CITATION.cff',
            description: 'A human- and machine-readable file that provides citation information for the software or dataset, guiding users on how to give proper credit.',
            benefit: 'Increases discoverability and ensures proper academic and professional credit is attributed to contributors.'
        },
        'CONTRIBUTING.md': {
            title: 'CONTRIBUTING.md',
            description: 'Provides clear guidelines for how individuals can contribute to the project, including instructions for submitting pull requests, reporting bugs, or requesting features.',
            benefit: 'Serves as a central anchor for community building and helps maintain consistency in contributions.'
        },
        'CODE_OF_CONDUCT.md': {
            title: 'CODE_OF_CONDUCT.md',
            description: 'Outlines the expected behavior from contributors, aiming to foster a welcoming and respectful community environment.',
            benefit: 'Establishes a baseline standard for interactions and provides mechanisms for resolving conflicts.'
        },
        'SECURITY.md': {
            title: 'SECURITY.md',
            description: 'Establishes clear, confidential channels for reporting security vulnerabilities and outlines the project\'s incident response framework.',
            benefit: 'Reinforces a security-first culture and provides a safe way for researchers to disclose issues.'
        },
        'CODEOWNERS': {
            title: 'CODEOWNERS',
            description: 'Assigns responsibility for specific parts of the codebase to designated individuals or teams, automatically requesting their review on changes.',
            benefit: 'Enhances code quality, fosters accountability, and acts as a critical quality gate.'
        },
        '.gitignore': {
            title: '.gitignore',
            description: 'A simple yet highly effective tool for explicitly excluding files and directories (like build artifacts or sensitive data) from version control.',
            benefit: 'Prevents the accidental commitment of unnecessary or confidential files, keeping the repository clean.'
        }
    };

    const diataxisData = {
        tutorials: {
            title: 'Tutorials: Learning-Oriented',
            content: 'Tutorials are lessons that take the user by the hand through a series of steps to complete a project or a meaningful part of a project. They are learning-oriented. The key is to help the user learn, not just to get a task done. Example: "Build Your First App with Our Framework".'
        },
        'how-to': {
            title: 'How-to Guides: Goal-Oriented',
            content: 'How-to guides are recipes. They guide the user through the steps required to solve a real-world problem. They are goal-oriented and more advanced than tutorials, assuming some prior knowledge. Example: "How to Configure a Database Connection".'
        },
        explanation: {
            title: 'Explanation: Understanding-Oriented',
            content: 'Explanation, or discussion, clarifies and illuminates a particular topic. It provides background and context, deepening the user\'s understanding of the project. It answers the "why" questions. Example: "Architectural Overview of the Caching Layer".'
        },
        reference: {
            title: 'Reference: Information-Oriented',
            content: 'Reference guides are technical descriptions of the machinery and how to operate it. They are information-oriented, accurate, and complete, acting as an encyclopedia for the project. Example: "API Documentation for the User Endpoint".'
        }
    };

    const securityChartData = {
        labels: ['Dependency Alerts', 'Dependency Updates', 'Code Scanning', 'Secret Scanning'],
        data: [25, 25, 25, 25],
        descriptions: [
            '<strong>Dependency Alerts:</strong> Notifies of known vulnerabilities in your project\'s third-party libraries. This allows for timely awareness and action to address weaknesses introduced by dependencies.',
            '<strong>Dependency Updates (Dependabot):</strong> Automates the process of updating dependencies to their latest, more secure versions, significantly reducing the project\'s attack surface over time.',
            '<strong>Code Scanning (SAST):</strong> Identifies security vulnerabilities and coding errors directly within your project\'s own codebase, "shifting security left" in the development cycle.',
            '<strong>Secret Scanning:</strong> Detects sensitive data, such as API keys and tokens, that have been accidentally committed to the repository, preventing exposure of critical credentials.'
        ]
    };

    const fileListEl = document.getElementById('file-list');
    const fileDetailsEl = document.getElementById('file-details');
    let firstButton = null; // Variable to hold the first button element

    Object.keys(fileData).forEach((key, index) => {
        const button = document.createElement('button');
        button.className = 'w-full text-left px-4 py-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors';
        button.textContent = key;
        button.onclick = () => {
            Object.values(fileListEl.children).forEach(child => child.classList.remove('bg-blue-100', 'font-semibold'));
            button.classList.add('bg-blue-100', 'font-semibold');
            const data = fileData[key];
            fileDetailsEl.innerHTML = `
                <h3 class="text-3xl font-bold mb-4">${data.title}</h3>
                <p class="text-lg mb-4 text-gray-700">${data.description}</p>
                <div class="bg-green-50 border-l-4 border-green-500 text-green-800 p-4 rounded-r-lg">
                    <p><span class="font-bold">Key Benefit:</span> ${data.benefit}</p>
                </div>
            `;
        };
        fileListEl.appendChild(button);
        if (index === 0) {
            firstButton = button; // Store reference to the first button
        }
    });

    // Click the first button after all buttons have been created
    if (firstButton) {
        firstButton.click();
    }

    const diataxisQuadrants = document.querySelectorAll('[id^="diataxis-quadrant-"]');
    const diataxisDetailsEl = document.getElementById('diataxis-details');
    diataxisQuadrants.forEach(quadrant => {
        const type = quadrant.id.split('-').pop();
        quadrant.addEventListener('click', () => {
            diataxisQuadrants.forEach(q => q.classList.remove('border-blue-500', 'bg-blue-50'));
            quadrant.classList.add('border-blue-500', 'bg-blue-50');
            const data = diataxisData[type];
            diataxisDetailsEl.innerHTML = `<h4 class="font-bold text-xl mb-2">${data.title}</h4><p>${data.content}</p>`;
            diataxisDetailsEl.classList.remove('hidden');
        });
    });

    const securityCtx = document.getElementById('securityChart').getContext('2d');
    const securityChart = new Chart(securityCtx, {
        type: 'doughnut',
        data: {
            labels: securityChartData.labels,
            datasets: [{
                data: securityChartData.data,
                backgroundColor: ['#3b82f6', '#10b981', '#f97316', '#ef4444'],
                borderColor: '#FFFFFF',
                borderWidth: 4,
                hoverOffset: 16
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '60%',
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true,
                        pointStyle: 'rectRounded'
                    }
                },
                tooltip: {
                    enabled: false
                },
                title: {
                    display: false
                }
            },
            onHover: (event, chartElement) => {
                const securityDetailsEl = document.getElementById('security-details');
                if (chartElement.length) {
                    const index = chartElement[0].index;
                    securityDetailsEl.innerHTML = `<p>${securityChartData.descriptions[index]}</p>`;
                } else {
                    securityDetailsEl.innerHTML = `<h3 class="text-2xl font-bold mb-4">Security Layers</h3><p class="text-gray-500">Hover over the chart segments to learn about each automated scan type and its benefits in securing your repository.</p>`;
                }
            }
        }
    });

    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('main section[id]');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

});