package com.ProyectoCasino.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ProyectoCasino.Entity.UsuarioEntity;

@Repository
public interface UsuarioRepository extends JpaRepository<UsuarioEntity, String> {

    Optional<UsuarioEntity> findByUserName(String userName);
/*
    // Métodos básicos:
    // -----------------------

    // Encuentra un registro por su clave primaria (ID)
    Optional<UsuarioEntity> findById(String dni);

    // Verifica si un registro con una clave primaria (ID) existe
    boolean existsById(String dni);

    // Guarda (o actualiza si ya existe) una entidad
    UsuarioEntity save(UsuarioEntity usuario);

    // Elimina un registro por su clave primaria (ID)
    void deleteById(String dni);

    // Obtiene todos los registros de la tabla
    List<UsuarioEntity> findAll();

    // -----------------------
    // Métodos derivados personalizados:
    // -----------------------

    // Encuentra un usuario por su nombre de usuario
    Optional<UsuarioEntity> findByUserName(String userName);

    // Verifica si existe un usuario con un nombre específico
    boolean existsByUserName(String userName);

    // Encuentra usuarios cuyo nombre de usuario contenga una subcadena específica (útil para búsquedas parciales)
    List<UsuarioEntity> findByUserNameContaining(String subcadena);

    // Encuentra usuarios por correo electrónico (campo único, por ejemplo)
    Optional<UsuarioEntity> findByEmail(String email);

    // Encuentra usuarios cuyo número de teléfono coincida
    Optional<UsuarioEntity> findByNumeroTelefono(String numeroTelefono);

    // -----------------------
    // Métodos con múltiples condiciones:
    // -----------------------

    // Encuentra usuarios por nombre y apellido (coincidencia exacta)
    List<UsuarioEntity> findByNombreAndApellido1(String nombre, String apellido1);

    // Encuentra usuarios por fecha de nacimiento posterior a una fecha específica
    List<UsuarioEntity> findByFechaNacimientoAfter(java.util.Date fecha);

    // Encuentra usuarios cuyo nombre comience con una letra específica
    List<UsuarioEntity> findByNombreStartingWith(String letra);

    // Encuentra usuarios que tengan un email que termine en un dominio específico
    List<UsuarioEntity> findByEmailEndingWith(String dominio);

    // -----------------------
    // Métodos ordenados y limitados:
    // -----------------------

    // Encuentra todos los usuarios ordenados por nombre
    List<UsuarioEntity> findAllByOrderByNombreAsc();

    // Encuentra los 5 usuarios más recientes por fecha de registro (supongamos que hay un campo 'fechaRegistro')
    List<UsuarioEntity> findTop5ByOrderByFechaRegistroDesc();

    // -----------------------
    // Métodos de borrado personalizados:
    // -----------------------

    // Borra usuarios con un nombre específico
    void deleteByUserName(String userName);

    // Borra todos los usuarios con un correo electrónico de un dominio específico
    void deleteByEmailEndingWith(String dominio);
*/
}
