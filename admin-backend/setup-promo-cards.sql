-- ComZoneDB par ye chalayein

CREATE TABLE PromoCards (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Title NVARCHAR(200) NOT NULL,
    Subtitle NVARCHAR(300) NULL,
    ImageUrl NVARCHAR(500) NOT NULL,
    ButtonText NVARCHAR(100) NULL,
    LinkUrl NVARCHAR(200) NULL,
    CreatedAt DATETIME DEFAULT GETDATE()
);
