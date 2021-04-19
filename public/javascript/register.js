let pw2ChangedYet = false;
function setClasses() {

}

function checkPasswordEquality() {
  const p1 = $("#register-password1").val();
  const p2 = $("#register-password2").val();

  if(!pw2ChangedYet) {
    return;
  }

  if(p1 !== p2) {
    $("#register-password1").addClass("is-danger");
    $("#register-password2").addClass("is-danger");
    $("#register-button-notification").show();
    $("#register-button").attr("disabled", true);
  } else {
    $("#register-password1").removeClass("is-danger");
    $("#register-password2").removeClass("is-danger");
    $("#register-button-notification").hide();
    $("#register-button").attr("disabled", false);
  }
}

$("#register-password1").on("keyup", () => {
  checkPasswordEquality();
});

$("#register-password2").on("keyup", () => {
  pw2ChangedYet = true;
  checkPasswordEquality();
});

$("#radio-register").on("change", () => {
  const checked = $(".radio-register-check:checked").val()
  const f = $("#register-form")
  if(checked === "student") {
    f.attr("action", "/register/student")
  } else if(checked === "parent") {
    f.attr("action", "/register/parent")
  } else {
    f.attr("action", "/register/tutor")
  }
});
