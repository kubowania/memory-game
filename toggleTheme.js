document.addEventListener('DOMContentLoaded', () => {
    const themeIcon = document.getElementById('themeIcon');
    const body = document.body;
  
    let isDarkTheme = false;
  
    themeIcon.addEventListener('click', () => {
        if (!isDarkTheme) {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            themeIcon.classList.remove('fa-toggle-off');
            themeIcon.classList.add('fa-toggle-on');
            isDarkTheme = true;
        } else {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            themeIcon.classList.remove('fa-toggle-on');
            themeIcon.classList.add('fa-toggle-off');
            isDarkTheme = false;
        }
    });
});
