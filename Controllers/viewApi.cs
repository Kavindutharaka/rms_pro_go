using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data;
using rms_pro.Models;
using System.Collections.Generic;
using System.Diagnostics.Metrics;
using System.ComponentModel;

namespace rms_pro.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class viewApi : ControllerBase
    {
        private readonly IConfiguration _configuration;
        string dbcon;
        DataTable tb;
        SqlDataReader myR;
        SqlConnection myCon;
        SqlCommand myCom;
        public viewApi(IConfiguration configuration)
        {
            _configuration = configuration;
            dbcon = _configuration.GetSection("DBCon").Value;
            myCon = new SqlConnection(dbcon);
        }


        [HttpPost("PendingByLo")]
        public ActionResult PendingByLo(Master udata)
        {
            string qu = @"exec [dbo].[PendingByLo] '" + udata.SysID + "';";
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

        [HttpPost("OngoingByLo")]
        public ActionResult OngoingByLo(Master udata)
        {
            string qu = @"exec [dbo].[OngoingByLo] '" + udata.SysID + "';";
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

        [HttpPost("chef_lst")]
        public ActionResult chef_lst(Master udata)
        {
            string qu = @"select * from [dbo].[chef_lst] where s =  '" + udata.SysID + "' order by dn;";
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

        [HttpPost("chef_update01R")]
        public ActionResult chef_update01R(chef_up1 udata)
        {
            string qu = @"exec [dbo].[update_kich01_r] '" + udata.SysID + "','" + udata.cid+"','"+udata.tbid+"','"+udata.u+"','"+udata.pid+"','"+udata.q+"';";
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

        [HttpPost("chef_update01")]
        public ActionResult chef_update01(chef_up1 udata)
        {
            string qu = @"exec [dbo].[update_kich01] '" + udata.SysID + "','" + udata.cid + "','" + udata.tbid + "','" + udata.u + "','" + udata.pid + "','" + udata.q + "','" + udata.sdt + "';";
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


        [HttpPost("chef_update01_auto")]
        public ActionResult chef_update01_auto(List<chef_up1> udata)
        {
            string qu = @"";
            tb = new DataTable();
            using (myCon)
            {
                myCon.Open();
                foreach (chef_up1 bil in udata)
                {
                    qu = @"exec [dbo].[update_kich01] '" + bil.SysID + "','" + bil.cid + "','" + bil.tbid + "','" + bil.u + "','" + bil.pid + "','" + bil.q + "','" + bil.sdt + "';";
                    using (myCom = new SqlCommand(qu, myCon)) { myR = myCom.ExecuteReader(); myR.Close(); }

                }
                tb.Load(myR); myR.Close(); myCon.Close();
            }
            return new OkObjectResult(tb); ;
        }



        [HttpPost("chef_update02")]
        public ActionResult chef_update02(chef_up1 udata)
        {
            string qu = @"exec [dbo].[update_kich02] '" + udata.SysID + "','" + udata.cid + "','" + udata.tbid + "','" + udata.u + "','" + udata.pid + "','" + udata.q + "','" + udata.sdt + "';";
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
