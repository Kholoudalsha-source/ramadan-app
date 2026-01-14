let currentPage = 1;
const totalPages = 11;

// عند تحميل الصفحة
window.onload = function() {
    loadProgress();
    showPage(currentPage);
    renderSchedule(); // رسم الجدول في الصفحة 6
};

// --- التنقل بين الصفحات ---
function changePage(step) {
    // إيقاف أي صوت عند الانتقال
    stopAllAudio();
    
    currentPage += step;
    if (currentPage < 1) currentPage = 1;
    if (currentPage > totalPages) currentPage = totalPages;
    
    showPage(currentPage);
    // حفظ رقم الصفحة الحالية
    localStorage.setItem('lastPage', currentPage);
}

function showPage(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(`page-${page}`).classList.add('active');
    document.getElementById('page-num').innerText = `${page} / ${totalPages}`;
}

// --- حفظ واسترجاع البيانات (LocalStorage) ---

// 1. بيانات الهوية
function saveIdentity() {
    const data = {
        name: document.getElementById('user-name').value,
        age: document.getElementById('user-age').value,
        goal: document.getElementById('user-goal').value
    };
    localStorage.setItem('identityData', JSON.stringify(data));
}

// 2. المربعات والخيارات
function toggleCheck(element) {
    element.classList.toggle('checked');
    const id = element.getAttribute('data-id');
    const isChecked = element.classList.contains('checked');
    localStorage.setItem(id, isChecked);
}

// 3. التحدي (Quiz)
function checkAnswer(element) {
    const isCorrect = element.getAttribute('data-correct') === 'true';
    if(isCorrect) {
        element.style.background = '#4CAF50';
        element.style.color = 'white';
        element.innerText = "✔️ أحسنت!";
        // حفظ الإجابة
        localStorage.setItem(element.getAttribute('data-id'), 'solved');
    } else {
        element.style.background = '#F44336';
        element.style.color = 'white';
        element.innerText = "❌ حاول مرة أخرى";
    }
}

// 4. منطق الجدول (صفحة 6)
// الحالات: 0 (فارغ) -> 1 (أصفر/هلال) -> 2 (أخضر/دائرة) -> 3 (أحمر/قلب) -> 0
const states = ['none', 'status-yellow', 'status-green', 'status-red'];
const icons = ['', '🌙', '⚪', '❤️'];

function renderSchedule() {
    const container = document.getElementById('schedule-container');
    if(!container) return; // الحماية في حال عدم وجود العنصر
    
    // إنشاء 30 يوم كمثال (يمكنك تعديل التخطيط ليتناسب مع الصورة)
    // هنا سننشئ شبكة بسيطة، يجب ضبط CSS ليتطابق مع الجدول المرسوم في الصورة
    for (let i = 1; i <= 30; i++) {
        let btn = document.createElement('div');
        btn.className = 'schedule-icon';
        btn.setAttribute('data-day', i);
        btn.onclick = function() { cycleScheduleStatus(this); };
        
        // استرجاع الحالة المحفوظة
        let savedStatus = localStorage.getItem(`day_${i}_status`) || 0;
        updateIconVisual(btn, parseInt(savedStatus));
        
        container.appendChild(btn);
    }
}

function cycleScheduleStatus(element) {
    let currentStatus = parseInt(element.getAttribute('data-status') || 0);
    let newStatus = (currentStatus + 1) % 4; // التدوير بين 0, 1, 2, 3
    
    updateIconVisual(element, newStatus);
    
    // حفظ
    let day = element.getAttribute('data-day');
    localStorage.setItem(`day_${day}_status`, newStatus);
}

function updateIconVisual(element, statusIndex) {
    element.className = 'schedule-icon ' + states[statusIndex];
    element.innerText = icons[statusIndex];
    element.setAttribute('data-status', statusIndex);
}

// --- وظائف عامة ---

function showPopup(text) {
    document.getElementById('popup-text').innerText = text;
    document.getElementById('popup').style.display = 'flex';
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

function toggleAudio(id) {
    const audio = document.getElementById(id);
    if (audio.paused) {
        stopAllAudio(); // إيقاف أي صوت آخر أولاً
        audio.play();
    } else {
        audio.pause();
    }
}

function stopAllAudio() {
    document.querySelectorAll('audio').forEach(a => {
        a.pause();
        a.currentTime = 0;
    });
}

// دالة التحميل الرئيسية
function loadProgress() {
    // استرجاع الصفحة
    const lastPage = localStorage.getItem('lastPage');
    if(lastPage) currentPage = parseInt(lastPage);

    // استرجاع الهوية
    const identity = JSON.parse(localStorage.getItem('identityData'));
    if(identity) {
        document.getElementById('user-name').value = identity.name || '';
        document.getElementById('user-age').value = identity.age || '';
        document.getElementById('user-goal').value = identity.goal || '';
    }

    // استرجاع المربعات
    document.querySelectorAll('.check-box').forEach(box => {
        const id = box.getAttribute('data-id');
        if(localStorage.getItem(id) === 'true') {
            box.classList.add('checked');
        }
    });

    // استرجاع التحديات المحلولة
    document.querySelectorAll('.quiz-option').forEach(opt => {
        const id = opt.getAttribute('data-id');
        if(localStorage.getItem(id) === 'solved') {
            opt.style.background = '#4CAF50';
            opt.innerText = "✔️ تم الحل";
        }
    });
}
