FOR /d /r . %%d IN (repos) DO @IF EXIST "%%d" rd /s /q "%%d"