function handleCredentialResponse(googleUser) {
    console.log("holi");
    var profile = googleUser.getBasicProfile();
    console.log(profile);
    $("#name").text(profile.getName());
    $("#email").text(profile.getEmail());
    $("#image").attr('src', profile.getImageUrl());
    $(".data").css("display", "block");
    $(".g_id_signin").css("display", "none");
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        alert("You have been signed out successfully");
        $(".data").css("display", "none");
        $(".g_id_signin").css("display", "block");
    });
}