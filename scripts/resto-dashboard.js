$(document).ready(function() {
    //get the current account settings values
    const currentSettings = {};
    storeSettingsValues();
    //function to get the current values of the inputs
    function storeSettingsValues(){
        currentSettings.firstName = $("input[name=first-name]").val();
        currentSettings.lastName = $("input[name=last-name]").val();
        currentSettings.phone = $("input[name=phone]").val();
        currentSettings.email = $("input[name=email]").val();
        currentSettings.street = $("input[name=street]").val();
        currentSettings.city = $("input[name=city]").val();
        currentSettings.state = $("input[name=state]").val();
        currentSettings.zip = $("input[name=zip]").val();
        currentSettings.password = $("input[name=password]").val();
        currentSettings.frequency = $("select").find(":selected").val();
        currentSettings.start = $("input[name=start-date]").val();
        currentSettings.end = $("input[name=end-date]").val();
        currentSettings.time = $("input[name=appt-time]").val();
        currentSettings.days = [];
        $("input[type=checkbox]:checked").each(function(index, item){
            currentSettings.days.push($(item).val());
        });
    }

    function setToOriginalValues(){
        $("input[name=first-name]").val(currentSettings.firstName);
        $("input[name=last-name]").val(currentSettings.lastName);
        $("input[name=phone]").val(currentSettings.phone);
        $("input[name=email]").val(currentSettings.email);
        $("input[name=street]").val(currentSettings.street);
        $("input[name=city]").val(currentSettings.city);
        $("input[name=state]").val(currentSettings.state);
        $("input[name=zip]").val(currentSettings.zip);
        $("input[name=password]").val(currentSettings.password);
        $("input[name=start-date]").val(currentSettings.start);
        $("input[name=end-date]").val(currentSettings.end);
        $("input[name=appt-time]").val(currentSettings.time);
        $("select").val(currentSettings.frequency);
        $("input[type=checkbox]").attr("hidden", "true");
        $("span").attr("hidden", "true");
        for(let i=0;i < currentSettings.days.length;i++){
            $(`input[value=${currentSettings.days[i]}]`).attr("checked", "true").removeAttr("hidden").next("span").removeAttr("hidden");
        }
    }

    //upcoming donations should be the default tab
    $(".js-donation-list").css("display", "block");
    $(".upcoming-donations").css("border-bottom", "3px ridge #5779ac");
    $(".js-account-settings").css("display", "none");

    //when account settings tab is clicked
    $(".account-settings").click(function(){
        $(".upcoming-donations").css("border-bottom", "none");
        $(".account-settings").css("border-bottom", "3px ridge #5779ac");
        $(".js-donation-list").css("display", "none");
        $(".js-account-settings").css("display", "block");
    });

    //when upcoming donations tab is clicked
    $(".upcoming-donations").click(function(){
        $(".account-settings").css("border-bottom", "none");
        $(".upcoming-donations").css("border-bottom", "3px ridge #5779ac");
        $(".js-donation-list").css("display", "block");
        $(".js-account-settings").css("display", "none");
    });

    //make the editable content editable when edit is clicked
    $(".account-settings-buttons > .edit-details").click(function(e){
        e.preventDefault();
        $(".cancel-changes").removeAttr("hidden");
        $(".edit-details").attr("hidden", "true");
        $(".js-account-settings input").removeAttr("readonly checked").css({"border-bottom": "1px solid black", "font-style": "italic"});
        $(".js-sched-type select").removeClass("no-appearance").removeAttr("disabled").addClass("select-appearance").css({"border-bottom": "1px solid black", "font-style": "italic"});
        $(".js-day-of-week input").removeClass("no-appearance").removeAttr("hidden").addClass("checkbox-appearance").css("font-style", "italic").next("span").removeAttr("hidden").css("font-style", "italic");
    });

    //when the cancel has been clicked, should show the initial settings
    $(".account-settings-buttons > .cancel-changes").click(function(e){
        e.preventDefault();
        $(".cancel-changes").attr("hidden", "true");
        $(".edit-details").removeAttr("hidden");
        setToOriginalValues();
        $(".js-account-settings input").attr("readonly", "true").css({"border-bottom": "none", "font-style": "normal"});
        $(".js-sched-type select").css({"border": "none", "font-style": "normal"}).removeClass("select-appearance").addClass("no-appearance").prop("disabled", "true");
        $(".js-day-of-week input").css("font-style", "normal").removeClass("checkbox-appearance").addClass("no-appearance").next("span").css("font-style", "normal");
    });

        
    //when the save changes is clicked
    $(".account-settings-buttons > .save-changes").click(function(e){
        e.preventDefault();
        const newDaysValue = [];
        //take the values of the checkbox input
        $("input[type=checkbox]:checked").each(function(index, item){
            newDaysValue.push($(item).val());
        });
        $("input[type=checkbox]").attr("hidden", "true");
        $("span").attr("hidden", "true");
        for(let i=0;i < newDaysValue.length;i++){
            $(`input[value=${newDaysValue[i]}]`).attr("checked", "true").removeAttr("hidden").addClass("no-appearance").removeClass("checkbox-appearance").next("span").removeAttr("hidden");
        }
        $(".cancel-changes").attr("hidden", "true");
        $(".edit-details").removeAttr("hidden");
        $(".js-account-settings input").attr("readonly", "true").css({"border-bottom": "none", "font-style": "normal"}).next("span").css("font-style", "normal");
        $(".js-sched-type select").css({"border": "none", "font-style": "normal"}).removeClass("select-appearance").addClass("no-appearance").prop("disabled", "true");
        $(".success-modal").css("display", "block");
        storeSettingsValues();
    });
  
    //okay button after changes have been made
    $(".success-modal button").click(function(e){
        e.preventDefault();
        $(".success-modal").css("display", "none");
    });
  
    //show hamburger-menu when sidebar icon is clicked
    $(".sidebar-icon").click(function(){
        $(".hamburger-menu").fadeIn().css("display", "block");
    });

    //hide hamburger-menu when X is clicked
    $(".hamburger-close").click(function(){
        $(".hamburger-menu").css("display", "none");
    });
});