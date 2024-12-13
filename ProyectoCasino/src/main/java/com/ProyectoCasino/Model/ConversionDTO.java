package com.ProyectoCasino.Model;

public class ConversionDTO {

    private Integer idConversion;
    private Double multiplicador;
    private String fechaCreacion;
    private Integer juegoId;

    // Getters y Setters
    public Integer getIdConversion() {
        return idConversion;
    }

    public void setIdConversion(Integer idConversion) {
        this.idConversion = idConversion;
    }

    public Double getMultiplicador() {
        return multiplicador;
    }

    public void setMultiplicador(Double multiplicador) {
        this.multiplicador = multiplicador;
    }

    public String getFechaCreacion() {
        return fechaCreacion;
    }

    public void setFechaCreacion(String fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public Integer getJuegoId() {
        return juegoId;
    }

    public void setJuegoId(Integer juegoId) {
        this.juegoId = juegoId;
    }

    @Override
    public String toString() {
        return "ConversionDTO [idConversion=" + idConversion + ", multiplicador=" + multiplicador 
               + ", fechaCreacion=" + fechaCreacion + ", juegoId=" + juegoId + "]";
    }
}