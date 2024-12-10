package com.ProyectoCasino.Model;

import java.util.Date;

public class CavemanRunDTO {

    private Integer idLogCavemanRun;
    private Date fechaLogCavemanRun;
    private Integer apuesta;
    private Double multiplicador;
    private Double resultado;
    private Integer historicoId; // ID del historico
    private String usuarioDni;  // ID del usuario
    private Integer juegoId;    // ID del juego

    // Getters y Setters
    public Integer getIdLogCavemanRun() {
        return idLogCavemanRun;
    }

    public void setIdLogCavemanRun(Integer idLogCavemanRun) {
        this.idLogCavemanRun = idLogCavemanRun;
    }

    public Date getFechaLogCavemanRun() {
        return fechaLogCavemanRun;
    }

    public void setFechaLogCavemanRun(Date fechaLogCavemanRun) {
        this.fechaLogCavemanRun = fechaLogCavemanRun;
    }

    public Integer getApuesta() {
        return apuesta;
    }

    public void setApuesta(Integer apuesta) {
        this.apuesta = apuesta;
    }

    public Double getMultiplicador() {
        return multiplicador;
    }

    public void setMultiplicador(Double multiplicador) {
        this.multiplicador = multiplicador;
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
        return "CavemanRunDTO [idLogCavemanRun=" + idLogCavemanRun + ", fechaLogCavemanRun=" + fechaLogCavemanRun
                + ", apuesta=" + apuesta + ", multiplicador=" + multiplicador + ", resultado=" + resultado
                + ", historicoId=" + historicoId + ", usuarioDni=" + usuarioDni + ", juegoId=" + juegoId + "]";
    }
}