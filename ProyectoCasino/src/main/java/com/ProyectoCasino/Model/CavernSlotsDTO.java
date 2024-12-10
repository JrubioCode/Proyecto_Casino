package com.ProyectoCasino.Model;

import java.util.Date;

public class CavernSlotsDTO{

    private Integer idLogCavernSlots;
    private Date fechaLogCavernSlots;
    private Integer apuesta;
    private String combinacion;
    private Double resultado;
    private Integer historicoId; // ID del historico
    private String usuarioDni;  // ID del usuario
    private Integer juegoId;    // ID del juego

    // Getters y Setters
    public Integer getIdLogCavernSlots() {
        return idLogCavernSlots;
    }

    public void setIdLogCavernSlots(Integer idLogCavernSlots) {
        this.idLogCavernSlots = idLogCavernSlots;
    }

    public Date getFechaLogCavernSlots() {
        return fechaLogCavernSlots;
    }

    public void setFechaLogCavernSlots(Date fechaLogCavernSlots) {
        this.fechaLogCavernSlots = fechaLogCavernSlots;
    }

    public Integer getApuesta() {
        return apuesta;
    }

    public void setApuesta(Integer apuesta) {
        this.apuesta = apuesta;
    }

    public String getCombinacion() {
        return combinacion;
    }

    public void setCombinacion(String combinacion) {
        this.combinacion = combinacion;
    }

    public Double getResultado() {
        return resultado;
    }

    public void setResultado(Double resultado) {
        this.resultado = resultado;
    }

    public Integer getHistoricoId() {
        return historicoId;
    }

    public void setHistoricoId(Integer historicoId) {
        this.historicoId = historicoId;
    }

    public String getUsuarioDni() {
        return usuarioDni;
    }

    public void setUsuarioDni(String usuarioDni) {
        this.usuarioDni = usuarioDni;
    }

    public Integer getJuegoId() {
        return juegoId;
    }

    public void setJuegoId(Integer juegoId) {
        this.juegoId = juegoId;
    }

    // toString()
    @Override
    public String toString() {
        return "CavernSlotsDTO [idLogCavernSlots=" + idLogCavernSlots + ", fechaLogCavernSlots=" + fechaLogCavernSlots
                + ", apuesta=" + apuesta + ", combinacion=" + combinacion + ", resultado=" + resultado
                + ", historicoId=" + historicoId + ", usuarioDni=" + usuarioDni + ", juegoId=" + juegoId + "]";
    }
}