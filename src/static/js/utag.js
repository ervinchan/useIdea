(function ($){
    $.fn.utag = function (options) {
        var $root = $(this);
        var $editbox = $(this).find(".editbox");
        //默认的参数值
        var defaults = {
            in_add: "in_add", 
            iskeyup: true,  
            liCell: "li",   
            value: 1 
        };
        var opts = $.extend(defaults, options);

        var selectpicker = {
            init: function () { 
                if ($editbox.data("tag")) {
                    $editbox.find("ul").empty();
                    var arr_data = $editbox.data("tag").split(",");
                    for (var i in arr_data) {
                        $editbox.find("ul").append('<li><span>' + arr_data[i] + '</span><i class="icon-close"></i></li>');
                    }
                    $editbox.find("ul").append('<li class="' + opts.in_add + '"><input type="text"/></li>');
                }
            },
            iftag: function (txt) {
                var b = true;
                $editbox.find("span").each(function () {
                    if ($(this).text() == txt) {
                        b = false;
                        return false;
                    }
                });
                return b;
            },
            intag: function () {
                var v = $(this).text();
                if (selectpicker.iftag(v)) { 
                    $editbox.find("." + opts.in_add).before('<li><span>' + v + '</span><i class="icon-close"></i></li>');
                }                
            },
            ondel: function () { 
                $(this).parent().remove(); 
            },
            keyadd: function (e) {
                e = window.event || e;
                e.stopPropagation();
                if (e.keyCode==13) { 
                    if ($(this).val()) {
                        if (selectpicker.iftag($(this).val())) {
                            $(this).parent().before('<li><span>' + $(this).val() + '</span><i class="icon-close"></i></li>');
                            $(this).val("");
                        }
                    }
                } 
            }, 
            onedit: function () { 
                $(this).parent().html('<input type="text" class="in-edit" placeholder="' + $(this).text() + '" style="width:' + $(this).parent().width() + 'px"/>');
            }
        };
        selectpicker.init();
        $root
            .on("click", ".editbox i", selectpicker.ondel)
            .on("click", ".tag span", selectpicker.intag) 
            .on("keydown", "." + opts.in_add + " input", selectpicker.keyadd) 
    };
})(jQuery); 