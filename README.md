# Prehistoric Jackpot

**Prehistoric Jackpot** es un proyecto de casino en línea ambientado en la era del Paleolítico. El proyecto ofrece dos emocionantes juegos: una tragaperras y otro similar al **Dinosteak**, pero con una temática adaptada al Paleolítico. Los usuarios pueden registrarse, iniciar sesión, jugar y administrar su saldo mientras disfrutan de una experiencia única de casino.

---

## Descripción

Este proyecto está construido con **Spring Boot** para el backend, utilizando **Spring MVC** y **Spring Data JPA** para el manejo de la lógica de negocios y la persistencia de datos. En el frontend, se emplean **Thymeleaf**, **HTML**, **CSS**, y **JavaScript** para la creación de las vistas interactivas y la gestión de recursos estáticos.

Los usuarios pueden registrarse, iniciar sesión, jugar a los juegos y consultar su historial de apuestas. La funcionalidad incluye el manejo de cuentas de usuario, gestión de saldos, y un registro histórico de las actividades de los jugadores.

---

## Características

- **Registro de usuarios**: Los usuarios pueden registrarse proporcionando su información personal.
- **Autenticación de usuarios**: Los usuarios pueden iniciar sesión con sus credenciales (nombre de usuario y contraseña).
- **Gestión de saldo**: Los jugadores pueden ver y actualizar su saldo en tiempo real.
- **Historial de juegos**: Cada jugada o tirada se registra para que los usuarios puedan consultar su historial.
- **Dos juegos principales**:
  - **Tragaperras**: Una clásica máquina tragamonedas con un toque de la era prehistórica.
  - **Caveman Run**: Un juego ambientado en el Paleolítico similar al Dinosteak, donde los jugadores pueden hacer apuestas y ganar según el multiplicador.

---

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
  - **EmailJS**: Para enviar un correo de bienvenida al registrarse
  - **Web Workers**: Utilizados para manejar imágenes y videos de forma asíncrona.
  - **AJAX y jQuery**: Para realizar actualizaciones dinámicas a la base de datos sin recargar la página.
  - **Recursos multimedia**: Imágenes, audios y videos relacionados con los juegos.

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

<p>Lo primero que tienes que hacer es comprobar que tu proyecto está usando la versión de java 17. Para ello te vas a ir al pom.xml y tienes que ver algo parecido a esto.</p>

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>
	<parent>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-parent</artifactId>
		<version>3.4.0</version>
		<relativePath/> <!-- lookup parent from repository -->
	</parent>
	<groupId>com.ProyectoCasino</groupId>
	<artifactId>ProyectoCasino</artifactId>
	<version>0.0.1-SNAPSHOT</version>
	<name>ProyectoCasino</name>
	<description>Demo project for Spring Boot</description>
	<url/>
	<licenses>
		<license/>
	</licenses>
	<developers>
		<developer/>
	</developers>
	<scm>
		<connection/>
		<developerConnection/>
		<tag/>
		<url/>
	</scm>
	<properties>
		<java.version>17</java.version>
	</properties>
  <!-- Resto del codigo... -->
```

<p>Ahora lo que tienes que hacer es abrir tu archivo Application.java el cual es el encargado de lanzar la aplicación, y una vez dentro copias esto:</p>

```java
  @Configuration
	public static class Myconfiguration{
		@Bean
		public WebMvcConfigurer corsConfigurer(){
			return new WebMvcConfigurer() {
				@Override
				public void addCorsMappings(CorsRegistry registry) {
					registry.addMapping("/**")
							.allowedMethods("HEAD", "GET", "PUT", "POST", "DELETE", "PATCH");
				}
			};
		}
	}
```

<p>Te tiene que quedar algo así</p>

```java
@SpringBootApplication
public class ProyectoCasinoApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProyectoCasinoApplication.class, args);
	}

	// Configuracion para el despliegue en RailWay
	@Configuration
	public static class Myconfiguration{
		@Bean
		public WebMvcConfigurer corsConfigurer(){
			return new WebMvcConfigurer() {
				@Override
				public void addCorsMappings(CorsRegistry registry) {
					registry.addMapping("/**")
							.allowedMethods("HEAD", "GET", "PUT", "POST", "DELETE", "PATCH");
				}
			};
		}
	}

}
```

<p align="justify">Una vez configurado el archivo Application.java, nos vamos a ir a google y nos vamos a ir a la página oficial de <a href="https://railway.com/">Railway</a></p>

<img src="https://github.com/JrubioCode/Proyecto_Casino/blob/main/ContenidoREADME/Imagen4.png" align="center" width="1000" height="auto">

<p>Ahora lo que tienes que hacer es registrarse, para ello le vas a dar a Login. Una vez le des te aparecera una ventana en la que podrás elegir el método de Registro</p>

<img src="https://github.com/JrubioCode/Proyecto_Casino/blob/main/ContenidoREADME/Imagen5.png" align="center" width="1000" height="auto">

<p align="justify">Una vez te hayas registrado te aparecerá la pagina principal de Railway, en la cual te aparecerán todos los proyectos.</p>

<img src="https://github.com/JrubioCode/Proyecto_Casino/blob/main/ContenidoREADME/Imagen6.png" align="center" width="1000" height="auto">

<p align="justify">Lo que vamos a hacer es crear un proyecto nuevo para poder desplegar la aplicacion. Para ello le daremos a New, y una vez le demos nos debe aparecer una página como esta, en la cual lo primero que tenemos que hacer es darle a Empty project.</p>

<img src="https://github.com/JrubioCode/Proyecto_Casino/blob/main/ContenidoREADME/Imagen7.png" align="center" width="1000" height="auto">

<p align="justify">Ya hemos creado el proyecto donde vamos a desplegar la aplicación, pero tenemos que configurarlo, para ello lo primero que vamos a hacer es darle a Add a service y elegir la opción de Database. Aqui tienes que elegir la que estes usando, en mi caso es MySQL</p>

<img src="https://github.com/JrubioCode/Proyecto_Casino/blob/main/ContenidoREADME/Imagen8.png" align="center" width="1000" height="auto">

<p align="justify">Una vez desplegado el servicio, lo que tenemos que hacer es hacer click sobre él y esperar un poco. Te tendrá que salir una pantalla como esta, en ella tienes que ir al apartado de Data y darle al botón de Connect</p>

<img src="https://github.com/JrubioCode/Proyecto_Casino/blob/main/ContenidoREADME/Imagen10.png" align="center" width="1000" height="auto">

<p align="justify">Cuando le des a Connect, te aparecerá una pantalla como esta, en la cual lo que tienes que hacer es copiar la primera opción que te aparece, Connection URL que es la cadena de conexión que te permite conectar tu aplicación a la base de datos.</p>

<img src="https://github.com/JrubioCode/Proyecto_Casino/blob/main/ContenidoREADME/Imagen11.png" align="center" width="1000" height="auto">

<p align="justify">Cuando hayas copiado la Connection URL te la vas a llevar a tu proyecto, y la vas a copiar en el application.properties y la vas a copiar en el apartado de spring.datasource.url</p>

```yaml
spring.datasource.url=jdbc:mysql://root:loIbZfLFaAXZHbyACsunXNgGfrJhCPdW@viaduct.proxy.rlwy.net:32383/railway
```

<p align="center">
Tiene que quedarte así. ¡¡IMPORTANTE!! En la URL viene mucha información que tienes que configurar en el properties.
1º mysql://root --> Root es el usuario por lo que en el spring.datasource.username tendras que ponerlo
2º loIbZfLFaAXZHbyACsunXNgGfrJhCPdW --> Lo siguiente que viene es la contraseña, por lo que lo tendrás que poner en el apartado de spring.datasource.password. Ademas esta es la contraseña que tendrás que usar en la nueva conexión de tu base de datos que crearás.
3º viaduct.proxy.rlwy.net --> Esto lo tendrás que poner en el Hostname que tendrás que usar cuando crees una nueva conexión en tu Base de datos.
4º 32383 --> Este es el puerto que tendras que usar en el Port cuando crees la nueva conexión en tu Base de datos.
5º railway --> Este es el nombre de tu base de datos, el cual usarás cuando crees el script de tu modelo de datos en la conexión que tendrás que crear con los datos anteriores.
Tiene que quedarle algo así, pero con tus datos.
</p>

```yaml
#project conf
spring.application.name=ProyectoCasino
server.port=8080

#mysql configuration
spring.datasource.url=jdbc:mysql://root:loIbZfLFaAXZHbyACsunXNgGfrJhCPdW@viaduct.proxy.rlwy.net:32383/railway
spring.datasource.username=root
spring.datasource.password=loIbZfLFaAXZHbyACsunXNgGfrJhCPdW
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
#hibernate config
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
#formatear las consultas SQL generadas automáticamente
spring.jpa.properties.hibernate.format_sql=true
```

<p align="center">
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
