package com.ProyectoCasino.Model;

import java.util.Date;
import java.util.Set;

public class UsuarioDTO {

    private String dni;
    private String nombre;
    private String apellido1;
    private String apellido2;
    private String fechaNacimiento;
    private String userName;
    private String email;
    private String userPassword;
    private String numeroTelefono;
    private Double dineroUsuario;
    private Boolean esVip;
    private Integer numeroTarjeta;
    private String titularTarjeta;
    private Date fechaExpiracion;
    private Integer cvc;
    private Set<Integer> historicos; // ID de HistoricoEntity

    // Getters y Setters
    public String getDni() {
        return dni;
    }

    public void setDni(String dni) {
        this.dni = dni;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido1() {
        return apellido1;
    }

    public void setApellido1(String apellido1) {
        this.apellido1 = apellido1;
    }

    public String getApellido2() {
        return apellido2;
    }

    public void setApellido2(String apellido2) {
        this.apellido2 = apellido2;
    }

    public String getFechaNacimiento() {
        return fechaNacimiento;
    }

    public void setFechaNacimiento(String fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUserPassword() {
        return userPassword;
    }

    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }

    public String getNumeroTelefono() {
        return numeroTelefono;
    }

    public void setNumeroTelefono(String numeroTelefono) {
        this.numeroTelefono = numeroTelefono;
    }

    public Double getDineroUsuario() {
        return dineroUsuario;
    }

    public void setDineroUsuario(Double dineroUsuario) {
        this.dineroUsuario = dineroUsuario;
    }

    public Boolean getEsVip() {
        return esVip;
    }

    public void setEsVip(Boolean esVip) {
        this.esVip = esVip;
    }

    public Integer getNumeroTarjeta() {
        return numeroTarjeta;
    }

    public void setNumeroTarjeta(Integer numeroTarjeta) {
        this.numeroTarjeta = numeroTarjeta;
    }

    public String getTitularTarjeta() {
        return titularTarjeta;
    }

    public void setTitularTarjeta(String titularTarjeta) {
        this.titularTarjeta = titularTarjeta;
    }

    public Date getFechaExpiracion() {
        return fechaExpiracion;
    }

    public void setFechaExpiracion(Date fechaExpiracion) {
        this.fechaExpiracion = fechaExpiracion;
    }

    public Integer getCvc() {
        return cvc;
    }

    public void setCvc(Integer cvc) {
        this.cvc = cvc;
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
        return "UsuarioDTO{" +
                "dni='" + dni + '\'' +
                ", nombre='" + nombre + '\'' +
                ", apellido1='" + apellido1 + '\'' +
                ", apellido2='" + apellido2 + '\'' +
                ", fechaNacimiento='" + fechaNacimiento + '\'' +
                ", userName='" + userName + '\'' +
                ", email='" + email + '\'' +
                ", userPassword='" + userPassword + '\'' +
                ", numeroTelefono='" + numeroTelefono + '\'' +
                ", dineroUsuario=" + dineroUsuario +
                ", esVip=" + esVip +
                ", numeroTarjeta=" + numeroTarjeta +
                ", titularTarjeta='" + titularTarjeta + '\'' +
                ", fechaExpiracion=" + fechaExpiracion +
                ", cvc=" + cvc +
                ", historicos=" + historicos +
                '}';
    }
}