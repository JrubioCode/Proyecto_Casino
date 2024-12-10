package com.ProyectoCasino.Entity;

import jakarta.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "CAVERNSLOTS")
public class CavernSlotsEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_LOG_CAVERNSLOTS", nullable = false)
    private Integer idLogCavernSlots;

    @Column(name = "FECHA_LOG_CAVERNSLOTS", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date fechaLogCavernSlots;

    @Column(name = "APUESTA", nullable = false)
    private Integer apuesta;

    @Column(name = "COMBINACION", nullable = false, length = 100)
    private String combinacion;

    @Column(name = "RESULTADO", nullable = false)
    private Double resultado;

    @ManyToOne
    @JoinColumn(name = "ID_HISTORICO", nullable = false)
    private HistoricoEntity historico;

    @ManyToOne
    @JoinColumn(name = "DNI", nullable = false)
    private UsuarioEntity usuario;

    @ManyToOne
    @JoinColumn(name = "ID_JUEGO", nullable = false)
    private JuegoEntity juego;

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

    public HistoricoEntity getHistorico() {
        return historico;
    }

    public void setHistorico(HistoricoEntity historico) {
        this.historico = historico;
    }

    public UsuarioEntity getUsuario() {
        return usuario;
    }

    public void setUsuario(UsuarioEntity usuario) {
        this.usuario = usuario;
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
        return "CavernSlotsEntity [idLogCavernSlots=" + idLogCavernSlots + ", fechaLogCavernSlots="
                + fechaLogCavernSlots + ", apuesta=" + apuesta + ", combinacion=" + combinacion + ", resultado="
                + resultado + ", historico=" + historico + ", usuario=" + usuario + ", juego=" + juego + "]";
    } 
}