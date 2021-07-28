function FixJqText(c) {
    var d = c.replace(/\+/g, "＋");
    return d;
}
function clrearprolist()
{
    var listproinfo=$('.inquiry-pro-list').html();
    if(listproinfo!=null && listproinfo.length>0)
    {
        $('.inquiry-pro-list').css('display', 'none');
        $('.inquiry-pro-list').empty();
        localStorage.clear("]rtwlikjleUEDRQAWvErf");
    }
}
$.fn.formreset = function () {
    $(this).each(function () {
        this.reset();
    });
    $("#msg").text("");
};

function SendInquiry() {
    var g = $.trim($("#SubmitName").val());
    if (g.length > 400) {
        showAlert($lang.msgTooLongName);
        $("#SubmitName").focus();
        return false;
    }
    var j = $.trim($("#SubmitEmail").val());
    if (j == "") {
        showAlert($lang.msgInputEmail);
        $("#SubmitEmail").focus();
        return false;
    }
    var i = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!i.test(j)) {
        showAlert($lang.msgCheckEmail);
        $("#SubmitEmail").focus();
        return false;
    }
    var h = $.trim($("#SubmitTitle").val());
    if (h.length > 340) {
        showAlert($lang.msgTooLongTitle);
        $("#SubmitTitle").focus();
        return false;
    }
    var f = $.trim($("#SubmitContent").val());
    if (f == "") {
        showAlert($lang.msgInputContent);
        $("#SubmitContent").focus();
        return false;
    }
    if (f.length > 2000) {
        showAlert($lang.msgTooLongContent);
        $("#SubmitContent").focus();
        return false;
    }
	var productList = [];
    var cacheList = localStorage.getItem("]rtwlikjleUEDRQAWvErf");
    if (cacheList != '[]') {
        productList = JSON.parse(cacheList);
    }
    var proids="";
    if(productList!=null)
    {
        productList.forEach(function(item){
            if(proids=="")
            {
                proids=item.id;
            }
            else
            {
                proids=proids+","+item.id;
            }
        });
    }
    $(this).attr("disabled", "disabled");
    $("#msg").text($lang.txtSubmit);
    $.ajax({
        type: "POST",
        url: "/OutOpen/AddInquiry",
        data: {
            name: escape(FixJqText(g)),
            company: escape(FixJqText($("#SubmitCompanyName").val())),
            proId: $.trim($("#productID").val()),
            phone: $("#SubmitPhone").val(),
            email: j,
            title: escape(FixJqText(h)),
            content: escape(FixJqText(f)),
            pageUrl: document.URL,
			proidlist:proids
        },
        dataType: "json",
        error: function () {
            showAlert($lang.msgSendFailed);
            $("#ImgSend").removeAttr("disabled");
            $("#msg").text("");
        },
        success: function (a) {
            $("#ImgSend").removeAttr("disabled");
            if (a == "1") {
                showAlert($lang.msgSendSucess);
                $("#feedbackForm").formreset();
				clrearprolist();
            } else if (a == "2") {
                showAlert($lang.msgSameContent);
            } else if (a == "3") {
                location.href = "/Code";
            } else if (a == "4") {
                showAlert($lang.msgSensitiveContent);
            } else if (a == "5") {
                showAlert($lang.msgtoolongcontent);
            } else if (a == "-1") {
                showAlert($lang.msgFrequentlyContent);
            } else {
                showAlert($lang.msgSendFailed);
            }
            $("#msg").text("");
        },
        async: false
    });

    return false;
}
var fbtipint;

function showAlert(msg) {
    clearInterval(fbtipint)
    $('#feedback-title').text(window.location.host)
    $('#feedback-text').text(msg)
    $('.feedback-tips').fadeIn(200)
    fbtipint = setInterval(closefeedbackTips, 3000);
}

function closefeedbackTips() {
    $('.feedback-tips').fadeOut(200)
}
document.writeln('<link href="/images/feedback.css" rel="stylesheet" type="text/css" /><div class="feedbackForm" id="F1" name="F1"><form name="feedbackForm" action="" id="feedbackForm" method="post"><table border="0" align="center" cellspacing="0" cellpadding="0"><tr><td class="ftxt"><div class="lable">' + $lang.tdName + '</div></td><td class="fput"><input id="SubmitName" name="SubmitName" class="text" maxlength="40" /></td></tr><tr><td><div class="lable"><span class="xh">*</span>' + $lang.tdEmail + '</div></td><td><input id="SubmitEmail" name="SubmitEmail" class="text" maxlength="50" placeholder="' + $lang.tdstips + '"></td></tr><tr><td><div class="lable">' + $lang.tdPhone + '</div></td><td><input id="SubmitPhone" name="SubmitPhone" class="text" maxlength="40" /></td></tr><tr><td><div class="lable">' + $lang.tdCompanyName + '</div></td><td><input id="SubmitCompanyName" name="SubmitCompanyName" class="text" maxlength="140" /></td></tr><tr><td><div class="lable">' + $lang.tdTitle + '</div></td><td><input id="SubmitTitle" name="SubmitTitle" class="text" maxlength="340" /></td></tr><tr><td valign="top"><div class="lable"><span class="xh">*</span>' + $lang.tdContent + ':</div></td><td><textarea name="SubmitContent\" id="SubmitContent" class="atextarea" cols="50" rows="5" maxlength="2000" placeholder="' + $lang.tdxtips + '"></textarea></td></tr><tr><td></td><td><div class="fsbtn"><button type="submit" class="submita" id="ImgSend" onclick="SendInquiry();return false;">' + $lang.btnSubmit + '</button><span id="msg"></span></div></td></tr></table></form></div><div class="feedback-tips"><div class="feedback-tips-box"><p id="feedback-title"></p><p id="feedback-text"></p><button id="closeBtn" onclick="closefeedbackTips()">OK</button></div></div>')