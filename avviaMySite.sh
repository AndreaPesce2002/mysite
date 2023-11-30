#!/bin/bash

cd ~/Desktop/mysite

git fetch
git pull origin main


# Esegui il server Django in un nuovo terminale
gnome-terminal -- /bin/sh -c 'python backend/manage.py runserver; exec bash'

# Aspetta un attimo per permettere al primo terminale di inizializzare
sleep 2

# Naviga nella cartella del frontend e avvia il server npm in un altro nuovo terminale
gnome-terminal -- /bin/sh -c 'cd frontend; npm run dev; exec bash'