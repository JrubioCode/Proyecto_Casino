package com.ProyectoCasino.Entity;

import jakarta.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "HISTORICO")
public class HistoricoEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_HISTORICO", nullable = false)
    private Integer idHistorico;

    @Column(name = "FECHA_LOG_HISTORICO", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date fechaLogHistorico;

    @ManyToOne
    @JoinColumn(name = "DNI", nullable = false)
    private UsuarioEntity usuario;

    @ManyToOne
    @JoinColumn(name = "ID_JUEGO", nullable = false)
    private JuegoEntity juego;

    @OneToMany(mappedBy = "historico")
    private Set<CavemanRunEntity> cavemanRuns;

    @OneToMany(mappedBy = "historico")
    private Set<CavernSlotsEntity> cavernSlots;

    // Getters y Setters 
    public Integer getIdHistorico() {
        return idHistorico;
    }

    public void setIdHistorico(Integer idHistorico) {
        this.idHistorico = idHistorico;
    }

    public Date getFechaLogHistorico() {
        return fechaLogHistorico;
    }

    public void setFechaLogHistorico(Date fechaLogHistorico) {
        this.fechaLogHistorico = fechaLogHistorico;
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

    public Set<CavemanRunEntity> getCavemanRuns() {
        return cavemanRuns;
    }

    public void setCavemanRuns(Set<CavemanRunEntity> cavemanRuns) {
        this.cavemanRuns = cavemanRuns;
    }

    public Set<CavernSlotsEntity> getCavernSlots() {
        return cavernSlots;
    }

    public void setCavernSlots(Set<CavernSlotsEntity> cavernSlots) {
        this.cavernSlots = cavernSlots;
    }

    // toString()
    @Override
    public String toString() {
        return "HistoricoEntity [idHistorico=" + idHistorico + ", fechaLogHistorico=" + fechaLogHistorico + ", usuario="
                + usuario + ", juego=" + juego + ", cavemanRuns=" + cavemanRuns + ", cavernSlots=" + cavernSlots + "]";
    }    
}