



var privateKey = "-----BEGIN PRIVATE KEY-----\n" +
    "MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC1murQrbvmu6kw\n" +
    "uDiCCqYRvVWDvKruST9F2iTW2QdJW8hMpqQP/xYGun89vLP5vrHpu+nZoCN8pqua\n" +
    "z9CWSLgEla8iMJbv19sZJX6eTG33aUxDUojWM/w0GO8AF7ki9bwauwsLB5YAbgQ8\n" +
    "v7lTo4aTTyVih3GSwcDiZK4gqQHgAWPccscX95oawvbgqrXDr5EgcsE+0l6Wg/IW\n" +
    "hLH+a1FlvaO6Q0zzUvBEnNUxmilLHDwkSS/F9zK+DcSwu9Edn2J7TqLRBb44ALWV\n" +
    "w1Vwft56IOMdWRXPxuA50raWqNkhlxtbHUmSWy797p/0igzIhBzMUg8Md3kFkCZ8\n" +
    "NGuQ+YxxAgMBAAECggEAAs3O5xStoGcAml7XyYM4U/EKTVfIBFiXbGDNPY95hjOP\n" +
    "dMaEZTZVLNqrjQSZO0eLV+5lso1fSuUIZIIlqHJcO/7jJrodFHwu1vUuHqvTrVSf\n" +
    "/7CaKgOAtv21D/lty3lDk56UcbHG6kAImvcDWaQeV28rBrnMYj2RWLWA/kJZw+9+\n" +
    "3Lyf6A1hKxOxLKpdmXxzVypDaR1aetF9QKmhk/qd2gCERY6i2PQYgPx5BmY9dGxQ\n" +
    "u1ay5K+gMTXYFwVC17ULWAJ0rDbj1wvurkQPCYj0xGE59iGBMas5Yj57xt1/T2mE\n" +
    "tafrwJldKegyUmA4LBRrdkKnNa33mfeVGCTuZinowQKBgQDwEQmfLSB4wNpbfWXC\n" +
    "EFCovsWD0Z8hcigLZUYOqHMKPrTFYCaC7FJLGRYj4U6VxVJgfXyfHZ4rLCVI1ZKB\n" +
    "SMKH4eif87L3MuyA73D6AKXWsNNivnWfRFeJWQIMp4omUfNevD3GriQBwQhzoB1+\n" +
    "Ms4y8inx1KPpF5dEXq1S6whpUQKBgQDBqJBdmkCKxDvXmusSSZMBZhwIbFe9vzM+\n" +
    "6vUExkhEd0yaJqayKOsWjfqgBAt6j66O/Izw85vyM6BeCW8cKkcBGqqvXVLDfnKs\n" +
    "dMzrjrcFXHP3H/79MHjYUzv9724YQO4eS8tTk4MakvwQCghr+ab550iJaoHeT8WS\n" +
    "piOQKiYpIQKBgG7qAD8Js3H28CvLAOOrdAiys0DW7aWfP38cWETXcOcv14dFiCV/\n" +
    "F/pYadFD/HHYC9pGv/gnz/b0W3mOKzUOL8pmBns4NdxeK8TaW6E2AWjyo4eApYlj\n" +
    "IupzNC4yjfJsdHu1jvknZb1luQjq1hWDVZ9WISj47I3590qAT6X6rxUxAoGBAJ/K\n" +
    "srRJXxAhMy+ICIciZkY1NtRMcWmDpok33cx+v4qe1XosgkdnM/N8W1xFeiM7A1HA\n" +
    "WZtHp1mF98EgD6oxyDzFACmK24urfnuGNL/5FlM6IgW7RO8tW8lDhLDXKwSgLtqY\n" +
    "t8DSas82kP27CY/ugzSY/mVEmLwTHncO1zFRVgOBAoGBAKrv7CWkGhRPi8mZ5/kI\n" +
    "powMgChg8t24yC6Auw735Dzp2A2x3arURoXAN9RkA4RMyB1G25sEG9VUtGoe4mFI\n" +
    "biM9HbrF5WkF78SMHn/WuUdMCH5YxKIywzBYe0ikionCJcXDs/EVWO41NEn3TAJG\n" +
    "08LjeWhqIb3esjNSLTQGyYk1\n" +
    "-----END PRIVATE KEY-----";



qz.security.setCertificatePromise(function (resolve, reject) {
    
    resolve("-----BEGIN CERTIFICATE-----\n" +
        "MIIECzCCAvOgAwIBAgIGAZEM9HPMMA0GCSqGSIb3DQEBCwUAMIGiMQswCQYDVQQG\n" +
        "EwJVUzELMAkGA1UECAwCTlkxEjAQBgNVBAcMCUNhbmFzdG90YTEbMBkGA1UECgwS\n" +
        "UVogSW5kdXN0cmllcywgTExDMRswGQYDVQQLDBJRWiBJbmR1c3RyaWVzLCBMTEMx\n" +
        "HDAaBgkqhkiG9w0BCQEWDXN1cHBvcnRAcXouaW8xGjAYBgNVBAMMEVFaIFRyYXkg\n" +
        "RGVtbyBDZXJ0MB4XDTI0MDczMTA4MDAzMloXDTQ0MDczMTA4MDAzMlowgaIxCzAJ\n" +
        "BgNVBAYTAlVTMQswCQYDVQQIDAJOWTESMBAGA1UEBwwJQ2FuYXN0b3RhMRswGQYD\n" +
        "VQQKDBJRWiBJbmR1c3RyaWVzLCBMTEMxGzAZBgNVBAsMElFaIEluZHVzdHJpZXMs\n" +
        "IExMQzEcMBoGCSqGSIb3DQEJARYNc3VwcG9ydEBxei5pbzEaMBgGA1UEAwwRUVog\n" +
        "VHJheSBEZW1vIENlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC1\n" +
        "murQrbvmu6kwuDiCCqYRvVWDvKruST9F2iTW2QdJW8hMpqQP/xYGun89vLP5vrHp\n" +
        "u+nZoCN8pquaz9CWSLgEla8iMJbv19sZJX6eTG33aUxDUojWM/w0GO8AF7ki9bwa\n" +
        "uwsLB5YAbgQ8v7lTo4aTTyVih3GSwcDiZK4gqQHgAWPccscX95oawvbgqrXDr5Eg\n" +
        "csE+0l6Wg/IWhLH+a1FlvaO6Q0zzUvBEnNUxmilLHDwkSS/F9zK+DcSwu9Edn2J7\n" +
        "TqLRBb44ALWVw1Vwft56IOMdWRXPxuA50raWqNkhlxtbHUmSWy797p/0igzIhBzM\n" +
        "Ug8Md3kFkCZ8NGuQ+YxxAgMBAAGjRTBDMBIGA1UdEwEB/wQIMAYBAf8CAQEwDgYD\n" +
        "VR0PAQH/BAQDAgEGMB0GA1UdDgQWBBQNC++pHzsRJREgjbNRreLaG1KFLzANBgkq\n" +
        "hkiG9w0BAQsFAAOCAQEAnCjhZTOw9zYROMtj4BfnLROdlWts70bl1AL+u2Zo2BEu\n" +
        "fUWLDo5vassXOC+EJneOty52W7YBel6wolBkBuaGioRxO+nfJ3mHQLelKC9rsx8p\n" +
        "HK5Y/hlyYM3T5ALah0EkYlL5N2oYOfUUxmnAe9f6mGJ9Ebjf9KinYW5FL/opjXB6\n" +
        "KDeGOYENuZdulmMTUJ3Ivf9YavlMceGSxcd54r9a2MI2/J2dDsjbfaxoRc+CeOZT\n" +
        "i4EiJcWBSKjV5NB47qU7+rVWwVjsAJUJXUXGgYV9DZybsUxRqva+Qov2PttIhGac\n" +
        "HBsWIoFRNN4sfnjCN4SLOrJQMwHSTq4PYxQitNbURg==\n" +
        "-----END CERTIFICATE-----\n" +
        "--START INTERMEDIATE CERT--\n" +
        "-----BEGIN CERTIFICATE-----\n" +
        "MIIFEjCCA/qgAwIBAgICEAAwDQYJKoZIhvcNAQELBQAwgawxCzAJBgNVBAYTAlVT\n" +
        "MQswCQYDVQQIDAJOWTESMBAGA1UEBwwJQ2FuYXN0b3RhMRswGQYDVQQKDBJRWiBJ\n" +
        "bmR1c3RyaWVzLCBMTEMxGzAZBgNVBAsMElFaIEluZHVzdHJpZXMsIExMQzEZMBcG\n" +
        "A1UEAwwQcXppbmR1c3RyaWVzLmNvbTEnMCUGCSqGSIb3DQEJARYYc3VwcG9ydEBx\n" +
        "emluZHVzdHJpZXMuY29tMB4XDTE1MDMwMjAwNTAxOFoXDTM1MDMwMjAwNTAxOFow\n" +
        "gZgxCzAJBgNVBAYTAlVTMQswCQYDVQQIDAJOWTEbMBkGA1UECgwSUVogSW5kdXN0\n" +
        "cmllcywgTExDMRswGQYDVQQLDBJRWiBJbmR1c3RyaWVzLCBMTEMxGTAXBgNVBAMM\n" +
        "EHF6aW5kdXN0cmllcy5jb20xJzAlBgkqhkiG9w0BCQEWGHN1cHBvcnRAcXppbmR1\n" +
        "c3RyaWVzLmNvbTCCAiIwDQYJKoZIhvcNAQEBBQADggIPADCCAgoCggIBANTDgNLU\n" +
        "iohl/rQoZ2bTMHVEk1mA020LYhgfWjO0+GsLlbg5SvWVFWkv4ZgffuVRXLHrwz1H\n" +
        "YpMyo+Zh8ksJF9ssJWCwQGO5ciM6dmoryyB0VZHGY1blewdMuxieXP7Kr6XD3GRM\n" +
        "GAhEwTxjUzI3ksuRunX4IcnRXKYkg5pjs4nLEhXtIZWDLiXPUsyUAEq1U1qdL1AH\n" +
        "EtdK/L3zLATnhPB6ZiM+HzNG4aAPynSA38fpeeZ4R0tINMpFThwNgGUsxYKsP9kh\n" +
        "0gxGl8YHL6ZzC7BC8FXIB/0Wteng0+XLAVto56Pyxt7BdxtNVuVNNXgkCi9tMqVX\n" +
        "xOk3oIvODDt0UoQUZ/umUuoMuOLekYUpZVk4utCqXXlB4mVfS5/zWB6nVxFX8Io1\n" +
        "9FOiDLTwZVtBmzmeikzb6o1QLp9F2TAvlf8+DIGDOo0DpPQUtOUyLPCh5hBaDGFE\n" +
        "ZhE56qPCBiQIc4T2klWX/80C5NZnd/tJNxjyUyk7bjdDzhzT10CGRAsqxAnsjvMD\n" +
        "2KcMf3oXN4PNgyfpbfq2ipxJ1u777Gpbzyf0xoKwH9FYigmqfRH2N2pEdiYawKrX\n" +
        "6pyXzGM4cvQ5X1Yxf2x/+xdTLdVaLnZgwrdqwFYmDejGAldXlYDl3jbBHVM1v+uY\n" +
        "5ItGTjk+3vLrxmvGy5XFVG+8fF/xaVfo5TW5AgMBAAGjUDBOMB0GA1UdDgQWBBSQ\n" +
        "plC3hNS56l/yBYQTeEXoqXVUXDAfBgNVHSMEGDAWgBQDRcZNwPqOqQvagw9BpW0S\n" +
        "BkOpXjAMBgNVHRMEBTADAQH/MA0GCSqGSIb3DQEBCwUAA4IBAQAJIO8SiNr9jpLQ\n" +
        "eUsFUmbueoxyI5L+P5eV92ceVOJ2tAlBA13vzF1NWlpSlrMmQcVUE/K4D01qtr0k\n" +
        "gDs6LUHvj2XXLpyEogitbBgipkQpwCTJVfC9bWYBwEotC7Y8mVjjEV7uXAT71GKT\n" +
        "x8XlB9maf+BTZGgyoulA5pTYJ++7s/xX9gzSWCa+eXGcjguBtYYXaAjjAqFGRAvu\n" +
        "pz1yrDWcA6H94HeErJKUXBakS0Jm/V33JDuVXY+aZ8EQi2kV82aZbNdXll/R6iGw\n" +
        "2ur4rDErnHsiphBgZB71C5FD4cdfSONTsYxmPmyUb5T+KLUouxZ9B0Wh28ucc1Lp\n" +
        "rbO7BnjW\n" +
        "-----END CERTIFICATE-----\n");
});

qz.security.setSignatureAlgorithm("SHA512"); // Since 2.1
//qz.security.setSignaturePromise(function (toSign) {
//    return function (resolve, reject) {
//        //Preferred method - from server
//        //            fetch("/secure/url/for/sign-message?request=" + toSign, {cache: 'no-store', headers: {'Content-Type': 'text/plain'}})
//        //              .then(function(data) { data.ok ? resolve(data.text()) : reject(data.text()); });

//        //Alternate method - unsigned
//        resolve(); // remove this line in live environment
//    };
//});

qz.security.setSignaturePromise(function (toSign) {
    return function (resolve, reject) {
        try {
            var pk = KEYUTIL.getKey(privateKey);
            var sig = new KJUR.crypto.Signature({ "alg": "SHA512withRSA" });  // Use "SHA1withRSA" for QZ Tray 2.0 and older
            sig.init(pk);
            sig.updateString(toSign);
            var hex = sig.sign();
         //   console.log("DEBUG: \n\n" + stob64(hextorstr(hex)));
            resolve(stob64(hextorstr(hex)));
        } catch (err) {
            console.error(err);
            reject(err);
        }
    };
});



qz.websocket.connect().then(function () {
    console.log("Connected!");
    //qz.printers.find("POS-58").then(function (found) {
    //    console.log("Printer: " + found);
    //});
});


var cfg = null;

function getUpdatedConfig(cleanConditions) {
    if (cfg == null) {
        cfg = qz.configs.create(null);
    }
    updateConfig(cleanConditions || {});
    return cfg
}

function updateConfig(cleanConditions) {
    cfg.reconfigure({
        forceRaw: false,
        encoding: '',
        spool: { size: null },
        bounds: null,
        colorType: 'blackwhite',
        copies: 1,
        density: '',
        duplex: false,
        interpolation: 'bicubic',
        jobName: '',
        margins: '',
        orientation: null,
        paperThickness: null,
        printerTray: null,
        rasterize: false,
        rotation: 0,
        scaleContent: true,
        size: null,
        units: 'in'
    });
}

function getUpdatedOptions(onlyPixel) {

    if (onlyPixel) {

        return {
            pageWidth: '',
            pageHeight: '',
            pageRanges: '',
            ignoreTransparency: false,
            altFontRendering: false

        };
    }
}


function setPrinter(printer) {
    var cf = getUpdatedConfig();
    cf.setPrinter(printer);
    /* $("#configPrinter").html(printer);*/
}