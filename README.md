# Prehistoric Jackpot

**Prehistoric Jackpot** es un proyecto de casino en línea ambientado en la era del Paleolítico. El proyecto ofrece dos emocionantes juegos: una tragaperras y otro similar al **Dinosteak**, pero con una temática adaptada al Paleolítico. Los usuarios pueden registrarse, iniciar sesión, jugar, y administrar su saldo mientras disfrutan de una experiencia única de casino.

## Descripción

Este proyecto está construido con **Spring Boot** para el backend, utilizando **Spring MVC** y **Spring Data JPA** para el manejo de la lógica de negocios y la persistencia de datos. En el frontend, se emplean **Thymeleaf**, **HTML**, **CSS** y **JavaScript** para la creación de las vistas interactivas y la gestión de recursos estáticos.

Los usuarios pueden registrarse, iniciar sesión, jugar a los juegos y consultar su historial de apuestas. La funcionalidad incluye el manejo de cuentas de usuario, gestión de saldos, y un registro histórico de las actividades de los jugadores.

## Características

- **Registro de usuarios**: Los usuarios pueden registrarse proporcionando su información personal.
- **Autenticación de usuarios**: Los usuarios pueden iniciar sesión con sus credenciales (nombre de usuario y contraseña).
- **Gestión de saldo**: Los jugadores pueden ver y actualizar su saldo en tiempo real.
- **Historial de juegos**: Cada jugada o tirada se registra para que los usuarios puedan consultar su historial.
- **Dos juegos principales**:
  - **Tragaperras**: Una clásica máquina tragamonedas con un toque de la era prehistórica.
  - **Caveman Run**: Un juego ambientado en el Paleolítico similar al Dinosteak, donde los jugadores pueden hacer apuestas y ganar según el multiplicador.

## Tecnologías Utilizadas

- **Backend**:
  - **Spring Boot**: Framework para desarrollar aplicaciones Java.
  - **Spring MVC**: Para gestionar las vistas y controlar el flujo de la aplicación.
  - **Spring Data JPA**: Para el acceso a bases de datos usando Hibernate.
  - **MySQL**: Sistema de gestión de bases de datos para almacenar la información del usuario, historial y configuraciones de los juegos.
  - **Jakarta Persistence (JPA)**: Para la gestión de la persistencia de datos.
  - **Thymeleaf**: Motor de plantillas para la creación de vistas dinámicas.

- **Frontend**:
  - **HTML**: Lenguaje de marcado para estructurar las páginas web.
  - **CSS**: Para el diseño visual y la presentación de las vistas.
  - **JavaScript**: Para la interactividad en las páginas web.
  - **Bootstrap**: Framework CSS utilizado para un diseño responsivo y moderno.
  - **Recursos multimedia**: Imágenes, audios y videos relacionados con los juegos.

## Estructura del Proyecto

La estructura del proyecto sigue las mejores prácticas de **Spring Boot**, con un enfoque en la separación de capas (controlador, servicio, repositorio, etc.). A continuación se muestra la organización de los archivos y directorios más relevantes:

### Explicación de las carpetas y archivos:

- **src/main/java/com/ProyectoCasino**:
  - **controller**: Contiene los controladores REST y MVC encargados de gestionar las solicitudes HTTP.
  - **entity**: Aquí se encuentran las entidades JPA que representan las tablas de la base de datos.
  - **model**: Contiene los modelos DTO que se usan para transferir datos entre capas.
  - **repository**: Define las interfaces de acceso a la base de datos utilizando JPA.
  - **service**: Contiene las implementaciones de los servicios que gestionan la lógica del negocio.

- **src/main/resources/static**:
  - **assets**: Recursos gráficos como imágenes, gifs, etc.
  - **audios**: Archivos de audio para los efectos de sonido o música de fondo.
  - **css**: Archivos de estilo para la apariencia de la interfaz.
  - **js**: Archivos JavaScript para la interactividad y funcionalidad en el cliente.
  - **videos**: Archivos de video utilizados en el sitio web.

- **src/main/resources/templates**:
  - Archivos **HTML** con las vistas de la aplicación, renderizadas por **Thymeleaf**.

- **pom.xml**: Archivo de configuración de Maven, donde se definen las dependencias necesarias para el proyecto.

## Instalación

### Requisitos Previos

- **Java 17** o superior.
- **Maven** para la gestión de dependencias.
- **MySQL** o cualquier base de datos compatible con JPA.

### Pasos para ejecutar el proyecto:

1. **Clona el repositorio**:
   ```bash
   git clone https://github.com/tu-usuario/prehistoric-jackpot.git
