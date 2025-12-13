 // كود JavaScript للتفاعلات
        
        // تنفيذ التنقل الناعم داخل الصفحة
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if(targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if(targetElement) {
                    // إغلاق القائمة المتنقلة على الأجهزة المحمولة
                    if(window.innerWidth <= 768) {
                        document.querySelector('.nav-links').classList.remove('active');
                        document.querySelector('.menu-toggle i').classList.remove('fa-times');
                        document.querySelector('.menu-toggle i').classList.add('fa-bars');
                    }
                    
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // التحكم في القائمة المتنقلة على الأجهزة المحمولة
        const menuToggle = document.getElementById('menuToggle');
        const navLinks = document.querySelector('.nav-links');
        
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if(navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // تنشيط أشرطة المهارات عند التمرير إليها
        function animateSkillBars() {
            const skillBars = document.querySelectorAll('.skill-progress');
            
            skillBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                if(isElementInViewport(bar)) {
                    bar.style.width = width + '%';
                }
            });
        }
        
        // التحقق إذا كان العنصر مرئيًا في النافذة
        function isElementInViewport(el) {
            const rect = el.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.9
            );
        }
        
        // تصفية المشاريع
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // إزالة الفعالية من جميع الأزرار
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // إضافة الفعالية للزر المحدد
                button.classList.add('active');
                
                const filterValue = button.getAttribute('data-filter');
                
                projectCards.forEach(card => {
                    if(filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
        
        // تأثير الظهور عند التمرير
        function checkVisibility() {
            const elements = document.querySelectorAll('.fade-in');
            
            elements.forEach(element => {
                if(isElementInViewport(element)) {
                    element.classList.add('visible');
                }
            });
            
            // تنشيط أشرطة المهارات أيضًا
            animateSkillBars();
        }
        
        // إضافة مستمعي الأحداث
        window.addEventListener('scroll', checkVisibility);
        window.addEventListener('load', checkVisibility);
        
        // تنشيط أشرطة المهارات عند التحميل
        document.addEventListener('DOMContentLoaded', () => {
            // تعيين عرض أولي لأشرطة المهارات
            const skillBars = document.querySelectorAll('.skill-progress');
            skillBars.forEach(bar => {
                bar.style.width = '0%';
            });
            
            // تنشيط الأشرطة إذا كانت مرئية عند التحميل
            setTimeout(() => {
                checkVisibility();
            }, 500);
        });
        
        // إضافة تأثير عند تحميل الصفحة
        window.addEventListener('load', () => {
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.5s ease';
            
            setTimeout(() => {
                document.body.style.opacity = '1';
            }, 100);
        });