@echo off
chcp 65001 >nul
echo ============================================================
echo   EDCRIA STUDIO - PUBLICAR NO GITHUB
echo ============================================================
echo.

cd /d "%~dp0"

echo [1/3] Verificando status do repositorio...
git status
echo.

set /p REPO_URL="Cole a URL do seu repositorio no GitHub (ex: https://github.com/SEU_USUARIO/edcria-studio-lp.git): "

if "%REPO_URL%"=="" (
    echo.
    echo [ERRO] Nenhuma URL informada. Tente novamente executando o arquivo.
    pause
    exit /b
)

echo.
echo [2/3] Configurando o repositorio remoto...
git remote remove origin >nul 2>&1
git remote add origin %REPO_URL%
git branch -M main

echo.
echo [3/3] Enviando arquivos para o GitHub...
git push -u origin main

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ============================================================
    echo [ATENÇÃO] Ocorreu um erro no envio.
    echo Se o repositorio ja tiver arquivos (README criado no site),
    echo vamos sincronizar agora com: git push -f -u origin main
    echo ============================================================
    set /p FORCAR="Deseja forçar o envio para substituir? (S/N): "
    if /i "%FORCAR%"=="S" (
        git push -f -u origin main
    )
)

echo.
echo ============================================================
echo   PROCESSO FINALIZADO!
echo   Agora acesse https://vercel.com e importe seu projeto.
echo ============================================================
pause
