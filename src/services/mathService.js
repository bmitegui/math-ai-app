export const generarEjercicios = async (materia, nivel, cantidad) => {
    
    await new Promise(resolve => setTimeout(resolve, 1500));
  
    const problemas = [];
  
    for (let i = 1; i <= cantidad; i++) {
      const esPar = i % 2 === 0;
      
      problemas.push({
        id: i,
        titulo: `Problema #${i}`,
        tema: materia === 'Geometría' ? 'Área de figuras' : 'Ecuaciones',
        enunciado: esPar 
          ? 'Resuelve la siguiente integral definida:' 
          : `Encuentra el valor de x para el nivel ${nivel}:`,
        formula: esPar 
          ? '\\int_{0}^{\\infty} e^{-x^2} dx' 
          : 'x^2 + 24y^2 = 25'
      });
    }
  
    return {
      id: Date.now(),
      role: 'ai',
      textoIntro: `¡Seguro! Aquí tienes ${cantidad} ejercicios de ${materia} (Nivel ${nivel}) generados por la API.`,
      problemas: problemas
    };
  };