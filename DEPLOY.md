# Konfiguracja automatycznego deploy (GitHub Actions)

## Wymagane dane do skonfigurowania

Potrzebuję od Ciebie:

| Nazwa | Przykład | Opis |
|-------|----------|------|
| `SSH_HOST` | `123.45.67.89` lub `vps.maculewicz.pro` | IP lub domena VPS |
| `SSH_USER` | `deploy` lub `ubuntu` | Użytkownik SSH |
| `DEPLOY_PATH` | `/opt/rafcio` | Ścieżka docelowa na serwerze |

## Krok 1: Wygenerowanie klucza SSH (jeśli nie masz)

Na swoim komputerze lub serwerze:

```bash
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/github_actions_deploy
```

## Krok 2: Dodanie klucza na serwerze

Skopiuj publiczny klucz na serwer:

```bash
ssh-copy-id -i ~/.ssh/github_actions_deploy.pub user@twoj-vps
```

Lub ręcznie dodaj zawartość `~/.ssh/github_actions_deploy.pub` do `~/.ssh/authorized_keys` na serwerze.

## Krok 3: Konfiguracja Secrets w GitHub

Przejdź do: **Settings** → **Secrets and variables** → **Actions**

### Dodaj Secrets (zakładka Secrets):

```
SSH_HOST=twoj-ip-lub-domena
SSH_USER=twoj-uzytkownik
SSH_PRIVATE_KEY=   # <-- ZAWARTOŚĆ KLUCZA PRYWATNEGO (cat ~/.ssh/github_actions_deploy)
DEPLOY_PATH=/sciezka/do/projektu  # np. /opt/rafcio
SSH_PORT=22  # opcjonalnie, domyślnie 22
```

### Dodaj Variables (zakładka Variables):

```
NEXT_PUBLIC_BASE_URL=https://maculewicz.pro
NEXT_PUBLIC_UMAMI_SCRIPT_URL=https://maculewicz.pro/umami.js
NEXT_PUBLIC_UMAMI_WEBSITE_ID=twoj-website-id
```

## Krok 4: Przygotowanie serwera

Na VPS wykonaj:

```bash
# Stwórz katalog
sudo mkdir -p /opt/rafcio
sudo chown $USER:$USER /opt/rafcio

# Zainstaluj Node.js 20 (jeśli nie masz)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Zainstaluj PM2
sudo npm install -g pm2

# Skonfiguruj PM2 do autostartu
pm2 startup systemd
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u $USER --hp $HOME
```

## Krok 5: Test deploy

Po skonfigurowaniu wszystkiego, deploy uruchomi się automatycznie przy każdym pushu do `main`.

Możesz też uruchomić ręcznie:
**Actions** → **Deploy to VPS** → **Run workflow**

## Integracja z Nginx (fairpact)

Skoro Nginx jest w kontenerze fairpact, musisz:

1. **Opcja A - Sieć współdzielona:**
   Dodaj do `docker-compose.yml` w fairpact:
   ```yaml
   networks:
     web:
       external: true
   ```
   I w rafcio uruchom jako część tej sieci.

2. **Opcja B - Port (rekomendowana):**
   - Uruchom rafcio na określonym porcie (np. 3002) przez PM2
   - Skonfiguruj Nginx w fairpact jako reverse proxy do `host.docker.internal:3002`

### Konfiguracja Nginx (fairpact)

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
    
    # Umami analytics (opcjonalnie - jeśli na tym samym VPS)
    location /umami/ {
        proxy_pass http://host.docker.internal:3001/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## Troubleshooting

### Deploy nie działa?

Sprawdź logi:
```bash
# Na serwerze
pm2 logs rafcio-portfolio

# Status PM2
pm2 status

# Restart ręczny
pm2 restart rafcio-portfolio
```

### Problemy z uprawnieniami?

Upewnij się że użytkownik SSH ma prawa do:
- Zapisu w `DEPLOY_PATH`
- Uruchamiania `npm` i `pm2`

### GitHub Actions nie łączy się?

Sprawdź:
1. Czy port SSH (22) jest otwarty w firewallu?
2. Czy klucz SSH jest poprawnie skopiowany?
3. Czy `SSH_HOST` i `SSH_USER` są poprawne?

Test lokalnie:
```bash
ssh -i ~/.ssh/github_actions_deploy user@host
```
