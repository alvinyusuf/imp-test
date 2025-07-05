epositori ini merupakan bagian dari asesmen Software Engineer untuk PT Informatika Media Pratama. Project ini terbagi menjadi tiga bagian utama:

1. **Frontend** (Next.js)
2. **Backend** (Laravel)
3. **Auth API** (Django + JWT)

---

## 🔧 Instalasi dan Setup

### 1. Auth API (Django)

#### Prasyarat
- Python >= 3.8
- pip
- virtualenv

#### Instalasi

```bash
git clone <repo-url>
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

### 🚀 Endpoint Dokumentasi
Register
POST /api/auth/register/

Body:

json
Always show details

Copy
{
  "username": "example",
  "email": "example@mail.com",
  "password": "yourpassword"
}
Response:

json
Always show details

Copy
{
  "message": "User registered successfully",
  "user": {
    "username": "example",
    "email": "example@mail.com"
  }
}
Login
POST /api/auth/login/

Body:

json
Always show details

Copy
{
  "username": "example",
  "password": "yourpassword"
}
Response:

json
Always show details

Copy
{
  "access": "access_token_here",
  "refresh": "refresh_token_here"
}
Logout
POST /api/auth/logout/

Headers:

makefile
Always show details

Copy
Authorization: Bearer <access_token>
Body:

json
Always show details

Copy
{
  "refresh_token": "refresh_token_here"
}
Token Verify
POST /api/auth/token/verify/

Body:

json
Always show details

Copy
{
  "token": "access_token_here"
}
Response:

json
Always show details

Copy
{}
Token Refresh
POST /api/auth/token/refresh/

Body:

json
Always show details

Copy
{
  "refresh": "refresh_token_here"
}
Response:

json
Always show details

Copy
{
  "access": "new_access_token"
}
🧪 Testing
Gunakan Postman / Thunder Client dengan mengikuti urutan:

Register

Login

Gunakan access token untuk test endpoint yang butuh autentikasi.

Logout untuk blacklist token refresh.

🧱 Struktur Folder
bash
Always show details

Copy
auth-service/
│
├── authentication/
│   ├── migrations/
│   ├── __init__.py
│   ├── models.py
│   ├── serializers.py
│   ├── urls.py
│   └── views.py
│
├── auth/
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
│
├── manage.py
└── requirements.txt
✍️ Catatan
rest_framework_simplejwt digunakan sebagai library untuk JWT.

Menggunakan custom user model.

Tidak menggunakan token DRF bawaan (Token.objects.get_or_create) karena menggunakan JWT sepenuhnya.
""")