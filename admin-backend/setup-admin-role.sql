-- ComZoneDB par ye chalayein

-- Alag Admins table banayein (Users table se bilkul separate)
CREATE TABLE Admins (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL,
    Email NVARCHAR(100) NOT NULL UNIQUE,
    Password NVARCHAR(255) NOT NULL,
    CreatedAt DATETIME DEFAULT GETDATE()
);
