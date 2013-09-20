define(["xaja", "jquery"],
    function(xaja, $) {

var RUNNINGLOCAL = ("file:" === window.location.protocol);
var x;
$(document).ready(function(){
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-43809800-1', 'sverweij.github.io');
    ga('send', 'pageview');
    
    $("#submit").bind({
        click : function(e) {
                    ga('send', 'event', 'submit', $("#baseurl").val());    
                }
    });
    $("a").bind({
        click : function(e) {
                    var x = e.currentTarget? (e.currentTarget.href? e.currentTarget.href: "unknown") : "unknown";
                    ga('send', 'event', 'linkclick', x);    
        }
    });
    $("#PNRList").bind("change", function () {PNRListOnChange();});
    $("#baseurl").bind("change", function () {baseurlOnChange();});
    try {
        xaja.makeJSONRequest("./pnrs.json", parsePNRs, RUNNINGLOCAL);
        ga('send', 'event', 'pnrlist_shown', 'true');
    } catch (e) {
        $("#PNRList").hide();
        ga('send', 'event', 'pnrlist_shown', 'false');
    }

});

function baseurlOnChange(){
    $("#manual").attr("action", $("#baseurl").val());
}

function PNRListOnChange () {
    var i = $("#PNRList").val();
    /* init non-mandatory elements */
    $("#description").text("");

    $("#bookingcode").val(x.reservations[i].bookingcode);
    $("#lastname").val(x.reservations[i].lastname);
    if (x.reservations[i].description) {
        $("#description").text(x.reservations[i].description);
    } 
    if (x.reservations[i].country) {
        $("#POS").val(x.reservations[i].country);
        $("#COUNTRY").val(x.reservations[i].country);
    } 
    if (x.reservations[i].language) {
        $("#LANG").val(x.reservations[i].language);
    } 
     if (x.reservations[i].entryreason||""===x.reservations[i].entryreason){
        $("#entryreason").val(x.reservations[i].entryreason);
    } 
    if (x.reservations[i].landingpage||""===x.reservations[i].landingpage){
        $("#landingpage").val(x.reservations[i].landingpage);
    } 
    if (x.reservations[i].viewproduct||""===x.reservations[i].viewproduct){
        $("#viewproduct").val(x.reservations[i].viewproduct);
    } 
    if (x.reservations[i].skipheader||""===x.reservations[i].skipheader){
        $("#skipHeader").val(x.reservations[i].skipheader);
    } 

}

function compareReservation(pReservation1, pReservation2) {
    if (pReservation1.lastname > pReservation2.lastname) {
        return 1;
    }
    if (pReservation1.lastname < pReservation2.lastname) {
        return -1;
    }
    return 0;
}

function parsePNRs (pData) {
    try {
        x = JSON.parse(pData);
        var totalDuration = 0;

        $("#PNRList").fadeIn("slow");
        $("#PNRList").empty();
        x.reservations.sort(compareReservation);
        for (var i=0;i<x.reservations.length;i++) {
            $("#PNRList").append("<option value=\"" + i +  "\">" +
                    x.reservations[i].lastname + "/ " +
                    x.reservations[i].bookingcode +
                    /*
                    "<i> (" + x.reservations[i].description + ") </i>" + 
                    */
                    "</option>");
        }
        PNRListOnChange();
    } catch (e) {
        $("#PNRList").hide();
    }
}

});
