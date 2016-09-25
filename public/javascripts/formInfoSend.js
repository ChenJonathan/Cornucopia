/**
 * Created by kevin on 9/24/2016.
 */
$(function() {
    console.log("Hi I work");
    $('#pleaseWork').submit(function() {
        console.log("hi");
            // get all the inputs into an array.
            var $inputs = $('#pleaseWork :input');

            // not sure if you wanted this, but I thought I'd add it.
            // get an associative array of just the values.
            var values = {};
            $inputs.each(function() {
                values[this.name] = $(this).val();
            });
        console.log(values);
        $.ajax({
            type: 'POST',
            url: 'http://chenjonathan-cornucopia.herokuapp.com/api/recipe',
            data: {
                name: values.recipeName,
                author: values.authorName,
                instructions: values.instructions,
                rating: 0,
                ingredients: values.ingredients,
            },
        });
        return false;
    });
})