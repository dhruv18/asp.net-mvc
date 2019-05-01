

$(function () {

    var ajaxFormSubmit = function () {
        var $form = $(this);

        var options = {
            url: $form.attr("action"),
            type: $form.attr("method"),
            data: $form.serialize()
        };

        $.ajax(options).done(function (data) {//for async call to server
             //response from server store in (data)
            var $target = $($form.attr("data-otf-target"));
            var $newHtml = $(data); //store data in jqery variable for effect after replacing  data
            $target.replaceWith($newHtml); //for no effect use $target.replaceWith(data)
            $newHtml.effect("highlight");//we can use any effect like:= highlight
        });

        return false; //Prevent browser to do it's default action like going to server and rejoint the page
    };

    var submitAutocompleteForm = function (event, ui) {
       //ui parameter is object that has all the info of autocomplete
        var $input = $(this);
        $input.val(ui.item.label);

        var $form = $input.parents("form:first");//in this input will find all it's parent dom elemetn and find firs form that it's in
        
        $form.submit();
    };

    var createAutocomplete = function () {
        var $input = $(this);

        var options = {
            source: $input.attr("data-otf-autocomplete"),
            select: submitAutocompleteForm
        };

        $input.autocomplete(options);
    };

    var getPage = function () {
        var $a = $(this);

        var options = {
            url: $a.attr("href"),
            data: $("form").serialize(),//work pagiing with search tearm
            type: "get"
        };

        $.ajax(options).done(function (data) { 
           
            var target = $a.parents("div.pagedList").attr("data-otf-target");
            $(target).replaceWith(data);
        });
        return false;

    };

    $("form[data-otf-ajax='true']").submit(ajaxFormSubmit); //Find all the form which having the this attribute true and on form submiit (ajaxFormSubmit()) called
    $("input[data-otf-autocomplete]").each(createAutocomplete);

    $(".main-content").on("click", ".pagedList a", getPage); //geting from _layout-page for pagging without refresing page
                //this will only find click event of originated form a tag that is inside of class PageList     

});
