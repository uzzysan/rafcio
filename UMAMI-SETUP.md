# Szybki setup Umami Analytics (tylko nowe rzeczy)

Twoja strona już działa na serwerze. To instrukcja TYLKO dla dodania śledzenia ruchu.

---

## KROK 1: Skopiuj plik docker-compose na serwer

```bash
# Na swoim komputerze
scp docker-compose.umami.yml ubuntu@147.135.211.101:/opt/umami/
```

Lub zaloguj się na serwer i stwórz ręcznie:
```bash
ssh ubuntu@147.135.211.101
mkdir -p /opt/umami
cd /opt/umami

# Utwórz plik docker-compose.umami.yml
nano docker-compose.umami.yml
# (wklej zawartość z repo i zapisz Ctrl+O, Ctrl+X)
```

---

## KROK 2: Uruchom Umami

```bash
ssh ubuntu@147.135.211.101
cd /opt/umami
docker compose -f docker-compose.umami.yml up -d

# Sprawdź czy działa
docker ps
# Powinieneś zobaczyć dwa kontenery: umami i db
```

Umami będzie dostępne na porcie **3001**.

---

## KROK 3: Skonfiguruj Nginx (w kontenerze fairpact)

W projekcie fairpact, w konfiguracji Nginx dodaj:

```nginx
# Wewnątrz server { ... } dla maculewicz.pro

# Umami analytics - dostęp przez /umami/
location /umami/ {
    proxy_pass http://147.135.211.101:3001/;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}

# Skrypt śledzący Umami - dostęp przez /umami.js
location /umami.js {
    proxy_pass http://147.135.211.101:3001/umami.js;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
}

# API Umami (potrzebne do zbierania danych)
location /api/collect {
    proxy_pass http://147.135.211.101:3001/api/collect;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
}
```

**Zrestartuj kontener fairpact** aby wczytać nową konfigurację.

---

## KROK 4: Pierwsza konfiguracja Umami

```bash
# Wejdź na stronę (zastąp domenę jeśli masz inną)
https://maculewicz.pro/umami/

# Domyślne dane logowania:
Login: admin
Hasło: umami
```

**ZMIEŃ HASŁO NATYCHMIAST!**

### Dodaj stronę do śledzenia:
1. Kliknij **"Add website"**
2. Name: `Rafał Maculewicz Portfolio`
3. Domain: `maculewicz.pro`
4. Kliknij **"Add"**
5. **Skopiuj "Website ID"** (np. `123e4567-e89b-12d3-a456-426614174000`)

---

## KROK 5: Zaktualizuj .env na serwerze

Zaloguj się na serwer i edytuj `.env` w katalogu z aplikacją:

```bash
ssh ubuntu@147.135.211.101
cd /opt/rafcio  # lub gdzie masz stronę
nano .env
```

**Dodaj na końcu:**
```bash
# Umami Analytics
NEXT_PUBLIC_UMAMI_SCRIPT_URL=https://maculewicz.pro/umami.js
NEXT_PUBLIC_UMAMI_WEBSITE_ID=tu-wklej-skopiowane-id
```

Zapisz (Ctrl+O, Enter, Ctrl+X).

---

## KROK 6: Rebuild i restart aplikacji

```bash
ssh ubuntu@147.135.211.101
cd /opt/rafcio  # katalog z Twoją stroną

# Pobierz najnowszy kod (jeśli jeszcze tego nie zrobiłeś)
git pull origin main

# Zainstaluj zależności (jeśli nowe)
npm ci

# Rebuild (ważne - zmienne NEXT_PUBLIC_* są wbudowywane przy buildzie)
npm run build

# Restart aplikacji (zakładam że używasz PM2)
pm2 restart rafcio-portfolio

# LUB jeśli nie masz PM2:
# pm2 start npm --name "rafcio-portfolio" -- start
```

---

## KROK 7: Weryfikacja

1. **Otwórz stronę** w przeglądarce: `https://maculewicz.pro`
2. **Sprawdź czy skrypt się załadował** (DevTools → Network → umami.js)
3. **Wejdź na dashboard Umami**: `https://maculewicz.pro/umami/`
4. **Odśwież stronę** - powinieneś zobaczyć nowe odwiedzenie w dashboardzie

---

## Co jest śledzone automatycznie?

- ✅ Odwiedziny stron (page views)
- ✅ Unikalni użytkownicy
- ✅ Czas na stronie
- ✅ Urządzenia, przeglądarki, OS
- ✅ Kraje (na podstawie IP)
- ✅ Źródła ruchu (referrers)

## Opcjonalnie: Śledzenie kliknięć

Aby śledzić kliknięcia w konkretne linki, dodaj atrybuty w kodzie:

```tsx
<a href="https://github.com/uzzysan" data-umami-event="github-click">
  GitHub
</a>

<button data-umami-event="contact-form-submit">
  Wyślij
</button>
```

Po dodaniu nowych eventów - zrób commit, push i `git pull` + `npm run build` na serwerze.

---

## Komendy przydatne przy troubleshootingu

```bash
# Sprawdź logi Umami
docker logs umami-umami-1

# Restart Umami
cd /opt/umami && docker compose restart

# Sprawdź czy port 3001 jest dostępny
sudo ss -tlnp | grep 3001

# Sprawdź logi Twojej aplikacji
pm2 logs rafcio-portfolio
```

---

**Gotowe!** 🎉 Od teraz masz pełne statystyki ruchu na stronie.
