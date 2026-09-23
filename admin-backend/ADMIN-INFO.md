# Com-Zone Admin Backend — Info

## Kya hai ye
Alag admin panel ka backend server, jo customer-facing com-zone backend se **bilkul alag** chalta hai, lekin **same database (ComZoneDB)** use karta hai.

- Port: `5001`
- Customer backend: `5000`
- Admin frontend: `5174`
- Customer frontend: `5173`

## Database Table

```sql
CREATE TABLE Admins (
  Id INT IDENTITY(1,1) PRIMARY KEY,
  Name NVARCHAR(100) NOT NULL,
  Email NVARCHAR(100) NOT NULL UNIQUE,
  Password NVARCHAR(255) NOT NULL,
  CreatedAt DATETIME DEFAULT GETDATE()
);
```

Status: ✅ Table ban chuki hai database mein.

## Folder Structure

```
admin-backend/
├── package.json
├── .env
└── src/
    ├── server.js
    ├── config/db.js          (ComZoneDB se connect - same DB customer backend jaisa)
    ├── controllers/
    │   ├── adminController.js  (test connection, list products)
    │   └── authController.js   (register, login)
    └── routes/
        ├── adminRoutes.js     (protect middleware isi file ke andar hai)
        └── authRoutes.js
```

## API Endpoints

| Method | Route                          | Kaam                                  | Protected? |
|--------|--------------------------------|----------------------------------------|------------|
| POST   | /api/admin/auth/register       | Naya admin account banata hai          | Nahi       |
| POST   | /api/admin/auth/login          | Admin login, JWT token deta hai        | Nahi       |
| GET    | /api/admin/test                | DB connection check karta hai          | Haan       |
| GET    | /api/admin/products            | Saare products list karta hai          | Haan       |

"Protected" wale routes ke liye request header mein token chahiye:
`Authorization: Bearer <token>`
(token login response se milta hai, admin-frontend automatically attach kar deta hai)

## Ab Agla Step

Table ban chuki hai, ab pehla admin account banana hai — is API ko ek dafa call karein:

```
POST http://localhost:5001/api/admin/auth/register
Body (JSON):
{
  "name": "Talha",
  "email": "admin@comzone.com",
  "password": "apna_password"
}
```

Iske baad wahi email/password se admin-frontend (`localhost:5174`) par login ho sakega.

## .env Values (reference)

```
PORT=5001
DB_SERVER=DESKTOP-TAIGEFV\SQLEXPRESS
DB_DATABASE=ComZoneDB
DB_USE_WINDOWS_AUTH=false
DB_USER=comzone_user
DB_PASSWORD=Comzone@123
JWT_SECRET=comzone_admin_secret_key_2026_xyz123
JWT_EXPIRES_IN=7d
CLIENT_ORIGIN=http://localhost:5174
```
