$(document).ready(function () {
  // 요소 선택
  const hue = document.getElementById("hue");
  const saturation = document.getElementById("saturation");
  const brightness = document.getElementById("brightness");
  const opacity = document.getElementById("opacity");
  const redInput = document.getElementById("red");
  const greenInput = document.getElementById("green");
  const blueInput = document.getElementById("blue");
  const userColor = document.querySelector(".user-color");

  // 슬라이더와 RGB 입력값으로 색상 업데이트
  function updateColor() {
    const h = hue.value;
    const s = saturation.value;
    const b = brightness.value;
    const a = opacity.value;

    // HSB 값을 RGB로 변환
    const rgb = hsbToRgb(h, s, b);

    // 사용자 입력에 따라 색상 적용
    userColor.style.backgroundColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${a})`;
    redInput.value = rgb.r;
    greenInput.value = rgb.g;
    blueInput.value = rgb.b;
  }

  // HSB를 RGB로 변환하는 함수
  function hsbToRgb(h, s, b) {
    s /= 100;
    b /= 100;
    const k = (n) => (n + h / 60) % 6;
    const f = (n) => b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
    return {
      r: Math.round(255 * f(5)),
      g: Math.round(255 * f(3)),
      b: Math.round(255 * f(1)),
    };
  }

  // 이벤트 리스너 추가
  hue.addEventListener("input", updateColor);
  saturation.addEventListener("input", updateColor);
  brightness.addEventListener("input", updateColor);
  opacity.addEventListener("input", updateColor);
});
