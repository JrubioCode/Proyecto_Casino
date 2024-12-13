package com.ProyectoCasino.Entity;

import jakarta.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "USUARIO")
public class UsuarioEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "DNI", unique = true, nullable = false, length = 9)
    private String dni;

    @Column(name = "NOMBRE", nullable = false, length = 100)
    private String nombre;

    @Column(name = "APELLIDO1", nullable = false, length = 100)
    private String apellido1;

    @Column(name = "APELLIDO2", length = 100)
    private String apellido2;

    @Column(name = "FECHA_NACIMIENTO", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date fechaNacimiento;

    @Column(name = "USER_NAME", unique = true, nullable = false, length = 100)
    private String userName;

    @Column(name = "EMAIL", unique = true, nullable = false, length = 100)
    private String email;

    @Column(name = "USER_PASSWORD", nullable = false, length = 255)
    private String userPassword;

    @Column(name = "NUMERO_TELEFONO", nullable = false, length = 15)
    private String numeroTelefono;

    @Column(name = "DINERO_USUARIO")
    private Double dineroUsuario;

    @Column(name = "ES_VIP")
    private Boolean esVip;

    @Column(name = "NUMERO_TARJETA", length = 16)
    private Integer numeroTarjeta;

    @Column(name = "TITULAR_TARJETA", length = 100)
    private String titularTarjeta;

    @Column(name = "FECHA_EXPIRACION")
    @Temporal(TemporalType.DATE)
    private Date fechaExpiracion;

    @Column(name = "CVC", length = 3)
    private Integer cvc;

    @OneToMany(mappedBy = "usuario")
    private Set<HistoricoEntity> historicos;

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

    public Date getFechaNacimiento() {
        return fechaNacimiento;
    }

    public void setFechaNacimiento(Date fechaNacimiento) {
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

    public Set<HistoricoEntity> getHistoricos() {
        return historicos;
    }

    public void setHistoricos(Set<HistoricoEntity> historicos) {
        this.historicos = historicos;
    }

    // toString()
    @Override
    public String toString() {
        return "UsuarioEntity{" +
                "dni='" + dni + '\'' +
                ", nombre='" + nombre + '\'' +
                ", apellido1='" + apellido1 + '\'' +
                ", apellido2='" + apellido2 + '\'' +
                ", fechaNacimiento=" + fechaNacimiento +
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