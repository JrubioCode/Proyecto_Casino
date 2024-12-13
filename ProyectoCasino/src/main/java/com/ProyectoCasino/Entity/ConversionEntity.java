package com.ProyectoCasino.Entity;

import jakarta.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name = "CONVERSION")
public class ConversionEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_CONVERSION", nullable = false)
    private Integer idConversion;

    @Column(name = "MULTIPLICADOR", nullable = false)
    private Double multiplicador;

    @Column(name = "FECHA_CREACION", nullable = false, updatable = false)
    private LocalDateTime fechaCreacion;

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

    public Double getMultiplicador() {
        return multiplicador;
    }

    public void setMultiplicador(Double multiplicador) {
        this.multiplicador = multiplicador;
    }

    public LocalDateTime getFechaCreacion() {
        return fechaCreacion;
    }

    public void setFechaCreacion(LocalDateTime fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
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
        return "ConversionEntity [idConversion=" + idConversion + ", multiplicador=" + multiplicador 
               + ", fechaCreacion=" + fechaCreacion + ", juego=" + juego + "]";
    }
}