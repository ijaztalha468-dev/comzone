const { getPool, sql } = require("../config/db");

const bcrypt = require("bcryptjs");



// GET USER PROFILE

const getProfile = async (req, res) => {

  try {

    const userId = req.user.id;


    const pool = await getPool();


    const result = await pool
      .request()
      .input(
        "id",
        sql.Int,
        userId
      )
      .query(`
        SELECT 
          Id,
          Name,
          Email
        FROM Users
        WHERE Id = @id
      `);



    if (result.recordset.length === 0) {

      return res.status(404).json({

        success:false,

        message:"User not found"

      });

    }



    res.json({

      success:true,

      user: result.recordset[0]

    });



  } catch(error) {


    console.log("Profile Error:", error);


    res.status(500).json({

      success:false,

      message:"Profile error"

    });


  }

};




// UPDATE USER PROFILE

const updateProfile = async (req,res)=>{


  try{


    const userId = req.user.id;


    const {
      name,
      email
    } = req.body;



    const pool = await getPool();



    await pool
    .request()

    .input(
      "id",
      sql.Int,
      userId
    )

    .input(
      "name",
      sql.NVarChar,
      name
    )

    .input(
      "email",
      sql.NVarChar,
      email
    )

    .query(`
      
      UPDATE Users

      SET 
      Name=@name,
      Email=@email

      WHERE Id=@id

    `);



    res.json({

      success:true,

      message:"Profile updated successfully"

    });



  }catch(error){


    console.log("Update Profile Error:",error);


    res.status(500).json({

      success:false,

      message:"Update error"

    });


  }


};




// CHANGE PASSWORD

const changePassword = async (req, res) => {

  try {

    const userId = req.user.id;

    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {

      return res.status(400).json({
        success: false,
        message: "Current password aur new password required hain"
      });

    }

    const pool = await getPool();

    const result = await pool
      .request()
      .input("id", sql.Int, userId)
      .query(`
        SELECT Password
        FROM Users
        WHERE Id = @id
      `);

    if (result.recordset.length === 0) {

      return res.status(404).json({
        success: false,
        message: "User not found"
      });

    }

    const dbPassword = result.recordset[0].Password;

    const match = await bcrypt.compare(currentPassword, dbPassword);

    if (!match) {

      return res.status(400).json({
        success: false,
        message: "Current password galat hai"
      });

    }

    const hashPassword = await bcrypt.hash(newPassword, 10);

    await pool
      .request()
      .input("id", sql.Int, userId)
      .input("password", sql.NVarChar, hashPassword)
      .query(`
        UPDATE Users
        SET Password = @password
        WHERE Id = @id
      `);

    res.json({

      success: true,
      message: "Password changed successfully"

    });

  } catch (error) {

    console.log("Change Password Error:", error);

    res.status(500).json({
      success: false,
      message: "Password change error"
    });

  }

};




module.exports = {

  getProfile,

  updateProfile,

  changePassword

};