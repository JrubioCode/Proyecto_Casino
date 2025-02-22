package com.ProyectoCasino.Entity;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Entity
@Table(name = "SAVAGEHANDS")
public class SavageHandEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_LOG_SAVAGEHANDS")
    private Integer idLogSavageHands;
    
    @Column(name = "FECHA_LOG_SAVAGEHANDS", nullable = false)
    @Temporal(TemporalType.DATE)
    private Timestamp fechaLogSavageHands;
    
    @Column(name = "APUESTA", nullable = false)
    private Integer apuesta;
    
    @Column(name = "RESULTADO", nullable = false, precision = 10, scale = 2)
    private BigDecimal resultado;
    
    @ManyToOne
    @JoinColumn(name = "ID_HISTORICO", nullable = false)
    private HistoricoEntity historico;

    @ManyToOne
    @JoinColumn(name = "DNI", nullable = false)
    private UsuarioEntity usuario;

    @ManyToOne
    @JoinColumn(name = "ID_JUEGO", nullable = false)
    private JuegoEntity juego;

    public SavageHandEntity() {

    }

    public SavageHandEntity(Integer idLogSavageHands, Timestamp fechaLogSavageHands, Integer apuesta, BigDecimal resultado, HistoricoEntity historico, UsuarioEntity usuario, JuegoEntity juego) {
        this.idLogSavageHands = idLogSavageHands;
        this.fechaLogSavageHands = fechaLogSavageHands;
        this.apuesta = apuesta;
        this.resultado = resultado;
        this.historico = historico;
        this.usuario = usuario;
        this.juego = juego;
    }

    public Integer getIdLogSavageHands() {
        return idLogSavageHands;
    }

    public void setIdLogSavageHands(Integer idLogSavageHands) {
        this.idLogSavageHands = idLogSavageHands;
    }

    public Timestamp getFechaLogSavageHands() {
        return fechaLogSavageHands;
    }

    public void setFechaLogSavageHands(Timestamp fechaLogSavageHands) {
        this.fechaLogSavageHands = fechaLogSavageHands;
    }

    public Integer getApuesta() {
        return apuesta;
    }

    public void setApuesta(Integer apuesta) {
        this.apuesta = apuesta;
    }

    public BigDecimal getResultado() {
        return resultado;
    }

    public void setResultado(BigDecimal resultado) {
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

    @Override
    public String toString() {
        return "SavageHandEntity [idLogSavageHands=" + idLogSavageHands + ", fechaLogSavageHands=" + fechaLogSavageHands
                + ", apuesta=" + apuesta + ", resultado=" + resultado + ", historico=" + historico + ", usuario="
                + usuario + ", juego=" + juego + "]";
    }
    
}