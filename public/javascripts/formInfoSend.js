/**
 * Created by kevin on 9/24/2016.
 */
$(function() {
    $('form').submit(function() {
        $.ajax({
            type: 'POST',
            url: 'http://chenjonathan-cornucopia.herokuapp.com/api/recipe',
            data: {
                name: $(this).recipeName.value,
                author: $(this).authorName.value,
                instructions: $(this).instructions.value,
                rating: 0,
                ingredients: $(this).ingredients.value,
            },
            success:function(data) {
                console.log("This shit fuckin worked");
            }
        });
        return false;
    });
})