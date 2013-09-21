define(["jquery"], function($) {

    var gPNRList;
    $(document).ready(function() {
        (function(i, s, o, g, r, a, m) {
            i['GoogleAnalyticsObject'] = r;
            i[r] = i[r] ||
            function() {
                (i[r].q = i[r].q || []).push(arguments)
            }, i[r].l = 1 * new Date();
            a = s.createElement(o), m = s.getElementsByTagName(o)[0];
            a.async = 1;
            a.src = g;
            m.parentNode.insertBefore(a, m)
        })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

        ga('create', 'UA-43809800-1', 'sverweij.github.io');
        ga('send', 'pageview');

        $("#submit").bind({
            click : function(e) {
                ga('send', 'event', 'submit', $("#baseurl").val());
            }
        });
        $("a").bind({
            click : function(e) {
                var x = e.currentTarget ? (e.currentTarget.href ? e.currentTarget.href : "unknown") : "unknown";
                ga('send', 'event', 'linkclick', x);
            }
        });
        $("#PNRList").bind("change", function() {
            PNRListOnChange();
        });
        $("#baseurl").bind("change", function() {
            baseurlOnChange();
        });

        $.getJSON('./pnrs.json', parsePNRs);

    });

    function baseurlOnChange() {
        $("#manual").attr("action", $("#baseurl").val());
    }

    function PNRListOnChange() {
        var i = $("#PNRList").val();
        /* init non-mandatory elements */
        $("#description").text("");

        $("#bookingcode").val(gPNRList.reservations[i].bookingcode);
        $("#lastname").val(gPNRList.reservations[i].lastname);
        if (gPNRList.reservations[i].description) {
            $("#description").text(gPNRList.reservations[i].description);
        }
        if (gPNRList.reservations[i].country) {
            $("#POS").val(gPNRList.reservations[i].country);
            $("#COUNTRY").val(gPNRList.reservations[i].country);
        }
        if (gPNRList.reservations[i].language) {
            $("#LANG").val(gPNRList.reservations[i].language);
        }
        if (gPNRList.reservations[i].entryreason || "" === gPNRList.reservations[i].entryreason) {
            $("#entryreason").val(gPNRList.reservations[i].entryreason);
        }
        if (gPNRList.reservations[i].landingpage || "" === gPNRList.reservations[i].landingpage) {
            $("#landingpage").val(gPNRList.reservations[i].landingpage);
        }
        if (gPNRList.reservations[i].viewproduct || "" === gPNRList.reservations[i].viewproduct) {
            $("#viewproduct").val(gPNRList.reservations[i].viewproduct);
        }
        if (gPNRList.reservations[i].skipheader || "" === gPNRList.reservations[i].skipheader) {
            $("#skipHeader").val(gPNRList.reservations[i].skipheader);
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

    function parsePNRs(pData) {

        try {
            gPNRList = pData;

            $("#PNRList").fadeIn("slow");
            $("#PNRList").empty();
            gPNRList.reservations.sort(compareReservation);
            for (var i = 0; i < gPNRList.reservations.length; i++) {
                $("#PNRList").append("<option value=\"" + i + "\">" + gPNRList.reservations[i].lastname + "/ " + gPNRList.reservations[i].bookingcode +
                /*
                 "<i> (" + x.reservations[i].description + ") </i>" +
                 */
                "</option>");
            }
            PNRListOnChange();
            ga('send', 'event', 'pnrlist_shown', 'true');

        } catch (e) {
            $("#PNRList").hide();
            ga('send', 'event', 'pnrlist_shown', 'false');

        }
    }

});
