using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data;
using rms_pro.Models;

namespace rms_pro.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MasterApi : ControllerBase
    {
        private readonly IConfiguration _configuration;
        string dbcon;
        DataTable tb;
        SqlDataReader myR;
        SqlConnection myCon;
        SqlCommand myCom;
        public MasterApi(IConfiguration configuration)
        {
            _configuration = configuration;
            dbcon = _configuration.GetSection("DBCon").Value;
            myCon = new SqlConnection(dbcon);
        }


        [HttpPost("cat_change")]
        public ActionResult cat_change(Category udata)
        {

            string qu = @"exec [dbo].[Category_call]  '" + udata.typ + "', '" + udata.SysID + "', N'" + udata.n + "', '" + udata.s + "';";

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
        [HttpPost("chef_change")]
        public ActionResult chef_change(chef udata)
        {

            string qu = @"exec [dbo].[chef_call]  '" + udata.typ + "', '" + udata.SysID + "', N'" + udata.n + "', N'" + udata.dn + "', '" + udata.s + "';";

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
        [HttpPost("pro_call")]
        public ActionResult pro_call(Products udata)
        {

            string qu = @"exec [dbo].[Product_call] '" + udata.typ + "', '" + udata.SysID + "', N'" + udata.n + "', N'" + udata.pn + "','" + udata.cp + "','"+udata.sp+"','"+udata.dis+"','"+udata.stb+"','" + udata.s + "','"+udata.cat+ "','"+udata.lo+"';";

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

        [HttpPost("tb_call")]
        public ActionResult tb_call(tb_list udata)
        {

            string qu = @"exec [dbo].[table_call] '" + udata.typ + "', '" + udata.SysID + "', N'" + udata.n + "','" + udata.s + "';";

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

        [HttpPost("pro_disc")]
        public ActionResult pro_disc(Master udata)
        {

            string qu = @"select * from [dbo].[Discounts];";

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
        public ActionResult sp(Master udata)
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
