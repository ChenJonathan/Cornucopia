/**
 * Created by kevin on 9/25/2016.
 */
$(function () {
    $("#login").click(function () {
        $.ajax({
            type: 'GET',
            url: 'http://chenjonathan-cornucopia.herokuapp.com/api/user',
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    if ($('#user').val() === data[i].user) {
                        if ($('#pass').val() === data[i].password) {
                            console.log(data[i].password);
                            var newURL = 'http://chenjonathan-cornucopia.herokuapp.com/users/' + data[i]._id + '/recipes';
                            document.location.href = newURL;
                        }
                    }
                }
            }
        });
    }
)});