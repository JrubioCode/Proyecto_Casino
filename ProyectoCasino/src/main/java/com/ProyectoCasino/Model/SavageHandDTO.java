package com.ProyectoCasino.Model;

import java.math.BigDecimal;
import java.sql.Timestamp;

public class SavageHandDTO {
    
    private Integer idLogSavageHands;
    private Timestamp fechaLogSavageHands;
    private Integer apuesta;
    private BigDecimal resultado;
    private Integer idHistorico;
    private String dni;
    private Integer idJuego;

    // Constructor vacío
    public SavageHandDTO() {
    }

    // Constructor con todos los atributos
    public SavageHandDTO(Integer idLogSavageHands, Timestamp fechaLogSavageHands, Integer apuesta, BigDecimal resultado, Integer idHistorico, String dni, Integer idJuego) {
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
        return "SavageHandDTO [idLogSavageHands=" + idLogSavageHands + ", fechaLogSavageHands=" + fechaLogSavageHands
                + ", apuesta=" + apuesta + ", resultado=" + resultado + ", idHistorico=" + idHistorico + ", dni=" + dni
                + ", idJuego=" + idJuego + "]";
    }
}