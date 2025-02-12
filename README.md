# Prehistoric Jackpot

<div align="center">
  <!-- Puedes agregar aquí un logo o banner si lo deseas -->
  <!-- <img src="ruta/al/logo.png" alt="Logo Prehistoric Jackpot" width="200" height="auto"> -->
</div>

**Prehistoric Jackpot** es un proyecto de casino en línea ambientado en la era del Paleolítico. El proyecto ofrece dos emocionantes juegos: una tragaperras y otro similar al **Dinosteak**, adaptado a la temática prehistórica. Los usuarios pueden registrarse, iniciar sesión, jugar y administrar su saldo, disfrutando de una experiencia única.

---

## Descripción

Este proyecto se desarrolla utilizando **Spring Boot** para el backend, integrando **Spring MVC** y **Spring Data JPA** para gestionar la lógica de negocio y la persistencia de datos. En el frontend se emplea **Thymeleaf** junto con **HTML**, **CSS** y **JavaScript** para construir vistas interactivas y manejar recursos estáticos.

Los usuarios pueden registrarse, iniciar sesión, jugar y consultar su historial de apuestas, contando además con funcionalidades para la gestión de cuentas, saldo y registro histórico de actividades.

---

## Características

<ul>
  <li><strong>Registro de usuarios</strong>: Permite la creación de cuentas proporcionando datos personales.</li>
  <li><strong>Autenticación</strong>: Inicio de sesión seguro mediante nombre de usuario y contraseña.</li>
  <li><strong>Gestión de saldo</strong>: Visualiza y actualiza el saldo en tiempo real.</li>
  <li><strong>Historial de juegos</strong>: Se registra cada jugada para su posterior consulta.</li>
  <li>
    <strong>Juegos principales</strong>:
    <ul>
      <li><strong>Tragaperras</strong>: Máquina tragamonedas con un toque prehistórico.</li>
      <li><strong>Caveman Run</strong>: Juego inspirado en el Dinosteak, adaptado a la era Paleolítica.</li>
    </ul>
  </li>
</ul>

---

## Tecnologías Utilizadas

### Backend
- **Spring Boot**
- **Spring MVC**
- **Spring Data JPA**
- **MySQL**
- **Jakarta Persistence (JPA)**
- **Thymeleaf**

### Frontend
- **HTML**
- **CSS**
- **JavaScript**
- **EmailJS** (envío de correo de bienvenida)
- **Web Workers** (manejo asíncrono de imágenes y videos)
- **AJAX y jQuery** (actualizaciones dinámicas sin recargar la página)
- **Recursos Multimedia** (imágenes, audios y videos)

---

## Estructura del Proyecto

La estructura del proyecto sigue las mejores prácticas de **Spring Boot**, con un enfoque en la separación de capas (controlador, servicio, repositorio, etc.). A continuación se muestra la organización de los archivos y directorios más relevantes:

```
Prehistoric-Jackpot/
│
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── ProyectoCasino/
│   │   │           ├── controller/            # Controladores REST y MVC
│   │   │           ├── entity/                # Entidades JPA
│   │   │           ├── model/                 # Modelos DTO
│   │   │           ├── repository/            # Repositorios JPA
│   │   │           ├── service/               # Servicios e implementación
│   │   │           └── PrehistoricJackpotApplication.java # Clase principal para arrancar la app
│   │   ├── resources/
│   │   │   ├── static/
│   │   │   │   ├── assets/                    # Recursos gráficos (imágenes, gifs, etc.)
│   │   │   │   ├── audios/                    # Archivos de audio
│   │   │   │   ├── css/                       # Archivos CSS
│   │   │   │   ├── js/                        # Archivos JavaScript
│   │   │   │   ├── videos/                    # Archivos de video
│   │   │   ├── templates/                     # Plantillas HTML
│   │   │   │   ├── cavemanRun.html            # Página del juego Caveman Run
│   │   │   │   ├── index.html                 # Página principal (inicio)
│   │   │   │   ├── lobby.html                 # Página de lobby
│   │   │   │   ├── registro.html              # Página de registro
│   │   │   └── application.properties         # Configuración de la aplicación
│   └── test/                                  # Pruebas unitarias y de integración
│
└── pom.xml                                    # Dependencias del proyecto (Maven)
└── Database/                                  # Scripts de inicialización de la base de datos
```

---

## Instalación

### Requisitos Previos

- **Java 17** o superior.
- **Maven** para la gestión de dependencias.
- **MySQL** o cualquier base de datos compatible con JPA.
- **MySQL Workbench** para la administración de la base de datos (o una herramienta similar).

### Pasos para ejecutar el proyecto:

1. **Clona el repositorio**:
   ```bash
   https://github.com/JrubioCode/Proyecto_Casino.git
   ```

2. **Configura la base de datos**:
   - Crea una base de datos en MySQL.
   - Accede a la carpeta `Database/` ubicada fuera del directorio `Prehistoric-Jackpot/`.
   - Ejecuta el script SQL proporcionado para inicializar las tablas y datos necesarios.

3. **Configura el archivo `application.properties`**:
   - Abre el archivo ubicado en `src/main/resources/application.properties` y configura los siguientes valores:
     ```properties
     spring.application.name=ProyectoCasino
     server.port=9090

     # MySQL configuration
     spring.datasource.url=jdbc:mysql://localhost:3306/proyecto_casino?useSSL=false&serverTimezone=UTC
     spring.datasource.username=root
     spring.datasource.password=root
     spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

     # Hibernate configuration
     spring.jpa.hibernate.ddl-auto=update
     spring.jpa.show-sql=true
     spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
     spring.jpa.properties.hibernate.format_sql=true
     ```

4. **Instala las dependencias**:
   - Asegúrate de incluir las siguientes dependencias en el archivo `pom.xml`:
     - Spring Boot Starter Data JDBC
     - Spring Boot Starter Data JPA
     - Spring Boot Starter Thymeleaf
     - Spring Boot Starter Web
     - Spring Boot Devtools (opcional, para desarrollo)
     - MySQL Connector Java
     - Spring Boot Starter Test (para pruebas)

## ¡Gracias por jugar a **Prehistoric Jackpot**!

Nos alegra que hayas elegido nuestro casino ambientado en el fascinante mundo del Paleolítico. Con dos emocionantes juegos: **Caveman Run** y una clásica **tragaperras**, estamos seguros de que encontrarás horas de diversión y emoción. 

¡Que la suerte de nuestros ancestros prehistóricos te acompañe mientras exploras, apuestas y te enfrentas a los desafíos que hemos preparado para ti! No olvides invitar a tus amigos para que también vivan la experiencia. 

¡Buena suerte y que disfrutes del viaje en el tiempo! 🚀🎰

<h1 align="center">DESPLIEGUE EN RAILWAY</h1>

<p align="center">
  <img src="https://github.com/JrubioCode/Proyecto_Casino/blob/main/ContenidoREADME/Imagen1.png" width="700" height="auto">
  <img src="https://github.com/JrubioCode/Proyecto_Casino/blob/main/ContenidoREADME/Imagen2.png" width="700" height="auto">
  <img src="https://github.com/JrubioCode/Proyecto_Casino/blob/main/ContenidoREADME/Imagen4.png" width="700" height="auto">
  <img src="https://github.com/JrubioCode/Proyecto_Casino/blob/main/ContenidoREADME/Imagen5.png" width="700" height="auto">
  <img src="https://github.com/JrubioCode/Proyecto_Casino/blob/main/ContenidoREADME/Imagen6.png" width="700" height="auto">
  <img src="https://github.com/JrubioCode/Proyecto_Casino/blob/main/ContenidoREADME/Imagen7.png" width="700" height="auto">
  <img src="https://github.com/JrubioCode/Proyecto_Casino/blob/main/ContenidoREADME/Imagen8.png" width="700" height="auto">
  <img src="https://github.com/JrubioCode/Proyecto_Casino/blob/main/ContenidoREADME/Imagen9.png" width="700" height="auto">
  <img src="https://github.com/JrubioCode/Proyecto_Casino/blob/main/ContenidoREADME/Imagen10.png" width="700" height="auto">
  <img src="https://github.com/JrubioCode/Proyecto_Casino/blob/main/ContenidoREADME/Imagen11.png" width="700" height="auto">
  <img src="https://github.com/JrubioCode/Proyecto_Casino/blob/main/ContenidoREADME/Imagen12.png" width="700" height="auto">
  <img src="https://github.com/JrubioCode/Proyecto_Casino/blob/main/ContenidoREADME/Imagen13.png" width="700" height="auto">
  <img src="https://github.com/JrubioCode/Proyecto_Casino/blob/main/ContenidoREADME/Imagen14.png" width="700" height="auto">
  <img src="https://github.com/JrubioCode/Proyecto_Casino/blob/main/ContenidoREADME/Imagen15.png" width="700" height="auto">
  <img src="https://github.com/JrubioCode/Proyecto_Casino/blob/main/ContenidoREADME/Imagen16.png" width="700" height="auto">
  <img src="https://github.com/JrubioCode/Proyecto_Casino/blob/main/ContenidoREADME/Imagen17.png" width="700" height="auto">
  <img src="https://github.com/JrubioCode/Proyecto_Casino/blob/main/ContenidoREADME/Imagen18.png" width="700" height="auto">
  <img src="https://github.com/JrubioCode/Proyecto_Casino/blob/main/ContenidoREADME/Imagen19.png" width="700" height="auto">
  <img src="https://github.com/JrubioCode/Proyecto_Casino/blob/main/ContenidoREADME/Imagen20.png" width="700" height="auto">
  <img src="https://github.com/JrubioCode/Proyecto_Casino/blob/main/ContenidoREADME/Imagen21.png" width="700" height="auto">
  <img src="https://github.com/JrubioCode/Proyecto_Casino/blob/main/ContenidoREADME/Imagen22.png" width="700" height="auto">
</p>
