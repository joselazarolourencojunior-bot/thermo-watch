// ======================
// DEBUG MODE ATIVADO
// ======================
console.log('%c🚀 THERMO WATCH - DEBUG MODE', 'background: #2563eb; color: white; padding: 10px; font-size: 16px; font-weight: bold;');
console.log('%c📅 Data/Hora:', 'color: #2563eb; font-weight: bold;', new Date().toLocaleString());
console.log('%c🌐 User Agent:', 'color: #2563eb; font-weight: bold;', navigator.userAgent);
console.log('%c📍 URL:', 'color: #2563eb; font-weight: bold;', window.location.href);

// Função para log formatado
window.debugLog = function(title, data, color = 'green') {
    console.log(`%c${title}`, `background: ${color}; color: white; padding: 5px; font-weight: bold;`);
    console.log(data);
};

// Interceptar erros globais
window.addEventListener('error', function(event) {
    console.error('%c❌ ERRO GLOBAL CAPTURADO!', 'background: red; color: white; padding: 10px; font-weight: bold;');
    console.error('Mensagem:', event.message);
    console.error('Arquivo:', event.filename);
    console.error('Linha:', event.lineno);
    console.error('Coluna:', event.coleno);
    console.error('Error object:', event.error);
});

// Interceptar rejeições de promise não tratadas
window.addEventListener('unhandledrejection', function(event) {
    console.error('%c❌ PROMISE REJEITADA!', 'background: red; color: white; padding: 10px; font-weight: bold;');
    console.error('Razão:', event.reason);
    console.error('Promise:', event.promise);
});

console.log('%c✅ Debug mode inicializado!', 'color: green; font-weight: bold;');
