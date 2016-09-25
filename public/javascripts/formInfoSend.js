/**
 * Created by kevin on 9/24/2016.
 */
$(function() {
    $('#recipeForm').submit(function() {
            // get all the inputs into an array.
            var $inputs = $('#recipeForm :input');

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
        $('#myModal').modal('hide');
        return false;
    });

    $('#registerForm').submit(function() {
        // get all the inputs into an array.
        var $inputs = $('#registerForm :input');

        // not sure if you wanted this, but I thought I'd add it.
        // get an associative array of just the values.
        var values = {};
        $inputs.each(function() {
            values[this.name] = $(this).val();
        });
        console.log(values);
        console.log(values.username);
        console.log(values.password);

        $.ajax({
            type: 'POST',
            url: 'http://chenjonathan-cornucopia.herokuapp.com/api/user',
            data: {
                user: values.username,
                password: values.password,
            },
        });

    });
})