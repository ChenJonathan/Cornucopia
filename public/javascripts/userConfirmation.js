/**
 * Created by kevin on 9/25/2016.
 */
$(function() {
    $.ajax({
        type: 'GET',
        url: 'http://chenjonathan-cornucopia.herokuapp.com/api/user',
        success: function(data) {
            console.log(data);
        }

    });

})