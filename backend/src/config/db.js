require("dotenv").config();

const useWindowsAuth =
  (process.env.DB_USE_WINDOWS_AUTH || "true").toLowerCase() === "true";

const sql = useWindowsAuth
  ? require("mssql/msnodesqlv8")
  : require("mssql");


let config;

if (useWindowsAuth) {

  config = {
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    driver: "msnodesqlv8",

    options: {
      trustedConnection: true,
      trustServerCertificate: true,
      enableArithAbort: true,
    },
  };

} else {

  config = {
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,

    options: {
      trustServerCertificate: true,
      enableArithAbort: true,
    },
  };

}


let pool = null;


async function getPool() {

  if (pool) {
    return pool;
  }


  pool = await sql.connect(config);

  console.log("SQL Server connected ✅");


  return pool;
}



module.exports = {
  sql,
  getPool
};