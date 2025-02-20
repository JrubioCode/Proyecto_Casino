package com.ProyectoCasino.Entity;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Entity
@Table(name = "SAVAGEHANDS")
public class SavageHandEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_LOG_SAVAGEHANDS")
    private Integer idLogSavageHands;
    
    @Column(name = "FECHA_LOG_SAVAGEHANDS", nullable = false)
    private Timestamp fechaLogSavageHands;
    
    @Column(name = "APUESTA", nullable = false)
    private Integer apuesta;
    
    @Column(name = "RESULTADO", nullable = false, precision = 10, scale = 2)
    private BigDecimal resultado;
    
    @Column(name = "ID_HISTORICO", nullable = false)
    private Integer idHistorico;
    
    @Column(name = "DNI", nullable = false, length = 9)
    private String dni;
    
    @Column(name = "ID_JUEGO", nullable = false)
    private Integer idJuego;

    // Constructores sin atrubutos
    public SavageHandEntity() {
    }

    // Constructores con atrubutos
    public SavageHandEntity(Integer idLogSavageHands, Timestamp fechaLogSavageHands, Integer apuesta, BigDecimal resultado, Integer idHistorico, String dni, Integer idJuego) {
        this.idLogSavageHands = idLogSavageHands;
        this.fechaLogSavageHands = fechaLogSavageHands;
        this.apuesta = apuesta;
        this.resultado = resultado;
        this.idHistorico = idHistorico;
        this.dni = dni;
        this.idJuego = idJuego;
    }

    // Getters y Setters
    public Integer getIdLogSavageHands() {
        return idLogSavageHands;
    }

    public void setIdLogSavageHands(Integer idLogSavageHands) {
        this.idLogSavageHands = idLogSavageHands;
    }

    public Timestamp getFechaLogSavageHands() {
        return fechaLogSavageHands;
    }

    public void setFechaLogSavageHands(Timestamp fechaLogSavageHands) {
        this.fechaLogSavageHands = fechaLogSavageHands;
    }

    public Integer getApuesta() {
        return apuesta;
    }

    public void setApuesta(Integer apuesta) {
        this.apuesta = apuesta;
    }

    public BigDecimal getResultado() {
        return resultado;
    }

    public void setResultado(BigDecimal resultado) {
        this.resultado = resultado;
    }

    public Integer getIdHistorico() {
        return idHistorico;
    }

    public void setIdHistorico(Integer idHistorico) {
        this.idHistorico = idHistorico;
    }

    public String getDni() {
        return dni;
    }

    public void setDni(String dni) {
        this.dni = dni;
    }

    public Integer getIdJuego() {
        return idJuego;
    }

    public void setIdJuego(Integer idJuego) {
        this.idJuego = idJuego;
    }

    // toString
    @Override
    public String toString() {
        return "SavageHandEntity [idLogSavageHands=" + idLogSavageHands + ", fechaLogSavageHands=" + fechaLogSavageHands
                + ", apuesta=" + apuesta + ", resultado=" + resultado + ", idHistorico=" + idHistorico + ", dni=" + dni
                + ", idJuego=" + idJuego + "]";
    } 
}