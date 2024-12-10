package com.ProyectoCasino.Entity;

import jakarta.persistence.*;
import java.io.Serializable;
import java.util.Set;

@Entity
@Table(name = "JUEGO")
public class JuegoEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_JUEGO", nullable = false)
    private Integer idJuego;

    @Column(name = "NOMBRE_JUEGO", nullable = false, length = 100)
    private String nombreJuego;

    @OneToMany(mappedBy = "juego")
    private Set<ConversionEntity> conversiones;

    @OneToMany(mappedBy = "juego")
    private Set<HistoricoEntity> historicos;

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

    public Set<ConversionEntity> getConversiones() {
        return conversiones;
    }

    public void setConversiones(Set<ConversionEntity> conversiones) {
        this.conversiones = conversiones;
    }

    public Set<HistoricoEntity> getHistoricos() {
        return historicos;
    }

    public void setHistoricos(Set<HistoricoEntity> historicos) {
        this.historicos = historicos;
    }

    // toString()
    @Override
    public String toString() {
        return "JuegoEntity [idJuego=" + idJuego + ", nombreJuego=" + nombreJuego + ", conversiones=" + conversiones
                + ", historicos=" + historicos + "]";
    }   
}