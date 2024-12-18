$(document).ready(function () {
  // 요소 선택
  const hue = document.getElementById("hue");
  const saturation = document.getElementById("saturation");
  const brightness = document.getElementById("brightness");
  const opacity = document.getElementById("opacity");
  const redInput = document.getElementById("red");
  const greenInput = document.getElementById("green");
  const blueInput = document.getElementById("#blue");
  const userColor = document.querySelector(".user-color");
  const targetColor = document.querySelector(".target-color");

  // 랜덤 색상 값
  let randomBaseHue = Math.floor(Math.random() * 360); // 랜덤 기본 Hue
  let randomSaturation = Math.floor(Math.random() * 100); // 랜덤 Saturation
  let randomBrightness = Math.floor(Math.random() * 100); // 랜덤 Brightness

  // RGB 값을 추출하는 함수
  function getRgbValues(color) {
    const rgba = color.match(/\d+/g); // rgba(255, 0, 0, 1) 형식을 [255, 0, 0, 1]로 추출
    if (rgba) {
      return {
        r: parseInt(rgba[0]),
        g: parseInt(rgba[1]),
        b: parseInt(rgba[2]),
      };
    }
    return { r: 0, g: 0, b: 0 }; // 잘못된 경우 기본값 반환
  }

  // HSL 문자열을 파싱하는 함수
  function parseHsl(hslString) {
    const regex = /hsl\((\d+), (\d+)%?, (\d+)%?\)/;
    const match = hslString.match(regex);
    if (match) {
      return {
        hue: parseInt(match[1], 10),
        saturation: parseInt(match[2], 10),
        brightness: parseInt(match[3], 10),
      };
    }
    return { hue: 0, saturation: 0, brightness: 0 };
  }

  // 유사도 계산 함수 (HSL을 기반으로 계산)
  function calculateHslSimilarity(userColor, targetColor) {
    const userHsl = parseHsl(userColor);
    const targetHsl = parseHsl(targetColor);

    const hueDiff = Math.abs(userHsl.hue - targetHsl.hue);
    const saturationDiff = Math.abs(userHsl.saturation - targetHsl.saturation);
    const brightnessDiff = Math.abs(userHsl.brightness - targetHsl.brightness);

    // Hue 차이가 180 이상일 경우 더 작은 차이를 반영 (색상은 360도를 기준으로 순환함)
    const adjustedHueDiff = Math.min(hueDiff, 360 - hueDiff);

    // 각 차이 비율을 합산하여 유사도를 계산
    const totalDiff = adjustedHueDiff + saturationDiff + brightnessDiff;

    // 유사도 계산: 차이 비율을 0~100으로 정규화
    const maxDiff = 360 + 100 + 100; // 최대 차이는 H:360, S:100, B:100
    const similarity = 100 - (totalDiff / maxDiff) * 100;

    return similarity.toFixed(2); // 유사도 퍼센트
  }

  // 유사도 계산 함수 (RGB를 기반으로 계산)
  function calculateRgbSimilarity(userColor, targetColor) {
    const userRgb = getRgbValues(userColor);
    const targetRgb = getRgbValues(targetColor);

    // RGB 차이 계산
    const rDiff = Math.abs(userRgb.r - targetRgb.r);
    const gDiff = Math.abs(userRgb.g - targetRgb.g);
    const bDiff = Math.abs(userRgb.b - targetRgb.b);

    // 최대 RGB 차이 (255, 255, 255와 0, 0, 0 간의 거리)
    const maxDiff = 255 * 3;

    // 유사도 계산: 차이를 0~100으로 변환
    const totalDiff = rDiff + gDiff + bDiff;
    const similarity = 100 - (totalDiff / maxDiff) * 100;

    return similarity.toFixed(2); // 유사도 퍼센트
  }

  // 랜덤 색상 생성 함수 (각 단계마다 다른 방식으로)
  function getRandomColorForStage(stage) {
    if (stage === 1) {
      // 1단계: Hue만 랜덤
      return `hsl(${randomBaseHue}, ${randomSaturation}%, ${randomBrightness}%)`;
    } else if (stage === 2) {
      // 2단계: Saturation만 랜덤
      const saturationValue = Math.floor(Math.random() * 100);
      return `hsl(${randomBaseHue}, ${saturationValue}%, ${randomBrightness}%)`;
    } else if (stage === 3) {
      // 3단계: Brightness만 랜덤
      const brightnessValue = Math.floor(Math.random() * 100);
      return `hsl(${randomBaseHue}, ${randomSaturation}%, ${brightnessValue}%)`;
    } else if (stage === 4 || stage === 5 || stage === 7) {
      // 4, 5, 7단계: 랜덤 색상 생성
      const hueValue = Math.floor(Math.random() * 360);
      const saturationValue = Math.floor(Math.random() * 100);
      const brightnessValue = Math.floor(Math.random() * 100);
      return `hsl(${hueValue}, ${saturationValue}%, ${brightnessValue}%)`;
    } else if (stage === 6) {
      // 6단계: 전체 색상 랜덤 (Hue, Saturation, Brightness 조합)
      const hueValue = Math.floor(Math.random() * 360);
      const saturationValue = Math.floor(Math.random() * 100);
      const brightnessValue = Math.floor(Math.random() * 100);
      return `hsl(${hueValue}, ${saturationValue}%, ${brightnessValue}%)`;
    }
  }

  // 첫 로딩 시 랜덤 색상 생성 후 타겟과 유저 컬러에 부여
  function updateUserAndTargetColors(stage) {
    const baseColor = getRandomColorForStage(stage);
    $(`#user-color-${stage}`).css("background-color", baseColor); // 유저 색상
    $(`#target-color-${stage}`).css("background-color", baseColor); // 타겟 색상
  }

  // 각 단계별로 타겟 색상만 업데이트
  function updateTargetColor(stage) {
    if (stage === 1) {
      const targetHue = Math.floor(Math.random() * 360);
      $(`#target-color-${stage}`).css(
        "background-color",
        `hsl(${targetHue}, ${randomSaturation}%, ${randomBrightness}%)`
      );
    } else if (stage === 2) {
      const targetSaturation = Math.floor(Math.random() * 100);
      $(`#target-color-${stage}`).css(
        "background-color",
        `hsl(${randomBaseHue}, ${targetSaturation}%, ${randomBrightness}%)`
      );
    } else if (stage === 3) {
      const targetBrightness = Math.floor(Math.random() * 100);
      $(`#target-color-${stage}`).css(
        "background-color",
        `hsl(${randomBaseHue}, ${randomSaturation}%, ${targetBrightness}%)`
      );
    } else if (stage === 4 || stage === 5 || stage === 7) {
      // 4, 5, 7단계: 타겟 색상 랜덤만 설정
      const color = getRandomColorForStage(stage);
      $(`#target-color-${stage}`).css("background-color", color); // 타겟 색상 랜덤
    } else if (stage === 6) {
      // 6단계: 전체 랜덤 색상
      const color = getRandomColorForStage(stage);
      $(`#target-color-${stage}`).css("background-color", color); // 타겟 색상 랜덤
    }
  }

  // 사용자 색상 업데이트 (각 단계별로 필요값만 변경)
  function updateUserColor(stage, hueValue, saturationValue, brightnessValue) {
    let colorString = "";

    if (stage === 1) {
      // 1단계: Hue만 사용자 조정
      colorString = `hsl(${hueValue}, ${randomSaturation}%, ${randomBrightness}%)`;
    } else if (stage === 2) {
      // 2단계: Saturation만 사용자 조정
      colorString = `hsl(${randomBaseHue}, ${saturationValue}%, ${randomBrightness}%)`;
    } else if (stage === 3) {
      // 3단계: Brightness만 사용자 조정
      colorString = `hsl(${randomBaseHue}, ${randomSaturation}%, ${brightnessValue}%)`;
    } else if (stage === 4 || stage === 5 || stage === 7) {
      // 4, 5, 7단계: 타겟은 랜덤 설정, 유저는 입력 필드로 조정
      colorString = `hsl(${randomBaseHue}, ${randomSaturation}%, ${randomBrightness}%)`;
    } else if (stage === 6) {
      // 6단계: Hue, Saturation, Brightness 모두 조정
      colorString = `hsl(${hueValue}, ${saturationValue}, ${brightnessValue}%)`;
    }

    // 유저 색상 업데이트
    let userColorElement = document.querySelector(`#user-color-${stage}`);
    if (userColorElement) {
      userColorElement.style.backgroundColor = colorString; // 색상 적용

      console.log(`Updating user color for stage ${stage} to:`, colorString); // 색상 업데이트 확인
    } else {
      console.log(`No user color element found for stage ${stage}`);
    }
  }

  // 모든 조절바 비활성화 함수
  function disableAllControls() {
    $(".slider-container input[type='range']").addClass("inactive"); // 비활성화
    $(".input-section input").addClass("inactive"); // 입력 필드도 비활성화
  }

  // 각 단계별 활성화되는 조절바만 활성화
  function enableControlsForStage(stage) {
    disableAllControls(); // 모든 조절바 비활성화

    // 단계별 활성화할 조절바
    if (stage === 1) {
      // 1단계: `Hue`만 활성화
      $("#hue").removeClass("inactive");
    } else if (stage === 2) {
      // 2단계: `Saturation`만 활성화
      $("#saturation").removeClass("inactive");
    } else if (stage === 3) {
      // 3단계: `Brightness`만 활성화
      $("#brightness").removeClass("inactive");
    } else if (stage === 4) {
      // 4단계: `CMYK`만 활성화
      $("#cmyk-c, #cmyk-m, #cmyk-y, #cmyk-k").removeClass("inactive");
    } else if (stage === 5) {
      // 5단계: `RGB`만 활성화
      $("#rgb-r, #rgb-g, #rgb-b").removeClass("inactive");
    } else if (stage === 6) {
      // 6단계: `Hue`, `Saturation`, `Brightness`만 활성화
      $("#hue, #saturation, #brightness").removeClass("inactive");
    } else if (stage === 7) {
      // 7단계: `HEX`만 활성화
      $("#hex").removeClass("inactive");
    }
  }

  let currentStage = 1;
  const totalStages = 7;

  // 첫 로딩 시 전체 페이지 초기화
  enableControlsForStage(currentStage); // 첫 번째 단계 시작
  updateTargetColor(currentStage);

  // 슬라이더 값에 따라 User-color 업데이트
  hue.addEventListener("input", () => {
    updateUserColor(
      currentStage,
      hue.value,
      saturation.value,
      brightness.value
    );
  });

  saturation.addEventListener("input", () => {
    updateUserColor(
      currentStage,
      hue.value,
      saturation.value,
      brightness.value
    );
  });

  brightness.addEventListener("input", () => {
    updateUserColor(
      currentStage,
      hue.value,
      saturation.value,
      brightness.value
    );
  });

  // 유사도 저장 함수
  function storeSimilarity(stage) {
    const userColor = $(`#user-color-${stage}`).css("background-color");
    const targetColor = $(`#target-color-${stage}`).css("background-color");

    if (userColor && targetColor) {
      let similarity;

      similarity = calculateRgbSimilarity(userColor, targetColor); // RGB 방식으로 계산

      // 유사도 값을 localStorage에 저장
      localStorage.setItem(`similarity-${stage}`, similarity);
      console.log(`Stage ${stage} similarity: ${similarity}%`);
    } else {
      console.log(`No color available for stage ${stage}`);
    }
  }

  // NEXT STAGE 버튼 클릭 이벤트
  $(".next-stage-button").on("click", function () {
    // 유사도 계산 및 저장
    storeSimilarity(currentStage);

    // 현재 단계 숨기기
    $(`#stage-${currentStage}`).css("display", "none");

    // 다음 단계 활성화
    currentStage++; // 다음 단계로 이동
    if (currentStage <= totalStages) {
      // 다음 단계 표시
      $(`#stage-${currentStage}`).css("display", "block");
      enableControlsForStage(currentStage); // 각 단계에 맞는 활성화된 컨트롤 적용
      updateTargetColor(currentStage); // 각 단계에 맞는 Target color 업데이트
    } else {
      // 마지막 단계일 때 처리 (예: 제출 페이지로 이동)
      console.log("All stages completed. Moving to finish page.");

      // 유사도 값을 finish.html로 넘기기
      localStorage.setItem("similarityArray", JSON.stringify(similarityArray)); // localStorage에 유사도 값 저장
      window.location.href = "finish.html"; // finish.html로 이동
    }
  });
});
