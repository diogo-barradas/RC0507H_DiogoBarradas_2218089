@echo off
cls
rem *** COLOCAR ESTE FICHEIRO NA PASTA DO TRABALHO
rem depois executar runhttp
set path=%path%;%USERPROFILE%\AppData\Roaming\npm
http-server
