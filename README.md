# 🔧 Multi-Service App Playground (Next.js + Laravel + Django)

Repositori ini gua bikin sebagai playground pribadi buat belajar integrasi antar service (frontend, backend, auth API) dengan stack yang beda-beda. Proyek ini bukan untuk production, tapi buat eksperimen, riset, dan pemahaman arsitektur microservice secara praktikal.

---

## 🧱 Stack yang Dipakai

1. **Frontend** — [Next.js](https://nextjs.org/)
2. **Backend** — [Laravel](https://laravel.com/)
3. **Auth API** — [Django + JWT](https://www.django-rest-framework.org/)

---

## 📦 Tools yang Dibutuhin

- Git
- Node.js: v18.x atau v20.x
- npm
- PHP >= 8.2
- Composer
- Python >= 3.10
- pip
- venv (disarankan buat Django)

---

## ⚙️ Instalasi dan Setup

### 🚨 Note: Pastikan port 3000, 5000, dan 8000 kosong

```bash
git clone https://github.com/alvinyusuf/imp-test.git
cd imp-test
```

## 🛠️ Backend (Laravel)
```
cd backend
composer install
```

# Untuk Windows
```
copy .env.example .env
```
# Untuk Linux/Mac
```
cp .env.example .env

php artisan key:generate
php artisan migrate --seed      # Pilih "yes" saat diminta buat sqlite

php artisan serve               # Jalanin di http://127.0.0.1:8000
```

## 🖼️ Frontend (Next.js)
```
cd frontend
npm install
npm run dev                     # Jalanin di http://localhost:3000
```

## 🔐 Auth API (Django + JWT)
| Disetup di port 5000 supaya gak tabrakan sama Laravel
```
cd auth-service
python -m venv env

# Windows
env\Scripts\activate

# Linux/Mac
source env/bin/activate

pip install -r requirements.txt

python manage.py makemigrations
python manage.py migrate
python manage.py runserver 5000
```
