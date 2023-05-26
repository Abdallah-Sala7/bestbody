/*------------- #General --------------*/

var tooltipTriggerList = [].slice.call(
  document.querySelectorAll('[data-bs-toggle="tooltip"]')
);
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl);
});

$('a[href="#"]').click(function ($) {
  $.preventDefault();
});

/*--------------- add promo code -------------*/
$(".promo-code-btn").click(function () {
  if ($(".promo-code-btn").hasClass("validate")) {
    $(".promo-code-btn").removeClass("validate");
    $(".promo-code-input").removeClass("active");
  } else {
    $(".promo-code-btn").addClass("onclic", 250, validate());
  }
});

function validate() {
  setTimeout(function () {
    $(".promo-code-btn").removeClass("onclic");
    $(".promo-code-btn").addClass("validate");
    $(".promo-code-input").addClass("active");
  }, 2250);
}

/*------------- add-to-fav --------------*/

$(".add-to-fav").on("click", function () {
  $(this).toggleClass("active");
});

// add to cart

$(".add-to-cart-btn").on("click", function () {
  $(this).addClass("loading");
  setTimeout(() => {
    $(this).removeClass("loading");
    $(this).toggleClass("active");
  }, 1000);
});

// reset password

$(".send-btn").on("click", function () {
  $(this).addClass("loading");
  setTimeout(() => {
    $(this).removeClass("loading");
    $(".forget-form").addClass("active");
  }, 1000);
});

/*------------- #loading-overlay-btn function --------------*/

$(".loading-btn").each(function () {
  var btn = $(this);
  btn.on("click", function () {
    btn.addClass("loading-overlay");
    if (btn.hasClass("btn-cart")) {
      btn.addClass("added");
    }
    setTimeout(function () {
      btn.removeClass("loading-overlay");
      btn.toggleClass("active");
    }, 1000);
  });
});

/*------------- #accordion   --------------*/

$(function () {
  $(".accordion-panels .panel-item .accordion_header").click(function () {
    let $items = $(this)
        .closest(".accordion-panels.one-panel")
        .find(".panel-item"),
      $parent = $(this).closest(".panel-item"),
      $body = $parent.find(".accordion_body");

    $(this)
      .closest(".one-panel")
      .find(".accordion_body")
      .not($body)
      .slideUp(300);
    $items.not($parent).removeClass("active");

    if ($parent.hasClass("active")) {
      $parent.removeClass("active ");
      $body.slideUp(300);
    } else {
      $parent.toggleClass("active");
      $body.slideToggle(300);
    }
  });
});

/*------------- #tabs functions --------------*/

$(function () {
  $(".tab-btn").click(function () {
    $(this).parent().find(".tab-btn").removeClass("active");
    $(this).addClass("active");
    var current_tab = $(this).attr("data-target");
    $(this).closest(".tabs-content-area").find(".tab-content").hide();
    $("." + current_tab).fadeIn();
  });
});

/*------------- #panel-responsive-items --------------*/

$(function () {
  $(".panel-responsive-btn").click(function () {
    let current_item_attr = $(this).attr("data-target"),
      current_item = $(".panel-responsive-item." + current_item_attr);

    if ($(this).hasClass("panel-responsive-open")) {
      current_item.addClass("active");
      if (current_item.hasClass("noScroll")) {
        $("body").attr("data-panel", "noScroll");
      }
      if (!current_item.hasClass("no-overlay")) {
        $(".side-overlay").addClass("active");
      }
    }
    if ($(this).hasClass("panel-responsive-close")) {
      $(".panel-responsive-item").removeClass("active");
      $("body").removeAttr("data-panel");
      $(".side-overlay").removeClass("active");
    }
  });
});

/*------------- #toggle-modal-btn   --------------*/

$(".toggle-modal-btn").click(function () {
  var this_modal = $(this).closest(".custom-modal");
  $(this_modal).modal("hide");
});

/*------------- #scroll-top btn   --------------*/

$(window).scroll(function () {
  if ($(this).scrollTop() > 200) {
    $(".scroll-top").addClass("show");
  } else {
    $(".scroll-top").removeClass("show");
    $(".scroll-top").removeClass("active");
  }
});

$(".scroll-top").click(function (e) {
  e.preventDefault();

  $(this).addClass("active");
  $("html,body").animate(
    {
      scrollTop: 0,
    },
    1200
  );
});

/*------------- #Add Plus Minus Button To Input Number   --------------*/

$(function () {
  $(".product-item .cart-btn").on("click", function () {
    let $parent = $(this).closest(".product-actions");
    $parent.addClass("in-cart");
  });

  $(".count-wrap .count-btn").on("click", function () {
    let $parent = $(this).closest(".product-actions"),
      input = $(this).closest(".count-wrap").find(".count-num"),
      plusBtn = $(this).closest(".count-wrap").find(".count-add"),
      minusBtn = $(this).closest(".count-wrap").find(".count-sub"),
      notes = $(this).closest(".counter-wrap").find(".msg-error"),
      currentVal = parseInt(input.val()),
      type = $(this).attr("data-type");

    if (!isNaN(currentVal)) {
      if (type == "minus") {
        if (currentVal > input.attr("min")) {
          input.val(currentVal - 1).change();
        }
        if (currentVal == input.attr("min") && $(this).hasClass("step-btn")) {
          $parent.removeClass("in-cart");
        }

        if (
          currentVal == Number(input.attr("min")) + 1 &&
          $(this).hasClass("step-btn")
        ) {
          $parent.removeClass("step2");
        }

        if (currentVal == input.attr("min") && !$(this).hasClass("step-btn")) {
          $(this).addClass("disabled");
          notes.show();
        } else {
          notes.hide();
        }

        plusBtn.removeClass("disabled");
      } else if (type == "plus") {
        if (currentVal < input.attr("max")) {
          input.val(currentVal + 1).change();
        }

        if (currentVal == input.attr("min") && $(this).hasClass("step-btn")) {
          $parent.addClass("step2");
        }

        if (currentVal == input.attr("max")) {
          $(this).addClass("disabled");
          notes.show();
        } else {
          notes.hide();
        }

        minusBtn.removeClass("disabled");
      }
    } else {
      input.val(0);
    }
  });

  $(".count-num").keydown(function (e) {
    if (
      $.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
      (e.keyCode == 65 && e.ctrlKey === true) ||
      (e.keyCode >= 35 && e.keyCode <= 39)
    ) {
      return;
    }

    if (
      (e.shiftKey || e.keyCode < 48 || e.keyCode > 57) &&
      (e.keyCode < 96 || e.keyCode > 105)
    ) {
      e.preventDefault();
    }
  });

  $(".count-num").change(function (e) {
    e.preventDefault();
    let $parent = $(this).closest(".product-actions"),
      notes = $(this).closest(".counter-wrap").find(".msg-error"),
      plusBtn = $(this).closest(".count-wrap").find(".count-add"),
      minusBtn = $(this).closest(".count-wrap").find(".count-sub"),
      minValue = parseInt($(this).attr("min")),
      maxValue = parseInt($(this).attr("max")),
      currentVal = parseInt($(this).val());

    if (currentVal >= minValue || currentVal <= maxValue) {
      notes.hide();
    }

    if (currentVal > minValue && minusBtn.hasClass("step-btn")) {
      $parent.addClass("step2");
    } else {
      $parent.removeClass("step2");
    }

    if (currentVal <= maxValue) {
      plusBtn.removeClass("disabled");
    } else {
      $(this).val(maxValue);
      notes.show();
    }

    if (currentVal >= minValue) {
      minusBtn.removeClass("disabled");
    } else {
      $(this).val(minValue);
      notes.show();
    }
  });
});

/*------------- #show and hide password   --------------*/

$(".password-field .eye-icon").on("click", function () {
  var password_input = $(this).parent().find(".password-input");
  console.log(password_input);

  if (password_input.attr("type") === "password") {
    password_input.attr("type", "text");
    $(this).addClass("hide");
  } else {
    password_input.attr("type", "password");
    $(this).removeClass("hide");
  }
});

/*------------- fix viewport --------------*/

let vh = window.innerHeight * 0.01;
let navHeight = $(".nav-wraper").outerHeight();
let toolBarHeight = $(".tool-bar").outerHeight();

document.documentElement.style.setProperty("--vh", `${vh}px`);
document.documentElement.style.setProperty("--nav-h", `${navHeight}px`);
document.documentElement.style.setProperty(
  "--tool-bar-h",
  `${toolBarHeight}px`
);
