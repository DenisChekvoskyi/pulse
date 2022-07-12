$(document).ready(function () {
  $(".carousel__inner").slick({
    adaptiveHeight: true,
    speed: 1500,
    prevArrow:
      '<button type="button" class="slick-prev"><img src="../icons/left.svg"></button>',
    nextArrow:
      '<button type="button" class="slick-next"><img src="../icons/right.svg"></button>',
  });

  $("ul.catalog__tabs").on(
    "click",
    "li:not(.catalog__tab_active)",
    function () {
      $(this)
        .addClass("catalog__tab_active")
        .siblings()
        .removeClass("catalog__tab_active")
        .closest("div.container")
        .find("div.catalog__content")
        .removeClass("catalog__content_active")
        .eq($(this).index())
        .addClass("catalog__content_active");
    }
  );

  function toggleSlide(item) {
    $(item).each(function (i) {
      $(this).on("click", function (e) {
        e.preventDefault();
        $(".catalog-item__content")
          .eq(i)
          .toggleClass("catalog-item__content_active");
        $(".catalog-item__list").eq(i).toggleClass("catalog-item__list_active");
      });
    });
  }
  toggleSlide(".catalog-item__link");
  toggleSlide(".catalog-item__back");

  //modal>
  $("[data-modal=consultation]").on("click", function () {
    $(".overlay, #consultation").fadeIn("slow");
  });
  $(".modal__close").on("click", function () {
    $(".overlay, #consultation, #order, #thanks").fadeOut("slow");
  });
  // $(".button_mini").on("click", function () {
  //   $(".overlay, #order").fadeIn("slow");
  // });

  $(".button_mini").each(function (i) {
    $(this).on("click", function () {
      $("#order .modal__description").text(
        $(".catalog-item__subtitle").eq(i).text()
      );
      $(".overlay, #order").fadeIn("slow");
    });
  });

  //valid form>
  function valideForms(form) {
    $(form).validate({
      rules: {
        name: "required",
        tel: "required",
        email: {
          required: true,
          email: true,
        },
      },
      messages: {
        name: "Введите Ваше имя",
        tel: "Введите Ваш номер телефона",
        email: {
          required: "Введите Вашу почту",
          email: "Введите почту в формате: name@domain.com",
        },
      },
    });
  }
  valideForms("#consultation-form");
  valideForms("#consultation form");
  valideForms("#order form");

  //mask>
  $("input[name=tel]").mask("+38(099) 999-99-99");

  //enter email>
  $("form").submit(function (e) {
    e.preventDefault();

    if (!$(this).valid()) {
      return;
    }

    $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize(),
    }).done(function () {
      $(this).find("input").val("");
      $("#consultation, #order").fadeOut();
      $(".overlay, #thanks").fadeIn("slow");
      $("form").trigger("reset");
    });
  });
  return false;
});
