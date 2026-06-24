document.addEventListener('DOMContentLoaded', () => {
    const progressFill = document.getElementById('splash-progress-fill');
    const percentageText = document.getElementById('splash-percentage');
    const statusText = document.getElementById('splash-text');
    const splashScreen = document.getElementById('splash-screen');

    // Control de seguridad por si acaso
    if (!progressFill || !percentageText || !statusText || !splashScreen) return;

    // Tus frases dinámicas originales
    const fasesCarga = [
        { progreso: 15, texto: "Estableciendo conexión en la nube..." },
        { progreso: 40, texto: "Sincronizando perfiles y base de datos..." },
        { progreso: 70, texto: "Estructurando feed institucional..." },
        { progreso: 90, texto: "Comprobando credenciales de acceso..." },
        { progreso: 100, texto: "¡Acceso concedido!" }
    ];

    let progresoActual = 0;
    let indiceFase = 0;
    let intervaloCarga = null;
    let remateCarga = null;
    let yaCargoTodo = false;

    // Simulador inteligente de carga
    intervaloCarga = setInterval(() => {
        if (progresoActual < 95) {
            progresoActual += Math.floor(Math.random() * 4) + 1;
            if (progresoActual > 95) progresoActual = 95;
            
            actualizarUI(progresoActual);
        }
    }, 80);

    function actualizarUI(valor) {
        progressFill.style.width = `${valor}%`;
        percentageText.innerText = `${valor}%`;

        /* TU LÓGICA ORIGINAL MEJORADA:
          Mantiene el avance secuencial que te gusta (indiceFase++), pero añadimos 
          una validación para asegurarnos de que "fasesCarga[indiceFase]" exista.
          Esto evita que la consola tire errores si llega a haber un salto brusco.
        */
        if (indiceFase < fasesCarga.length && valor >= fasesCarga[indiceFase].progreso) {
            statusText.innerText = fasesCarga[indiceFase].texto;
            indiceFase++;
        }
    }

    // Cuando la ventana cargue completamente
    window.addEventListener('load', () => {
        if (yaCargoTodo) return;
        yaCargoTodo = true;

        clearInterval(intervaloCarga); 
        
        let finalProgreso = progresoActual;
        remateCarga = setInterval(() => {
            if (finalProgreso < 100) {
                finalProgreso += 2;
                if (finalProgreso > 100) finalProgreso = 100;
                actualizarUI(finalProgreso);
            } else {
                clearInterval(remateCarga);
                
                // Forzar el último texto por si el remate fue demasiado rápido
                statusText.innerText = fasesCarga[fasesCarga.length - 1].texto;

                // Pausa dramática y desvanecimiento
                setTimeout(() => {
                    splashScreen.classList.add('splash-exit');
                    
                    // Remover del DOM para liberar memoria RAM
                    setTimeout(() => {
                        splashScreen.remove();
                    }, 800); 
                }, 600);
            }
        }, 20);
    });
});