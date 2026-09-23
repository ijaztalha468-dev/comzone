-- ComZoneDB par ye chalayein

CREATE TABLE Subcategories (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    ParentCategory NVARCHAR(50) NOT NULL,  -- jaise 'RAM', 'GPU' (Navbar ke link se match hona chahiye)
    Label NVARCHAR(200) NOT NULL,          -- jaise 'Desktop - DDR5 Memory'
    LinkUrl NVARCHAR(300) NOT NULL,        -- jahan click karne par jaye
    SortOrder INT DEFAULT 0,
    CreatedAt DATETIME DEFAULT GETDATE()
);
