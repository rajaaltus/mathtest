import React, { useEffect } from "react";
import $ from "jquery";
import { roundPathCorners } from "../js/rounding";

const useMath = () => {
  const fetchData = async (dataCategory) => {
    const res = await fetch(
      "http://api-public.zomoxo.com/api/v1/steps/generate",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6InNhcmFueWExMkBtYWlsLmNvbSIsIkxvY2F0b3JJZCI6IkNNUjY2TTE2IiwibmJmIjoxNjcwMDYwMzc5LCJleHAiOjE2NzA2NjUxNzksImlhdCI6MTY3MDA2MDM3OX0.p9XB-FcArEcopTGsRX8S9iIg1Aq9b2_QZ7W654rTSQ8",
        },
        body: JSON.stringify(dataCategory),
      }
    );
    const response = await res.json();
    return response.data;
  };
  function randomNumberGenerateFunction(category) {
    if (category.includes("Decimal")) {
      var num1 = Math.floor(Math.random() * 10000 + 1) / 100;
      var num2 = Math.floor(Math.random() * 10000 + 1) / 100;
      if (category == "Division") {
        num2 = Math.floor(Math.random() * (num1 / 100) + 1);
      }
      $("#number1").val(num1);
      $("#number2").val(num2);
    } else {
      var num1 = Math.floor(Math.random() * 10000 + 1);
      var num2 = Math.floor(Math.random() * 10000 + 1);
      if (category == "Division") {
        num2 = Math.floor(Math.random() * (num1 / 100) + 1);
      }
      $("#number1").val(num1);
      $("#number2").val(num2);
    }
  }

  function maths_animate_text_reset(textEl) {
    $("#" + textEl).attr("opacity", "0");
    $("#" + textEl).attr("fill", "black");

    //var xTxt = $("#" + textEl).attr("prev-x");
    //$("#" + textEl).attr("x", xTxt);

    //var yTxt = $("#" + textEl).attr("prev-y");
    //$("#" + textEl).attr("y", yTxt);
  }

  function maths_animate_text_v1(animationElx, animationEly, textEl, x, y) {
    $("#" + textEl).attr("opacity", "1");
    $("#" + textEl).attr("fill", "red");

    var xTxt = $("#" + textEl).attr("x");
    $("#" + textEl).attr("prev-x", xTxt);

    $("#" + animationElx).attr("from", xTxt);
    $("#" + animationElx).attr("to", x);

    var yTxt = $("#" + textEl).attr("y");
    $("#" + textEl).attr("prev-y", yTxt);
    $("#" + animationEly).attr("from", yTxt);
    $("#" + animationEly).attr("to", y);

    var xAbs = Math.pow(x - parseInt(xTxt), 2);
    var yAbs = Math.pow(y - parseInt(yTxt), 2);
    var distance = Math.sqrt(xAbs + yAbs);
    var time = distance / 85;
    //console.log(time);

    $("#" + animationElx).attr("dur", time + "s");
    $("#" + animationEly).attr("dur", time + "s");

    document.getElementById(animationElx).beginElement();
    document.getElementById(animationEly).beginElement();
  }

  function getPathStright(xTxt, yTxt, x, y) {
    var seq1 = `M ${xTxt},${yTxt}`;
    var seq4 = `L ${x},${y}`;
    var dPath = `${seq1} ${seq4}`;
    return dPath;
  }

  function getPathBottom(xTxt, yTxt, bottomLine, x, y) {
    var seq1 = `M ${xTxt},${yTxt}`;
    var seq2 = `L ${xTxt},${bottomLine}`;
    var seq3 = `L ${x},${bottomLine}`;
    var seq4 = `L ${x},${y}`;
    var dPath = `${seq1} ${seq2} ${seq3} ${seq4}`;
    return dPath;
  }

  function getPathTop(xTxt, yTxt, bottomLine, topline, xMaxNumber, x, y) {
    var seq1 = `M ${xTxt},${yTxt}`;
    var seq2 = `L ${xTxt},${bottomLine}`;
    var seq3 = `L ${xMaxNumber},${bottomLine}`;
    var seq4 = `L ${xMaxNumber},${topline}`;
    var seq5 = `L ${x},${topline}`;
    var seq6 = `L ${x},${y}`;
    var dPath = `${seq1} ${seq2} ${seq3} ${seq4} ${seq5} ${seq6}`;

    if (xTxt > xMaxNumber) {
      seq4 = `L ${xTxt},${topline}`;
      dPath = `${seq1} ${seq2} ${seq4} ${seq5} ${seq6}`;
    }
    return dPath;
  }

  function getPathTopFirst(xTxt, yTxt, bottomLine, xMaxNumber, x, y) {
    console.log(`${xTxt},${yTxt}  ${bottomLine} ${xMaxNumber} ${x} ${y}`);

    var seq1 = `M ${xTxt},${yTxt}`;
    var seq2 = `L ${xTxt},${bottomLine}`;
    var seq3 = `L ${xMaxNumber},${bottomLine}`;
    var seq4 = `L ${xMaxNumber},${y}`;
    var seq5 = `L ${x},${y}`;
    var dPath = `${seq1} ${seq2} ${seq3} ${seq4} ${seq5}`;
    if (xTxt > xMaxNumber) {
      seq4 = `L ${xTxt},${y}`;
      dPath = `${seq1} ${seq2} ${seq4} ${seq5}`;
    }
    return dPath;
  }

  function maths_animate_blink_start(animationEl, sec) {
    var blinkColors = "#FF0000;#FFFFFF";
    $("#" + animationEl).attr("dur", sec + "s");
    $(`#${animationEl}`).attr("values", blinkColors);
    document.getElementById(animationEl).beginElement();
    console.log(`starting ${animationEl}`);
  }

  function maths_animate_start(animationEl, sec) {
    $("#" + animationEl).attr("dur", sec + "s");
    document.getElementById(animationEl).beginElement();
    console.log(`starting ${animationEl}`);
  }

  function maths_animate_move_line_xy(
    textEl,
    animationElx1,
    animationEly1,
    animationElx2,
    animationEly2,
    xOffset,
    yOffset
  ) {
    maths_animate_move_line(animationElx1, textEl, "x", "x1", "px", xOffset);
    maths_animate_move_line(animationEly1, textEl, "y", "y1", "px", yOffset);
    maths_animate_move_line(animationElx2, textEl, "x", "x2", "px", xOffset);
    maths_animate_move_line(animationEly2, textEl, "y", "y2", "px", yOffset);
  }

  function maths_animate_move_line(
    animationEl,
    textEl,
    direction,
    attributeName,
    unit,
    offset
  ) {
    //debugger;
    $("#" + textEl).attr("opacity", "1");
    $("#" + textEl).attr("fill", "red");
    $("#" + textEl).css("stroke", "red");

    var xTxt = $("#" + textEl).attr(attributeName);
    $("#" + textEl).attr("prev-x", xTxt);
    var yTxt = $("#" + textEl).attr(attributeName);
    $("#" + textEl).attr("prev-y", yTxt);

    var txtFrom = 0;
    if (direction == "y") {
      txtFrom = parseInt(yTxt) + unit;
    } else {
      txtFrom = parseInt(xTxt) + unit;
    }
    //debugger;
    var txtTo = 0;
    if (direction == "y") {
      txtTo = parseInt(yTxt) + offset + unit;
    } else {
      txtTo = parseInt(xTxt) + offset + unit;
    }
    $("#" + animationEl).attr("attributeName", attributeName);
    $("#" + animationEl).attr("from", txtFrom);
    $("#" + animationEl).attr("to", txtTo);
    console.log("animating : " + animationEl);
    document.getElementById(animationEl).beginElement();
  }

  function maths_move_line_xy(textEl, xOffset, yOffset) {
    maths_move_line(textEl, "x", "x1", "px", xOffset);
    maths_move_line(textEl, "y", "y1", "px", yOffset);
    maths_move_line(textEl, "x", "x2", "px", xOffset);
    maths_move_line(textEl, "y", "y2", "px", yOffset);
  }

  function maths_move_line(textEl, direction, attributeName, unit, offset) {
    //debugger;
    $("#" + textEl).attr("opacity", "1");
    $("#" + textEl).attr("fill", "red");
    $("#" + textEl).css("stroke", "red");

    var xTxt = $("#" + textEl).attr(attributeName);
    $("#" + textEl).attr("prev-x", xTxt);
    var yTxt = $("#" + textEl).attr(attributeName);
    $("#" + textEl).attr("prev-y", yTxt);

    //var txtFrom = 0;
    //if (direction == "y") {
    //     txtFrom = parseInt(yTxt) + unit;
    //}
    //else {
    //     txtFrom = parseInt(xTxt) + unit;
    //}
    //debugger;
    var txtTo = 0;
    if (direction == "y") {
      txtTo = parseInt(yTxt) + offset + unit;
    } else {
      txtTo = parseInt(xTxt) + offset + unit;
    }
    $("#" + textEl).attr(attributeName, txtTo);

    //$("#" + animationEl).attr(attributeName, txtTo);
    //$("#" + animationEl).attr("from", txtFrom);
    //$("#" + animationEl).attr("to", txtTo);
    console.log("Move : " + textEl);
    //document.getElementById(animationEl).beginElement();
  }

  function maths_move_position_xy(textEl) {
    $("#" + textEl).attr("opacity", "1");
    $("#" + textEl).attr("fill", "red");

    maths_move_position(textEl, "x", "x");
    maths_move_position(textEl, "y", "y");
  }

  function maths_move_position_line_xy(textEl) {
    $("#" + textEl).attr("opacity", "1");
    $("#" + textEl).attr("fill", "red");

    maths_move_position(animationElx1, textEl, "x1", "x1");
    maths_animate_move_position(animationEly1, textEl, "y1", "y1");

    maths_move_position(animationElx2, textEl, "x2", "x2");
    maths_move_position(animationEly2, textEl, "y2", "y2");
  }

  function maths_move_position(animationEl, textEl, direction, attributeName) {
    $("#" + textEl).attr("opacity", "1");
    $("#" + textEl).attr("fill", "red");

    var txtFrom = $("#" + textEl).attr("start-" + direction);
    var txtTo = $("#" + textEl).attr("end-" + direction);

    $("#" + animationEl).attr("attributeName", attributeName);
    $("#" + animationEl).attr("from", txtFrom);
    $("#" + animationEl).attr("to", txtTo);
    console.log("animating : " + animationEl);
    document.getElementById(animationEl).beginElement();
  }

  function maths_animate_move_position_xy(textEl, animationElx, animationEly) {
    $("#" + textEl).attr("opacity", "1");
    $("#" + textEl).attr("fill", "red");

    maths_animate_move_position(animationElx, textEl, "x", "x");
    maths_animate_move_position(animationEly, textEl, "y", "y");
  }

  function maths_animate_move_position_line_xy(
    textEl,
    animationElx1,
    animationEly1,
    animationElx2,
    animationEly2
  ) {
    $("#" + textEl).attr("opacity", "1");
    $("#" + textEl).attr("fill", "red");

    maths_animate_move_position(animationElx1, textEl, "x1", "x1");
    maths_animate_move_position(animationEly1, textEl, "y1", "y1");

    maths_animate_move_position(animationElx2, textEl, "x2", "x2");
    maths_animate_move_position(animationEly2, textEl, "y2", "y2");
  }

  function maths_animate_move_position(
    animationEl,
    textEl,
    direction,
    attributeName
  ) {
    $("#" + textEl).attr("opacity", "1");
    $("#" + textEl).attr("fill", "red");

    var txtFrom = $("#" + textEl).attr("start-" + direction);
    var txtTo = $("#" + textEl).attr("end-" + direction);

    $("#" + animationEl).attr("attributeName", attributeName);
    $("#" + animationEl).attr("from", txtFrom);
    $("#" + animationEl).attr("to", txtTo);
    console.log("animating : " + animationEl);
    document.getElementById(animationEl).beginElement();
  }

  function maths_animate_move_text_xy(
    textEl,
    animationElx,
    animationEly,
    xOffset,
    yOffset
  ) {
    maths_animate_move_text(animationElx, textEl, "x", "x", "px", xOffset);
    maths_animate_move_text(animationEly, textEl, "y", "y", "px", yOffset);
  }

  function maths_animate_move_text(
    animationEl,
    textEl,
    direction,
    attributeName,
    unit,
    offset
  ) {
    //debugger;
    $("#" + textEl).attr("opacity", "1");
    $("#" + textEl).attr("fill", "red");

    $("#" + textEl).attr("opacity", "1");
    $("#" + textEl).attr("fill", "red");

    var xTxt = $("#" + textEl).attr("start-x");
    $("#" + textEl).attr("prev-x", xTxt);
    var yTxt = $("#" + textEl).attr("start-y");
    $("#" + textEl).attr("prev-y", yTxt);

    var txtFrom = 0;
    if (direction == "y") {
      txtFrom = parseInt(yTxt) + unit;
    } else {
      txtFrom = parseInt(xTxt) + unit;
    }
    //debugger;
    var txtTo = 0;
    if (direction == "y") {
      txtTo = parseInt(yTxt) + offset + unit;
    } else {
      txtTo = parseInt(xTxt) + offset + unit;
    }
    $("#" + animationEl).attr("attributeName", attributeName);
    $("#" + animationEl).attr("from", txtFrom);
    $("#" + animationEl).attr("to", txtTo);
    console.log("animating : " + animationEl);
    document.getElementById(animationEl).beginElement();
  }

  function maths_move_text_xy(textEl, xOffset, yOffset) {
    maths_move_text(textEl, "x", "x", "px", xOffset);
    maths_move_text(textEl, "y", "y", "px", yOffset);
  }

  function maths_move_text(textEl, direction, attributeName, unit, offset) {
    //debugger;
    $("#" + textEl).attr("opacity", "1");
    $("#" + textEl).attr("fill", "red");

    var xTxt = $("#" + textEl).attr("start-x");
    $("#" + textEl).attr("prev-x", xTxt);
    var yTxt = $("#" + textEl).attr("start-y");
    $("#" + textEl).attr("prev-y", yTxt);

    //var txtFrom = 0;
    //if (direction == "y") {
    //     txtFrom = parseInt(yTxt) + unit;
    //}
    //else {
    //     txtFrom = parseInt(xTxt) + unit;
    //}
    //debugger;
    var txtTo = 0;
    if (direction == "y") {
      txtTo = parseInt(yTxt) + offset + unit;
    } else {
      txtTo = parseInt(xTxt) + offset + unit;
    }

    $("#" + textEl).attr(attributeName, txtTo);

    //$("#" + animationEl).attr("attributeName", attributeName);
    //$("#" + animationEl).attr("from", txtFrom);
    //$("#" + animationEl).attr("to", txtTo);
    console.log("moving : " + textEl);
    //document.getElementById(animationEl).beginElement();
  }

  function maths_animate_text(
    animationElx,
    animationEly,
    textEl,
    x,
    y,
    xMaxNumber,
    topline,
    toplineText,
    bottomLine,
    placeValue,
    IndexPositionValue,
    IndexPlaceValue,
    firstTop,
    isStrightLine
  ) {
    var pathsmoothness = 3;

    var textWidthAdj = 5;
    var textHeightAdjTop = 5;
    var textHeightAdjBottom = 19;
    var textHeightAdjTopFirstX = 7;
    var textHeightAdjTopAll = 15;

    $("#" + textEl).attr("opacity", "1");
    $("#" + textEl).attr("fill", "red");
    //debugger;

    $("#" + textEl).removeAttr("x");
    $("#" + textEl).removeAttr("y");

    console.log(
      `${animationElx},${animationEly},${textEl} P ${x},${y}, ${toplineText}, ${IndexPlaceValue}, ${xMaxNumber} , ${firstTop}`
    );

    var xTxt = $("#" + textEl).attr("start-x");
    $("#" + textEl).attr("prev-x", xTxt);
    var yTxt = $("#" + textEl).attr("start-y");
    $("#" + textEl).attr("prev-y", yTxt);

    //stright line
    //$("#" + textEl + "_path").attr("d", `M ${xTxt},${yTxt} L ${x},${y}`);

    var keySplines = "0.6 0.2 0.2 0.6";
    //right angle lines
    if (isStrightLine == "true") {
      strightLinePathAnimationFunction(
        xTxt,
        textWidthAdj,
        yTxt,
        textHeightAdjBottom,
        x,
        y,
        textEl,
        pathsmoothness
      );
      keySplines = "0.8 0.6 0.6 0.8";
    } else if (toplineText < y) {
      toplinePathAnimationFunction(
        xTxt,
        textWidthAdj,
        yTxt,
        textHeightAdjBottom,
        bottomLine,
        x,
        y,
        textEl,
        textHeightAdjTop,
        pathsmoothness
      );
      keySplines = "0.8 0.6 0.6 0.8";
    } else if (toplineText >= y && IndexPlaceValue > 0 && firstTop == "False") {
      toplineAbovePathAnmimationFunction(
        xTxt,
        textWidthAdj,
        yTxt,
        textHeightAdjBottom,
        bottomLine,
        topline,
        xMaxNumber,
        x,
        y,
        textEl,
        textHeightAdjTop,
        textHeightAdjTopAll,
        pathsmoothness
      );
    } else {
      $("#" + textEl + "_path").attr("d", `M ${xTxt},${yTxt} L ${x},${y}`);
      otherPathAnimationFunction(
        xTxt,
        textWidthAdj,
        yTxt,
        textHeightAdjBottom,
        bottomLine,
        xMaxNumber,
        x,
        y,
        textEl,
        textHeightAdjTopFirstX,
        textHeightAdjTop,
        pathsmoothness
      );
      //console.log(dpathG);
    }

    //debugger;
    var xAbs = Math.pow(x - parseInt(xTxt), 2);
    var yAbs = Math.pow(y - parseInt(yTxt), 2);
    var distance = Math.sqrt(xAbs + yAbs);
    //var time = distance / 85;

    var myPath = document.getElementById(`${textEl}_path`);
    var length = myPath.getTotalLength();

    var time = length / 100;
    var timeHalf = time / 2;

    $("#" + animationElx).attr("dur", time + "s");
    $("#" + animationEly).attr("dur", time + "s");

    // calcMode="spline" keyTimes="0;1" keySplines="0.1 0.8 0.9 0.1">
    $("#" + animationElx).attr("calcMode", "spline");
    $("#" + animationElx).attr("keyTimes", "0;1");
    $("#" + animationElx).attr("keySplines", keySplines);

    //console.log(`start annimation ${animationElx}`);
    //$("#" + animationEly).attr("animation-timing-function", "ease");
    //animation-timing-function
    if (runningAnimation.length > 0) {
      current = runningAnimation[0];
      $("#" + current).attr("dur", "0.1s");
      document.getElementById(current).beginElement();
      //console.log(`forcestop annimation ${current}`);
    }
    document.getElementById(animationElx).beginElement();
    document.getElementById(animationEly).beginElement();
    //runningAnimation = animationElx;
    runningAnimation.push(animationElx);

    document.getElementById(animationElx).addEventListener("endEvent", (e) => {
      if (runningAnimation.length > 0) {
        runningAnimation = runningAnimation.filter(
          (item) => item !== e.target.id
        );
        //console.log(`annimation cleaning ${e.target.id}`);
      }
      //runningAnimation = "";
      //console.log(`forcestop annimation cleaning ${runningAnimation}`);
    });
  }

  var indExe = 0;
  function otherPathAnimationFunction(
    xTxt,
    textWidthAdj,
    yTxt,
    textHeightAdjBottom,
    bottomLine,
    xMaxNumber,
    x,
    y,
    textEl,
    textHeightAdjTopFirstX,
    textHeightAdjTop,
    pathsmoothness
  ) {
    var xTxtAdj = parseInt(xTxt) + textWidthAdj;
    var yTxtAdj = parseInt(yTxt) - textHeightAdjBottom;
    var dPath = getPathTopFirst(
      xTxtAdj,
      yTxtAdj,
      bottomLine,
      xMaxNumber,
      x + textWidthAdj,
      y
    );
    $("#" + textEl + "_path").attr("d", dPath);
    var dpathG = getPathTopFirst(
      xTxtAdj,
      yTxtAdj,
      bottomLine,
      xMaxNumber,
      x + textWidthAdj + textHeightAdjTopFirstX,
      y - textHeightAdjTop
    );
    grayPath = roundPathCorners(dpathG, pathsmoothness, false);
    $("#path_indicator").attr("d", grayPath);
    console.log(dPath);
  }

  function toplineAbovePathAnmimationFunction(
    xTxt,
    textWidthAdj,
    yTxt,
    textHeightAdjBottom,
    bottomLine,
    topline,
    xMaxNumber,
    x,
    y,
    textEl,
    textHeightAdjTop,
    textHeightAdjTopAll,
    pathsmoothness
  ) {
    var xTxtAdj = parseInt(xTxt) + textWidthAdj;
    var yTxtAdj = parseInt(yTxt) - textHeightAdjBottom;
    var dPath = getPathTop(
      xTxtAdj,
      yTxtAdj,
      bottomLine,
      topline,
      xMaxNumber,
      x + textWidthAdj,
      y
    );
    $("#" + textEl + "_path").attr("d", dPath);
    var dpathG = getPathTop(
      xTxtAdj,
      yTxtAdj,
      bottomLine,
      topline,
      xMaxNumber,
      x + textWidthAdj,
      y - textHeightAdjTop - textHeightAdjTopAll
    );
    grayPath = roundPathCorners(dpathG, pathsmoothness, false);
    $("#path_indicator").attr("d", grayPath);
    return { xTxtAdj, yTxtAdj, dPath, dpathG };
  }

  function toplinePathAnimationFunction(
    xTxt,
    textWidthAdj,
    yTxt,
    textHeightAdjBottom,
    bottomLine,
    x,
    y,
    textEl,
    textHeightAdjTop,
    pathsmoothness
  ) {
    var xTxtAdj = parseInt(xTxt) + textWidthAdj;
    var yTxtAdj = parseInt(yTxt) - textHeightAdjBottom;
    var dPath = getPathBottom(
      xTxtAdj,
      yTxtAdj,
      bottomLine,
      x + textWidthAdj,
      y
    );
    $("#" + textEl + "_path").attr("d", dPath);
    var dpathG = getPathBottom(
      xTxtAdj,
      yTxtAdj,
      bottomLine,
      x + textWidthAdj,
      y + textHeightAdjTop
    );
    var grayPath = roundPathCorners(dpathG, pathsmoothness, false);
    $("#path_indicator").attr("d", grayPath);
    console.log(dPath);
    return { xTxtAdj, yTxtAdj, dPath, dpathG, grayPath };
  }

  function strightLinePathAnimationFunction(
    xTxt,
    textWidthAdj,
    yTxt,
    textHeightAdjBottom,
    x,
    y,
    textEl,
    pathsmoothness
  ) {
    var xTxtAdj = parseInt(xTxt) + textWidthAdj;
    var yTxtAdj = parseInt(yTxt) - textHeightAdjBottom;
    var dPath = getPathStright(xTxtAdj, yTxtAdj, x + textWidthAdj, y);
    $("#" + textEl + "_path").attr("d", dPath);
    var dpathG = getPathStright(xTxtAdj, yTxtAdj, x + textWidthAdj, y);
    var grayPath = roundPathCorners(dpathG, pathsmoothness, false);
    $("#path_indicator").attr("d", grayPath);
    console.log(dPath);
    return { xTxtAdj, yTxtAdj, dPath, dpathG, grayPath };
  }

  function maths_execute_steps(steps) {
    //debugger;
    var array_steps = eval(steps);
    maths_execute_steps_ani(array_steps, indExe);
    //for (var step in array_steps) {
    //     var str_step = unescape(array_steps[step]);
    //     eval(str_step);
    //}
  }

  function maths_execute_steps_ani(array_steps, step) {
    console.log("maths_execute_steps_ani - " + step);
    var delayInMilliseconds = 500;
    setTimeout(function () {
      var str_step = unescape(array_steps[step]);
      eval(str_step);
      indExe++;
      if (indExe < array_steps.length) {
        maths_execute_steps_ani(array_steps, indExe);
      } else {
        indExe = 0;
      }
    }, delayInMilliseconds);
  }

  var runningAnimation = [];

  function maths_highlight_text(array_names, previous_array_names) {
    previous_array_names.forEach(function (item, index, array) {
      $("#" + item).attr("fill", "black");
      //console.log(`black #${item}`)
    });
    array_names.forEach(function (item, index, array) {
      $("#" + item).attr("fill", "red");
      //console.log(`red #${item}`)
    });
  }

  function maths_hide_text(array_names) {
    array_names.forEach(function (item, index, array) {
      $("#" + item).attr("opacity", "0");
      //$("#" + item).css("opacity", "0");
      //console.log(`disable #${item}`)
    });
  }

  function maths_show_text(array_names) {
    array_names.forEach(function (item, index, array) {
      $("#" + item).attr("opacity", "1");
      //$("#" + item).css("opacity", "0");
      //console.log(`enable #${item}`)
    });
  }

  function c(command, name, p1, p2, p3, p4, p5, p6) {
    if (command === "oh") {
      opacity_Hide(name);
    }
    if (command === "ov5") {
      opacity_Visible50(name);
    }
    if (command === "ov") {
      opacity_Visible(name);
    }
    if (command === "fn") {
      font_normal(name);
    }
    if (command === "fb") {
      font_bold(name);
    }
    if (command === "sa") {
      set_attr_sa(name, p1, p2, p3, p4);
    }
    if (command === "sa1") {
      set_attr_sa1(name, p1, p2, p3, p4);
    }
    if (command === "sa2") {
      set_attr_sa2(name, p1, p2, p3, p4);
    }
    if (command === "mat") {
      maths_animate_move_position_xy(name, p1, p2, p3, p4);
    }
    if (command === "al") {
      maths_animate_move_line_xy(name, p1, p2, p3, p4, p5, p6);
    }
    if (command === "apt") {
      maths_animate_move_position_xy(name, p1, p2);
    }
    if (command === "apl") {
      maths_animate_move_position_line_xy(name, p1, p2, p3, p4);
    }
    if (command === "ar") {
      maths_animate_text_reset(name);
    }
    //function maths_animate_move_text_xy('n_63333_929','anix_n_63333_929','aniy_n_63333_929',-50, -90);
  }

  function opacity_Hide(name) {
    $("#" + name).addClass("number-hide");
    $("#" + name).removeClass("number-visible-50");
    $("#" + name).removeClass("number-visible");
  }

  function opacity_Visible50(name) {
    $("#" + name).removeClass("number-hide");
    $("#" + name).addClass("number-visible-50");
    $("#" + name).removeClass("number-visible");
  }

  function opacity_Visible(name) {
    $("#" + name).removeClass("number-hide");
    $("#" + name).removeClass("number-visible-50");
    $("#" + name).addClass("number-visible");
  }

  function font_normal(name) {
    $("#" + name).addClass("number-font-normal");
    $("#" + name).removeClass("number-font-bold");
  }

  function font_bold(name) {
    $("#" + name).removeClass("number-font-normal");
    $("#" + name).addClass("number-font-bold");
  }

  function set_attr_sa(name, sx, sy, ex, ey) {
    $("#" + name).attr("start-x", sx);
    $("#" + name).attr("start-y", sy);
    $("#" + name).attr("end-x", ex);
    $("#" + name).attr("end-y", ey);
  }

  function set_attr_sa1(name, sx, sy, ex, ey) {
    $("#" + name).attr("start-x1", sx);
    $("#" + name).attr("start-y1", sy);
    $("#" + name).attr("end-x1", ex);
    $("#" + name).attr("end-y1", ey);
  }

  function set_attr_sa2(name, sx, sy, ex, ey) {
    $("#" + name).attr("start-x2", sx);
    $("#" + name).attr("start-y2", sy);
    $("#" + name).attr("end-x2", ex);
    $("#" + name).attr("end-y2", ey);
  }
  useEffect(() => {
    $(function () {
      var category = "addition";
      var renderer = "";

      var steps = [];
      var stepsCount = 0;
      var ind = 0;
      var topPlaceValueFirst = false;

      $("#categorySelect").val(
        "MathEngine.StepGenerator.Strategies.Addition.AdditionFractionStrategy"
      );

      $("#btnRenderSteps").click(function () {
        //debugger;

        category = $("#categorySelect").val();
        renderer = $("#renderSelect").val();
        // forewardSelect = $("#forewardSelect").val();

        if ($("#modeRandomInput").is(":checked") === true) {
          randomNumberGenerateFunction(category);
        }

        var number1 = { Number: $("#number1").val() };
        var number2 = { Number: $("#number2").val() };
        var number3 = { Number: $("#number3").val() };

        if (
          category ===
            "MathEngine.StepGenerator.Strategies.Addition.AdditionFractionStrategy" ||
          category ===
            "MathEngine.StepGenerator.Strategies.Subtraction.SubtractionFractionStrategy" ||
          category ===
            "MathEngine.StepGenerator.Strategies.Multiplication.MultiplicationFractionStrategy" ||
          category ===
            "MathEngine.StepGenerator.Strategies.Division.DivisionFractionStrategy"
        ) {
          number1 = {
            WholeNumber: $("#number1").val(),
            Numerator: $("#number2").val(),
            Denominator: $("#number3").val(),
          };
          number2 = {
            WholeNumber: $("#number4").val(),
            Numerator: $("#number5").val(),
            Denominator: $("#number6").val(),
          };
        }

        generateSumFunctionV2(category, renderer, number1, number2, number3);
      });

      $("#btnRenderSteps").click();

      $("#btnNext").click(function () {
        if (ind < stepsCount - 1) {
          $("#path_indicator").attr("d", "");
          ind = ind + 1;
          var description = steps[ind].description;
          $("#steps").html(description);
          console.log(steps[ind].typeLevel1 + " - " + steps[ind].typeLevel2);
          if (steps[ind].script != null) {
            console.log(steps[ind].script.replace(/;/g, ";\n"));
            eval(steps[ind].script);
          }

          if (steps[ind].animationScript != null) {
            console.log(steps[ind].animationScript.replace(/;/g, ";\n"));
            eval(steps[ind].animationScript);
          } else {
            if (runningAnimation.length > 0) {
              current = runningAnimation[0];
              $("#" + current).attr("dur", "0.1s");
              document.getElementById(current).beginElement();
            }
          }
        }
      });

      $("#btnPrev").click(function () {
        if (ind > 0) {
          $("#path_indicator").attr("d", "");
          if (steps[ind].reverseScript != null) {
            console.log(
              "reverseScript--" +
                steps[ind].typeLevel1 +
                " - " +
                steps[ind].typeLevel2
            );
            console.log(steps[ind].reverseScript.replace(/;/g, ";\n"));
            eval(steps[ind].reverseScript);
          }

          ind = ind - 1;
          var description = steps[ind].description;
          $("#steps").html(description);
          console.log(steps[ind].typeLevel1 + " - " + steps[ind].typeLevel2);

          if (steps[ind].script != null) {
            console.log("script--");
            console.log(steps[ind].script.replace(/;/g, ";\n"));
            eval(steps[ind].script);
          }
        }
      });

      // function generateSumFunctionV1(
      //   category,
      //   renderer,
      //   number1,
      //   number2,
      //   number3
      // ) {
      //   var dataCategory = {
      //     statergy: category,
      //     renderer: renderer,
      //     number1: number1,
      //     number2: number2,
      //     number3: number3,
      //     enumNumberStrategy: forewardSelect,
      //   };
      //   console.log(dataCategory);
      //   $.ajax({
      //     type: "POST",
      //     url: "http://api-public.zomoxo.com/api/v1/steps/generate",
      //     data: dataCategory,
      //     dataType: "json",
      //     success: function (response) {
      //       if (response.resultCode == 200) {
      //         runningAnimation = [];
      //         ind = 0;
      //         steps = parseJSON(response.steps);
      //         stepsCount = steps.length;
      //         if (stepsCount > 0) {
      //           var description = steps[ind].description;
      //           $("#steps").html(description);
      //           $("#result").html(response.html);
      //           $("#sum").html(response.htmlSum);
      //           console.log(steps[ind].script.replace(/;/g, ";\n"));
      //           new Function(steps[ind].script);
      //         } else {
      //           $("#steps").html("");
      //           $("#result").html("");
      //           $("#sum").html("");
      //         }
      //       } else {
      //         $("#steps").html(response.resultMessage);
      //       }
      //     },
      //     failure: function (response) {
      //       console.log(response.responseText);
      //     },
      //     error: function (response) {
      //       console.log(response.responseText);
      //     },
      //   });
      //   return { ind, steps, stepsCount };
      // }

      async function generateSumFunctionV2(
        category,
        renderer,
        number1,
        number2,
        number3
      ) {
        var dataCategory = {
          studentId: "ff940434-9b0a-4a65-86c8-68b7e4f0a886",
          questionId: "e3f56c93-71f6-4133-9c25-d3d8d6caa338",
          renderType: "svg",
          enumNumberStrategy: "Foreword",
        };

        console.log(dataCategory);
        const response = await fetchData(dataCategory);
        console.log("response 2: ", response);
        if (response.resultCode == "Success") {
          ind = 0;
          runningAnimation = [];
          console.log(response);
          steps = response.steps;
          stepsCount = steps.length;
          console.log(steps[ind].typeLevel1 + " - " + steps[ind].typeLevel2);
          console.log(response.steps);
          if (stepsCount > 0) {
            //console.log(steps);
            var description = steps[ind].description;
            $("#steps").html(description);
            //say(description);
            $("#result").html(response.html);
            $("#sum").html(response.htmlSum);
            console.log(steps[ind].script.replace(/;/g, ";\n"));
            eval(steps[ind].script);
          } else {
            $("#steps").html("");
            $("#result").html("");
            $("#sum").html("");
          }
        } else {
          $("#steps").html(response.resultMessage);
        }
      }
    });
  }, []);
  return {};
};

export default useMath;
