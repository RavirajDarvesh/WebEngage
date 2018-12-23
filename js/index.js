$(document).ready(() => {
    const isChrome = $.browser.chrome;

    const isIncognito = callback => {
        let fs = window.RequestFileSystem || window.webkitRequestFileSystem;
        if (!fs) {
            callback(false);
        } else {
            fs(
                window.TEMPORARY,
                100,
                callback.bind(undefined, false),
                callback.bind(undefined, true)
            );
        }
    };

    isIncognito(itIs => {
        if (!itIs && isChrome) {
            //   console.log("You are in chrome & NOT in incognito mode");
            const urlString = $(location)
                .attr("search")
                .split("=");
            const nameValue = urlString[0].substr(1);
            const passedValue = urlString[1];
            //   console.log(nameValue);

            const current = e => {
                return $("input[type=radio][value=" + e + "]").attr(
                    "checked",
                    "checked"
                );
            };

            if (nameValue == "ayush") {
                current(passedValue);
            }

            $("input[type=radio]").on("change", e => {
                // console.log("changed");

                let checkedRadio = $("input[type='radio']:checked").val();
                // console.log(checkedRadio);

                if (current != checkedRadio) {
                    //   console.log("not equal");
                    location.reload(true);
                }
            });
        } else {
            //   console.log("You are in incognito mode or not in chrome");
        }
    });
});