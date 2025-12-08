const timerView = document.querySelector('.timer-view');
const btnDesc = document.getElementById('btn-desc');
const btnCresc = document.getElementById('btn-cresc');
const btnIniciar = document.getElementById('btn-iniciar');
const btnParar = document.getElementById('btn-parar');
const inputNumber = document.getElementById('input-number');
const btnLimpar = document.getElementById('btn-limpar');
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');


const quickButtons = document.querySelectorAll('.btn-tempos button');

let timer = null;
let time = 0;
let modo = 'desc'; // desc ou cresc

// Atualiza visual
function atualizarTela() {
    let dias = Math.floor(time / 86400);       // 1 dia = 86400s
    let horas = Math.floor((time % 86400) / 3600);
    let min = Math.floor((time % 3600) / 60);
    let sec = time % 60;

    if (dias > 0) {
        timerView.textContent =
            `${dias}d ${String(horas).padStart(2, '0')}:${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
    } else {
        timerView.textContent =
            `${String(horas).padStart(2, '0')}:${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
    }
}

// ---- Seleção de botões CRESC/DESC ----
function atualizarSelecaoModo() {
    if (modo === 'desc') {
        btnDesc.classList.add('selected');
        btnCresc.classList.remove('selected');
    } else {
        btnCresc.classList.add('selected');
        btnDesc.classList.remove('selected');
    }
}

btnDesc.onclick = () => {
    modo = 'desc';
    atualizarSelecaoModo();
};

btnCresc.onclick = () => {
    modo = 'cresc';
    atualizarSelecaoModo();
};

// inicia com DESC selecionado
atualizarSelecaoModo();
// ---------------------------------------

// Botões rápidos (10, 15, 30)
quickButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        time = Number(btn.textContent) * 60;
        atualizarTela();
    });
});

// Iniciar
btnIniciar.onclick = () => {
    if (timer) return; // evita iniciar múltiplas vezes

    // Se digitou algo no input
    if (inputNumber.value) {
        time = Number(inputNumber.value) * 60;
        atualizarTela();
    }

    timer = setInterval(() => {
        if (modo === 'desc') {
            if (time > 0) {
                time--;
            } else {
                clearInterval(timer);
                timer = null;
            }
        } else { // crescente
            time++;
        }

        atualizarTela();
    }, 1000);
};

// Parar
btnParar.onclick = () => {
    clearInterval(timer);
    timer = null;
};

btnLimpar.onclick = () => {
    // Para o cronômetro
    clearInterval(timer);
    timer = null;

    // Reseta tempo
    time = 0;
    atualizarTela();

    // Limpa input
    inputNumber.value = "";
};

/* Menu de configurações */
const btnConfig = document.getElementById('btn-config');
const menuConfig = document.getElementById('menu-config');
const btnBack = document.getElementById('btn-back');
const themeSelect = document.getElementById('theme-select');
const fontSizeInput = document.getElementById('font-size');

// Abrir menu
btnConfig.onclick = () => {
    menuConfig.classList.add('show');
};

// Fechar menu
btnBack.onclick = () => {
    menuConfig.classList.remove('show');
};

// Alterar tema
themeSelect.onchange = () => {
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(themeSelect.value);
};

fontSizeInput.oninput = () => {
    document.querySelectorAll('.ajustavel').forEach(container => {
        container.querySelectorAll('*').forEach(el => {
            if (el.tagName !== 'IMG') { // Ignora imagens
                el.style.fontSize = fontSizeInput.value + 'px';
            }
        });
    });
};



/* Alterar FAQ e Configurações */
tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const target = btn.dataset.tab;

        tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        tabContents.forEach(c => c.classList.add('hidden'));
        document.getElementById('tab-' + target).classList.remove('hidden');
    });
});

const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    item.addEventListener('click', () => {
        const answer = item.querySelector('.faq-answer');
        const isOpen = answer.style.display === 'block';

        document.querySelectorAll('.faq-answer').forEach(ans => ans.style.display = 'none');

        if (!isOpen) answer.style.display = 'block';
    });
});

