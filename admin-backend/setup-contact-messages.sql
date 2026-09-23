-- ComZoneDB par ye chalayein

CREATE TABLE ContactMessages (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(150) NOT NULL,
    Email NVARCHAR(150) NOT NULL,
    Phone NVARCHAR(30) NULL,
    Message NVARCHAR(1000) NOT NULL,
    CreatedAt DATETIME DEFAULT GETDATE()
);
