var app = angular.module('RMSApp', []);
app.controller('HomeCtrl', function ($scope, $http, $filter, $rootScope, $window, $timeout) {

    $window.location.href = './cashier_t.html';

    $scope.bill_dis = 0;
    var modal = document.getElementById("myModal");

    var modal_b = document.getElementById("myModal_b");
    function getPath() {
        var path = window.location.href;
        return path.substring(0, path.lastIndexOf("/"));
    }

    var p_d = '';

    $scope.reset_0 = function () {
        $scope.dt = $filter('date')(new Date(), 'yyyy/MM/dd HH:mm:ss');
        $scope.bill = [];
        $scope.bill_finishing = 0;
        $scope.invoice_no = "000";
    };

    $scope.reset_0();
    $scope.make_bill = function () {
        p_d = ' <div style="font-size:14px;padding-bottom:5px;border-bottom:solid 2px;margin-top:10px;"> ' +
            ' <div>  ' +
            '    <div style="display:inline-block;">' + $scope.dt + '</div> <div style="display:inline-block;float: right;"> #' + $scope.invoice_no + '</div>  ' +
            '  </div > ' +
            '  </div > ' +
            ' <div style="font-size:14px;margin-top:20px;"></div> ' +
            '';
        for (var c = 0; c < $scope.bill.length; c++) {
            if (Number($scope.bill[c].sp) == Number($scope.bill[c].dis_v)) {

                p_d = p_d +
                    ' <div style="font-size:14px;padding:5px 0 0 0;font-weight:bolder;">' + $scope.bill[c].pn + '</div> ' +
                    '  <div> ' +
                    '      <div style="font-size:14px;padding:0 0 5px 0;display:inline-block;">' + $filter('number')($scope.bill[c].dis_v, '') + ' X ' + $scope.bill[c].q + '</div> ' +
                    '      <div style="font-size: 14px; display: inline-block; float: right">' + $filter('currency')($scope.bill[c].tot, '') + ' </div> ' +
                    '  </div> ';


            } else {
                p_d = p_d +
                    ' <div style="font-size:14px;padding:5px 0 0 0;font-weight:bolder;">' + $scope.bill[c].pn + '</div> ' +
                    '  <div> ' +
                    '      <div style="font-size:14px;padding:0 0 5px 0;display:inline-block;"> <div style="display: inline-block; text-decoration: line-through #000000 1px;">(' + $scope.bill[c].sp + ' )&nbsp;</div> ' + $scope.bill[c].dis_v + ' X ' + $scope.bill[c].q +'</div> ' +
                    '      <div style="font-size: 14px; display: inline-block; float: right">' + $filter('currency')($scope.bill[c].tot, '') + ' </div> ' +
                    '  </div> ';

            }
        }
    

                
        p_d = p_d + '<div style="width: 99%; border-top: solid 2px; margin-top: 5px;"></div>';

        for (var c = 0; c < $scope.bill_poot.length; c++) {

            p_d = p_d +
             ' <div style="margin-top:5px;">  '+
                ' <div style = "font-size:14px;display:inline-block;" >' + $scope.bill_poot[c].n +' </div > ' +
                ' <div style="font-size: 14px; display: inline-block;float: right;font-weight:bolder;">' + $filter('currency')($scope.bill_poot[c].v, '') + '</div>    </div > '

        };

       

      

    };

    $scope.pp = function () {
        
        var config = getUpdatedConfig();
        var opts = getUpdatedOptions(true);
        $scope.make_bill();
        var printData = [
            {
                type: 'pixel',
                format: 'html',
                flavor: 'plain',
                data: '<html>' +
                    '<body style="padding:10px;">' +
                // ' <img src="' + getPath() + '/logo_bnw.png" style="width:250px;" />' +
                    ' <div style="font-size:12px;text-align:center;width:99%;">No 120, Baladaksha Mawatha, Colombo 1.</div> '+
                   '  <div style="font-size:12px;text-align:center;width:99%;" >0777 931 639 / 0777 931 683</div> '+
                    '  ' + p_d +
                    ' <div style="margin-top:5px;text-align:center;width:99%;"> ' +
                    ' <div style="font-size:14px;"> THANK YOU !</div> '+
                    ' </div > ' +
                    '</body></html>',
                options: opts
            }
        ];

        $timeout(function () {
            qz.print(config, printData).catch();
            $timeout(function () { $scope.reset_0(); $scope.load_0(); }, 200);
        }, 200);
       
    };


    var pn = 'XP-80C';

    setPrinter(pn);
    /// QZ print end


    $scope.service_fee = "0";
    $scope.load_0 = function () { 
      
    $scope.dn = localStorage.getItem("dn");
    $scope.ul = localStorage.getItem("ul");
        $scope.uid = localStorage.getItem("uid");
        $scope.tb_u = $scope.uid;
        $scope.dn = localStorage.getItem("dn");
    //console.log($scope.un);
    if (angular.isUndefined($scope.dn) || $scope.dn == "" || $scope.dn == null) {
        $window.location.href = './login.html';
    } 

        $scope.opra = 1;


        var bbb = {
            "SysID": 0
        };
        $http.post('./api/WorkApi/load_tb', JSON.stringify(bbb)).then(function (responsea) {
            $scope.load_tb = responsea.data;
            // console.log($scope.load_tb);
        }, function (responsea) { });

        $http.post('./api/WorkApi/load_cat', JSON.stringify(bbb)).then(function (responsea) {
            $scope.load_cat = responsea.data;
            //console.log($scope.load_cat);
        }, function (responsea) { });
        $scope.cat_lst = true;

    };

    $scope.load_0();

    $scope.tb_search_d = localStorage.getItem("tb_sel");
    $scope.tb_search = function (a) { $scope.tb_search_d = a; localStorage.setItem("tb_sel", a); };

    $scope.opra_change = function (a) {
        $scope.opra = a;
        console.log("TB 0");
        $scope.seled_tb_id = 0;
        if (Number($scope.opra) == 2) {
            $scope.all_tb_view();
        }
       
        if (Number($scope.opra) == 3) {
            var bbb = {
                "SysID": "exec [dbo].[load_PayPenInv] 0"
            };
            $http.post('./api/MasterApi/sp', JSON.stringify(bbb)).then(function (responsea) {
                $scope.pay_pen_inv = responsea.data;
            }, function (responsea) { });
        }
        if (Number($scope.opra) == 4) {
            var bbb = {
                "SysID": "exec [dbo].[CashInvLst] '" + $scope.uid + "'"
            };
            
            $http.post('./api/MasterApi/sp', JSON.stringify(bbb)).then(function (responsea) {
                $scope.CashInvLst = responsea.data;
                $scope.cash = 0; $scope.card = 0; $scope.tot = 0;
                for (var c = 0; c < $scope.CashInvLst.length; c++) {
                    $scope.cash = Number($scope.cash) + Number($scope.CashInvLst[c].cash);
                    $scope.card = Number($scope.card) + Number($scope.CashInvLst[c].card);
                    $scope.tot = Number($scope.tot) + Number($scope.CashInvLst[c].tot);

                }
                console.log($scope.CashInvLst);
            }, function (responsea) { });
        }
        if (Number($scope.opra) == 5) {
            var bbb = {
                "SysID": "exec [dbo].[CashiItem] '" + $scope.uid + "'"
            };

            $scope.kich = []; $scope.beema = [];
            $http.post('./api/MasterApi/sp', JSON.stringify(bbb)).then(function (responsea) {
                $scope.CashItem = responsea.data;
                for (var c = 0; c < $scope.CashItem.length; c++) {
                    if (Number($scope.CashItem[c].lo) == 1) { $scope.kich.push($scope.CashItem[c]); } else { $scope.beema.push($scope.CashItem[c]); }

                }
                
            }, function (responsea) { });
        }


    };
    $scope.finsh_bill_do = function () {
        modal_b.style.display = "block";
   
    };
    $scope.load_inv_data = function (a) {
        $scope.pay_sel_inv = a.sysID;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      //  console.log(a);
        $scope.bill_amount = a.tot;
        $scope.s_ch_v = a.sf;
        $scope.service_fee = $scope.s_ch_v;
        $scope.view_inv = a.inv + " Table : " + a.tn + " By: " + a.st;
        $scope.grand_tot = a.tot;
        
        //var bbb = {
        //    "SysID": "exec [dbo].[load_PayPenInvData] '"+a.sysID+"'"
        //};
        //$http.post('./api/MasterApi/sp', JSON.stringify(bbb)).then(function (responsea) {
        //    $scope.bill = responsea.data;
        // //   console.log($scope.bill);

        //    $scope.total = 0;
        //    $scope.g_tot = 0;
        //    for (var c = 0; c < $scope.bill.length; c++) {
        //        $scope.bill[c].tot = Number($scope.bill[c].dis_v) * Number($scope.bill[c].q);
        //    }
        //    for (var c = 0; c < $scope.bill.length; c++) {
        //        $scope.total = Number($scope.total) + Number($scope.bill[c].tot);
        //    }
         //   console.log($scope.s_ch_v);
            //$scope.s_chg = (Number($scope.total) / 100) * Number($scope.s_ch_v);
            //$scope.grand_tot = Number($scope.total) + Number($scope.s_chg);
        // }, function (responsea) { });


    };

    $scope.sel_cat = function (a) {
        $scope.load_pro = [];
     //   console.log(a);
        $scope.cat_lst = false;
        $scope.cat_n = a.n;
        var bbb = {
            "SysID": a.sysID
        };
        $http.post('./api/WorkApi/load_pro', JSON.stringify(bbb)).then(function (responsea) {
            $scope.load_pro = responsea.data;
            console.log($scope.load_pro);
        }, function (responsea) { });
    };

    $scope.all_cat_view = function () {
        $scope.cat_lst = true;
    };

    $scope.bill = [];
    $scope.bill_poot = [];
    $scope.total = 0;
    $scope.grand_tot = 0;
    $scope.serv_chg = 0;
    $scope.tot_gen = function () {
        $scope.bill_poot = [];
        $scope.total = 0;
        for (var c = 0; c < $scope.bill.length; c++) {
            $scope.bill[c].tot = (Number($scope.bill[c].dis_v) * Number($scope.bill[c].q));
         
        }
        for (var c = 0; c < $scope.bill.length; c++) { 
            $scope.total = Number($scope.total) + Number($scope.bill[c].tot);
        }
        $scope.serv_chg = (Number($scope.total) / 100) * Number($scope.service_fee);
        $scope.grand_tot = Number($scope.total) + Number($scope.serv_chg);
        $scope.bill_poot.push({ n: 'Total', v: $scope.total });
        $scope.bill_poot.push({ n: 'Service ' + $scope.service_fee + '%', v: $scope.serv_chg });
        $scope.bill_poot.push({ n: 'Grand Total ',v: $scope.grand_tot});
    };

    $scope.remove_item_inv = function (a) {

        var index = $scope.bill.indexOf(a);
        $scope.bill.splice(index, 1);
        $scope.tot_gen();
    };

    $scope.i_c = "";
    $scope.add_item_inv = function (a) {
        var dd = { 'n': a.n, 'pn': a.pn, 'sp': a.sp, 'sysID': a.sysID, 'q': 1, 'tot': a.dis_v, "dis_v": a.dis_v, "i_c": $scope.i_c };
        if ($scope.bill == null || $scope.bill == '' || $scope.bill.length < 0) {
            $scope.bill.push(dd);
        } else {
            var bb = 0;
            for (var c = 0; c < $scope.bill.length; c++) {
                if (Number($scope.bill[c].sysID) == Number(a.sysID)) {
                    bb = 1;
                    $scope.bill[c].q = Number($scope.bill[c].q) + 1;
                }
            }
            if (Number(bb) == 0) { $scope.bill.push(dd); };           
        }
        $scope.tot_gen();
        $scope.i_c = "";
    };
    

    $scope.dt = $filter('date')(new Date(), 'yyyy/MM/dd HH:mm:ss');
    $scope.print = function () {
        $scope.dt = $filter('date')(new Date(), 'yyyy/MM/dd HH:mm:ss');
        $scope.pp();
        //$timeout(function () {
        //    var printContents = document.getElementById('print').innerHTML;
        //    var popupWin = window.open('', 'testp', 'width=800,height=800,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no,top=50');
        //    popupWin.window.focus();
        //    popupWin.document.open();
        //    popupWin.document.write('<!DOCTYPE html><html><head>'
        //        + '<style type="text/css">@page { size: auto;  margin: 1mm;font-family:Arial!important;  }; .headcell { border-collapse: collapse; text-align: center; padding: 2px; border: 1px solid #807c7c; } .cellbd{border-collapse:collapse; padding:4px;  border: 1px solid #a39d9d;}</style>'
        //        + ' <script src="./support/angular.min.js"></script></head><body onload="window.print(); window.close();"><div>'
        //        + printContents + '</div></html>');
        //    popupWin.document.close();
        //    popupWin.focus();
        //    setTimeout(function () {
        
        //        self.close();
        //        $window.location.reload();
        //    }, 1000);
           
        //}, 100);
        

    };

  
   // modal_b.style.display = 'block';
    $scope.bill_cash_type = "";
    $scope.finish_bill_ok2 = function () {

        var cash = 0, card = 0;
        if (Number($scope.paym) == 1) { cash = $scope.bill_amount; }
        if (Number($scope.paym) == 2) { card = $scope.bill_amount; }
        if (Number($scope.paym) == 3) { cash = $scope.bill_cash_type; card = $scope.bill_balance; }
        var bbb = {
            "SysID": "exec [dbo].[load_PayPenInvDone] '" + cash + "','" + card + "','" + $scope.uid + "','" + $scope.pay_sel_inv +"'"
        };
        $http.post('./api/MasterApi/sp', JSON.stringify(bbb)).then(function (responsea) {
            $scope.ooo = responsea.data;
          //  console.log($scope.ooo);
            $window.location.reload();
        }, function (responsea) { });
    };
    //modal.style.display = "none";

    $scope.paym = 1;
    $scope.bill_amount = "5420";
    $scope.bill_cash_type = "0";
    $scope.bill_balance = "0.00";
    $scope.pay_not = "";
    $scope.pay_typ = function (a) {
        $scope.paym = a;
    };
    $scope.seled_tb_id = 0;
    $scope.finsh_bill = function () {
        modal.style.display = "block";
        $scope.bill_amount = $scope.grand_tot; 
    };
    $scope.invoice_no = "";
    
    $scope.finish_bill_ok = function () {
        modal_b.style.display = 'none';
        modal.style.display = 'none';
        if (Number($scope.bill_finishing) == 0) {
            $scope.bill_finishing = 1;
        var cash = 0, card = 0;
        if (Number($scope.paym) == 1) { cash = $scope.bill_amount; }
        if (Number($scope.paym) == 2) { card = $scope.bill_amount; }
        if (Number($scope.paym) == 3) { cash = $scope.bill_cash_type; card = $scope.bill_balance; }
        var bbb = [];

        for (var x = 0; x < $scope.bill.length; x++) {
            //  console.log($scope.bill[x]);
            var i_c = '';
            if (angular.isUndefined($scope.bill[x].i_c)) { i_c = ''; } else { i_c = $scope.bill[x].i_c; }
            var dd = {
                "SysID": $scope.bill[x].sysID,
                "typ": $scope.seled_tb_id,
                "u": $scope.tb_u,
                "tot": $scope.bill_amount,
                "dt": $filter('date')(new Date(), 'yyyy/MM/dd HH:mm:ss'),
                "sp": $scope.bill[x].dis_v,
                "q": $scope.bill[x].q,
                "i_c": i_c,
                "cash": cash,
                "card": card,
                "oth": "0",
                "not": $scope.pay_not,
                "c": $scope.uid,
                "sf": $scope.service_fee,
                "dis": 0
            }
            bbb.push(dd);
        }; // cashir billing

        console.log(bbb);
        $timeout(function () {
            $http.post('./api/WorkApi/save_invoice', JSON.stringify(bbb)).then(function (responsea) {
                $scope.invoice_no = responsea.data;
                console.log($scope.invoice_no);
                $scope.print();
            }, function (responsea) { });
        }, 200);
        // $scope.print();
    }
    };

    $scope.iten_done = function (a) {
      //  console.log(a); //
        var bbb = {
            "SysID": a.sysID
        };
        $http.post('./api/WorkApi/itemDoneByWaiter', JSON.stringify(bbb)).then(function (responsea) {
            $scope.load_item_pending();
        }, function (responsea) { });
    };
    $scope.pay_panel_cls = function () {
        $window.location.reload();
        $scope.tb_billing = 0;
        modal.style.display = "none";
        modal_b.style.display = "none";
        $scope.bill_cash_type = "0";
        $scope.bill_balance = $scope.bill_amount;
        $scope.seled_tb_id = 0;
     
    };

    $scope.key_st = false;
    $scope.typ_po = 1;
    $scope.typ_po_chg = function (a) {
        $scope.typ_po = a;
    };
    $scope.key_pad = function (a,b) {
        if (Number($scope.paym) == 1) {
         //  $scope.bill_amount = "5420";
         //  $scope.bill_cash_type = "0.00";
         //  $scope.bill_balance = "0.00";
            if (Number(b) == 1) {
                $scope.bill_cash_type = String($scope.bill_cash_type) + "" + String(a); console.log(a, b);
            } else {
                let str = $scope.bill_cash_type;
                str = str.slice(0, -1);
                $scope.bill_cash_type = str;
            }  
            $scope.bill_balance = Number($scope.bill_cash_type)  - Number($scope.bill_amount) ;
        }
        if (Number($scope.paym) == 2) {
            
            if (Number(b) == 1) {
                $scope.pay_not = String($scope.pay_not) + "" + String(a); console.log(a, b);
            } else {
                let str = $scope.pay_not;
                str = str.slice(0, -1);
                $scope.pay_not = str;
            }
           
        }
        if (Number($scope.paym) == 3) {
            if (Number($scope.typ_po) == 1) {
                if (Number(b) == 1) {
                    $scope.bill_cash_type = String($scope.bill_cash_type) + "" + String(a); console.log(a, b);
                } else {
                    let str = $scope.bill_cash_type;
                    str = str.slice(0, -1);
                    $scope.bill_cash_type = str;
                }
                $scope.bill_balance = (Number($scope.bill_cash_type) - Number($scope.bill_amount)) * -1;
            } else {
                if (Number(b) == 1) {
                    $scope.pay_not = String($scope.pay_not) + "" + String(a); console.log(a, b);
                } else {
                    let str = $scope.pay_not;
                    str = str.slice(0, -1);
                    $scope.pay_not = str;
                }
            }
            
            
        }

    };


    /// table -----------------------------------------------

  
    $scope.Remove_i_c = function (b, a) {
        console.log(b.tSysID);
        for (var c = 0; c < $scope.item_by_tb.length; c++) {
            if (Number($scope.item_by_tb[c].tSysID) == Number(b.tSysID)) {
                $scope.item_by_tb[c].r = a; 
            }
          
        }
    }

    $scope.del_item = function (a) {
     //   $scope.load_tb_data_sel();
        console.log(a.tSysID);

        var bbb = {
            "SysID": "exec [dbo].[DelItemTb] '" + a.tSysID + "','" + $scope.uid +"'"
        };
        $http.post('./api/MasterApi/sp', JSON.stringify(bbb)).then(function (responsea) {
            $scope.load_tb_data_sel();
            
        }, function (responsea) { });

    };


    $scope.tb_view = 1;

    $scope.tb_owner = 0;
    $scope.main_sel = 1;

    $scope.load_item_pending = function () {
        //
        var bbb = {
            "SysID": 0
        };
        $http.post('./api/WorkApi/item_by_waiter', JSON.stringify(bbb)).then(function (responsea) {
            $scope.item_by_waiter = responsea.data;
            //  console.log($scope.item_by_waiter);
        }, function (responsea) { });
    };

    $scope.main_btn_call = function (a) {
        $scope.main_sel = a;
        if (Number(a) == 1) { $scope.all_tb_view();  }
        if (Number(a) == 2) { $scope.load_item_pending(); };
    };

    $scope.load_tb_data_sel = function () {
        var bbb = {
            "SysID": $scope.seled_tb_id
        };
        $http.post('./api/WorkApi/item_by_tb', JSON.stringify(bbb)).then(function (responsea) {
            $scope.item_by_tb = responsea.data;
            $scope.s_ch_v = 10;//s_chg tot_b
            $scope.tot = 0;
            $scope.s_chg = 0;
            $scope.g_tot = 0;
            for (var c = 0; c < $scope.item_by_tb.length; c++) {
                $scope.item_by_tb[c].r = 1;
                $scope.tot = Number($scope.tot) + Number($scope.item_by_tb[c].dis_v);
            }
            $scope.s_chg = (Number($scope.tot) / 100) * Number($scope.s_ch_v);
            $scope.g_tot = Number($scope.tot) + Number($scope.s_chg);

            $scope.bill_poot = [];
            $scope.bill_poot.push({ n: 'Total', v: $scope.tot });
            $scope.bill_poot.push({ n: 'Service ' + $scope.s_ch_v + '%', v: $scope.s_chg });
            $scope.bill_poot.push({ n: 'Grand Total ', v: $scope.g_tot });

        }, function (responsea) { });
    };

    $scope.sel_tb = function (a) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        console.log(a);
        $scope.seled_tb_id = a.sysID;
        $scope.seled_tb = a.n;
        $scope.tb_view = 2;
        $scope.cat_lst = true;
        $scope.tb_owner = a.u;
       
        $scope.load_tb_data_sel();
    };

    $scope.new_order = [];
    $scope.add_item = function (a) {

        var dd = { 'n': a.n, 'pn': a.pn, 'sp': a.sp, 'sysID': a.sysID, "dis_v": a.dis_v, "i_c": $scope.i_c };
        $scope.new_order.push(dd);
        $scope.i_c = "";
       // console.log($scope.new_order);
    };

    $scope.remove_item = function (a) {
        var index = $scope.new_order.indexOf(a);
        $scope.new_order.splice(index, 1);
    };
    $scope.order_save = function () {
      // console.log($scope.new_order);
       if (Number($scope.tb_owner) == 0) { $scope.tb_owner = $scope.uid; };
      var bbb = [];
       for (var x = 0; x < $scope.new_order.length; x++) {
         
            $scope.new_order[x].uid = $scope.uid;
            $scope.new_order[x].tbid = $scope.seled_tb_id;
            $scope.new_order[x].tbid_owr = $scope.tb_owner;
      var dd = {
                "sysID": $scope.new_order[x].sysID,
                "tbid": $scope.seled_tb_id,
                "uid": $scope.uid,
                "tb_owr": $scope.tb_owner,
          "dt": $filter('date')(new Date(), 'yyyy/MM/dd HH:mm:ss'),
          "i_c": $scope.new_order[x].i_c
            }
         //  console.log(dd)
         //  console.log($scope.new_order[x]);
           bbb.push(dd);
     };
        console.log(bbb);
        $http.post('./api/WorkApi/SavTbOr', JSON.stringify(bbb)).then(function (responsea) { // save_table_order
            console.log(responsea.data);
            $window.location.reload();
        }, function (responsea) { });

        //connection.invoke("SendMessage", $scope.dn, "New Order").catch(function (err) {
        //    return console.error(err.toString());
        //});
      
      
    };

    $scope.all_tb_view = function () {
        
        $scope.tb_view = 1;
        $scope.seled_tb_id = 0;
        $scope.seled_tb = "";

        var tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        var tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementById('London').style.display = "block";
        document.getElementById('b1').classList.add('active');
    };
    $scope.tb_billing = 0;
    // finsh_bill_tb
    $scope.finsh_bill_tb = function () {
        $scope.tb_billing = 1;
      //  modal.style.display = "block";
        $scope.bill_amount = $scope.g_tot; 
                 
        $scope.bill_2 = [];  
        var bbb = [];
        
        if (Number($scope.tb_billing) == 1) {
            $scope.bill = $scope.item_by_tb;
            $scope.service_fee = $scope.s_ch_v;
            $scope.total = 0;
            for (var c = 0; c < $scope.bill.length; c++) {
                $scope.bill[c].tot = (Number($scope.bill[c].dis_v) * 1);
            }
            for (var c = 0; c < $scope.bill.length; c++) {
                $scope.total = Number($scope.total) + Number($scope.bill[c].tot);
            }
            $scope.serv_chg = (Number($scope.total) / 100) * Number($scope.s_ch_v);
            $scope.grand_tot = Number($scope.total) + Number($scope.serv_chg);


            for (var x = 0; x < $scope.item_by_tb.length; x++) {
                //  console.log($scope.item_by_tb[x]);
                var i_c = '';
                if (angular.isUndefined($scope.item_by_tb[x].i_c)) { i_c = ''; } else { i_c = $scope.item_by_tb[x].i_c; }
                var dd = {
                    "SysID": $scope.item_by_tb[x].sysID,
                    "typ": $scope.seled_tb_id,
                    "u": $scope.item_by_tb[x].u,
                    "i_c": i_c,
                    "tot": $scope.bill_amount,
                    "dt": $filter('date')(new Date(), 'yyyy/MM/dd HH:mm:ss'),
                    "sp": $scope.item_by_tb[x].dis_v,
                    "q": 1,
                    "cash": 0,
                    "card": 0,
                    "oth": "0",
                    "not": $scope.pay_not,
                    "c": $scope.uid,
                    "sf": $scope.s_ch_v,
                    "dis": 0
                };
                bbb.push(dd);
               

                var bill_data = {
                    "sysID": $scope.item_by_tb[x].sysID,
                    "pn": $scope.item_by_tb[x].pn,
                    "sp": $scope.item_by_tb[x].sp,
                    "dis_v": $scope.item_by_tb[x].dis_v,
                    "i_c": i_c,
                    "q": '1',
                    "dis": 0
                };


                if ($scope.bill_2 == '' || $scope.bill_2 == null || $scope.bill_2.length < 0) {
                    $scope.bill_2.push(bill_data);
                } else {
                    var b = 0;
                    for (var xx = 0; xx < $scope.bill_2.length; xx++) {
                      
                        if (Number($scope.item_by_tb[x].sysID) == Number($scope.bill_2[xx].sysID)) { console.log($scope.bill_2[xx]); $scope.bill_2[xx].q = Number($scope.bill_2[xx].q) + 1; b = 1; }
                    }
                    if (Number(b) == 0) { $scope.bill_2.push(bill_data);   }

                }

               
            }; // tb billing
        };
        $timeout(function () {

            for (var xx = 0; xx < $scope.bill_2.length; xx++) {

                $scope.bill_2[xx].tot = Number($scope.bill_2[xx].dis_v) * Number($scope.bill_2[xx].q);
            }
            $scope.bill = $scope.bill_2;
        }, 200);
        console.log(bbb);
        $timeout(function () {
            $http.post('./api/WorkApi/save_invoice', JSON.stringify(bbb)).then(function (responsea) {
                $scope.invoice_no = responsea.data;
            
                $scope.print();
            }, function (responsea) { });
        }, 200);


       // console.log($scope.item_by_tb);
    };



    /// table end ----------------------------

    // report
    $scope.load_data_01 = function (a) {

        for (var c = 0; c < $scope.CashInvLst.length; c++) {
            if (Number($scope.CashInvLst[c].sysID) == Number(a.sysID)) {
                $scope.CashInvLst[c].sel = 1;
            } else {
                $scope.CashInvLst[c].sel = 0;
            }
        }

        $scope.InvDataV = [];
        $scope.inv_info = a.inv + " " + a.tbn + " ";
        var bbb = {
            "SysID": "exec [dbo].[InvDataV] '" + a.sysID +"'"
        };
        $http.post('./api/MasterApi/sp', JSON.stringify(bbb)).then(function (responsea) {
            $scope.InvDataV = responsea.data;
            
        }, function (responsea) { });
    };

    $scope.load_data_02 = function (a) {
        
        for (var c = 0; c < $scope.CashItem.length; c++) {
            if (Number($scope.CashItem[c].pid) == Number(a.pid)) {
                $scope.CashItem[c].sel = 1;
            } else {
                $scope.CashItem[c].sel = 0;
            }
        }
   
    };


    /// report end






    pushNotify();
    function pushNotify() {
        if (!("Notification" in window)) {
            // checking if the user's browser supports web push Notification
            alert("Web browser does not support desktop notification");
        } else if (Notification.permission === "granted") {
            console.log("Permission to show web push notifications granted.");
            // if notification permissions is granted,
            // then create a Notification object
            // createNotification();
        } else if (Notification.permission !== "denied") {
            alert("Going to ask for permission to show web push notification");
            // User should give explicit permission
            Notification.requestPermission().then((permission) => {
                // If the user accepts, let's create a notification
                // createNotification();
            });
        }
        // User has not granted to show web push notifications via Browser
        // Let's honor his decision and not keep pestering anymore
    }
    $scope.noti = function () {
        var notification = new Notification('Web Push Notification', {
            icon: 'https://phppot.com/badge.png',
            body: 'New article published!',
        });
        // url that needs to be opened on clicking the notification
        // finally everything boils down to click and visits right
        notification.onclick = function () {
            window.open('https://phppot.com');
        };
    };









    "use strict";

    var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

   

    connection.on("ReceiveMessage", function (user, message) {

        console.log(user + " > " + message);
        var notification = new Notification('RMS Notification > ' + user, {
            icon: 'https://phppot.com/badge.png',
            body: message,
        });
        // url that needs to be opened on clicking the notification
        // finally everything boils down to click and visits right
        notification.onclick = function () {
            window.open('https://phppot.com');
        };
 
    });

    connection.start().then(function () {
        console.log("Wada karanna gaththa");
    }).catch(function (err) {
        return console.error(err.toString());
    });

    $scope.sendOK = function () {
        connection.invoke("SendMessage", "Waiter", $scope.msg).catch(function (err) {
            return console.error(err.toString());
        });

    };







    $scope.exit = function () {
        localStorage.setItem("dn", "");
        localStorage.setItem("uid", 0);
        localStorage.setItem("ul", 0);
        $window.location.href = './login.html';
    };


});