self.onmessage = async function (e) {
    const imageUrls = e.data;

    try {
        // Cargar todas las imágenes de manera concurrente
        const loadedImages = await Promise.all(
            imageUrls.map(async (url) => {
                const response = await fetch(url);  // Obtener cada imagen
                const blob = await response.blob();  // Convertir la respuesta en un blob
                return URL.createObjectURL(blob);    // Crear un URL de objeto para mostrar la imagen
            })
        );

        // Enviar las imágenes cargadas al hilo principal
        self.postMessage({ success: true, images: loadedImages });
    } catch (error) {
        // En caso de error, enviar el error al hilo principal
        self.postMessage({ success: false, error: error.message });
    }
};