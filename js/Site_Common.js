function PSearch() {
    var e = $.trim($("#txtSearch").val());
    return "" == e ? (alert("Please enter product name!"), !1) : !(e.length <= 1) && !(e.indexOf("<") > -1 || e.indexOf(">") > -1) && (e = e.replace("/", "XieXian"), void(location.href = "http://" + document.domain + "/search/" + encodeURIComponent(e.replace(/\+/g, "((()))")) + ".html"))
}

function submitEmail() {
    var e = $("#FootEmail").val();
    if ("" == e) return alert("Please enter a  email "), $("#FootEmail").focus(), !1;
    if (!/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(e) && "" !== $.trim(e)) return alert("Please enter a valid email format"), $("#FootEmail").focus(), !1;
    var t = $("#FootEM_Name").length > 0 ? $("#FootEM_Name").val() : e;
    $.ajax({
        type: "POST",
        url: "/OutOpen/SubmitEmail",
        data: {
            email: $("#FootEmail").val(),
            name: t,
            pageUrl: document.URL
        },
        dataType: "jsonp",
        crossDomain: !0,
        jsonp: "callback",
        jsonpCallback: "result",
        error: function (e, t, a) {
            return alert("Submit failed, Please try again later!"), $("#FootEmail").val(""), !1
        },
        success: function (e) {
            alert("Submit successfully, we will contact you soon!"), $("#FootEmail").val("")
        },
        async: !1
    })
}

function FixJqText(e) {
    return e.replace(/\+/g, "＋")
}
function submitInquiry() {
    var e = $.trim($("#SubmitEmail_I").val());
    if ("" == e || "E-mail Address" == e) return alert("Please enter the Email!"), $("#SubmitEmail_I").val("").focus(), !1;
    if (!/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(e)) return alert("Please enter a valid email format"), $("#SubmitEmail_I").focus(), !1;
    var t = $.trim($("#SubmitContent_I").val());
    if ($("#SubmitContent_I").length > 0) {
        if ("Content" == t || "" == t) return alert("Please enter the content!"), $("#SubmitContent_I").val("").focus(), !1;
        if (t.length > 2e3) return alert("Contents of the number of characters can not be more than 2000!"), $("#SubmitContent_I").focus(), !1;
        t = escape(FixJqText(t))
    }
    var a = $.trim($("#SubmitName_I").val()),
        n = $.trim($("#SubmitCompanyName_I").val()),
        l = $.trim($("#SubmitTitle_I").val()),
        i = $.trim($("#SubmitPhone_I").val());
    if ("" != a && (a = escape(FixJqText(a))), "" != n && (n = escape(FixJqText(n))), "" != l) {
        if (l.length > 340) return alert("The title you have entered is too long!"), $("#SubmitTitle_I").focus(), !1;
        l = escape(FixJqText(l))
    }
    return "" != i && (i = escape(FixJqText(i))), $.ajax({
        type: "POST",
        url: "/OutOpen/SaveInquirySimp",
        data: {
            name: a,
            company: n,
            proId: Number($.trim($("#productID").val())),
            phone: i,
            email: e,
            title: l,
            content: t,
            pageUrl: document.URL
        },
        dataType: "jsonp",
        crossDomain: !0,
        jsonp: "callback",
        jsonpCallback: "result",
        error: function (e, t, a) {
            alert("Submit failed, Please try again later!")
        },
        success: function (e) {
            "1" == e ? ($("#ImgSend_I").removeAttr("disabled"), alert("Submit successfully, we will contact you soon!"), $("#SubmitContent_I").val("")) : "-1" == e ? alert("Send failure, send too frequently!") : alert("Please don't send it repeatedly!")
            
        },
        async: !1
    }), !1
}

function submitInquiryIC() {
    var e = $.trim($("#SubmitEmail_IC").val());
    if ("" == e || "E-mail Address" == e) return alert("Please enter the Email!"), $("#SubmitEmail_IC").val("").focus(), !1;
    if (!/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(e)) return alert("Please enter a valid email format"), $("#SubmitEmail_IC").focus(), !1;
    var t = $.trim($("#SubmitContent_IC").val());
    if ($("#SubmitContent_IC").length > 0) {
        if ("Content" == t || "" == t) return alert("Please enter the content!"), $("#SubmitContent_IC").val("").focus(), !1;
        if (t.length > 2e3) return alert("Contents of the number of characters can not be more than 2000!"), $("#SubmitContent_IC").focus(), !1;
        t = escape(FixJqText(t))
    }
    var a = $.trim($("#SubmitName_IC").val()),
        n = $.trim($("#SubmitCompanyName_IC").val()),
        l = $.trim($("#SubmitTitle_IC").val()),
        i = $.trim($("#SubmitPhone_IC").val()),
        o = $.trim($("#VCode").val());
    if ("" != a && (a = escape(FixJqText(a))), "" != n && (n = escape(FixJqText(n))), "" != l) {
        if (l.length > 340) return alert("The title you have entered is too long!"), $("#SubmitTitle_IC").focus(), !1;
        l = escape(FixJqText(l))
    }
    return "" != i && (i = escape(FixJqText(i))), "" == o ? (alert("Please enter the validation code !"), $("#VCode").val("").focus(), !1) : null == o.match(/^[A-Za-z0-9]{5,5}$/) ? (alert("validation code is incorrect !"), $("#VCode").val("").focus(), !1) : ($.ajax({
        type: "POST",
        url: "/OutOpen/SaveInquirySimpCode",
        data: {
            name: a,
            company: n,
            code: o,
            phone: i,
            email: e,
            title: l,
            content: t,
            pageUrl: document.URL
        },
        dataType: "jsonp",
        crossDomain: !0,
        jsonp: "callback",
        jsonpCallback: "result",
        error: function (e, t, a) {
            alert("Submit failed, Please try again later!")
        },
        success: function (e) {
            "1" == e ? (alert("Submit successfully, we will contact you soon!"), $("#SubmitContent_IC").val(""), $("#VCode").val(""), $("#vcodeimg").attr("src", "/o/IC?rid=" + Math.random())) : "-1" == e ? alert("Send failure, send too frequently!") : "-333" == e ? alert("validation code is incorrect!") : alert("Send failed, please re submit!")
        },
        async: !1
    }), !1)
}

function submitFloatInquiry() {
    var e = $.trim($("#SubmitEmail_Float").val());
    if ("" == e || "E-mail" == e) return alert("Please enter the Email!"), $("#SubmitEmail_Float").val("").focus(), !1;
    if (!/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(e)) return alert("Please enter a valid email format"), $("#SubmitEmail_Float").focus(), !1;
    var t = $.trim($("#SubmitContent_Float").val());
    if ($("#SubmitContent_Float").length > 0) {
        if ("Content" == t || "" == t) return alert("Please enter the content!"), $("#SubmitContent_Float").val("").focus(), !1;
        if (t.length > 2e3) return alert("Contents of the number of characters can not be more than 2000!"), $("#SubmitContent_Float").focus(), !1;
        t = escape(FixJqText(t))
    }
    return $.ajax({
        type: "POST",
        url: "/OutOpen/SaveInquirySimp",
        data: {
            name: "",
            company: "",
            proId: 0,
            phone: "",
            email: e,
            title: "",
            content: t,
            pageUrl: document.URL
        },
        dataType: "jsonp",
        crossDomain: !0,
        jsonp: "callback",
        jsonpCallback: "result",
        error: function (e, t, a) {
            alert("Submit failed, Please try again later!")
        },
        success: function (e) {
            "1" == e ? ($("#ImgSend_Float").removeAttr("disabled"), alert("Submit successfully, we will contact you soon!"), $("#SubmitContent_Float").val("")) : "-1" == e ? alert("Send failure, send too frequently!") : alert("Send failed, please re submit!")
        },
        async: !1
    }), !1
}

function ShowHid(e, t) {
    "none" == $("#" + e).css("display") ? ($("#" + e).show(), $("#" + t).removeClass("bodyRight100").addClass("bodyRight")) : ($("#" + e).hide(), $("#" + t).removeClass("bodyRight").addClass("bodyRight100"))
}

function displaySubMenu(e) {
    e.getElementsByTagName("ul")[0].style.display = "block"
}

function hideSubMenu(e) {
    e.getElementsByTagName("ul")[0].style.display = "none"
}

function showdiv(e, t) {
    var a = document.getElementById(e),
        n = document.getElementById(t);
    "inline" == a.style.display ? (a.style.display = "none", n.innerHTML = '<span class="areaon"> </span>') : (a.style.display = "inline", n.innerHTML = '<span class="areaon1">  </span>')
}
$(function () {
    $("#txtSearch").keydown(function (e) {
        13 == e.which && PSearch()
    }), $("#A_9").click(function () {
        $.ajax({
            type: "POST",
            url: "/OutOpen/AddEmailRecord",
            data: {
                fromEmail: $(this).attr("href").replace("mailto:", ""),
                pathPage: document.URL
            },
            dataType: "jsonp",
            jsonp: "callback",
            crossDomain: !0,
            jsonpCallback: "result",
            error: function () {},
            success: function (e) {},
            async: !1
        })
    })
}), $(function () {
    var e = document.getElementById("pg2");
    null != e && (e.style.display = "none")
});