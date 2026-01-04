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
    public class WorkApi : ControllerBase
    {
        private readonly IConfiguration _configuration;
        string dbcon;
        DataTable tb;
        SqlDataReader myR;
        SqlConnection myCon;
        SqlCommand myCom;
        public WorkApi(IConfiguration configuration)
        {
            _configuration = configuration;
            dbcon = _configuration.GetSection("DBCon").Value;
            myCon = new SqlConnection(dbcon);
        }


        [HttpPost("load_tb")]
        public ActionResult load_tb(Master udata)
        {
            string qu = @"exec [dbo].[load_tb] '" + udata.SysID + "';";
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
        [HttpPost("load_cat")]
        public ActionResult load_cat(Master udata)
        {
            string qu = @"exec [dbo].[load_cat] '" + udata.SysID + "';";
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
        [HttpPost("load_pro")]
        public ActionResult load_pro(Master udata)
        {
            string qu = @"exec [dbo].[load_pro] '" + udata.SysID + "';";
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

        [HttpPost("save_table_order")]
        public ActionResult save_table_order(List<tb_save_data> udata)
        {
            string qu = @"update [dbo].[tb_list] set u = '" + udata[0].tb_owr + "' where SysID = '"+ udata[0].tbid + "';";
            tb = new DataTable();
            using (myCon)
            {
                myCon.Open();
                using (myCom = new SqlCommand(qu, myCon))  {myR = myCom.ExecuteReader();}
                myR.Close();
                foreach (tb_save_data bil in udata)
                {
                    qu = @"insert into [dbo].[tb_bk] values('"+bil.tbid+"','"+bil.sysID+"','"+bil.uid+"',0,'"+bil.dt+ "','"+bil.i_c+"');select 1";
                    using (myCom = new SqlCommand(qu, myCon)) { myR = myCom.ExecuteReader(); myR.Close(); }

                }
                tb.Load(myR); myR.Close(); myCon.Close();
            }
            return new OkObjectResult(tb); ;
        }

        [HttpPost("SavTbOr")]
        public ActionResult SavTbOr(List<tb_save_data> udata)
        {
            string qu = @"exec [dbo].[kot] '" + udata[0].tb_owr + "','" + udata[0].tbid + "','" + udata[0].dt+"';";
            tb = new DataTable();
            Int64 inv_n = 0;
            var bb = "";
            using (myCon)
            {
                myCon.Open();
                using (myCom = new SqlCommand(qu, myCon)) { inv_n = Convert.ToInt64(myCom.ExecuteScalar()); }

                foreach (tb_save_data bil in udata)
                {
                    qu = @"exec [dbo].[kot_d] '"+ inv_n + "','"+bil.uid+"','"+bil.tbid+"','"+bil.dt+"','"+bil.sysID+"','" + bil.i_c + "';";
                    using (myCom = new SqlCommand(qu, myCon)) { myCom.ExecuteScalar(); }
                }


                qu = @"select inv from [dbo].[invoice] where SysID = '" + inv_n + "';";
                using (myCom = new SqlCommand(qu, myCon)) { bb = Convert.ToString(myCom.ExecuteScalar()); }
                // tb.Load(myR); 
                //  myR.Close();
                myCon.Close();
            }
            return new OkObjectResult(bb); ;
        }

        [HttpPost("item_by_tb")]
        public ActionResult item_by_tb(Master udata)
        {
            string qu = @"exec [dbo].[item_by_tb] '" + udata.SysID + "';";
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
        [HttpPost("item_by_waiter")]
        public ActionResult item_by_waiter(Master udata)
        {
            string qu = @"exec [dbo].[item_by_waiter] '" + udata.SysID + "';";
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
        [HttpPost("itemDoneByWaiter")]
        public ActionResult itemDoneByWaiter(Master udata)
        {
            string qu = @"update [dbo].[tb_bk] set s = 4 where SysID = '" + udata.SysID + "';select 1";
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
                
        [HttpPost("save_invoice")]
        public ActionResult save_invoice(List<inv_save> udata)
        {
            string qu = @"exec [dbo].[inv_save] '" + udata[0].dt + "','" + udata[0].typ + "','" + udata[0].u + "','" + udata[0].tot
                + "','" + udata[0].sf + "','" + udata[0].cash + "','" + udata[0].card + "','" + udata[0].oth + "','" + udata[0].not + "','" + udata[0].c + "','" + udata[0].dis + "';";
            tb = new DataTable();
            Int64 inv_n =0;
            var bb = "";
            using (myCon)
            {
                myCon.Open();
                using (myCom = new SqlCommand(qu, myCon)) { inv_n = Convert.ToInt64(myCom.ExecuteScalar()); }
                
                foreach (inv_save bil in udata)
                {
                    qu = @"exec [dbo].[inv_data_save] '" + inv_n + "','" + bil.SysID + "','" + bil.sp + "','" + bil.q + "','" + bil.typ + "','"+bil.c+"','"+bil.dt+ "','"+bil.i_c+"';";
                    using (myCom = new SqlCommand(qu, myCon)) {  myCom.ExecuteScalar(); }
                }

              
                qu = @"exec [dbo].[kot_inv] '"+inv_n+"'; select inv from [dbo].[invoice] where SysID = '" + inv_n + "';";
                using (myCom = new SqlCommand(qu, myCon)) { bb = Convert.ToString( myCom.ExecuteScalar()); }
                // tb.Load(myR); 
                //  myR.Close();
                myCon.Close();
            }
            return new OkObjectResult(bb); ;
        }



    }
}
