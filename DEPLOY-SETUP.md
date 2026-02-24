# Konfiguracja Deploy - Twoje Dane

**Serwer:** `147.135.211.101`  
**Użytkownik:** `ubuntu`  
**Ścieżka:** `/opt/rafcio`

---

## KROK 1: Wygeneruj klucz SSH (na swoim komputerze)

```bash
# Windows (PowerShell lub Git Bash)
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/github_actions_deploy

# Linux/Mac
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/github_actions_deploy
```

**NIE podawaj hasła** (kliknij Enter dwa razy przy pytaniu o passphrase)

Powstaną dwa pliki:
- `~/.ssh/github_actions_deploy` - KLUCZ PRYWATNY (tajny!)
- `~/.ssh/github_actions_deploy.pub` - KLUCZ PUBLICZNY

---

## KROK 2: Dodaj klucz publiczny na serwer VPS

```bash
# Skopiuj klucz na serwer
ssh-copy-id -i ~/.ssh/github_actions_deploy.pub ubuntu@147.135.211.101

# Jeśli nie masz ssh-copy-id (Windows bez Git Bash), zrób to ręcznie:
# 1. Wyświetl zawartość klucza publicznego:
cat ~/.ssh/github_actions_deploy.pub

# 2. Zaloguj się na serwer i dodaj zawartość do authorized_keys:
ssh ubuntu@147.135.211.101
mkdir -p ~/.ssh
chmod 700 ~/.ssh
echo "TU_WKLEJ_ZAWARTOŚĆ_KLUCZA_PUB" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

---

## KROK 3: Przygotuj serwer VPS

Zaloguj się na serwer i wykonaj:

```bash
ssh ubuntu@147.135.211.101

# Stwórz katalog dla projektu
sudo mkdir -p /opt/rafcio
sudo chown ubuntu:ubuntu /opt/rafcio

# Sprawdź czy masz Node.js 20+
node --version  # Powinno być v20.x.x

# Jeśli nie masz Node.js 20 lub masz starszą wersję:
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Zainstaluj PM2
sudo npm install -g pm2

# Skonfiguruj PM2 do autostartu
pm2 startup systemd
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u ubuntu --hp /home/ubuntu
```

---

## KROK 4: Dodaj Secrets w GitHub

Przejdź do: `https://github.com/uzzysan/rafcio/settings/secrets/actions`

Kliknij **"New repository secret"** i dodaj kolejno:

### Secret 1: SSH_HOST
```
Name: SSH_HOST
Value: 147.135.211.101
```

### Secret 2: SSH_USER
```
Name: SSH_USER
Value: ubuntu
```

### Secret 3: DEPLOY_PATH
```
Name: DEPLOY_PATH
Value: /opt/rafcio
```

### Secret 4: SSH_PRIVATE_KEY
```
Name: SSH_PRIVATE_KEY
Value: 
```

**Wartość:** Wklej ZAWARTOŚĆ pliku `~/.ssh/github_actions_deploy` (cały tekst zaczynający się od `-----BEGIN OPENSSH PRIVATE KEY-----`)

> 💡 **Windows:** Otwórz plik w Notatniku lub PowerShell: `Get-Content ~/.ssh/github_actions_deploy | Set-Clipboard`
> 
> 💡 **Linux/Mac:** `cat ~/.ssh/github_actions_deploy`

---

## KROK 5: Dodaj Variables (opcjonalnie, ale rekomendowane)

Przejdź do: `https://github.com/uzzysan/rafcio/settings/variables/actions`

### Variable 1: NEXT_PUBLIC_BASE_URL
```
Name: NEXT_PUBLIC_BASE_URL
Value: https://maculewicz.pro
```

### Variable 2: NEXT_PUBLIC_UMAMI_SCRIPT_URL
```
Name: NEXT_PUBLIC_UMAMI_SCRIPT_URL
Value: https://maculewicz.pro/umami.js
```

### Variable 3: NEXT_PUBLIC_UMAMI_WEBSITE_ID
```
Name: NEXT_PUBLIC_UMAMI_WEBSITE_ID
Value: (później wpisz ID z dashboardu Umami)
```

---

## KROK 6: Integracja z Nginx (fairpact)

Skoro Nginx jest w kontenerze fairpact, musisz dodać do jego konfiguracji reverse proxy do rafcio.

**Sprawdź jaki port jest wolny** na serwerze (np. 3002):
```bash
# Na VPS
sudo ss -tlnp | grep LISTEN
```

### Opcja A: Domena główna (maculewicz.pro)

W projekcie fairpact, w konfiguracji Nginx dodaj:

```nginx
server {
    listen 80;
    server_name maculewicz.pro www.maculewicz.pro;
    
    location / {
        proxy_pass http://host.docker.internal:3002;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    # Umami analytics
    location /umami/ {
        proxy_pass http://host.docker.internal:3001/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

> ⚠️ Ważne: `host.docker.internal` działa w Docker Desktop. Na Linux VPS może być potrzebne:
> ```nginx
> proxy_pass http://147.135.211.101:3002;  # IP serwera zamiast host.docker.internal
> ```

### Opcja B: Port (tymczasowe testowanie)

Jeśli chcesz szybko przetestować bez konfiguracji Nginx:

```bash
# Na VPS - uruchom ręcznie (do testów)
cd /opt/rafcio
npm install
npm run build
npm start  # Uruchomi się na porcie 3000
```

I wejdź w przeglądarkę na: `http://147.135.211.101:3000`

---

## KROK 7: Test deploy

Po skonfigurowaniu wszystkich secrets, deploy uruchomi się automatycznie przy następnym pushu do main.

**Lub uruchom ręcznie:**
1. Przejdź do: `https://github.com/uzzysan/rafcio/actions`
2. Kliknij workflow **"Deploy to VPS"**
3. Kliknij **"Run workflow"** → **"Run workflow"**

---

## Troubleshooting

### Błąd: "Permission denied (publickey)"
- Sprawdź czy klucz publiczny jest dodany do `~/.ssh/authorized_keys` na serwerze
- Sprawdź uprawnienia: `chmod 700 ~/.ssh && chmod 600 ~/.ssh/authorized_keys`

### Błąd: "Could not resolve hostname"
- Sprawdź czy `SSH_HOST` jest poprawnie wpisany w GitHub Secrets

### Błąd: "pm2: command not found"
- Na serwerze: `sudo npm install -g pm2`

### Strona nie działa po deploy
```bash
# Zaloguj się na serwer i sprawdź logi
ssh ubuntu@147.135.211.101
pm2 logs rafcio-portfolio

# Sprawdź czy proces działa
pm2 status

# Restart ręczny
pm2 restart rafcio-portfolio
```

---

## Status po konfiguracji

Po poprawnym skonfigurowaniu:
- ✅ Push do `main` = automatyczny deploy
- ✅ PM2 zarządza procesem (autorestart przy crashu)
- ✅ PM2 startuje przy bootcie serwera
