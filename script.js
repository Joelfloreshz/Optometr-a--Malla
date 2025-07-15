document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('.subject-checkbox');
    const progressBar = document.getElementById('progressBar');
    const approvedCountSpan = document.getElementById('approvedCount');
    const totalSubjectsSpan = document.getElementById('totalSubjects');
    const pendingCountSpan = document.getElementById('pendingCount');
    const progressPercentageSpan = document.getElementById('progressPercentage');

    const totalSubjects = checkboxes.length;
    totalSubjectsSpan.textContent = totalSubjects;

    // Función para actualizar el progreso y los contadores
    function updateProgress() {
        let approvedSubjects = 0;
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                approvedSubjects++;
            }
        });

        const pendingSubjects = totalSubjects - approvedSubjects;
        const percentage = totalSubjects === 0 ? 0 : (approvedSubjects / totalSubjects) * 100;

        approvedCountSpan.textContent = approvedSubjects;
        pendingCountSpan.textContent = pendingSubjects;
        progressPercentageSpan.textContent = `${percentage.toFixed(1)}%`; 
        progressBar.style.width = `${percentage}%`;
        progressBar.textContent = `${percentage.toFixed(0)}%`; // Texto dentro de la barra, sin decimales
    }

    // Carga los estados guardados del localStorage y actualiza el progreso inicial
    checkboxes.forEach(checkbox => {
        const savedState = localStorage.getItem(checkbox.id);
        if (savedState === 'checked') {
            checkbox.checked = true;
        }
    });

    // Llama a updateProgress al cargar la página para mostrar el estado inicial
    updateProgress();

    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', (event) => {
            if (event.target.checked) {
                localStorage.setItem(event.target.id, 'checked');
            } else {
                localStorage.setItem(event.target.id, 'unchecked');
            }
            updateProgress(); // Llama a la función de actualización cada vez que una casilla cambia
        });
    });
});