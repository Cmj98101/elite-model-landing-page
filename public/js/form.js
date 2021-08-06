$('form').submit(function (e) {
    e.preventDefault();
    $.ajax({
        type: 'post',
        url: 'send',
        data: $(this).serialize(),
        success: function () {
            $('form')[0].reset(); // to reset the form
            // $('#contact').hide(); // to hide the Contact article
            $('#success-message').show(); // to show the hidden message
        }
    })
})