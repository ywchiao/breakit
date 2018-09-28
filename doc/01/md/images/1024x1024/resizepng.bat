@echo off
rem retrieve the drive name
set DRIVE=%~d0
rem for all png map files(png format) under directory
for %%f IN (*.png) do call :convert "%%f"
for %%f IN (*.p2g) do call :restore "%%f"
goto :clean
:convert
rem set variables
rem   SRC_NAME: source file
set SRC_NAME=%~nx1
rem   DST_NAME: destination file
set DST_NAME=%~n1
set DST_NAME=%DST_NAME: =_%.p2g
rem call pngcrush.exe to crush the png file.
convert "%SRC_NAME%" -resize 1024x1024 "%DST_NAME%"
goto :end
:restore
rem set variables
rem   SRC_NAME: source file
set SRC_NAME=%~nx1
rem   DST_NAME: destination file
set DST_NAME=%~n1
set DST_NAME=%DST_NAME: =_%.png
rem move the crushed file backto the origin file.
move /Y "%SRC_NAME%" "%DST_NAME%"
goto :end
:clean
rem clear the variables
set SRC_NAME=
set DST_NAME=
:end
