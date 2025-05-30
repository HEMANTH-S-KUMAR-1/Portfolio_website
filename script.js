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
        { name: 'C/C++', level: 68 },
        { name: 'Python', level: 67 },
        { name: 'HTML/CSS/JavaScript', level: 69 }
    ],
    microcontrollers: [
        { name: 'ESP32', level: 70 },
        { name: 'Raspberry Pi', level: 66 },
        { name: 'Arduino', level: 65 }
    ],
    tools: [
        { name: 'MATLAB', level: 68 },
        { name: 'Multisim', level: 67 },
        { name: 'LabVIEW', level: 69 },
        { name: 'Cadence', level: 66 }
    ],
    protocols: [
        { name: 'UART', level: 70 },
        { name: 'SPI', level: 68 },
        { name: 'I2C', level: 67 },
        { name: 'CAN', level: 65 }
    ],
    other: [
        { name: 'Linux', level: 69 },
        { name: 'Git', level: 70 }
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
                    <div class="skill-progress" style="width: 0%"></div>
                </div>
            </div>
        `;
    });
    
    skillDetails.innerHTML = html;
    skillDetails.style.display = 'block';
    
    // Animate progress bars
    setTimeout(() => {
        const progressBars = skillDetails.querySelectorAll('.skill-progress');
        progressBars.forEach((bar, index) => {
            const targetWidth = skills[index].level + '%';
            bar.style.width = targetWidth;
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
        showNotification('Calculating...', 'loading');
        const response = await fetch(`${BACKEND_URL}/calculate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ input }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        showNotification('Calculation complete!', 'success');
        return data.result;
    } catch (error) {
        console.error('Calculation service error:', error);
        showNotification('Calculation failed. Please try again.', 'error');
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
    const email = 'hemanth.1si22ei049@gmail.com';
    
    // Try using the Clipboard API first
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(email)
            .then(() => {
                showNotification('Email copied to clipboard! 📧');
            })
            .catch(() => {
                fallbackCopyEmail(email);
            });
    } else {
        fallbackCopyEmail(email);
    }
}

function fallbackCopyEmail(email) {
    // Create a temporary input element
    const textArea = document.createElement('textarea');
    textArea.value = email;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showNotification('Email copied to clipboard! 📧');
    } catch (err) {
        showNotification('Failed to copy email. Please copy manually: ' + email);
    }
    
    document.body.removeChild(textArea);
}

function downloadCV() {
    // Using a relative path to the CV file
    const cvUrl = 'assets/Hemanth_S_Kumar_CV.pdf';
    
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = cvUrl;
    link.download = 'Hemanth_S_Kumar_CV.pdf';
    link.target = '_blank';
    
    // Add error handling
    link.onerror = () => {
        showNotification('Failed to download CV. Please try again later.');
    };
    
    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showNotification('Downloading CV... 📄');
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

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'error' ? '#ff4444' : type === 'success' ? '#00C851' : type === 'loading' ? '#33b5e5' : '#2BBBAD'};
        color: white;
        border-radius: 5px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideIn 0.5s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.5s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 3000);
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Dynamic background circuit animation
function createCircuitLine() {
    const circuitBg = document.querySelector('.circuit-bg');
    
    // Create main circuit line
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
    
    // Create circuit dots
    const dot = document.createElement('div');
    dot.className = 'circuit-dot';
    dot.style.cssText = `
        top: ${top}%;
        left: ${left + width}%;
        animation-delay: ${delay + 0.5}s;
    `;
    
    circuitBg.appendChild(dot);
    
    // Create circuit node
    const node = document.createElement('div');
    node.className = 'circuit-node';
    node.style.cssText = `
        top: ${top + Math.random() * 20 - 10}%;
        left: ${left + Math.random() * width}%;
        animation-delay: ${delay + 1}s;
    `;
    
    circuitBg.appendChild(node);
    
    // Create circuit connection
    const connection = document.createElement('div');
    connection.className = 'circuit-connection';
    connection.style.cssText = `
        width: ${Math.random() * 100 + 50}px;
        top: ${top + Math.random() * 20}%;
        left: ${left + Math.random() * width}%;
        transform: rotate(${Math.random() * 360}deg);
        animation-delay: ${delay + 1.5}s;
    `;
    
    circuitBg.appendChild(connection);
    
    // Create floating particles
    for (let i = 0; i < 3; i++) {
        const particle = document.createElement('div');
        particle.className = 'circuit-particle';
        particle.style.cssText = `
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 5}s;
        `;
        circuitBg.appendChild(particle);
    }
    
    // Remove after animation
    setTimeout(() => {
        if (circuitBg.contains(line)) circuitBg.removeChild(line);
        if (circuitBg.contains(dot)) circuitBg.removeChild(dot);
        if (circuitBg.contains(node)) circuitBg.removeChild(node);
        if (circuitBg.contains(connection)) circuitBg.removeChild(connection);
        const particles = circuitBg.querySelectorAll('.circuit-particle');
        particles.forEach(particle => {
            if (circuitBg.contains(particle)) circuitBg.removeChild(particle);
        });
    }, 6000);
}

// Create new circuit elements periodically
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