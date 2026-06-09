# Mohair Studio React Frontend

Vite + React frontend za Mohair Studio e-commerce aplikaciju.

## Pokretanje

```bash
npm install
npm run dev
```

Aplikacija se otvara na:

```text
http://localhost:3000
```

## API podešavanje

Kopiraj `.env.example` u `.env`:

```bash
copy .env.example .env
```

ili Git Bash:

```bash
cp .env.example .env
```

U `.env` stavi adresu FastAPI backend-a:

```env
VITE_API_URL=http://127.0.0.1:8000
```

## Struktura

```text
src/
  assets/          logo i slike
  components/      layout, UI i product komponente
  context/         cart state
  data/            privremeni mock podaci
  pages/           stranice
  services/        API komunikacija
  styles/          globalni CSS
```
