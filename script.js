const exploreBtn = document.getElementById('exploreBtn');
const takeTestBtnMain = document.getElementById('takeTestBtnMain');
const viewDetailsBtns = document.querySelectorAll('.view-details-btn');
const contactBtns = document.querySelectorAll('.contact-btn');
const categoryNavButtons = document.querySelectorAll('.category-nav-btn');
const lawCategories = document.querySelectorAll('.law-category');
const contactModal = document.getElementById('contactModal');
const lawModal = document.getElementById('lawModal');
const programmerModal = document.getElementById('programmerModal');
const closeModal = document.getElementById('closeModal');
const closeLawModal = document.getElementById('closeLawModal');
const closeProgrammerModal = document.getElementById('closeProgrammerModal');
const cancelBtn = document.getElementById('cancelBtn');
const confirmBtn = document.getElementById('confirmBtn');
const closeLawBtn = document.getElementById('closeLawBtn');
const modalPersonName = document.getElementById('modalPersonName');
const personNameSpan = document.getElementById('personNameSpan');
const modalMessage = document.getElementById('modalMessage');
const lawModalTitle = document.getElementById('lawModalTitle');
const lawModalText = document.getElementById('lawModalText');
const progressBar = document.getElementById('progressBar');
const loadingScreen = document.getElementById('loadingScreen');
const loadingScreenProgress = document.getElementById('loadingScreenProgress');
const loadingPercentage = document.getElementById('loadingPercentage');
const typingText = document.getElementById('typingText');
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');
const searchBtn = document.getElementById('searchBtn');
const searchBox = document.getElementById('searchBox');
const searchInput = document.getElementById('searchInput');
const flashNotification = document.getElementById('flashNotification');
const flashTitle = document.getElementById('flashTitle');
const flashMessage = document.getElementById('flashMessage');
const logo = document.getElementById('logo');
const floatingParticles = document.getElementById('floatingParticles');
const dynamicLines = document.getElementById('dynamicLines');
const dynamicModalBackground = document.getElementById('dynamicModalBackground');
const testLink = document.getElementById('testLink');
const testSection = document.querySelector('.test-section');
const questionsContainer = document.getElementById('questionsContainer');
const submitTestBtn = document.getElementById('submitTestBtn');
const resetTestBtn = document.getElementById('resetTestBtn');
const resultsContainer = document.getElementById('resultsContainer');
const finalScore = document.getElementById('finalScore');
const evaluationText = document.getElementById('evaluationText');
const resultMessage = document.getElementById('resultMessage');
const reviewQuestions = document.getElementById('reviewQuestions');
const backToLawsBtn = document.getElementById('backToLawsBtn');
const backToLawsFromResults = document.getElementById('backToLawsFromResults');
const resetTestFromResults = document.getElementById('resetTestFromResults');
const testProgressFill = document.getElementById('testProgressFill');
const answeredCount = document.getElementById('answeredCount');
const totalQuestions = document.getElementById('totalQuestions');
const resultProgressFill = document.getElementById('resultProgressFill');
const resultProgressText = document.getElementById('resultProgressText');
const lawsMainContainer = document.querySelector('.laws-main-container');
const programmerContactBtn = document.getElementById('programmerContactBtn');
const cancelProgrammerBtn = document.getElementById('cancelProgrammerBtn');
const confirmProgrammerBtn1 = document.getElementById('confirmProgrammerBtn1');
const confirmProgrammerBtn2 = document.getElementById('confirmProgrammerBtn2');

let currentContactPerson = '';
let currentContactNumber = '';
let currentLawId = '';
let userAnswers = new Array(testQuestions.length).fill(null);
let answersLocked = false;
let clickSound = new Audio('assets/sounds/click.mp3');
let aizenSound = new Audio('assets/sounds/aizen.mp3');

function playClickSound() {
    clickSound.currentTime = 0;
    clickSound.play().catch(e => console.log("لا يمكن تشغيل الصوت:", e));
}

function playAizenSound() {
    aizenSound.currentTime = 0;
    aizenSound.play().catch(e => console.log("لا يمكن تشغيل الصوت:", e));
}

function initButtonClickSounds() {
    const allClickableElements = document.querySelectorAll(`
        button, 
        .nav-links a, 
        .category-nav-btn, 
        .law-item, 
        .option,
        .view-details-btn,
        .contact-btn,
        .test-nav-btn,
        #exploreBtn,
        #takeTestBtnMain,
        #submitTestBtn,
        #resetTestBtn,
        #backToLawsBtn,
        #backToLawsFromResults,
        #resetTestFromResults,
        #searchBtn,
        #backToTop,
        #closeModal,
        #closeLawModal,
        #closeProgrammerModal,
        #cancelBtn,
        #confirmBtn,
        #closeLawBtn,
        #cancelProgrammerBtn,
        #confirmProgrammerBtn1,
        #confirmProgrammerBtn2
    `);
    
    allClickableElements.forEach(element => {
        if (element.id === 'programmerContactBtn') {
            return;
        }
        
        element.addEventListener('click', function(e) {
            e.stopPropagation();
            playClickSound();
        });
    });
    
    const programmerContactBtn = document.getElementById('programmerContactBtn');
    if (programmerContactBtn) {
        programmerContactBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            playAizenSound();
        });
    }
}

function initPressEffects() {
    const lawItems = document.querySelectorAll('.law-item');
    
    lawItems.forEach(item => {
        item.addEventListener('mousedown', function() {
            this.classList.add('border-glow');
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        item.addEventListener('mouseup', function() {
            setTimeout(() => {
                this.classList.remove('border-glow');
            }, 800);
        });
        
        item.addEventListener('touchstart', function() {
            this.classList.add('border-glow');
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        item.addEventListener('touchend', function() {
            setTimeout(() => {
                this.classList.remove('border-glow');
            }, 800);
        });
        
        item.addEventListener('mouseleave', function() {
            if (!this.classList.contains('border-glow')) {
                this.style.transform = '';
            }
        });
    });
}

function updateProgressBar() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrolled = window.pageYOffset;
    const progress = (scrolled / documentHeight) * 100;
    progressBar.style.width = `${progress}%`;
    
    if (scrolled > 500) {
        backToTop.classList.add('show');
        navbar.classList.add('scrolled');
    } else {
        backToTop.classList.remove('show');
        navbar.classList.remove('scrolled');
    }
}

function checkFadeElements() {
    const fadeElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 120) {
            element.classList.add('visible');
        }
    });
}

function createParticles() {
    for (let i = 0; i < 42; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.width = `${Math.random() * 12 + 6}px`;
        particle.style.height = particle.style.width;
        particle.style.right = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 25}s`;
        floatingParticles.appendChild(particle);
    }
}

function createLines() {
    for (let i = 0; i < 18; i++) {
        const line = document.createElement('div');
        line.classList.add('line');
        line.style.right = `${Math.random() * 100}%`;
        line.style.top = `${Math.random() * 100}%`;
        line.style.animationDelay = `${Math.random() * 15}s`;
        dynamicLines.appendChild(line);
    }
}

function createModalBackground() {
    for (let i = 0; i < 28; i++) {
        const particle = document.createElement('div');
        particle.classList.add('modal-particle');
        particle.style.width = `${Math.random() * 15 + 6}px`;
        particle.style.height = particle.style.width;
        particle.style.right = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 15}s`;
        dynamicModalBackground.appendChild(particle);
    }
    
    for (let i = 0; i < 14; i++) {
        const line = document.createElement('div');
        line.classList.add('modal-line');
        line.style.right = `${Math.random() * 100}%`;
        line.style.top = `${Math.random() * 100}%`;
        line.style.animationDelay = `${Math.random() * 9}s`;
        dynamicModalBackground.appendChild(line);
    }
    
    for (let i = 0; i < 6; i++) {
        const beam = document.createElement('div');
        beam.classList.add('modal-light-beam');
        beam.style.top = `${Math.random() * 100}%`;
        beam.style.transform = `rotate(${Math.random() * 360}deg)`;
        beam.style.animationDelay = `${Math.random() * 12}s`;
        dynamicModalBackground.appendChild(beam);
    }
}

function getSeverityColor(severity) {
    if (severity.includes('منخفض')) return 'var(--info-color)';
    if (severity.includes('متوسط')) return 'var(--warning-color)';
    if (severity.includes('عالي')) return 'var(--danger-color)';
    if (severity.includes('حرج') || severity.includes('إقصاء')) return 'var(--highlight-color)';
    return 'var(--text-color)';
}

function getSeverityBackground(severity) {
    if (severity.includes('منخفض')) return 'severity-low-bg';
    if (severity.includes('متوسط')) return 'severity-medium-bg';
    if (severity.includes('عالي')) return 'severity-high-bg';
    if (severity.includes('حرج') || severity.includes('إقصاء')) return 'severity-critical-bg';
    return '';
}

function initSmartNavigation() {
    categoryNavButtons.forEach(button => {
        button.addEventListener('click', function() {
            const categoryId = this.getAttribute('data-category');
            
            categoryNavButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            
            this.classList.add('active');
            
            lawCategories.forEach(category => {
                category.classList.remove('active');
            });
            
            const targetCategory = document.getElementById(categoryId);
            if (targetCategory) {
                targetCategory.classList.add('active');
                
                setTimeout(() => {
                    targetCategory.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start',
                        inline: 'nearest'
                    });
                }, 150);
            }
        });
    });
}

function initViewDetailsButtons() {
    viewDetailsBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const lawId = this.getAttribute('data-law');
            
            if (lawsDatabase[lawId]) {
                const law = lawsDatabase[lawId];
                currentLawId = lawId;
                
                lawModalTitle.textContent = law.title;
                
                let lawDetails = `
                    <div class="section-info">
                        <div class="section-name">${law.category}</div>
                        <div class="section-description">${law.categoryDescription}</div>
                    </div>
                    
                    <div class="law-info">
                        <div class="law-name">
                            <span class="law-number">${this.closest('.law-item').querySelector('.law-number').textContent}</span>
                            ${law.title}
                        </div>
                        <div class="law-details">
                            ${law.details}
                        </div>
                `;
                
                if (law.severity) {
                    lawDetails += `
                        <div class="severity-info ${getSeverityBackground(law.severity)}">
                            <i class="fas fa-exclamation-triangle" style="margin-left: 10px;"></i>
                            خطورة القانون: ${law.severity}
                            <i class="fas fa-exclamation-triangle" style="margin-right: 10px;"></i>
                        </div>
                    `;
                }
                
                lawDetails += `</div>`;
                
                lawModalText.innerHTML = lawDetails;
                
                lawModal.classList.add('active');
                dynamicModalBackground.classList.add('active');
            } else {
                showFlashNotification('warning', 'تنبيه', 'تفاصيل هذا القانون غير متوفرة حاليًا.');
            }
        });
    });
}

function initContactButtons() {
    contactBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            currentContactPerson = this.getAttribute('data-person');
            currentContactNumber = this.getAttribute('data-number');
            
            modalPersonName.textContent = `التواصل مع ${currentContactPerson}`;
            personNameSpan.textContent = currentContactPerson;
            modalMessage.innerHTML = `هل تريد التواصل مع <span class="highlight">${currentContactPerson}</span> على الواتساب؟<br>
            <span style="font-size: 1.1rem; color: var(--text-light); display: block; margin-top: 20px;">
                سيتم نقلك تلقائيًا إلى تطبيق الواتساب لبدء المحادثة عند التأكيد
            </span>`;
            
            contactModal.classList.add('active');
            dynamicModalBackground.classList.add('active');
        });
    });
}

function closeModals() {
    contactModal.classList.remove('active');
    lawModal.classList.remove('active');
    programmerModal.classList.remove('active');
    dynamicModalBackground.classList.remove('active');
}

function confirmContact() {
    if (currentContactNumber) {
        const cleanNumber = currentContactNumber.replace(/\s+/g, '').replace('+', '');
        const whatsappUrl = `https://wa.me/${cleanNumber}`;
        
        window.open(whatsappUrl, '_blank');
        closeModals();
        
        showFlashNotification('success', 'تم فتح الواتساب', `تم فتح تطبيق الواتساب للتواصل مع ${currentContactPerson}`);
    }
}

function showFlashNotification(type, title, message) {
    flashNotification.className = `flash-notification ${type}`;
    flashTitle.textContent = title;
    flashMessage.textContent = message;
    
    const flashIcon = flashNotification.querySelector('.flash-icon i');
    flashIcon.className = type === 'success' ? 'fas fa-check-circle' : 
                         type === 'error' ? 'fas fa-exclamation-circle' : 
                         type === 'warning' ? 'fas fa-exclamation-triangle' : 'fas fa-info-circle';
    
    flashNotification.classList.add('show');
    
    setTimeout(() => {
        flashNotification.classList.remove('show');
    }, 6000);
}

function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 120,
                    behavior: 'smooth'
                });
                
                updateActiveNavLink(targetId);
            }
        });
    });
}

function updateActiveNavLink(targetId = null) {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    if (targetId) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === targetId) {
                link.classList.add('active');
            }
        });
        return;
    }
    
    const sections = document.querySelectorAll('section, .hero, .test-section');
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 160) {
            currentSection = section.getAttribute('id') || 'home';
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
    
    if (pageYOffset < 100) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#home') {
                link.classList.add('active');
            }
        });
    }
}

function initSearch() {
    searchBtn.addEventListener('click', function() {
        searchBox.classList.toggle('active');
        if (searchBox.classList.contains('active')) {
            searchInput.focus();
        }
    });
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        let foundCount = 0;
        
        document.querySelectorAll('.law-item').forEach(item => {
            const text = item.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                item.style.display = 'flex';
                foundCount++;
                
                const category = item.closest('.law-category');
                if (category) {
                    category.style.display = 'block';
                }
            } else {
                item.style.display = 'none';
            }
        });
        
        if (searchTerm.length > 0) {
            showFlashNotification('info', 'نتائج البحث', `تم العثور على ${foundCount} نتيجة`);
        } else {
            const activeCategory = document.querySelector('.category-nav-btn.active');
            if (activeCategory) {
                const activeCategoryId = activeCategory.getAttribute('data-category');
                lawCategories.forEach(category => {
                    if (category.id === activeCategoryId) {
                        category.style.display = 'block';
                        category.querySelectorAll('.law-item').forEach(item => {
                            item.style.display = 'flex';
                        });
                    } else {
                        category.style.display = 'none';
                    }
                });
            }
        }
    });
    
    document.addEventListener('click', function(e) {
        if (!searchBox.contains(e.target) && !searchBtn.contains(e.target)) {
            searchBox.classList.remove('active');
        }
    });
}

function initBackToTop() {
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function simulateLoading(callback) {
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                
                if (callback) callback();
                
                setTimeout(() => {
                    showFlashNotification('success', 'مرحبًا بك في الموقع!', 'تم تحميل جميع القوانين بنجاح. يمكنك الآن استكشاف الموقع.');
                }, 600);
            }, 600);
        }
        loadingScreenProgress.style.width = `${progress}%`;
        loadingPercentage.textContent = `${Math.floor(progress)}%`;
    }, 120);
}

function initExtraEffects() {
    logo.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    exploreBtn.addEventListener('click', function() {
        document.getElementById('laws').scrollIntoView({ behavior: 'smooth' });
    });
    
    takeTestBtnMain.addEventListener('click', function() {
        showTestSection();
    });
}

function createTestQuestions() {
    testQuestions.forEach((q, index) => {
        const questionContainer = document.createElement('div');
        questionContainer.className = 'question-container';
        questionContainer.id = `question-${index}`;
        
        const questionNumber = document.createElement('div');
        questionNumber.className = 'question-number';
        questionNumber.textContent = index + 1;
        
        const questionText = document.createElement('div');
        questionText.className = 'question-text';
        questionText.textContent = q.question;
        
        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'options-container';
        
        const letters = ['أ', 'ب', 'ج'];
        
        q.options.forEach((option, optionIndex) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'option';
            optionElement.dataset.questionIndex = index;
            optionElement.dataset.optionIndex = optionIndex;
            
            const optionContent = document.createElement('div');
            optionContent.className = 'option-content';
            
            const optionLetter = document.createElement('span');
            optionLetter.className = 'option-letter';
            optionLetter.textContent = letters[optionIndex];
            
            const optionText = document.createElement('span');
            optionText.className = 'option-text';
            optionText.textContent = option;
            
            optionContent.appendChild(optionLetter);
            optionContent.appendChild(optionText);
            optionElement.appendChild(optionContent);
            
            optionElement.addEventListener('click', function() {
                selectOption(this, index, optionIndex);
            });
            
            optionsContainer.appendChild(optionElement);
        });
        
        questionContainer.appendChild(questionNumber);
        questionContainer.appendChild(questionText);
        questionContainer.appendChild(optionsContainer);
        questionsContainer.appendChild(questionContainer);
    });
}

function selectOption(optionElement, questionIndex, optionIndex) {
    if (answersLocked) return;
    
    const questionContainer = optionElement.closest('.question-container');
    questionContainer.querySelectorAll('.option').forEach(opt => {
        opt.classList.remove('selected');
    });
    
    optionElement.classList.add('selected');
    userAnswers[questionIndex] = optionIndex;
    
    updateTestProgress();
    saveTestProgress();
}

function updateTestProgress() {
    const answered = userAnswers.filter(answer => answer !== null).length;
    const total = testQuestions.length;
    const percentage = (answered / total) * 100;
    
    testProgressFill.style.width = `${percentage}%`;
    answeredCount.textContent = answered;
    totalQuestions.textContent = total;
}

function saveTestProgress() {
    localStorage.setItem('oharaTestAnswers', JSON.stringify(userAnswers));
}

function loadTestProgress() {
    const savedAnswers = localStorage.getItem('oharaTestAnswers');
    if (savedAnswers) {
        userAnswers = JSON.parse(savedAnswers);
        
        userAnswers.forEach((answerIndex, questionIndex) => {
            if (answerIndex !== null) {
                const questionContainer = document.getElementById(`question-${questionIndex}`);
                if (questionContainer) {
                    const option = questionContainer.querySelector(`.option[data-option-index="${answerIndex}"]`);
                    if (option) {
                        option.classList.add('selected');
                    }
                }
            }
        });
        
        updateTestProgress();
    }
}

function submitTest() {
    if (answersLocked) return;
    
    let unansweredCount = 0;
    let firstUnanswered = null;
    
    userAnswers.forEach((answer, index) => {
        if (answer === null) {
            unansweredCount++;
            if (firstUnanswered === null) {
                firstUnanswered = index;
            }
            
            const questionContainer = document.getElementById(`question-${index}`);
            if (questionContainer) {
                questionContainer.style.borderColor = 'var(--warning-color)';
                questionContainer.style.boxShadow = '0 0 12px rgba(255, 170, 0, 0.5)';
                
                setTimeout(() => {
                    questionContainer.style.borderColor = '';
                    questionContainer.style.boxShadow = '';
                }, 2000);
            }
        }
    });
    
    if (unansweredCount > 0) {
        showFlashNotification('warning', 'أسئلة غير مجابة', `يوجد ${unansweredCount} سؤال لم يتم الإجابة عليه. الرجاء مراجعة الاختبار.`);
        
        if (firstUnanswered !== null) {
            const questionContainer = document.getElementById(`question-${firstUnanswered}`);
            if (questionContainer) {
                questionContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
        return;
    }
    
    answersLocked = true;
    
    let score = 0;
    testQuestions.forEach((q, index) => {
        if (userAnswers[index] === q.correctAnswer) {
            score += 2;
        }
    });
    
    displayResults(score);
}

function displayResults(score) {
    const percentage = (score / 30) * 100;
    
    finalScore.textContent = `${score}/30`;
    
    resultProgressFill.style.width = `${percentage}%`;
    
    let evaluation = '';
    let evaluationClass = '';
    let resultClass = '';
    
    if (percentage >= 90) {
        evaluation = 'ممتاز - بيرفكت! 🗡️';
        evaluationClass = 'level-perfect';
        resultClass = 'result-perfect';
        resultProgressText.textContent = '90% فأكثر - بيرفكت!';
    } else if (percentage >= 75) {
        evaluation = 'ممتاز! 🔥';
        evaluationClass = 'level-excellent';
        resultClass = 'result-excellent';
        resultProgressText.textContent = '75% إلى أقل من 90% - ممتاز';
    } else if (percentage >= 60) {
        evaluation = 'جيّد 👍';
        evaluationClass = 'level-good';
        resultClass = 'result-good';
        resultProgressText.textContent = '60% إلى أقل من 75% - جيد';
    } else if (percentage >= 50) {
        evaluation = 'مقبول 👌';
        evaluationClass = 'level-good';
        resultClass = 'result-good';
        resultProgressText.textContent = '50% إلى أقل من 60% - مقبول';
    } else {
        evaluation = 'يحتاج إلى تحسين 📚';
        evaluationClass = 'level-bad';
        resultClass = 'result-bad';
        resultProgressText.textContent = 'أقل من 50% - سيء';
    }
    
    evaluationText.textContent = evaluation;
    evaluationText.className = `results-evaluation ${evaluationClass}`;
    resultProgressFill.className = `result-progress-fill ${resultClass}`;
    
    if (percentage >= 90) {
        resultMessage.textContent = 'تهانينا أنت متفوق في فهم القوانين لإقليم أوهارا. استمر في الحفاظ على هذا المستوى.';
    } else if (percentage >= 75) {
        resultMessage.textContent = 'أحسنت! لديك فهم جيد جداً للقوانين. يمكنك مراجعة بعض النقاط لتحسين مستواك أكثر.';
    } else if (percentage >= 60) {
        resultMessage.textContent = 'مستواك جيد، ولكن هناك بعض النقاط تحتاج إلى مراجعة. ننصحك بقراءة القوانين مرة أخرى.';
    } else if (percentage >= 50) {
        resultMessage.textContent = 'مستواك مقبول، ولكن هناك نقاط كثيرة تحتاج إلى مراجعة. ننصحك بدراسة القوانين بدقة.';
    } else {
        resultMessage.textContent = 'يبدو أنك بحاجة إلى دراسة القوانين بشكل أفضل. ننصحك بمراجعة القوانين بدقة ثم إعادة الاختبار.';
    }
    
    showQuestionsReview(score);
    
    resultsContainer.classList.add('active');
    
    setTimeout(() => {
        resultsContainer.scrollIntoView({ behavior: 'smooth' });
    }, 300);
    
    localStorage.setItem('oharaTestScore', score);
    localStorage.setItem('oharaTestDate', new Date().toLocaleString('ar-EG'));
}

function showQuestionsReview(score) {
    reviewQuestions.innerHTML = '<h3 class="review-title">مراجعة الأسئلة والإجابات</h3>';
    
    testQuestions.forEach((q, index) => {
        const questionReview = document.createElement('div');
        questionReview.className = 'question-container';
        
        const questionHeader = document.createElement('div');
        questionHeader.className = 'question-text';
        questionHeader.textContent = `${index + 1}. ${q.question}`;
        
        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'options-container';
        
        const letters = ['أ', 'ب', 'ج'];
        
        q.options.forEach((option, optionIndex) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'option';
            
            if (optionIndex === q.correctAnswer) {
                optionElement.classList.add('correct');
            }
            
            if (userAnswers[index] === optionIndex && optionIndex !== q.correctAnswer) {
                optionElement.classList.add('incorrect');
            }
            
            const optionContent = document.createElement('div');
            optionContent.className = 'option-content';
            
            const optionLetter = document.createElement('span');
            optionLetter.className = 'option-letter';
            optionLetter.textContent = letters[optionIndex];
            
            const optionText = document.createElement('span');
            optionText.className = 'option-text';
            optionText.textContent = option;
            
            optionContent.appendChild(optionLetter);
            optionContent.appendChild(optionText);
            optionElement.appendChild(optionContent);
            
            optionsContainer.appendChild(optionElement);
        });
        
        questionReview.appendChild(questionHeader);
        questionReview.appendChild(optionsContainer);
        reviewQuestions.appendChild(questionReview);
    });
}

function resetTest() {
    userAnswers = new Array(testQuestions.length).fill(null);
    answersLocked = false;
    
    document.querySelectorAll('.option').forEach(option => {
        option.classList.remove('selected');
    });
    
    resultsContainer.classList.remove('active');
    
    updateTestProgress();
    
    localStorage.removeItem('oharaTestAnswers');
    localStorage.removeItem('oharaTestScore');
    localStorage.removeItem('oharaTestDate');
    
    showFlashNotification('info', 'تم إعادة التعيين', 'تمت إعادة تعيين جميع إجابات الاختبار.');
}

function showTestSection() {
    lawsMainContainer.style.display = 'none';
    testSection.style.display = 'block';
    testSection.classList.add('active');
    
    document.querySelector('.smart-navigation').style.display = 'none';
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
    });
    testLink.classList.add('active');
    
    window.scrollTo({
        top: testSection.offsetTop - 120,
        behavior: 'smooth'
    });
}

function showLawsSection() {
    lawsMainContainer.style.display = 'block';
    testSection.style.display = 'none';
    document.querySelector('.smart-navigation').style.display = 'flex';
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector('.nav-links a[href="#laws"]').classList.add('active');
    
    window.scrollTo({
        top: lawsMainContainer.offsetTop - 120,
        behavior: 'smooth'
    });
}

function initTestNavigation() {
    testLink.addEventListener('click', function(e) {
        e.preventDefault();
        showTestSection();
    });
    
    backToLawsBtn.addEventListener('click', function() {
        showLawsSection();
    });
    
    backToLawsFromResults.addEventListener('click', function() {
        showLawsSection();
    });
    
    submitTestBtn.addEventListener('click', submitTest);
    
    resetTestBtn.addEventListener('click', resetTest);
    
    resetTestFromResults.addEventListener('click', function() {
        resetTest();
        resultsContainer.classList.remove('active');
        setTimeout(() => {
            document.getElementById('questionsContainer').scrollIntoView({ behavior: 'smooth' });
        }, 300);
    });
    
    document.querySelectorAll('.nav-links a[href="#laws"]').forEach(link => {
        link.addEventListener('click', function() {
            showLawsSection();
        });
    });
    
    document.querySelectorAll('.nav-links a[href="#home"]').forEach(link => {
        link.addEventListener('click', function() {
            showLawsSection();
        });
    });
}

function initProgrammerContact() {
    programmerContactBtn.addEventListener('click', function() {
        playAizenSound();
        
        setTimeout(() => {
            programmerModal.classList.add('active');
            dynamicModalBackground.classList.add('active');
        }, 500);
    });
    
    closeProgrammerModal.addEventListener('click', closeModals);
    cancelProgrammerBtn.addEventListener('click', closeModals);
    
    confirmProgrammerBtn1.addEventListener('click', function() {
        const number = this.getAttribute('data-number');
        const cleanNumber = number.replace(/\s+/g, '').replace('+', '');
        const whatsappUrl = `https://wa.me/${cleanNumber}`;
        
        window.open(whatsappUrl, '_blank');
        closeModals();
        
        showFlashNotification('success', 'تم فتح الواتساب', 'تم فتح تطبيق الواتساب للتواصل مع المبرمج آيزن🛰️');
    });
    
    confirmProgrammerBtn2.addEventListener('click', function() {
        const number = this.getAttribute('data-number');
        const cleanNumber = number.replace(/\s+/g, '').replace('+', '');
        const whatsappUrl = `https://wa.me/${cleanNumber}`;
        
        window.open(whatsappUrl, '_blank');
        closeModals();
        
        showFlashNotification('success', 'تم فتح الواتساب', 'تم فتح تطبيق الواتساب للتواصل مع المبرمج آيزن🛰️');
    });
}

function simulateTyping() {
    const text = "لجنة المراقبة🚨";
    let index = 0;
    
    function type() {
        if (index < text.length) {
            typingText.textContent += text.charAt(index);
            index++;
            setTimeout(type, 100);
        }
    }
    
    type();
}

document.addEventListener('DOMContentLoaded', function() {
    simulateTyping();
    
    initPressEffects();
    initSmartNavigation();
    initViewDetailsButtons();
    initContactButtons();
    initSmoothScrolling();
    initSearch();
    initBackToTop();
    initExtraEffects();
    initButtonClickSounds();
    
    createTestQuestions();
    initTestNavigation();
    loadTestProgress();
    updateTestProgress();
    
    initProgrammerContact();
    
    createParticles();
    createLines();
    createModalBackground();
    
    closeModal.addEventListener('click', closeModals);
    closeLawModal.addEventListener('click', closeModals);
    cancelBtn.addEventListener('click', closeModals);
    closeLawBtn.addEventListener('click', closeModals);
    confirmBtn.addEventListener('click', confirmContact);
    
    contactModal.addEventListener('click', function(e) {
        if (e.target === this) closeModals();
    });
    
    lawModal.addEventListener('click', function(e) {
        if (e.target === this) closeModals();
    });
    
    programmerModal.addEventListener('click', function(e) {
        if (e.target === this) closeModals();
    });
    
    checkFadeElements();
    updateProgressBar();
    updateActiveNavLink();
    
    simulateLoading();
    
    setTimeout(() => {
        const firstCategoryBtn = document.querySelector('.category-nav-btn');
        if (firstCategoryBtn) {
            firstCategoryBtn.click();
        }
    }, 600);
});

window.addEventListener('scroll', function() {
    updateProgressBar();
    checkFadeElements();
    updateActiveNavLink();
});

window.addEventListener('resize', updateProgressBar);