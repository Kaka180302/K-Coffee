document.addEventListener('DOMContentLoaded', () => {
    // Utility to clear all errors
    function clearErrors(formId) {
        const form = document.getElementById(formId);
        if (form) {
            const inputs = form.querySelectorAll('.form-input');
            inputs.forEach(input => input.classList.remove('error'));
        }
    }

    // Toggle Password Visibility
    const togglePwdBtn = document.getElementById('toggle-password-btn');
    if (togglePwdBtn) {
        togglePwdBtn.addEventListener('click', function() {
            // Find password input in the same form, handles both signup and signin
            const pwd = document.getElementById('password') || document.getElementById('auth-password');
            const icon = document.getElementById('password-visibility-icon');
            if (pwd && icon) {
                if (pwd.type === 'password') {
                    pwd.type = 'text';
                    icon.textContent = 'visibility_off';
                } else {
                    pwd.type = 'password';
                    icon.textContent = 'visibility';
                }
            }
        });
    }
    
    window.checkPasswordStrength = function(val) {
        const bars = [document.getElementById('bar-1'), document.getElementById('bar-2'), document.getElementById('bar-3')];
        const text = document.getElementById('strength-text');
        if (!bars[0] || !text) return;
        
        if (!val) {
          bars.forEach(b => b.style.backgroundColor = 'var(--surface-container-high)');
          text.textContent = 'Chưa nhập';
          return;
        }
        if (val.length < 6) {
          bars[0].style.backgroundColor = '#ba1a1a';
          bars[1].style.backgroundColor = 'var(--surface-container-high)';
          bars[2].style.backgroundColor = 'var(--surface-container-high)';
          text.textContent = 'Yếu';
        } else if (val.length < 8) {
          bars[0].style.backgroundColor = '#ff9800';
          bars[1].style.backgroundColor = '#ff9800';
          bars[2].style.backgroundColor = 'var(--surface-container-high)';
          text.textContent = 'Trung bình';
        } else {
          bars.forEach(b => b.style.backgroundColor = '#4caf50');
          text.textContent = 'Mạnh';
        }
    }

    // Sign Up Form Handler
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            clearErrors('signup-form');
            
            const fullnameInput = document.getElementById('fullname');
            const phoneInput = document.getElementById('phone');
            const emailInput = document.getElementById('email');
            const passwordInput = document.getElementById('password');
            const confirmPasswordInput = document.getElementById('confirm-password');
            const btn = document.getElementById('submit-signup-btn');

            let hasError = false;

            if (!fullnameInput.value.trim()) { fullnameInput.classList.add('error'); hasError = true; }
            if (!phoneInput.value.trim()) { phoneInput.classList.add('error'); hasError = true; }
            if (!emailInput.value.trim()) { emailInput.classList.add('error'); hasError = true; }
            if (!passwordInput.value) { passwordInput.classList.add('error'); hasError = true; }
            if (!confirmPasswordInput.value) { confirmPasswordInput.classList.add('error'); hasError = true; }

            if (hasError) {
                showGlobalToast('Lỗi', 'Vui lòng điền đầy đủ các thông tin bắt buộc');
                return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value.trim())) {
                emailInput.classList.add('error');
                showGlobalToast('Lỗi', 'Định dạng email không hợp lệ');
                return;
            }
            
            const phoneRegex = /^(0|\+84)[3|5|7|8|9][0-9]{8}$/;
            if (!phoneRegex.test(phoneInput.value.trim())) {
                phoneInput.classList.add('error');
                showGlobalToast('Lỗi', 'Số điện thoại không hợp lệ (phải đủ 10 số)');
                return;
            }
            
            if (passwordInput.value.length < 6) {
                passwordInput.classList.add('error');
                showGlobalToast('Lỗi', 'Mật khẩu quá ngắn, yêu cầu ít nhất 6 ký tự');
                return;
            }
            
            if (passwordInput.value !== confirmPasswordInput.value) {
                confirmPasswordInput.classList.add('error');
                showGlobalToast('Lỗi', 'Mật khẩu nhập lại không khớp');
                return;
            }

            let allUsers = JSON.parse(localStorage.getItem('kcoffee_users')) || [];
            if (allUsers.find(u => u.email === emailInput.value.trim() || u.phone === phoneInput.value.trim())) {
                emailInput.classList.add('error');
                phoneInput.classList.add('error');
                showGlobalToast('Lỗi', 'Email hoặc Số điện thoại này đã được đăng ký trước đó');
                return;
            }

            // Success
            allUsers.push({ 
                fullname: fullnameInput.value.trim(), 
                phone: phoneInput.value.trim(), 
                email: emailInput.value.trim(), 
                password: passwordInput.value 
            });
            localStorage.setItem('kcoffee_users', JSON.stringify(allUsers));
            
            btn.innerHTML = '<span class="material-symbols-outlined" style="animation: spin 1s linear infinite;">progress_activity</span><span>Đang tạo tài khoản...</span>';
            btn.style.pointerEvents = 'none';
            
            setTimeout(function() {
                btn.innerHTML = '<span class="material-symbols-outlined">check_circle</span><span>Đăng ký thành công!</span>';
                btn.style.backgroundColor = 'var(--secondary)';
                showGlobalToast('Thành công', 'Đăng ký thành công, tự động chuyển hướng đăng nhập...');
                
                setTimeout(() => {
                    window.location.href = 'signin.html';
                }, 1500);
            }, 1000);
        });
    }

    // Sign In Form Handler
    const signinForm = document.getElementById('sign-in-form');
    if (signinForm) {
        signinForm.addEventListener('submit', function(e) {
            e.preventDefault();
            clearErrors('sign-in-form');
            
            const identifierInput = document.getElementById('auth-identifier');
            const passwordInput = document.getElementById('auth-password');
            const btn = document.getElementById('submit-login-btn');

            let hasError = false;
            if (!identifierInput.value.trim()) { identifierInput.classList.add('error'); hasError = true; }
            if (!passwordInput.value) { passwordInput.classList.add('error'); hasError = true; }

            if (hasError) {
                showGlobalToast('Lỗi', 'Vui lòng điền đầy đủ tài khoản và mật khẩu');
                return;
            }

            let allUsers = JSON.parse(localStorage.getItem('kcoffee_users')) || [];
            const user = allUsers.find(u => u.email === identifierInput.value.trim() || u.phone === identifierInput.value.trim());

            if (!user) {
                identifierInput.classList.add('error');
                showGlobalToast('Lỗi', 'Tài khoản không tồn tại');
                return;
            }

            if (user.password !== passwordInput.value) {
                passwordInput.classList.add('error');
                showGlobalToast('Lỗi', 'Mật khẩu không chính xác');
                return;
            }

            // Success
            btn.innerHTML = '<span class="material-symbols-outlined" style="animation: spin 1s linear infinite;">progress_activity</span><span>Đang xử lý đăng nhập...</span>';
            btn.style.pointerEvents = 'none';
            
            setTimeout(function() {
                btn.innerHTML = '<span class="material-symbols-outlined">check_circle</span><span>Đăng nhập thành công!</span>';
                btn.style.backgroundColor = 'var(--secondary)';
                
                localStorage.setItem('kcoffee_session', JSON.stringify({
                    fullname: user.fullname,
                    email: user.email,
                    phone: user.phone
                }));

                showGlobalToast('Thành công', 'Đăng nhập thành công, chuyển hướng trang chủ...');
                
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1200);
            }, 800);
        });
    }
});
    document.querySelectorAll('.form-input').forEach(input => {
        input.addEventListener('input', function() {
            this.classList.remove('error');
        });
    });

