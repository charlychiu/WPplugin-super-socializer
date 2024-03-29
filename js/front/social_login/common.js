function theChampLoginPopup(e) {
    if ("undefined" != typeof theChampSameTabLogin && theChampSameTabLogin == 1) {
        location.href = e
    } else {
        window.open(e, "_blank", "height=520,width=770,left=315,top=80,resizable,scrollbars,toolbar=0,personalbar=0,menubar=no,location=no,directories=no,status")
    }
}

function theChampLoadingIcon() {
    jQuery(".the_champ_login_container").html('<img id="the_champ_loading_image" src="' + theChampLoadingImgPath + '" />')
}

function theChampInitiateLogin(e) {
    var t = jQuery(e).parents("div.the_champ_login_container").find(".heateor_ss_social_login_optin");
    if (0 == t.length || jQuery(t).is(":checked")) {
        var a = e.getAttribute("alt");
        "Login with Facebook" == a ? theChampLoginPopup(theChampFacebookAuthUrl) : "Login with Twitch" == a ? theChampLoginPopup(theChampTwitchAuthUrl) : "Login with LiveJournal" == a ? heateorSsLJLoginPopup() : "Login with Steam" == a ? theChampLoginPopup(theChampSteamAuthUrl) : "Login with Twitter" == a ? theChampLoginPopup(theChampTwitterAuthUrl) : "Login with Xing" == a ? theChampLoginPopup(theChampXingAuthUrl) : ("Login with Linkedin" == a && theChampLoginPopup(theChampLinkedinAuthUrl), "Login with Google" == a ? theChampLoginPopup(theChampGoogleAuthUrl) : "Login with Vkontakte" == a ? theChampLoginPopup(theChampVkontakteAuthUrl) : "Login with Line" == a ? theChampLoginPopup(theChampLineAuthUrl) : "Login with Instagram" == a && theChampInitializeInstaLogin())
    } else t.length > 0 && jQuery(t).parent().css("color", "red")
}

function theChampDisplayLoginIcon(e, t) {
    if ("undefined" != typeof jQuery) for (var a = 0; a < t.length; a++) jQuery("." + t[a]).css("display", "block"); else for (a = 0; a < t.length; a++) for (var h = theChampGetElementsByClass(e, t[a]), i = 0; i < h.length; i++) h[i].style.display = "block"
}

function theChampValidateEmail(e) {
    return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e)
}

function the_champ_save_email(e) {
    var t = document.getElementById("the_champ_email").value.trim(),
        a = document.getElementById("the_champ_confirm_email").value.trim();
    return "save" != e.id || theChampValidateEmail(t) ? t != a ? (document.getElementById("the_champ_error").innerHTML = "Email addresses do not match", void jQuery("#TB_ajaxContent").css("height", "auto")) : void theChampCallAjax(function () {
        theChampSaveEmail(e.id, t)
    }) : (document.getElementById("the_champ_error").innerHTML = theChampEmailPopupErrorMsg, void jQuery("#TB_ajaxContent").css("height", "auto"))
}

function theChampSaveEmail(e, t) {
    document.getElementById("the_champ_error").innerHTML = '<img src="' + theChampLoadingImgPath + '" />', jQuery.ajax({
        type: "POST",
        dataType: "json",
        url: theChampAjaxUrl,
        data: {action: "the_champ_save_email", elemId: e, email: t, id: theChampEmailPopupUniqueId},
        success: function (e) {
            window.history.pushState({
                html: "html",
                pageTitle: "page title"
            }, "", "?done=1"), 1 == e.status && e.message.response && "success" == e.message.response ? location.href = e.message.url : 1 == e.status && "success" == e.message ? location.href = theChampRegRedirectionUrl : 1 == e.status && "cancelled" == e.message ? tb_remove() : 1 == e.status && "verify" == e.message ? document.getElementById("TB_ajaxContent").innerHTML = "<strong>" + theChampEmailPopupVerifyMessage + "</strong>" : 0 == e.status && (document.getElementById("the_champ_error").innerHTML = e.message, jQuery("#TB_ajaxContent").css("height", "auto"))
        },
        error: function (e, t, a) {
            location.href = decodeURIComponent(theChampRedirectionUrl)
        }
    })
}

function theChampCapitaliseFirstLetter2(e) {
    return e.charAt(0).toUpperCase() + e.slice(1)
}

if (void 0 === theChampLinkingRedirection) var theChampLinkingRedirection = "";
theChampVerified && theChampLoadEvent(function () {
    tb_show(theChampPopupTitle, theChampAjaxUrl)
}), theChampEmailPopup && theChampLoadEvent(function () {
    tb_show(theChampEmailPopupTitle, theChampEmailAjaxUrl)
});
var theChampCommentFormLogin = !1;
theChampLoadEvent(function () {
    null != theChampGetCookie("heateorSsSLOptin") && jQuery("input.heateor_ss_social_login_optin").prop("checked", !0)
}), jQuery("input.heateor_ss_social_login_optin").click(function () {
    if (jQuery(this).is(":checked")) {
        if (null == theChampGetCookie("heateorSsSLOptin")) {
            var e = new Date;
            e.setTime(e.getTime() + 31536e6), document.cookie = "heateorSsSLOptin=1; expires=" + e.toUTCString() + "; path=/"
        }
    } else document.cookie = "heateorSsSLOptin=; expires=Fri, 02 Jan 1970 00:00:00 UTC; path=/"
});