# 🚀 Configuración de GitHub Pages - Guía Paso a Paso

Esta guía te ayudará a subir tu página web a GitHub y configurarla para que sea accesible desde internet usando GitHub Pages.

## 📋 Prerrequisitos

- Cuenta de GitHub (gratuita)
- Git instalado en tu computadora
- Tu proyecto ya inicializado con Git (✅ ya hecho)

## 🔧 Paso 1: Crear Repositorio en GitHub

1. **Ve a GitHub.com** y haz login en tu cuenta
2. **Haz clic en el botón verde "New"** o en el ícono "+" en la esquina superior derecha
3. **Configura tu repositorio**:
   - **Repository name**: `mi-pagina-web` (o el nombre que prefieras)
   - **Description**: "Página web para pruebas de diseño y experimentación"
   - **Visibility**: Public (necesario para GitHub Pages gratuito)
   - **NO marques** "Add a README file" (ya tienes uno)
   - **NO marques** "Add .gitignore" (ya tienes uno)
   - **NO marques** "Choose a license" (opcional)

4. **Haz clic en "Create repository"**

## 🔗 Paso 2: Conectar tu Repositorio Local con GitHub

Ejecuta estos comandos en tu terminal (PowerShell):

```bash
# Añade el repositorio remoto (reemplaza TU_USUARIO con tu nombre de usuario de GitHub)
git remote add origin https://github.com/TU_USUARIO/mi-pagina-web.git

# Cambia el nombre de la rama principal a 'main' (estándar actual)
git branch -M main

# Sube tu código a GitHub
git push -u origin main
```

**Ejemplo real**:
```bash
git remote add origin https://github.com/juanperez/mi-pagina-web.git
git branch -M main
git push -u origin main
```

## 🌐 Paso 3: Activar GitHub Pages

1. **Ve a tu repositorio** en GitHub (debería abrirse automáticamente después del push)
2. **Haz clic en "Settings"** (pestaña en la parte superior del repositorio)
3. **Desplázate hacia abajo** en el menú lateral izquierdo hasta encontrar **"Pages"**
4. **En la sección "Source"**:
   - Selecciona **"Deploy from a branch"**
   - En "Branch", selecciona **"main"**
   - En "Folder", selecciona **"/ (root)"**
5. **Haz clic en "Save"**

## ⏳ Paso 4: Esperar el Despliegue

- GitHub tardará **2-10 minutos** en procesar tu página
- Verás un mensaje verde: **"Your site is published at https://TU_USUARIO.github.io/mi-pagina-web"**
- **¡Tu página ya está en internet!** 🎉

## 🔄 Paso 5: Actualizaciones Futuras

Cada vez que hagas cambios en tu página:

```bash
# Añade los archivos modificados
git add .

# Haz commit con un mensaje descriptivo
git commit -m "Descripción de los cambios"

# Sube los cambios a GitHub
git push origin main
```

GitHub Pages se actualizará automáticamente en unos minutos.

## 🎨 Personalización Adicional

### Cambiar el Dominio Personalizado (Opcional)

Si tienes un dominio propio:

1. Ve a **Settings > Pages**
2. En **"Custom domain"**, escribe tu dominio (ej: `midominio.com`)
3. Añade un archivo `CNAME` en tu repositorio con tu dominio
4. Configura los DNS de tu dominio para apuntar a GitHub

### Configurar un Tema Personalizado

GitHub Pages también soporta Jekyll. Si quieres usarlo:

1. Crea un archivo `_config.yml` en la raíz
2. Añade configuración básica de Jekyll
3. Usa el sistema de temas de GitHub

## 🐛 Solución de Problemas

### Error: "Repository not found"
- Verifica que el nombre de usuario en la URL sea correcto
- Asegúrate de que el repositorio sea público

### Error: "Authentication failed"
- GitHub requiere autenticación. Puedes usar:
  - **Personal Access Token** (recomendado)
  - **SSH keys**
  - **GitHub CLI**

### La página no se actualiza
- Espera 5-10 minutos
- Verifica que el archivo `index.html` esté en la raíz del repositorio
- Revisa que no haya errores en la consola del navegador

### Problemas de CSS/JS
- Verifica que las rutas de los archivos sean correctas
- Asegúrate de que todos los archivos estén subidos
- Usa rutas relativas (no absolutas)

## 📱 Verificar en Móvil

Tu página será accesible desde cualquier dispositivo:
- **Desktop**: `https://TU_USUARIO.github.io/mi-pagina-web`
- **Móvil**: La misma URL, se adaptará automáticamente
- **Tablet**: También se verá perfecta

## 🎯 Próximos Pasos

1. **Comparte tu página** con amigos y familiares
2. **Experimenta** con diferentes diseños
3. **Añade contenido** personalizado
4. **Aprende** nuevas tecnologías web
5. **Crea más proyectos** y páginas

## 📞 Ayuda Adicional

- **Documentación oficial**: [docs.github.com/pages](https://docs.github.com/pages)
- **Comunidad**: [GitHub Community Forum](https://github.community/)
- **Tutoriales**: [GitHub Learning Lab](https://lab.github.com/)

---

**¡Felicidades! Tu página web ya está en internet y lista para el mundo! 🌍✨**
