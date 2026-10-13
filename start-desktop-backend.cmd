@echo off
title VeoGenie Runtime Backend (Port 8788)
echo ===================================================
echo  Khoi dong VeoGenie Core Runtime Backend...
echo  Lang nghe tai: http://127.0.0.1:8788
echo ===================================================
cd /d "%~dp0packages\veogenie-core"
set NODE_ENV=production
set PORT=8788
set VEOGENIE_NATIVE_CAPABILITY_REQUIRED=0
node veogenie-runtime-backend.mjs
pause
