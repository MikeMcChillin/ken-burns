// Generated by CoffeeScript 1.6.3
(function() {
  $(function() {
    var container, currentBackgroundPosition, image, img, initialInputs, mask, opts, updateBackgroundPosition, updateContainerHeight, updateContainerWidth;
    img = new Image;
    image = $("#image");
    mask = $("#mask");
    container = $("#container");
    updateBackgroundPosition = function(dragEvent, draggieInstance, event, pointer) {
      var position;
      position = draggieInstance.position;
      mask.css({
        "background-position": position.x + "px " + position.y + "px"
      });
      return currentBackgroundPosition();
    };
    currentBackgroundPosition = function() {
      return $("#background-position").text("background-position: " + mask.css("background-position"));
    };
    $("#animate").click(function(e) {
      e.preventDefault();
      mask.toggleClass("animate");
      return image.toggleClass("hidden");
    });
    $("#start").click(function(e) {
      var anim, startPosition;
      e.preventDefault();
      startPosition = $("#mask").css("background-position");
      anim = CSSAnimations.get("ken-burns");
      anim.setKeyframe("0%", {
        "background-position": startPosition
      });
      return $("#start-value").text("0% {background-position: " + startPosition + "}");
    });
    $("#middle").click(function(e) {
      var anim, midPosition;
      e.preventDefault();
      midPosition = $("#mask").css("background-position");
      anim = CSSAnimations.get("ken-burns");
      anim.setKeyframe("50%", {
        "background-position": midPosition
      });
      return $("#middle-value").text("50% {background-position: " + midPosition + "}");
    });
    $("#end").click(function(e) {
      var anim, endPosition;
      e.preventDefault();
      endPosition = $("#mask").css("background-position");
      anim = CSSAnimations.get("ken-burns");
      anim.setKeyframe("100%", {
        "background-position": endPosition
      });
      return $("#end-value").text("100% {background-position: " + endPosition + "}");
    });
    opts = {
      on: {
        load: function(e, file) {
          if (file.type.match(/image/)) {
            img = new Image();
            img.src = e.target.result;
            img.id = "image";
            img.onload = function() {
              return mask.append(img);
            };
            container.imagesLoaded(function() {
              var demo, draggie, dupeImage, elem, imageHeight, imageWidth, maskHeight, maskWidth, output, positionMask, setContainerDimensions, setMaskDimensions;
              image = $("#image");
              imageWidth = image.width();
              imageHeight = image.height();
              maskWidth = image.width() / 2;
              maskHeight = image.height() / 2;
              dupeImage = function() {
                var source;
                source = $("#image").attr("src");
                console.log(source);
                return mask.css("background", "url(" + source + ")");
              };
              dupeImage();
              setMaskDimensions = function() {
                return mask.css({
                  "width": maskWidth,
                  "height": maskHeight
                });
              };
              setMaskDimensions();
              setContainerDimensions = function() {
                return container.css({
                  "width": imageWidth + maskWidth,
                  "height": imageHeight + maskHeight
                });
              };
              setContainerDimensions();
              positionMask = function() {
                return mask.css({
                  "left": "50%",
                  "top": "50%",
                  "margin-left": -0.5 * maskWidth,
                  "margin-top": -0.5 * maskHeight
                });
              };
              positionMask();
              demo = document.querySelector("#mask");
              elem = demo.querySelector("img");
              draggie = new Draggabilly(elem, {
                containment: "#container"
              });
              output = demo.querySelector("code");
              draggie.on("dragStart", function(draggieInstance, event, pointer) {
                return updateBackgroundPosition("DRAG START", draggieInstance, event, pointer);
              });
              draggie.on("dragMove", function(draggieInstance, event, pointer) {
                return updateBackgroundPosition("DRAG MOVE", draggieInstance, event, pointer);
              });
              return draggie.on("dragEnd", function(draggieInstance, event, pointer) {
                return updateBackgroundPosition("DRAG END", draggieInstance, event, pointer);
              });
            });
            $(".upload").addClass("hidden");
            return $(".animation-hold").addClass("visible");
          }
        }
      }
    };
    $("body").fileReaderJS(opts);
    initialInputs = function() {
      $(".change").each(function() {
        var prop, value;
        value = $(this).val();
        prop = $(this).data("property");
        return mask.css(prop, value);
      });
      $("select").on("change", function() {
        var prop, value;
        value = $(this).val();
        prop = $(this).data("property");
        return mask.css(prop, value);
      });
      return container.imagesLoaded(function() {
        $("#mask-width-value").val(mask.width());
        return $("#mask-height-value").val(mask.height());
      });
    };
    initialInputs();
    $(".change").on("change", function() {
      var prop, value;
      value = $(this).val();
      prop = $(this).data("property");
      return mask.css(prop, value);
    });
    $("select").on("change", function() {
      var prop, value;
      value = $(this).val();
      prop = $(this).data("property");
      return mask.css(prop, value);
    });
    $("#mask-width-value").on("change", function() {
      var maskWidth;
      maskWidth = $(this).val();
      mask.css("width", maskWidth);
      return updateContainerWidth(maskWidth);
    });
    $("#mask-height-value").on("change", function() {
      var maskHeight;
      maskHeight = $(this).val();
      mask.css("height", maskHeight);
      return updateContainerHeight(maskHeight);
    });
    updateContainerWidth = function(maskWidth) {
      var imageWidth;
      imageWidth = image.width();
      container.css("width", imageWidth + maskWidth);
      return draggie.enable();
    };
    return updateContainerHeight = function(maskHeight) {
      var imageHeight;
      imageHeight = image.height();
      return container.css("height", imageHeight + maskHeight);
    };
  });

}).call(this);
