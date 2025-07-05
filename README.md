## Repositori ini merupakan bagian dari asesmen Software Engineer untuk PT Informatika Media Pratama. Project ini terbagi menjadi tiga bagian utama:

1. **Frontend** (Next.js)
2. **Backend** (Laravel)
3. **Auth API** (Django + JWT)

---

## Requirements
- Git
- Node.js: v18.x atau v20.x
- npm
- PHP >= 8.2
- Composer
- Python >= 3.10
- pip
- venv (direkomendasikan)

## 🔧 Instalasi dan Setup

```bash
git clone https://github.com/alvinyusuf/imp-test.git

cd imp-test

```

# Backend (laravel)
```
cd backend
composer install
cp .env.example .env
php artisan key:generate

php artisan migrate

php artisan serve #Backend Ready 
```

# Frontend (NextJS)
```
cd frontend
npm i
npm run dev #Frontend Ready
```

# Auth (Django)
```
cd auth-service
python -m venv env

# Linux
source env/bin/activate
# Windows 
env\\Scripts\\activate

pip install -r requirements.txt

python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```


# 🧪 Testing
Gunakan Postman / Thunder Client untuk testing auth
Untuk CRUD backend (laravel) sudah bisa langsung dicoba melalui website frontend (NextJS)
default akses frontend
```
http://127.0.0.1:3000
```

# 🚀 Endpoint Dokumentasi

# Auth
### Register
POST
```
http://127.0.0.1:8000/api/auth/register/
```

Body:
<pre>
  {
    "username": "example",
    "email": "example@mail.com",
    "password": "yourpassword"
  }
</pre>

Response:
<pre>
  {
    "message": "User registered successfully",
    "user": {
      "username": "example",
      "email": "example@mail.com"
    }
  }
</pre>

### Login
POST
```
http://127.0.0.1:8000/api/auth/login/
```

Body:
<pre>  
  { 
    "username": "example",
    "password": "yourpassword"
  }
</pre>

Response:
<pre>
  {
    "access": "access_token_here",
    "refresh": "refresh_token_here"
  }
</pre>

### Logout
POST
```
http://127.0.0.1:8000/api/auth/logout/
```

Headers:
<pre>
  Authorization: Bearer <access_token>
</pre>

Body:
<pre>
  {
    "refresh_token": "refresh_token_here"
  }
</pre>

### Token Verify
POST
```
http://127.0.0.1:8000/api/auth/verify/
```

Body:
<pre>
  {
    "token": "access_token_here"
  }
</pre>

Response:
<pre>
  {}
</pre>

### Token Refresh
POST
```
http://127.0.0.1:8000/api/auth/refresh/
```

Body:
<pre>
  {
    "refresh": "refresh_token_here"
  }
</pre>

Response:
<pre>
  {
    "access": "new_access_token"
  }
</pre>
