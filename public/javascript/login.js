$("#login-radio").on('change', () => {
  const checked = $(".radio-login-check:checked").val()
  const lg = $("#login-form");
  switch(checked) {
    case "parent":
      lg.attr('action', '/login/parent');
      break;
    case "tutor":
      lg.attr('action', '/login/tutor');
      break;
    case "student":
      lg.attr('action', '/login/student');
      break;
  }
});