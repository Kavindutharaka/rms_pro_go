using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data;
using rms_pro.Models;

namespace rms_pro.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginApi : ControllerBase
    {
        private readonly IConfiguration _configuration;
        string dbcon;
        DataTable tb;
        SqlDataReader myR;
        SqlConnection myCon;
        SqlCommand myCom;
        public LoginApi(IConfiguration configuration)
        {
            _configuration = configuration;
            dbcon = _configuration.GetSection("DBCon").Value;
            myCon = new SqlConnection(dbcon);
        }

        [HttpPost("call_login")]
        public ActionResult call_login(Login udata)
        {

            string qu = @" exec [dbo].[Login_call] '" + udata.un + "','"+udata.pw+"';";

            tb = new DataTable();
            using (myCon)
            {
                myCon.Open();
                using (myCom = new SqlCommand(qu, myCon))
                {
                    myR = myCom.ExecuteReader();
                    tb.Load(myR); myR.Close(); myCon.Close();
                }
            }
            return new OkObjectResult(tb); ;
        }
        [HttpPost("sp")]
        public ActionResult sp(Login udata)
        {

            string qu = @" " + udata.SysID + ";";

            tb = new DataTable();
            using (myCon)
            {
                myCon.Open();
                using (myCom = new SqlCommand(qu, myCon))
                {
                    myR = myCom.ExecuteReader();
                    tb.Load(myR); myR.Close(); myCon.Close();
                }
            }
            return new OkObjectResult(tb); ;
        }


    }
}
