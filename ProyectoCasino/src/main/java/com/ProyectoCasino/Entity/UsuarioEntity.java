package com.ProyectoCasino.Entity;

import java.io.Serializable;

import jakarta.persistence.*;

@Entity
@Table(name = "USUARIO")
public class UsuarioEntity implements Serializable {

    private static final long serialVersionUID = 1L;

        @Id
		@Column(name="USER_NAME", unique = true, nullable = false)
		private String user_name;
		
		@Column(name="USER_PASSWORD")
		private String user_password;

        public String getUser_name() {
            return user_name;
        }

        public void setUser_name(String user_name) {
            this.user_name = user_name;
        }

        public String getUser_password() {
            return user_password;
        }

        public void setUser_password(String user_password) {
            this.user_password = user_password;
        }
    
}