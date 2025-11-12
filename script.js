// JavaScript для улучшения доступности формы
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    
    // Валидация формы в реальном времени
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            // Сбрасываем состояние ошибки при вводе
            if (this.getAttribute('aria-invalid') === 'true') {
                this.setAttribute('aria-invalid', 'false');
                const errorElement = document.getElementById(this.id + '-error');
                errorElement.textContent = '';
            }
        });
    });
    
    // Обработка отправки формы
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            // Имитация отправки формы
            formStatus.innerHTML = '<div class="success-message" role="alert">Сообщение успешно отправлено! Я свяжусь с вами в ближайшее время.</div>';
            form.reset();
            
            // Фокусируемся на сообщении об успехе для пользователей скринридеров
            setTimeout(() => {
                formStatus.focus();
            }, 100);
        } else {
            formStatus.innerHTML = '<div class="error-message" role="alert">Пожалуйста, исправьте ошибки в форме перед отправкой.</div>';
            
            // Фокусируемся на первом поле с ошибкой
            const firstInvalidField = form.querySelector('[aria-invalid="true"]');
            if (firstInvalidField) {
                firstInvalidField.focus();
            }
        }
    });
    
    // Функция валидации поля
    function validateField(field) {
        const errorElement = document.getElementById(field.id + '-error');
        let isValid = true;
        let errorMessage = '';
        
        if (field.validity.valueMissing) {
            errorMessage = 'Это поле обязательно для заполнения';
            isValid = false;
        } else if (field.type === 'email' && field.validity.typeMismatch) {
            errorMessage = 'Пожалуйста, введите корректный email адрес';
            isValid = false;
        } else if (field.id === 'name' && field.value.length < 2) {
            errorMessage = 'Имя должно содержать минимум 2 символа';
            isValid = false;
        }
        
        if (!isValid) {
            field.setAttribute('aria-invalid', 'true');
            errorElement.textContent = errorMessage;
        } else {
            field.setAttribute('aria-invalid', 'false');
            errorElement.textContent = '';
        }
        
        return isValid;
    }
    
    // Обработка клавиши Escape для сброса фокуса
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Если фокус находится в поле формы, перемещаем его на начало формы
            if (document.activeElement && form.contains(document.activeElement)) {
                form.querySelector('input, textarea, button').focus();
            }
        }
    });
    
    // Улучшение навигации по форме с клавиатуры
    form.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA' && e.target.type !== 'submit') {
            e.preventDefault();
        }
    });
});