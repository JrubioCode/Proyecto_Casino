package com.ProyectoCasino.Model;

public class ConversionDTO {

    private Integer idConversion;
    private Double euros;
    private Integer fichas;
    private Integer juegoId; // ID del juego

    // Getters y Setters
    public Integer getIdConversion() {
        return idConversion;
    }

    public void setIdConversion(Integer idConversion) {
        this.idConversion = idConversion;
    }

    public Double getEuros() {
        return euros;
    }

    public void setEuros(Double euros) {
        this.euros = euros;
    }

    public Integer getFichas() {
        return fichas;
    }

    public void setFichas(Integer fichas) {
        this.fichas = fichas;
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
        return "ConversionDTO [idConversion=" + idConversion + ", euros=" + euros + ", fichas=" + fichas + ", juegoId=" + juegoId + "]";
    }
}