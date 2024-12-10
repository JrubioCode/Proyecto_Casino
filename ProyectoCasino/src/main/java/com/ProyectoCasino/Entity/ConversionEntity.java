package com.ProyectoCasino.Entity;

import jakarta.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "CONVERSION")
public class ConversionEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_CONVERSION", nullable = false)
    private Integer idConversion;

    @Column(name = "EUROS", nullable = false)
    private Double euros;

    @Column(name = "FICHAS", nullable = false)
    private Integer fichas;

    @ManyToOne
    @JoinColumn(name = "ID_JUEGO", nullable = false)
    private JuegoEntity juego;

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

    public JuegoEntity getJuego() {
        return juego;
    }

    public void setJuego(JuegoEntity juego) {
        this.juego = juego;
    }

    // toString()
    @Override
    public String toString() {
        return "ConversionEntity [idConversion=" + idConversion + ", euros=" + euros + ", fichas=" + fichas + ", juego="
                + juego + "]";
    }   
}