// ===== CONFIGURATION GLOBALE =====
const CONFIG = {
    daysOfCode: 1,
    visitCountKey: 'portfolio_visits',
    lastVisitKey: 'portfolio_last_visit'
};

// ===== INITIALISATION =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('%c🚀 Portfolio de Bernardin chargé !', 
        'color: #4361ee; font-size: 18px; font-weight: bold;');
    console.log('%cBienvenue dans la console de développement.', 
        'color: #6c757d;');
    
    initTheme();
    initVisitsCounter();
    initDateDisplay();
    initBackToTop();
    initAnimations();
    initSkillBars();
    initDaysCounter();
    initSmoothScrolling();
    initCodeWindow();
    
    // Message de bienvenue personnalisé
    displayWelcomeMessage();
});

// ===== THÈME SOMBRE/CLAIR =====
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Vérifier la préférence système
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('portfolio_theme');
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.classList.add('dark-theme');
        themeIcon.className = 'fas fa-sun';
    }
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        
        if (document.body.classList.contains('dark-theme')) {
            themeIcon.className = 'fas fa-sun';
            localStorage.setItem('portfolio_theme', 'dark');
            console.log('🌙 Thème sombre activé');
        } else {
            themeIcon.className = 'fas fa-moon';
            localStorage.setItem('portfolio_theme', 'light');
            console.log('☀️ Thème clair activé');
        }
    });
}

// ===== COMPTEUR DE VISITES =====
function initVisitsCounter() {
    const visitCountElement = document.getElementById('visitCount');
    if (!visitCountElement) return;
    
    let visits = localStorage.getItem(CONFIG.visitCountKey) || 0;
    visits = parseInt(visits) + 1;
    localStorage.setItem(CONFIG.visitCountKey, visits);
    
    const lastVisit = localStorage.getItem(CONFIG.lastVisitKey);
    const now = new Date();
    localStorage.setItem(CONFIG.lastVisitKey, now.toISOString());
    
    let message = '';
    if (visits === 1) {
        message = '👋 Première visite ! Bienvenue !';
    } else if (visits <= 3) {
        message = `👋 Re-bonjour ! C'est ta ${visits}ème visite.`;
    } else {
        message = `👋 De retour pour la ${visits}ème fois !`;
        
        if (lastVisit) {
            const lastDate = new Date(lastVisit);
            const diffHours = Math.floor((now - lastDate) / (1000 * 60 * 60));
            
            if (diffHours < 1) {
                message = `⚡ Tu es de retour rapidement ! (${visits} visites)`;
            } else if (diffHours < 24) {
                message = `🕐 De retour après ${diffHours} heures (${visits} visites)`;
            }
        }
    }
    
    visitCountElement.textContent = message;
    console.log(`📊 Visite n°${visits}`);
}

// ===== AFFICHAGE DE LA DATE =====
function initDateDisplay() {
    const currentDateElement = document.getElementById('currentDate');
    const currentYearElement = document.getElementById('currentYear');
    
    if (currentDateElement) {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        currentDateElement.textContent = now.toLocaleDateString('fr-FR', options);
    }
    
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
}

// ===== BOUTON RETOUR EN HAUT =====
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== ANIMATIONS AU SCROLL =====
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observer les sections et cartes
    const elementsToAnimate = document.querySelectorAll(
        'section, .project-card, .skill-item, .tool'
    );
    
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
}

// ===== ANIMATION DES BARRES DE COMPÉTENCES =====
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.style.width;
                entry.target.style.width = '0';
                
                setTimeout(() => {
                    entry.target.style.width = width;
                }, 300);
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// ===== COMPTEUR DE JOURS DE CODE =====
function initDaysCounter() {
    const daysCounter = document.getElementById('daysCounter');
    if (!daysCounter) return;
    
    // Simuler un compteur qui augmente (pour l'exemple)
    let count = 1;
    const target = CONFIG.daysOfCode;
    
    const counter = setInterval(() => {
        if (count < target) {
            count++;
            daysCounter.textContent = count;
        } else {
            clearInterval(counter);
        }
    }, 100);
}

// ===== NAVIGATION FLUIDE =====
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Mettre en surbrillance le lien actif
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // Mettre à jour le lien actif au scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY + 100;
        
        navLinks.forEach(link => {
            const section = document.querySelector(link.getAttribute('href'));
            if (section) {
                const sectionTop = section.offsetTop;
                const sectionBottom = sectionTop + section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            }
        });
    });
}

// ===== ANIMATION FENÊTRE DE CODE =====
function initCodeWindow() {
    const codeWindow = document.querySelector('.code-window');
    if (!codeWindow) return;
    
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX / window.innerWidth - 0.5;
        mouseY = e.clientY / window.innerHeight - 0.5;
    });
    
    function updateCodeWindow() {
        if (codeWindow.matches(':hover')) {
            const rotateY = mouseX * 10;
            const rotateX = -mouseY * 5;
            
            codeWindow.style.transform = 
                `perspective(1000px) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
        }
        
        requestAnimationFrame(updateCodeWindow);
    }
    
    updateCodeWindow();
}

// ===== MESSAGE DE BIENVENUE =====
function displayWelcomeMessage() {
    const hour = new Date().getHours();
    let greeting = '';
    
    if (hour < 12) greeting = '🌅 Bonjour';
    else if (hour < 18) greeting = '☀️ Bon après-midi';
    else greeting = '🌙 Bonsoir';
    
    console.log(`%c${greeting} ! Merci de visiter mon portfolio.`, 
        'color: #f72585; font-size: 16px;');
    console.log('%cN\'hésitez pas à explorer le code source sur GitHub.', 
        'color: #6c757d;');
    
    // Afficher un message dans la page (optionnel)
    setTimeout(() => {
        const welcomeDiv = document.createElement('div');
        welcomeDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #4361ee, #3a0ca3);
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            z-index: 10000;
            animation: slideInRight 0.5s ease-out;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            max-width: 300px;
        `;
        
        welcomeDiv.innerHTML = `
            <strong>${greeting} ! 👋</strong>
            <p style="margin: 5px 0 0; font-size: 14px; opacity: 0.9;">
                Bienvenue sur mon portfolio
            </p>
        `;
        
        document.body.appendChild(welcomeDiv);
        
        // Supprimer après 5 secondes
        setTimeout(() => {
            welcomeDiv.style.animation = 'slideOutRight 0.5s ease-out forwards';
            setTimeout(() => welcomeDiv.remove(), 500);
        }, 5000);
    }, 1000);
    
    // Ajouter les animations CSS pour le message
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// ===== GESTION DES ERREURS =====
window.addEventListener('error', function(e) {
    console.error('❌ Erreur détectée:', e.error);
    
    // Afficher un message d'erreur convivial
    if (e.message && e.message.includes('undefined')) {
        console.log('%c⚠️ Une petite erreur s\'est produite, mais le site continue de fonctionner.', 
            'color: #f8961e; background: #fff3cd; padding: 5px; border-radius: 3px;');
    }
});

// ===== OPTIMISATION PERFORMANCE =====
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
        console.log('📱 Taille de l\'écran:', window.innerWidth, '×', window.innerHeight);
    }, 250);
});

// ===== EXPORT DES FONCTIONS (pour la console) =====
window.portfolio = {
    getTheme: () => localStorage.getItem('portfolio_theme') || 'system',
    getVisitCount: () => localStorage.getItem(CONFIG.visitCountKey) || 0,
    toggleTheme: () => document.getElementById('themeToggle').click(),
    showWelcome: displayWelcomeMessage
};

console.log('%c🔧 Tapez "portfolio" dans la console pour voir les fonctions disponibles.', 
    'color: #4cc9f0; font-style: italic;');