package com.ProyectoCasino.Entity;

import jakarta.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "CAVEMANRUN")
public class CavemanRunEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_LOG_CAVEMANRUN", nullable = false)
    private Integer idLogCavemanRun;

    @Column(name = "FECHA_LOG_CAVEMANRUN", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date fechaLogCavemanRun;

    @Column(name = "APUESTA", nullable = false)
    private Integer apuesta;

    @Column(name = "MULTIPLICADOR", nullable = false)
    private Double multiplicador;

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
        return "CavemanRunEntity [idLogCavemanRun=" + idLogCavemanRun + ", fechaLogCavemanRun=" + fechaLogCavemanRun
                + ", apuesta=" + apuesta + ", multiplicador=" + multiplicador + ", resultado=" + resultado
                + ", historico=" + historico + ", usuario=" + usuario + ", juego=" + juego + "]";
    }
}