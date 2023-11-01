# Manual de usuario

## Introducción

Este proyecto consiste en un sistema de registro de notas en línea que permite a los profesores o administradores académicos ingresar y gestionar las calificaciones de los estudiantes de manera eficiente. El sistema también incluye una aplicación web que muestra estadísticas y reportes de las notas de los estudiantes.


### Instalación

Para instalar el proyecto, siga estos pasos:

1. Cree un proyecto de Google Cloud Platform.
2. Habilite los servicios de Cloud SQL, Cloud Run y Kubernetes Engine.
3. Cree una base de datos MySQL en Cloud SQL.
4. Instale Kubernetes Engine CLI.
5. Clone el repositorio de GitHub en su máquina local.
6. Actualice las direcciones ip de SQL, Cloud Run.
6. Ejecute los siguientes comandos para crear el clúster de Kubernetes:

kubectl create namespace so1-p2-201901758
kubectl apply -f deployRPC.yaml -n so1-p2-201901758
kubectl apply -f deployNode.yaml -n so1-p2-201901758
kubectl apply -f deployPython.yaml -n so1-p2-201901758
kubectl apply -f deployRedis.yaml -n so1-p2-201901758
kubectl apply -f ingress.yaml -so1-p2-201901758

## Inicio de sesión

Para iniciar sesión en la aplicación web, abra un navegador web y vaya a la siguiente dirección URL:

http://<dominio>/

Ingrese su nombre de usuario y contraseña de Google.

Vista de la aplicación web

La aplicación web consta de las siguientes secciones:

    Estadísticas: Esta sección muestra gráficos y tablas que resumen los datos de las notas de los estudiantes.
    Reportes: Esta sección muestra informes detallados sobre las notas de los estudiantes.

## Gráficos y tablas

Los gráficos y tablas de la sección de estadísticas muestran la siguiente información:

    Cantidad de registros: La cantidad total de registros de notas en la base de datos.
    Promedio de notas: El promedio de notas de todos los estudiantes.
    Desviación estándar: La desviación estándar de las notas de todos los estudiantes.
    Notas aprobadas: La cantidad de notas aprobadas.
    Notas reprobados: La cantidad de notas reprobados.

## Informes

Los informes de la sección de reportes muestran la siguiente información:

    Notas por curso: La distribución de notas por curso.
    Notas por semestre: La distribución de notas por semestre.
    Alumnos con mejor promedio: Una lista de los alumnos con el mejor promedio.

## Consideraciones adicionales

    Para mejorar la precisión de los datos, se recomienda ingresar notas de un período de tiempo prolongado.
    Para mejorar la funcionalidad de la aplicación web, se puede agregar la capacidad de crear y editar notas.
