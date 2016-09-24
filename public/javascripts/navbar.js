/**
 * Created by kevin on 9/24/2016.
 */
$(".nav a").on("click", function(){
    $(".nav").find(".active").removeClass("active");
    $(this).parent().addClass("active");
});