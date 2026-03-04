@echo off
title Arquitecto de Proyectos
color 0A
cls

echo.
echo ===============================================
echo    ARQUITECTO DE PROYECTOS v1.0.0
echo ===============================================
echo.
echo Uso: Arrastra tu archivo .txt aqui
echo Ejemplo: archivo-proyecto.txt
echo.

if "%1"=="" (
    echo [ERROR] No se proporciono archivo
    echo.
    echo Uso correcto:
    echo   - Arrastra un archivo .txt sobre este .bat
    echo   - O abre PowerShell y ejecuta:
    echo     node index.js archivo-proyecto.txt
    echo.
    pause
    exit /b 1
)

if not exist "%1" (
    echo [ERROR] El archivo "%1" no existe
    echo.
    pause
    exit /b 1
)

echo [INFO] Procesando: %1
echo.

node index.js "%1"

if %errorlevel% equ 0 (
    echo.
    echo [OK] Proyecto generado exitosamente!
    echo.
) else (
    echo.
    echo [ERROR] Hubo un problema al generar el proyecto
    echo.
)

pause
