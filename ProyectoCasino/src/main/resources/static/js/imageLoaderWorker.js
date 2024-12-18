self.onmessage = async function (e) {
    const imageUrls = e.data;

    try {
        // Cargar todas las imágenes de manera concurrente
        const loadedImages = await Promise.all(
            imageUrls.map(async (url) => {
                const response = await fetch(url);
                const blob = await response.blob();
                return URL.createObjectURL(blob);
            })
        );

        // Enviar las imágenes cargadas al hilo principal
        self.postMessage({ success: true, images: loadedImages });
    } catch (error) {
        // En caso de error, enviar el error al hilo principal
        self.postMessage({ success: false, error: error.message });
    }
};