package com.ProyectoCasino.Model;

import java.util.Date;
import java.util.Set;

public class HistoricoDTO {

    private Integer idHistorico;
    private Date fechaLogHistorico;
    private String usuarioDni; // ID del usuario
    private Integer juegoId;   // ID del juego
    private Set<Integer> cavemanRunIds; // ID de CavemanRunEntity
    private Set<Integer> cavernSlotIds; // ID de CavernSlotsEntity

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

    public String getUsuarioDni() {
        return usuarioDni;
    }

    public void setUsuarioDni(String usuarioDni) {
        this.usuarioDni = usuarioDni;
    }

    public Integer getJuegoId() {
        return juegoId;
    }

    public void setJuegoId(Integer juegoId) {
        this.juegoId = juegoId;
    }

    public Set<Integer> getCavemanRunIds() {
        return cavemanRunIds;
    }

    public void setCavemanRunIds(Set<Integer> cavemanRunIds) {
        this.cavemanRunIds = cavemanRunIds;
    }

    public Set<Integer> getCavernSlotIds() {
        return cavernSlotIds;
    }

    public void setCavernSlotIds(Set<Integer> cavernSlotIds) {
        this.cavernSlotIds = cavernSlotIds;
    }

    // toString()
    @Override
    public String toString() {
        return "HistoricoDTO [idHistorico=" + idHistorico + ", fechaLogHistorico=" + fechaLogHistorico + ", usuarioDni="
                + usuarioDni + ", juegoId=" + juegoId + ", cavemanRunIds=" + cavemanRunIds + ", cavernSlotIds=" + cavernSlotIds + "]";
    }
}