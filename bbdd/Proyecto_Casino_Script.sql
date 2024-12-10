DROP DATABASE IF EXISTS PROYECTO_CASINO;
CREATE DATABASE PROYECTO_CASINO;
USE PROYECTO_CASINO;

-- TABLA USUARIO
CREATE TABLE USUARIO (
    DNI VARCHAR(9) NOT NULL,
    NOMBRE VARCHAR(100) NOT NULL,
    APELLIDO1 VARCHAR(100) NOT NULL,
    APELLIDO2 VARCHAR(100),
    FECHA_NACIMIENTO DATE NOT NULL,
    USER_NAME VARCHAR(100) NOT NULL UNIQUE,
    EMAIL VARCHAR(100) NOT NULL UNIQUE,
    USER_PASSWORD VARCHAR(255) NOT NULL,
    NUMERO_TELEFONO VARCHAR(15) NOT NULL,
    ES_VIP BOOLEAN,
    NUMERO_TARJETA INT(16),
    TITULAR_TARJETA VARCHAR(100),
    FECHA_EXPIRACION DATE,
    CVC INT(3),
    CONSTRAINT PK_USUARIO PRIMARY KEY (DNI)
);

-- TABLA JUEGO
CREATE TABLE JUEGO (
	ID_JUEGO INT NOT NULL,
    NOMBRE_JUEGO VARCHAR(100) NOT NULL,
    CONSTRAINT PK_JUEGO PRIMARY KEY (ID_JUEGO)
);

-- TABLA CONVERSION
CREATE TABLE CONVERSION (
	ID_CONVERSION INT NOT NULL,
    EUROS DECIMAL(10,2) DEFAULT 0,
    FICHAS INT DEFAULT 0,
    ID_JUEGO INT NOT NULL,
    CONSTRAINT PK_CONVERSION PRIMARY KEY (ID_CONVERSION),
    CONSTRAINT FK_JUEGO_CONVERSION FOREIGN KEY (ID_JUEGO) REFERENCES JUEGO (ID_JUEGO)
);

-- TABLA HISTORICO
CREATE TABLE HISTORICO (
	ID_HISTORICO INT NOT NULL,
	FECHA_LOG_HISTORICO DATE NOT NULL,
    DNI VARCHAR(9) NOT NULL,
    ID_JUEGO INT NOT NULL,
    CONSTRAINT PK_ID_HISTORICO PRIMARY KEY (ID_HISTORICO),
    CONSTRAINT FK_USUARIO_HISTORICO FOREIGN KEY (DNI) REFERENCES USUARIO (DNI),
    CONSTRAINT FK_JUEGO_HISTORICO FOREIGN KEY (ID_JUEGO) REFERENCES JUEGO (ID_JUEGO)
);

-- TABLA CAVEMANRUN (DINOSTEAK)
CREATE TABLE CAVEMANRUN (
	ID_LOG_CAVEMANRUN INT NOT NULL,
    FECHA_LOG_CAVEMANRUN DATE NOT NULL,
    APUESTA INT NOT NULL,
    MULTIPLICADOR DOUBLE(8,2) NOT NULL,
    RESULTADO DOUBLE (10,2) NOT NULL,
    ID_HISTORICO INT NOT NULL,
    DNI VARCHAR(9) NOT NULL,
    ID_JUEGO INT NOT NULL,
    CONSTRAINT PK_CAVEMANRUN PRIMARY KEY (ID_LOG_CAVEMANRUN),
    CONSTRAINT FK_HISTORICO_CAVEMANRUN FOREIGN KEY (ID_HISTORICO) REFERENCES HISTORICO (ID_HISTORICO),
    CONSTRAINT FK_USUARIOHISTORICO_CAVEMANRUN FOREIGN KEY (DNI) REFERENCES USUARIO (DNI),
    CONSTRAINT FK_JUEGOHISTORICO_CAVEMANRUN FOREIGN KEY (ID_JUEGO) REFERENCES JUEGO (ID_JUEGO)
);

-- TABLA CAVERNSLOTS (TRAGAPERRAS)
CREATE TABLE CAVERNSLOTS (
	ID_LOG_CAVERNSLOTS INT NOT NULL,
    FECHA_LOG_CAVERNSLOTS DATE NOT NULL,
    APUESTA INT NOT NULL,
    COMBINACION VARCHAR(100) NOT NULL,
    RESULTADO DOUBLE (10,2) NOT NULL,
    ID_HISTORICO INT NOT NULL,
    DNI VARCHAR(9) NOT NULL,
    ID_JUEGO INT NOT NULL,
    CONSTRAINT PK_CAVERNSLOTS PRIMARY KEY (ID_LOG_CAVERNSLOTS),
    CONSTRAINT FK_HISTORICO_CAVERNSLOTS FOREIGN KEY (ID_HISTORICO) REFERENCES HISTORICO (ID_HISTORICO),
    CONSTRAINT FK_USUARIOHISTORICO_CAVERNSLOTS FOREIGN KEY (DNI) REFERENCES USUARIO (DNI),
    CONSTRAINT FK_JUEGOHISTORICO_CAVERNSLOTS FOREIGN KEY (ID_JUEGO) REFERENCES JUEGO (ID_JUEGO)
);

SELECT * FROM USUARIO;
SELECT * FROM JUEGO;
SELECT * FROM CONVERSION;
SELECT * FROM HISTORICO;
SELECT * FROM CAVEMANRUN;
SELECT * FROM CAVERNSLOTS;