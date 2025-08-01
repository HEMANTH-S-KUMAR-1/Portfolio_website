// --- Event Listener for DOMContentLoaded ---
// Ensures the script runs only after the entire HTML document has been loaded and parsed.
document.addEventListener('DOMContentLoaded', () => {
    // Initialize animations for sections to fade in as they are scrolled into view.
    setupIntersectionObserver();
    // Create the animated particles for the background.
    createCircuitParticles();

    // Set the first skill category as active and display its skills by default.
    const firstCategory = document.querySelector('.skill-category');
    if (firstCategory) {
        // Extracts the category name from the onclick attribute (e.g., 'firmware').
        const categoryName = firstCategory.getAttribute('onclick').match(/'([^']+)'/)[1];
        showSkills(categoryName);
    }
});

// --- Data Objects Synchronized with CV ---
// This object holds all the skill data. Updating it here will automatically update the website.
const skillsData = {
    firmware: [
        { name: 'C', level: 85 },
        { name: 'C++', level: 90 },
        { name: 'Python (for scripting)', level: 75 },
        { name: 'Verilog', level: 60 }
    ],
    hardware: [
        { name: 'Microcontrollers (ESP32, Pi, Arduino)', level: 90 },
        { name: 'Digital & Analog Circuit Design', level: 85 },
        { name: 'Control Systems', level: 80 },
        { name: 'Sensor Integration', level: 95 },
        { name: 'PCB Design Basics', level: 70 }
    ],
    tools: [
        { name: 'MATLAB & Simulink', level: 80 },
        { name: 'LabVIEW', level: 75 },
        { name: 'Cadence', level: 70 },
        { name: 'Multisim', level: 85 },
        { name: 'Git, VS Code, Linux', level: 90 }
    ],
    protocols: [
        { name: 'I2C', level: 90 },
        { name: 'SPI', level: 85 },
        { name: 'UART', level: 95 },
        { name: 'CAN Bus', level: 75 }
    ]
};

// This object holds all the project details.
const projectDetails = {
    elevator: {
        title: 'Real-Time Elevator Safety System',
        description: 'Engineered a safety-critical system with custom C++ firmware to automatically detect elevator power failures and passenger occupancy.',
        features: [
            'Integrated and calibrated an HX711 load cell for accurate occupancy detection.',
            'Implemented a GSM module to autonomously send SMS alerts to maintenance.',
            'Designed for rapid hardware response in critical situations.'
        ],
        tech: ['ESP32', 'C++', 'HX711 Load Cell', 'GSM Module', 'Sensors'],
        impact: 'Dramatically enhances passenger safety and reduces maintenance response time during power outages.'
    },
    stethograph: {
        title: 'Multichannel Stethograph for Cardiac Monitoring',
        description: 'Developed a non-invasive cardiac monitoring device using a Raspberry Pi to capture and process heart signals from specialized vibration sensors.',
        features: [
            'Implemented digital signal processing algorithms in Python to filter noise.',
            'Successfully identified key cardiac events from vibration data.',
            'Focused on non-invasive and accessible healthcare technology.'
        ],
        tech: ['Raspberry Pi 3B', 'Python', 'Vibration Sensors', 'Signal Processing Libraries'],
        impact: 'Provides a novel, non-invasive method for identifying potential cardiac irregularities.'
    },
    iot: {
        title: 'IoT Automation and Monitoring Prototypes',
        description: 'Designed and built a series of IoT prototypes for home automation and environmental monitoring, focusing on robust hardware and reliable firmware.',
        features: [
            'Firmware for real-time data acquisition from various analog and digital sensors.',
            'Established wireless communication for remote control and monitoring.',
            'Focused on creating reliable and scalable smart systems.'
        ],
        tech: ['ESP32', 'Arduino', 'C++', 'Various Sensors'],
        impact: 'Demonstrates strong capabilities in end-to-end IoT solution development, from hardware to remote interface.'
    }
};

// --- Interaction Functions ---

/**
 * Toggles the visibility of the "About Me" story section.
 */
function toggleStory() {
    const story = document.getElementById('detailedStory');
    const btn = document.querySelector('.explore-btn');
    const isExpanded = story.classList.toggle('expanded');
    btn.textContent = isExpanded ? 'Hide Story' : 'Explore My Story';
}

/**
 * Displays the skills for a given category.
 * @param {string} category - The category of skills to display (e.g., 'firmware').
 */
function showSkills(category) {
    const skillDetails = document.getElementById('skillDetails');
    const skills = skillsData[category];
    if (!skills) return;

    // Highlight the active skill category button.
    document.querySelectorAll('.skill-category').forEach(cat => cat.classList.remove('active'));
    const activeCategory = document.querySelector(`.skill-category[onclick="showSkills('${category}')"]`);
    if(activeCategory) activeCategory.classList.add('active');

    // Generate the HTML for the skill bars.
    let html = `<h3>${category.charAt(0).toUpperCase() + category.slice(1).replace(/_/g, ' ')}</h3>`;
    skills.forEach(skill => {
        html += `
            <div class="skill-item">
                <span>${skill.name}</span>
                <div class="skill-bar">
                    <div class="skill-progress" style="width: 0%;"></div>
                </div>
            </div>
        `;
    });
    
    skillDetails.innerHTML = html;
    skillDetails.style.display = 'block';

    // Animate the progress bars to their target width.
    setTimeout(() => {
        skillDetails.querySelectorAll('.skill-progress').forEach((bar, index) => {
            bar.style.width = `${skills[index].level}%`;
        });
    }, 100);
}

/**
 * Toggles the visibility of details within the timeline section.
 * @param {HTMLElement} element - The timeline content element that was clicked.
 */
function toggleDetails(element) {
    const hiddenDetails = element.querySelector('.hidden-details');
    if (hiddenDetails) {
        hiddenDetails.style.display = hiddenDetails.style.display === 'block' ? 'none' : 'block';
    }
}

/**
 * Displays an alert with the details of a selected project.
 * @param {string} projectId - The ID of the project to display (e.g., 'elevator').
 */
function openProject(projectId) {
    const project = projectDetails[projectId];
    if (!project) {
        showNotification('Project details not found.', 'error');
        return;
    }
    
    const message = `🚀 ${project.title}\n\n` +
                    `${project.description}\n\n` +
                    `Key Features:\n• ${project.features.join('\n• ')}\n\n` +
                    `Tech Stack: ${project.tech.join(', ')}\n\n` +
                    `Impact: ${project.impact}`;
    
    alert(message);
}

// --- Contact and Utility Functions ---

/**
 * Copies the email address to the clipboard.
 */
function copyEmail() {
    const email = 'hemanth.1si22ei049@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
        showNotification('Email copied to clipboard! 📧', 'success');
    }).catch(() => {
        showNotification('Failed to copy. Please copy manually.', 'error');
    });
}

/**
 * Initiates the download of the CV file.
 */
function downloadCV() {
    const link = document.createElement('a');
    // IMPORTANT: Make sure you have a file named 'Hemanth_S_Kumar_Resume.pdf' in an 'assets' folder.
    link.href = 'assets/Hemanth_S_Kumar_CV.pdf'; 
    link.download = 'Hemanth_S_Kumar_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotification('Downloading CV...', 'info');
}

/**
 * Opens the GitHub profile in a new tab.
 */
function openGitHub() {
    window.open('https://github.com/HEMANTH-S-KUMAR-1', '_blank', 'noopener,noreferrer');
}

/**
 * Opens the LinkedIn profile in a new tab.
 */
function openLinkedIn() {
    window.open('https://www.linkedin.com/in/hemanth-s-kumar-207215325', '_blank', 'noopener,noreferrer');
}

/**
 * Opens the default email client with a pre-filled message.
 */
function startProject() {
    const email = 'hemanth.1si22ei049@gmail.com';
    const subject = 'Project Collaboration Inquiry';
    const body = `Hi Hemanth,\n\nI saw your portfolio and was impressed by your work in embedded systems. I'd like to discuss a potential project collaboration.\n\nBest regards,`;
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
}

/**
 * Displays a temporary notification message at the bottom-right of the screen.
 * @param {string} message - The message to display.
 * @param {string} [type='info'] - The type of notification ('info', 'success', 'error').
 */
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    const color = type === 'error' ? 'var(--accent-orange)' : type === 'success' ? 'var(--accent-green)' : 'var(--accent-cyan)';
    
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${color};
        color: var(--primary-bg);
        font-weight: bold;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 1001;
        transform: translateX(120%);
        transition: transform 0.5s ease-in-out;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);

    setTimeout(() => {
        notification.style.transform = 'translateX(120%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 500);
    }, 3500);
}

// --- Dynamic Background & Animations ---
/**
 * Creates and appends animated particles to the background.
 */
function createCircuitParticles() {
    const circuitBg = document.querySelector('.circuit-bg');
    if (!circuitBg) return;

    const particleCount = 20;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'circuit-particle';
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.animationDelay = `${Math.random() * 20}s`;
        particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
        circuitBg.appendChild(particle);
    }
}

/**
 * Sets up an Intersection Observer to add a 'visible' class to sections
 * when they enter the viewport, triggering a fade-in animation.
 */
function setupIntersectionObserver() {
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });
}
