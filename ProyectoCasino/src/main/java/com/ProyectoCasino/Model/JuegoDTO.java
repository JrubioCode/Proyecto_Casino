package com.ProyectoCasino.Model;

import java.util.Set;

public class JuegoDTO{

    private Integer idJuego;
    private String nombreJuego;
    private Set<Integer> conversiones; // ID de ConversionEntity
    private Set<Integer> historicos;   // ID de HistoricoEntity

    // Getters y Setters
    public Integer getIdJuego() {
        return idJuego;
    }

    public void setIdJuego(Integer idJuego) {
        this.idJuego = idJuego;
    }

    public String getNombreJuego() {
        return nombreJuego;
    }

    public void setNombreJuego(String nombreJuego) {
        this.nombreJuego = nombreJuego;
    }

    public Set<Integer> getConversiones() {
        return conversiones;
    }

    public void setConversiones(Set<Integer> conversiones) {
        this.conversiones = conversiones;
    }

    public Set<Integer> getHistoricos() {
        return historicos;
    }

    public void setHistoricos(Set<Integer> historicos) {
        this.historicos = historicos;
    }

    // toString()
    @Override
    public String toString() {
        return "JuegoDTO [idJuego=" + idJuego + ", nombreJuego=" + nombreJuego + ", conversiones=" + conversiones
                + ", historicos=" + historicos + "]";
    }
}