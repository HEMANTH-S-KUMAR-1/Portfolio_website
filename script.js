// Hero Section Interactions
function scrollToProjects() {
    document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
}

// About Section Toggle
function toggleStory() {
    const story = document.getElementById('detailedStory');
    const btn = document.querySelector('.explore-btn');
    
    if (story.classList.contains('expanded')) {
        story.classList.remove('expanded');
        btn.textContent = 'Explore My Story';
    } else {
        story.classList.add('expanded');
        btn.textContent = 'Hide Story';
    }
}

// Skills Section
const skillsData = {
    programming: [
        { name: 'C/C++', level: 90 },
        { name: 'Python', level: 85 },
        { name: 'HTML/CSS/JavaScript', level: 85 }
    ],
    microcontrollers: [
        { name: 'ESP32', level: 95 },
        { name: 'Raspberry Pi', level: 90 },
        { name: 'Arduino', level: 85 }
    ],
    tools: [
        { name: 'MATLAB', level: 80 },
        { name: 'Multisim', level: 75 },
        { name: 'LabVIEW', level: 70 },
        { name: 'Cadence', level: 65 }
    ],
    protocols: [
        { name: 'UART', level: 90 },
        { name: 'SPI', level: 85 },
        { name: 'I2C', level: 85 },
        { name: 'CAN', level: 75 }
    ],
    other: [
        { name: 'Linux', level: 80 },
        { name: 'Git', level: 85 }
    ]
};

function showSkills(category) {
    const skillDetails = document.getElementById('skillDetails');
    const skills = skillsData[category];
    
    let html = `<h3>${category.charAt(0).toUpperCase() + category.slice(1)} Skills</h3>`;
    
    skills.forEach(skill => {
        html += `
            <div class="skill-item">
                <span>${skill.name}</span>
                <div class="skill-bar">
                    <div class="skill-progress" style="width: ${skill.level}%"></div>
                </div>
            </div>
        `;
    });
    
    skillDetails.innerHTML = html;
    skillDetails.style.display = 'block';
    
    // Animate progress bars
    setTimeout(() => {
        const progressBars = skillDetails.querySelectorAll('.skill-progress');
        progressBars.forEach(bar => {
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = bar.style.width;
            }, 100);
        });
    }, 100);
}

// Timeline Details Toggle
function toggleDetails(element) {
    const hiddenDetails = element.querySelector('.hidden-details');
    if (hiddenDetails.style.display === 'none') {
        hiddenDetails.style.display = 'block';
        hiddenDetails.style.animation = 'fadeInUp 0.5s ease';
    } else {
        hiddenDetails.style.display = 'none';
    }
}

// Backend Integration
const BACKEND_URL = 'https://portfolio-backend.onrender.com';

async function performCalculation(input) {
    try {
        const response = await fetch(`${BACKEND_URL}/calculate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ input }),
        });

        if (!response.ok) {
            console.log('Calculation service unavailable');
            return null;
        }

        const data = await response.json();
        return data.result;
    } catch (error) {
        console.log('Calculation service unavailable');
        return null;
    }
}

// Project Interactions
async function openProject(projectId) {
    let result = null;
    try {
        // Attempt calculation but don't block project display if it fails
        const sampleInput = 42;
        result = await performCalculation(sampleInput);
    } catch (error) {
        console.log('Calculation skipped - showing project details anyway');
    }
    
    const projectDetails = {
        elevator: {
            title: 'Real-Time Elevator Safety System',
            description: 'Revolutionary safety monitoring system that detects power failures and passenger presence using advanced sensor integration.',
            features: [
                'Real-time power failure detection',
                'Load cell-based passenger detection',
                'GSM emergency notifications',
                'Automated safety protocols'
            ],
            tech: ['ESP32', 'HX711', 'GSM Module', 'Load Cells', 'Sensors'],
            impact: 'Prevents elevator accidents and ensures passenger safety through intelligent monitoring'
        },
        stethograph: {
            title: 'Multichannel Stethograph',
            description: 'Advanced healthcare monitoring tool for precise heart signal analysis and abnormal heartbeat detection.',
            features: [
                'Multi-channel heart monitoring',
                'Vibration data analysis',
                'Abnormal heartbeat detection',
                'Real-time signal processing'
            ],
            tech: ['Raspberry Pi 3B', 'Python', 'Sensors', 'Signal Processing'],
            impact: 'Revolutionizes healthcare monitoring with precise cardiac analysis'
        },
        iot: {
            title: 'IoT Micro Projects',
            description: 'Comprehensive suite of automation and monitoring prototypes focusing on real-time sensing and intelligent control.',
            features: [
                'Real-time environmental sensing',
                'Automated control systems',
                'Remote monitoring capabilities',
                'Scalable IoT architecture'
            ],
            tech: ['ESP32', 'Arduino', 'Raspberry Pi', 'Various Sensors'],
            impact: 'Creates smart ecosystems for automation and monitoring solutions'
        }
    };
    
    const project = projectDetails[projectId];
    if (!project) {
        showNotification('Project details not found. Please try again.');
        return;
    }
    
    let message = `🚀 ${project.title}\n\n${project.description}\n\nKey Features:\n• ${project.features.join('\n• ')}\n\nTechnologies: ${project.tech.join(', ')}\n\nImpact: ${project.impact}`;
    
    if (result !== null) {
        message += `\n\nCalculation Result: ${result}`;
    }
    
    alert(message);
}

// Contact Interactions
function copyEmail() {
    navigator.clipboard.writeText('hemanth.1si22ei049@gmail.com')
        .then(() => {
            showNotification('Email copied to clipboard! 📧');
        })
        .catch(() => {
            showNotification('Failed to copy email. Please try again or copy manually.');
        });
}

function callPhone() {
    window.open('tel:+919740029755');
}

function openGitHub() {
    window.open('https://github.com/HEMANTH-S-KUMAR-1', '_blank');
}

function startProject() {
    const email = 'hemanth.1si22ei049@gmail.com';
    const subject = 'Project Collaboration';
    const body = 'Hi Hemanth! I\'d love to collaborate on an exciting embedded systems project. Let\'s innovate together!';
    
    // Create a modal for email options
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--primary-bg);
        padding: 2rem;
        border-radius: 10px;
        box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
        z-index: 1000;
        text-align: center;
        border: 2px solid var(--accent-cyan);
    `;
    
    modal.innerHTML = `
        <h3 style="margin-bottom: 1rem; color: var(--accent-cyan);">Choose Email Option</h3>
        <div style="display: flex; gap: 1rem; justify-content: center;">
            <button onclick="openGmail()" style="
                padding: 0.8rem 1.5rem;
                background: linear-gradient(45deg, var(--accent-pink), var(--accent-orange));
                border: none;
                border-radius: 5px;
                color: white;
                cursor: pointer;
                font-weight: bold;
            ">Open in Gmail</button>
            <button onclick="openDesktopEmail()" style="
                padding: 0.8rem 1.5rem;
                background: linear-gradient(45deg, var(--accent-cyan), var(--accent-green));
                border: none;
                border-radius: 5px;
                color: white;
                cursor: pointer;
                font-weight: bold;
            ">Open in Email App</button>
        </div>
        <button onclick="closeModal()" style="
            margin-top: 1rem;
            padding: 0.5rem 1rem;
            background: transparent;
            border: 1px solid var(--accent-cyan);
            border-radius: 5px;
            color: var(--accent-cyan);
            cursor: pointer;
        ">Cancel</button>
    `;
    
    // Add overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        z-index: 999;
    `;
    
    document.body.appendChild(overlay);
    document.body.appendChild(modal);
    
    // Prevent scrolling when modal is open
    document.body.style.overflow = 'hidden';
}

function openGmail() {
    const email = 'hemanth.1si22ei049@gmail.com';
    const subject = 'Project Collaboration';
    const body = 'Hi Hemanth! I\'d love to collaborate on an exciting embedded systems project. Let\'s innovate together!';
    
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(gmailUrl, '_blank');
    closeModal();
}

function openDesktopEmail() {
    const email = 'hemanth.1si22ei049@gmail.com';
    const subject = 'Project Collaboration';
    const body = 'Hi Hemanth! I\'d love to collaborate on an exciting embedded systems project. Let\'s innovate together!';
    
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink, '_blank');
    closeModal();
}

function closeModal() {
    const modal = document.querySelector('div[style*="position: fixed"]');
    const overlay = document.querySelector('div[style*="background: rgba(0, 0, 0, 0.7)"]');
    
    if (modal) document.body.removeChild(modal);
    if (overlay) document.body.removeChild(overlay);
    
    // Restore scrolling
    document.body.style.overflow = 'auto';
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(45deg, var(--accent-green), var(--accent-cyan));
        color: var(--primary-bg);
        padding: 1rem 2rem;
        border-radius: 50px;
        font-weight: bold;
        z-index: 1000;
        animation: slideInRight 0.5s ease, fadeOut 0.5s ease 2.5s;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        document.body.removeChild(notification);
    }, 3000);
}

// Dynamic background circuit animation
function createCircuitLine() {
    const circuitBg = document.querySelector('.circuit-bg');
    const line = document.createElement('div');
    line.className = 'circuit-line';
    
    const width = Math.random() * 200 + 50;
    const height = 2;
    const top = Math.random() * 100;
    const left = Math.random() * 100;
    const delay = Math.random() * 3;
    
    line.style.cssText = `
        width: ${width}px;
        height: ${height}px;
        top: ${top}%;
        left: ${left}%;
        animation-delay: ${delay}s;
        opacity: 0.1;
    `;
    
    circuitBg.appendChild(line);
    
    // Remove after animation
    setTimeout(() => {
        if (circuitBg.contains(line)) {
            circuitBg.removeChild(line);
        }
    }, 6000);
}

// Create new circuit lines periodically
setInterval(createCircuitLine, 2000);

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.5;
    
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 1s ease forwards';
        }
    });
}, observerOptions);

// Observe all sections
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        observer.observe(section);
    });
}); 