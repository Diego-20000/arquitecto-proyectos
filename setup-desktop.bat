@echo off
REM Crear acceso directo en el escritorio
setlocal enabledelayedexpansion

set "SCRIPT=%~dp0Arquitecto.bat"
set "DESKTOP=%userprofile%\Desktop"

REM Crear archivo VBS para crear el acceso directo
(
    echo Set oWS = WScript.CreateObject("WScript.Shell"^)
    echo sLinkFile = "%DESKTOP%\Arquitecto de Proyectos.lnk"
    echo Set oLink = oWS.CreateShortcut(sLinkFile^)
    echo oLink.TargetPath = "%SCRIPT%"
    echo oLink.WorkingDirectory = "%~dp0"
    echo oLink.Description = "Generador inteligente de estructuras de proyectos"
    echo oLink.IconLocation = "cmd.exe,0"
    echo oLink.Save
    echo WScript.Echo "Acceso directo creado en el escritorio"
) > "%temp%\CreateShortcut.vbs"

cscript.exe "%temp%\CreateShortcut.vbs"
del "%temp%\CreateShortcut.vbs"

echo.
echo [OK] Listo! Ahora puedes:
echo   1. Arrastra archivos .txt sobre "Arquitecto de Proyectos.bat"
echo   2. O usa desde PowerShell: node index.js archivo.txt
echo.
pause
