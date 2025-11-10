# Documentación de Supabase - TrueCulture

Este documento describe todas las funciones de base de datos, triggers y edge functions implementadas en el proyecto TrueCulture.

## 📋 Tabla de Contenidos

1. [Funciones de Base de Datos](#funciones-de-base-de-datos)
2. [Triggers](#triggers)
3. [Edge Functions](#edge-functions)
4. [Migraciones](#migraciones)

---

## 🔧 Funciones de Base de Datos

### 1. `award_points`

**Descripción:** Otorga puntos a un perfil de usuario y gestiona automáticamente los cambios de nivel y cupones de nivel.

**Parámetros:**
- `p_profile_id` (bigint): ID del perfil al que se le otorgarán los puntos
- `p_points` (integer): Cantidad de puntos a otorgar
- `p_source` (text): Origen de los puntos (ej: 'purchase', 'review', 'share', 'referral')
- `p_description` (text): Descripción de la transacción
- `p_related_id` (bigint, opcional): ID relacionado con la transacción
- `p_related_type` (text, opcional): Tipo de relación (ej: 'purchase', 'review', 'event', 'product')

**Retorno:** `void`

**Funcionalidad:**
1. Inserta una nueva transacción de puntos en `point_transactions`
2. Actualiza los puntos totales del perfil
3. Calcula el nuevo nivel del usuario basado en los puntos acumulados
4. Si el nivel cambió, actualiza el nivel del perfil y otorga automáticamente el cupón correspondiente al nuevo nivel

**Ejemplo de uso:**
```sql
SELECT award_points(
  p_profile_id := 1,
  p_points := 50,
  p_source := 'purchase',
  p_description := 'Compra de productos',
  p_related_id := 123,
  p_related_type := 'purchase'
);
```

---

### 2. `calculate_user_level`

**Descripción:** Calcula el nivel de un usuario basado en sus puntos totales.

**Parámetros:**
- `user_points` (integer): Puntos totales del usuario

**Retorno:** `integer` - Número del nivel calculado (0 si no encuentra ningún nivel)

**Funcionalidad:**
- Busca en la tabla `levels` el nivel apropiado según los puntos del usuario
- Retorna el `level_number` más alto que el usuario califica
- Si no encuentra ningún nivel, retorna 0

**Ejemplo de uso:**
```sql
SELECT calculate_user_level(150);
-- Retorna el número de nivel correspondiente a 150 puntos
```

---

### 3. `generate_referral_code`

**Descripción:** Genera un código de referido único de 8 caracteres en mayúsculas.

**Parámetros:** Ninguno

**Retorno:** `text` - Código de referido único

**Funcionalidad:**
1. Genera un código aleatorio de 8 caracteres usando MD5 y timestamp
2. Verifica que el código no exista en la tabla `profiles`
3. Si existe, genera uno nuevo hasta encontrar uno único
4. Retorna el código en mayúsculas

**Ejemplo de uso:**
```sql
SELECT generate_referral_code();
-- Retorna algo como: 'A3F9B2C1'
```

---

### 4. `grant_level_coupon`

**Descripción:** Otorga automáticamente un cupón al usuario cuando alcanza un nuevo nivel.

**Parámetros:**
- `p_profile_id` (bigint): ID del perfil al que se le otorgará el cupón
- `p_level_number` (integer): Número del nivel alcanzado

**Retorno:** `void`

**Funcionalidad:**
1. Busca un cupón activo asociado al nivel especificado
2. Verifica que el cupón esté activo y no haya expirado
3. Verifica que el usuario no tenga ya ese cupón
4. Si cumple las condiciones, inserta el cupón en `user_coupons`

**Ejemplo de uso:**
```sql
SELECT grant_level_coupon(
  p_profile_id := 1,
  p_level_number := 2
);
```

---

### 5. `initialize_event_seats`

**Descripción:** Inicializa los asientos para un evento específico, creando registros en la tabla `event_seats`.

**Parámetros:**
- `p_event_id` (integer): ID del evento
- `p_total_seats` (integer): Número total de asientos a crear

**Retorno:** `void`

**Funcionalidad:**
1. Calcula el número de filas necesarias (10 columnas por fila)
2. Crea asientos con formato: A1, A2, A3... B1, B2, B3... etc.
3. Inserta los asientos en la tabla `event_seats` con `is_reserved = false`
4. Usa `ON CONFLICT DO NOTHING` para evitar duplicados

**Ejemplo de uso:**
```sql
SELECT initialize_event_seats(
  p_event_id := 5,
  p_total_seats := 100
);
-- Crea 100 asientos (A1-A10, B1-B10, ..., J1-J10)
```

---

### 6. `process_referral`

**Descripción:** Procesa una referencia entre usuarios, otorgando puntos al referidor.

**Parámetros:**
- `p_referrer_profile_id` (bigint): ID del perfil que hizo la invitación
- `p_referred_profile_id` (bigint): ID del perfil que fue referido
- `p_referral_code` (text): Código de referido utilizado

**Retorno:** `void`

**Funcionalidad:**
1. Inserta la relación de referido en la tabla `referrals`
2. Actualiza el contador `total_referrals` del perfil que invitó
3. Otorga 20 puntos al perfil que hizo la invitación
4. Usa `ON CONFLICT DO NOTHING` para evitar referidos duplicados

**Ejemplo de uso:**
```sql
SELECT process_referral(
  p_referrer_profile_id := 1,
  p_referred_profile_id := 2,
  p_referral_code := 'ABC12345'
);
```

---

### 7. `auto_generate_referral_code`

**Descripción:** Función trigger que genera automáticamente un código de referido cuando se crea o actualiza un perfil sin código.

**Tipo:** Trigger Function

**Retorno:** `trigger`

**Funcionalidad:**
- Se ejecuta antes de INSERT o UPDATE en la tabla `profiles`
- Si `referral_code` es NULL o vacío, genera automáticamente uno nuevo usando `generate_referral_code()`
- Retorna el registro modificado

**Uso:** Esta función se ejecuta automáticamente mediante el trigger `trigger_auto_referral_code`

---

### 8. `grant_welcome_coupon`

**Descripción:** Función trigger que otorga un cupón de bienvenida (nivel 0) cuando se crea un nuevo perfil.

**Tipo:** Trigger Function

**Retorno:** `trigger`

**Funcionalidad:**
- Se ejecuta después de INSERT o UPDATE en la tabla `profiles`
- Si el perfil tiene puntos >= 0 y nivel = 0, otorga el cupón de nivel 0
- Usa la función `grant_level_coupon` para otorgar el cupón

**Nota:** Actualmente esta función no está asociada a ningún trigger activo. La lógica de otorgar el cupón de bienvenida se maneja directamente en la función `handle_new_user()` cuando se crea un nuevo usuario.

---

### 9. `handle_new_user`

**Descripción:** Función trigger que crea automáticamente un perfil cuando se registra un nuevo usuario en Supabase Auth.

**Tipo:** Trigger Function

**Retorno:** `trigger`

**Funcionalidad:**
1. Se ejecuta cuando se crea un nuevo usuario en `auth.users`
2. Crea un registro en la tabla `profiles` con los datos del usuario
3. Extrae información de `raw_user_meta_data` (nombre, nickname, organización, avatar_url)
4. Otorga automáticamente el cupón de bienvenida (nivel 0)

**Uso:** Esta función se ejecuta mediante un trigger en la tabla `auth.users`

---

## 🔔 Triggers

### 1. `trigger_auto_referral_code`

**Tabla:** `profiles`

**Evento:** BEFORE INSERT OR UPDATE

**Condición:** Se ejecuta cuando `referral_code` es NULL o vacío

**Función:** `auto_generate_referral_code()`

**Descripción:**
- Genera automáticamente un código de referido único cuando se crea o actualiza un perfil sin código
- Asegura que todos los perfiles tengan un código de referido válido

**Ejemplo:**
```sql
-- Al insertar un perfil sin código:
INSERT INTO profiles (user_id, email, name) 
VALUES ('uuid-123', 'user@example.com', 'Juan Pérez');
-- Automáticamente se genera un código de referido único
```

---

### 2. `on_auth_user_created`

**Tabla:** `auth.users`

**Evento:** AFTER INSERT

**Condición:** Se ejecuta después de crear un nuevo usuario en Supabase Auth

**Función:** `handle_new_user()`

**Descripción:**
- Se ejecuta automáticamente cuando un nuevo usuario se registra en Supabase Auth
- Crea un perfil correspondiente en la tabla `profiles`
- Extrae información del usuario de `raw_user_meta_data` (nombre, nickname, organización, avatar_url)
- Otorga automáticamente el cupón de bienvenida (nivel 0)
- Vincula el perfil con el `user_id` de Auth

**Flujo:**
1. Usuario se registra en Supabase Auth
2. Se crea el registro en `auth.users`
3. El trigger `on_auth_user_created` se ejecuta automáticamente
4. Se crea el perfil en `profiles` con los datos del usuario
5. Se otorga el cupón de bienvenida

**Nota:** Este trigger es esencial para el funcionamiento del sistema, ya que asegura que cada usuario de Auth tenga un perfil correspondiente en la aplicación.

---

## ⚡ Edge Functions

### 1. `process-purchase`

**Descripción:** Procesa una compra completa, incluyendo creación de orden, aplicación de cupones, reserva de asientos y otorgamiento de puntos.

**Endpoint:** `https://[project-ref].supabase.co/functions/v1/process-purchase`

**Método:** POST

**Autenticación:** Requiere JWT (verificar con `verify_jwt: true`)

**Parámetros de entrada (JSON):**
```json
{
  "user_id": "uuid-del-usuario",
  "items": [
    {
      "type": "event" | "product",
      "id": 123,
      "name": "Nombre del item",
      "price": 50000,
      "quantity": 2,
      "seats": ["A1", "A2"] // Solo para eventos con silletería
    }
  ],
  "coupon_code": "CUPON123", // Opcional
  "payment_status": "paid", // Opcional, default: "paid"
  "shipping_address": "Dirección" // Opcional
}
```

**Funcionalidad:**
1. Valida los datos de entrada y obtiene el perfil del usuario
2. Calcula subtotales y determina el tipo de orden (product, event, mixed)
3. Valida y aplica el cupón de descuento si se proporciona
4. Crea la orden en la tabla `orders`
5. Crea los items de la orden en `order_items` (incluyendo asientos si aplica)
6. Reserva los asientos seleccionados en `event_seats` (solo para eventos)
7. Actualiza los asientos disponibles del evento
8. Marca el cupón como usado si se aplicó
9. Calcula y otorga puntos:
   - 20 puntos por cada unidad comprada
   - Bonus de 50 puntos si se compran más de 2 unidades
10. Retorna la orden completa con sus items

**Respuesta exitosa:**
```json
{
  "success": true,
  "order": {
    "id": 1,
    "order_number": "ORD-1234567890-ABC123",
    "total": 95000,
    "discount": 5000,
    "order_items": [...]
  },
  "points_awarded": 90
}
```

**Errores:**
- `400`: Datos incompletos o inválidos
- `404`: Perfil de usuario no encontrado
- `500`: Error al procesar la compra

---

### 2. `process-review`

**Descripción:** Procesa una reseña de un producto o evento y otorga puntos al usuario.

**Endpoint:** `https://[project-ref].supabase.co/functions/v1/process-review`

**Método:** POST

**Autenticación:** Requiere JWT (verificar con `verify_jwt: true`)

**Parámetros de entrada (JSON):**
```json
{
  "user_id": "uuid-del-usuario",
  "related_id": 123,
  "related_type": "event" | "product",
  "comment": "Excelente evento, muy recomendado",
  "rating": 5
}
```

**Funcionalidad:**
1. Valida los datos de entrada
2. Obtiene el perfil del usuario
3. Inserta o actualiza la reseña en la tabla `comments` (usando UPSERT)
4. Otorga 10 puntos al usuario por publicar la reseña
5. Retorna la reseña creada y los puntos otorgados

**Respuesta exitosa:**
```json
{
  "success": true,
  "comment": {
    "id": 1,
    "related_id": 123,
    "related_type": "event",
    "comment": "Excelente evento",
    "rating": 5,
    "author": "uuid-del-usuario"
  },
  "points_awarded": 10
}
```

**Errores:**
- `400`: Datos incompletos
- `404`: Perfil de usuario no encontrado
- `500`: Error al procesar la reseña

---

### 3. `process-share`

**Descripción:** Procesa una acción de compartir un producto o evento en redes sociales y otorga puntos.

**Endpoint:** `https://[project-ref].supabase.co/functions/v1/process-share`

**Método:** POST

**Autenticación:** Requiere JWT (verificar con `verify_jwt: true`)

**Parámetros de entrada (JSON):**
```json
{
  "user_id": "uuid-del-usuario",
  "related_id": 123,
  "related_type": "event" | "product",
  "platform": "facebook" // Opcional
}
```

**Funcionalidad:**
1. Valida los datos de entrada
2. Obtiene el perfil del usuario
3. Otorga 5 puntos al usuario por compartir
4. Registra la transacción de puntos con el tipo 'share'

**Respuesta exitosa:**
```json
{
  "success": true,
  "points_awarded": 5
}
```

**Errores:**
- `400`: Datos incompletos
- `404`: Perfil de usuario no encontrado
- `500`: Error al procesar el compartir

---

### 4. `process-referral`

**Descripción:** Procesa un código de referido cuando un nuevo usuario se registra usando el código de otro usuario.

**Endpoint:** `https://[project-ref].supabase.co/functions/v1/process-referral`

**Método:** POST

**Autenticación:** Requiere JWT (verificar con `verify_jwt: true`)

**Parámetros de entrada (JSON):**
```json
{
  "referral_code": "ABC12345",
  "new_user_id": "uuid-del-nuevo-usuario"
}
```

**Funcionalidad:**
1. Valida los datos de entrada
2. Busca el perfil del referidor usando el código de referido
3. Obtiene el perfil del nuevo usuario
4. Verifica que no se esté autoreferenciando
5. Verifica que el nuevo usuario no haya sido referido antes
6. Procesa el referido usando la función `process_referral`
7. Actualiza el campo `referred_by` en el perfil del nuevo usuario
8. Retorna información del referidor

**Respuesta exitosa:**
```json
{
  "success": true,
  "referrer_id": 1,
  "message": "Referido procesado exitosamente"
}
```

**Errores:**
- `400`: Código inválido, autoreferencia, o referido duplicado
- `404`: Código de referido o perfil no encontrado
- `500`: Error al procesar el referido

---

## 📦 Migraciones

El proyecto incluye las siguientes migraciones principales:

1. **create_levels_table**: Crea la tabla de niveles de usuario
2. **create_coupons_table**: Crea la tabla de cupones
3. **create_user_points_and_referrals**: Crea las tablas de puntos y referidos
4. **create_user_coupons_table**: Crea la tabla de cupones de usuario
5. **create_orders_and_order_items**: Crea las tablas de órdenes e items
6. **create_triggers_and_functions**: Crea las funciones y triggers iniciales
7. **create_trigger_for_new_users**: Crea el trigger para nuevos usuarios
8. **enable_rls_and_policies**: Habilita Row Level Security y políticas
9. **fix_security_with_cascade**: Corrige políticas de seguridad con CASCADE
10. **rename_users_to_profiles**: Renombra la tabla users a profiles
11. **update_functions_to_use_profiles**: Actualiza funciones para usar profiles
12. **update_rls_policies_for_profiles**: Actualiza políticas RLS para profiles
13. **create_profile_on_signup**: Crea perfil automáticamente al registrarse
14. **fix_welcome_coupon_logic**: Corrige la lógica del cupón de bienvenida
15. **fix_grant_level_coupon_to_use_level_number**: Corrige la función de cupones de nivel
16. **create_event_seats_table**: Crea la tabla de asientos de eventos
17. **add_seats_to_order_items**: Agrega campo de asientos a order_items
18. **add_has_seating_to_events**: Agrega campo has_seating a eventos

---

## 🔐 Seguridad

### Row Level Security (RLS)

Todas las tablas principales tienen RLS habilitado con políticas específicas:

- **profiles**: Los usuarios solo pueden ver y editar su propio perfil
- **point_transactions**: Los usuarios solo pueden ver sus propias transacciones
- **user_coupons**: Los usuarios solo pueden ver sus propios cupones
- **referrals**: Los usuarios solo pueden ver sus propias referencias
- **event_seats**: Los usuarios pueden ver todos los asientos, pero solo reservar los disponibles

### Funciones SECURITY DEFINER

Todas las funciones de base de datos usan `SECURITY DEFINER` para ejecutarse con privilegios elevados, permitiendo operaciones que requieren permisos especiales.

### Edge Functions con JWT

Todas las edge functions requieren autenticación JWT mediante `verify_jwt: true`, excepto para operaciones públicas específicas.

---

## 📊 Sistema de Puntos

### Puntos Otorgados por Acción

- **Compra de productos/eventos**: 20 puntos por unidad
- **Compra múltiple (>2 unidades)**: Bonus de 50 puntos adicionales
- **Reseña publicada**: 10 puntos
- **Compartir en redes sociales**: 5 puntos
- **Referir a un usuario**: 20 puntos al referidor

### Niveles de Usuario

Los niveles se calculan automáticamente basados en los puntos totales del usuario. Cada nivel tiene:
- Rango de puntos (min_points, max_points)
- Beneficios asociados
- Cupones automáticos al alcanzar el nivel

---

## 🎫 Sistema de Asientos

### Inicialización de Asientos

Cuando se crea un evento con silletería, se debe llamar a `initialize_event_seats` para crear los asientos. Los asientos se organizan en:
- Filas: A, B, C, D, etc.
- Columnas: 1, 2, 3, ..., 10
- Formato: A1, A2, A3, ..., B1, B2, etc.

### Reserva de Asientos

Los asientos se reservan automáticamente cuando se procesa una compra mediante la edge function `process-purchase`. Los asientos reservados se marcan con:
- `is_reserved = true`
- `reserved_by_profile_id`: ID del perfil que reservó
- `reserved_at`: Timestamp de la reserva

---

## 🛒 Sistema de Órdenes

### Tipos de Orden

- **product**: Solo productos
- **event**: Solo eventos
- **mixed**: Productos y eventos mezclados

### Items de Orden

Cada item de orden puede incluir:
- Información del producto/evento
- Cantidad
- Precio unitario y total
- Asientos (solo para eventos con silletería)

### Cupones

Los cupones pueden ser:
- **percent**: Descuento porcentual
- **fixed**: Descuento fijo

Los cupones pueden tener:
- Monto mínimo de compra
- Descuento máximo
- Fecha de expiración
- Asociación a un nivel específico

---

## 📝 Notas Adicionales

1. Todas las funciones de base de datos usan `SECURITY DEFINER` para operar con privilegios elevados.
2. Los triggers se ejecutan automáticamente en operaciones INSERT/UPDATE.
3. Las edge functions requieren autenticación JWT excepto cuando se especifica lo contrario.
4. El sistema de puntos se actualiza automáticamente mediante triggers y funciones.
5. Los cupones de nivel se otorgan automáticamente cuando un usuario alcanza un nuevo nivel.
6. Los asientos se reservan automáticamente durante el proceso de compra.

---

## 🔄 Flujo de una Compra Completa

1. Usuario agrega items al carrito (con o sin asientos)
2. Usuario aplica un cupón (opcional)
3. Usuario completa el pago
4. Se llama a `process-purchase` edge function
5. Se crea la orden en `orders`
6. Se crean los items en `order_items`
7. Se reservan los asientos (si aplica)
8. Se actualizan los asientos disponibles
9. Se marca el cupón como usado
10. Se otorgan puntos al usuario
11. Se verifica si el usuario subió de nivel
12. Se otorga cupón de nivel (si aplica)

---

## 📞 Soporte

Para más información sobre el uso de estas funciones, consulta la documentación de Supabase o contacta al equipo de desarrollo.

