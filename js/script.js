$(document).ready(function () {
  const chartOptions03 = {
    chart: {
      type: "column",
      animation: false,
      backgroundColor: "#fcfbfb",
      height: 460,
      width: 500,
    },
    title: {
      text: "출판사 수 추이",
      align: "left",
      style: {
        fontSize: "18px", // 글꼴 크기
        fontWeight: "medium", // 글꼴 두께
        color: "#978f8f", // 글꼴 색상
      },
    },
    xAxis: {
      categories: ["2019", "2020", "2021", "2022", "2023"],
      crosshair: true,
    },
    yAxis: {
      min: 0,
      max: 80000,
      tickPositions: [50000, 60000, 70000, 80000],
      title: {
        text: "단위: 개",
      },
    },
    tooltip: {
      valueSuffix: "개",
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      column: {
        borderRadius: 5,
        pointWidth: 50,
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    series: [
      {
        name: "",
        data: [
          { y: 0, color: "#DCDADA" },
          { y: 0, color: "#DCDADA" },
          { y: 0, color: "#DCDADA" },
          { y: 0, color: "#524545" },
          { y: 0, color: "#524545" },
        ], // 초기값을 0으로 설정
        color: "#ff9933",
      },
    ],
    exporting: {
      enabled: false,
    },
  };

  // 그래프 생성 함수
  const createChart03 = () => {
    const chart = Highcharts.chart("graph-03", chartOptions03);

    // 애니메이션 함수
    const animateChart = () => {
      const targetData = [62977, 67203, 71181, 75324, 79564]; // 실제 데이터
      chart.series[0].points.forEach((point, index) => {
        setTimeout(() => {
          point.update(targetData[index], true, { duration: 900 });
        }, index * 180); // 100ms 간격으로 애니메이션 진행
      });
    };

    // 애니메이션을 한 번만 실행하도록 변수 초기화
    let hasAnimated = false;

    // 스크롤 이벤트 핸들러
    const onScroll = () => {
      const section = document.querySelector(".white-04");
      const sectionTop = section.getBoundingClientRect().top;

      // 섹션이 화면에 완전히 보일 때 애니메이션 실행
      if (sectionTop < window.innerHeight && !hasAnimated) {
        hasAnimated = true; // 애니메이션이 실행되었음을 표시
        animateChart(); // 애니메이션 실행
        window.removeEventListener("scroll", onScroll); // 스크롤 이벤트 리스너 제거 (한 번만 실행)
      }
    };

    // 스크롤 이벤트 리스너 추가
    window.addEventListener("scroll", onScroll);
  };

  // 그래프 생성
  createChart03();

  const chartOptions04 = {
    chart: {
      type: "line", // 선 그래프 유형
      animation: false,
      backgroundColor: "#fcfbfb",
      height: 460,
      width: 500,
    },
    title: {
      text: "전체 출판사 수 대비 1-3종 발행 출판사 비율",
      align: "left",
      style: {
        fontSize: "18px",
        fontWeight: "medium",
        color: "#978f8f",
      },
    },

    yAxis: {
      title: {
        text: "단위: %",
      },
      tickPositions: [0, 20, 40, 60, 80, 100],
      max: 100,
    },
    xAxis: {
      categories: ["2020", "2021", "2022", "2023"],
      accessibility: {
        rangeDescription: "Range: 2020 to 2023",
      },
    },
    legend: {
      enabled: false,
    },

    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        },
        pointStart: 2020,
        marker: {
          radius: 10, // 꺾이는 부분의 점 크기를 키움
          symbol: "circle",
        },
      },
    },
    series: [
      {
        name: "",
        data: [0, 0, 0, 0], // 초기값을 0으로 설정하여 애니메이션 적용
        color: "#524545", // 선 색상 변경
      },
    ],
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom",
            },
          },
        },
      ],
    },
    exporting: {
      enabled: false,
    },
  };

  // 그래프 생성 함수
  const createChart04 = () => {
    const chart = Highcharts.chart("graph-04", chartOptions04);

    // 애니메이션 함수
    const animateChart = () => {
      const targetData = [62, 64, 66, 64]; // 실제 데이터
      chart.series[0].points.forEach((point, index) => {
        setTimeout(() => {
          point.update(targetData[index], true, { duration: 900 });
        }, index * 180); // 180ms 간격으로 애니메이션 진행
      });
    };

    // 애니메이션을 한 번만 실행하도록 변수 초기화
    let hasAnimated = false;

    // 스크롤 이벤트 핸들러
    const onScroll = () => {
      const section = document.querySelector(".white-04");
      const sectionTop = section.getBoundingClientRect().top;

      // 섹션이 화면에 완전히 보일 때 애니메이션 실행
      if (sectionTop < window.innerHeight && !hasAnimated) {
        hasAnimated = true; // 애니메이션이 실행되었음을 표시
        animateChart(); // 애니메이션 실행
        window.removeEventListener("scroll", onScroll); // 스크롤 이벤트 리스너 제거 (한 번만 실행)
      }
    };

    // 스크롤 이벤트 리스너 추가
    window.addEventListener("scroll", onScroll);
  };

  // 그래프 생성
  createChart04();

  // 그래프 생성 함수
  const createChart01 = () => {
    const chartOptions01 = {
      chart: {
        type: "bar",
        backgroundColor: "#fcfbfb",
        height: 460,
        width: 500,
      },
      title: {
        text: "도서 판매 활성화를 위한 활동 유무",
        align: "left",
        style: {
          fontSize: "18px",
          fontWeight: "medium",
          color: "#978f8f",
        },
      },
      xAxis: {
        categories: [
          "책 읽는 공간 제공",
          "SNS운영",
          "회원제 서비스",
          "홈페이지/인터넷카페/블로그",
          "책 배달 서비스",
          "지역사회 연계활동",
          "문화 프로그램 운영",
        ],
        title: {
          text: null,
        },
        lineWidth: 0,
        labels: {
          enabled: false, // X축 글자 숨기기
        },
      },
      yAxis: {
        min: 0,
        title: {
          text: "단위: %",
          align: "high",
        },
        // labels: {
        //   enabled: false, // Y축 글자 숨기기
        // },
        tickPositions: [0, 10, 20, 30, 40],
      },
      tooltip: {
        valueSuffix: " %",
      },
      plotOptions: {
        bar: {
          borderRadius: 5, // 막대 라운딩 5px
          pointWidth: 40, // 막대 두께 40px
          color: "#524545", // 막대 색상 설정
          dataLabels: {
            enabled: true,
            align: "left", // 글자 왼쪽 정렬
            inside: true, // 막대 안에 글자 표시
            color: "#FFFFFF", // 글자 색상 설정 (화이트)
            marginLeft: "10px",
            formatter: function () {
              // 항목 이름과 값을 함께 표시
              return this.x;
            },
            style: {
              fontWeight: "semibold",
              fontSize: "14px",
              textOutline: "none", // 글자 테두리 제거
            },
          },
        },
      },
      legend: {
        enabled: false, // 범례 숨기기
      },
      credits: {
        enabled: false,
      },
      series: [
        {
          name: "활동 비율",
          data: [33, 30.4, 29.4, 21.7, 19.3, 18.8, 16.2],
        },
      ],
      exporting: {
        enabled: false,
      },
    };

    // 차트 생성
    const chart = Highcharts.chart("graph-01", chartOptions01);

    // 애니메이션 함수
    const animateChart = () => {
      const targetData = [33, 30.4, 29.4, 21.7, 19.3, 18.8, 16.2]; // 실제 데이터
      chart.series[0].points.forEach((point, index) => {
        setTimeout(() => {
          point.update(targetData[index], true, { duration: 900 });
        }, index * 180); // 180ms 간격으로 애니메이션 진행
      });
    };

    // 애니메이션을 한 번만 실행하도록 변수 초기화
    let hasAnimated = false;

    // 스크롤 이벤트 핸들러
    const onScroll = () => {
      const section = document.querySelector(".white-03"); // white-03 섹션으로 변경
      const sectionTop = section.getBoundingClientRect().top;

      // 섹션이 화면에 완전히 보일 때 애니메이션 실행
      if (sectionTop < window.innerHeight && !hasAnimated) {
        hasAnimated = true; // 애니메이션이 실행되었음을 표시
        animateChart(); // 애니메이션 실행
        window.removeEventListener("scroll", onScroll); // 스크롤 이벤트 리스너 제거 (한 번만 실행)
      }
    };

    // 스크롤 이벤트 리스너 추가
    window.addEventListener("scroll", onScroll);
  };

  // 차트 생성 호출
  createChart01();

  const colors02 = [
    "#211C1C", // 서울 특별시
    "#312929", // 경기도
    "#423737", // 인천 광역시
    "#524545", // 제주 특별시
    "#756A6A", // 부산 광역시
    "#978F8F", // 대구 광역시
    "#BAB5B5", // 경상북도
    "#DCDADA", // 강원도
    "#BAB5B5", // 전라북도
    "#DCDADA", // 경상남도
    "#BAB5B5", // 대전 광역시
    "#DCDADA", // 충청남도
    "#BAB5B5", // 기타
  ];

  const categories02 = [
    "서울 특별시",
    "경기도",
    "인천 광역시",
    "제주 특별시",
    "부산 광역시",
    "대구 광역시",
    "경상북도",
    "강원도",
    "전라북도",
    "경상남도",
    "대전 광역시",
    "충청남도",
    "기타",
  ];

  const data02 = [
    {
      y: 28.7,
      color: colors02[0],
      name: "서울 특별시",
    },
    {
      y: 17.0,
      color: colors02[1],
      name: "경기도",
    },
    {
      y: 12.2,
      color: colors02[2],
      name: "인천 광역시",
    },
    {
      y: 6.0,
      color: colors02[3],
      name: "제주 특별시",
    },
    {
      y: 5.0,
      color: colors02[4],
      name: "부산 광역시",
    },
    {
      y: 4.1,
      color: colors02[5],
      name: "대구 광역시",
    },
    {
      y: 3.7,
      color: colors02[6],
      name: "경상북도",
    },
    {
      y: 3.6,
      color: colors02[7],
      name: "강원도",
    },
    {
      y: 3.6,
      color: colors02[8],
      name: "전라북도",
    },
    {
      y: 3.4,
      color: colors02[9],
      name: "경상남도",
    },
    {
      y: 2.6,
      color: colors02[10],
      name: "대전 광역시",
    },
    {
      y: 2.5,
      color: colors02[11],
      name: "충청남도",
    },
    {
      y: 7.6,
      color: colors02[12],
      name: "기타",
    },
  ];

  const chartOptions02 = {
    chart: {
      type: "pie",
      animation: true,
      backgroundColor: "#fcfbfb",
      height: 460,
      width: 500,
    },
    title: {
      text: "2023 광역 지자체별 독립서점 수, 단위: %",
      align: "left",
      style: {
        fontSize: "18px",
        fontWeight: "medium",
        color: "#978f8f",
      },
    },
    plotOptions: {
      pie: {
        innerSize: "60%", // 도넛 차트를 위한 설정
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.y}%", // 레이블 포맷
          style: {
            fontWeight: "normal",
            color: "#000000", // 레이블 색상
            textOutline: "none", // 텍스트 아웃라인 제거
          },
          distance: 15, // 도넛 바깥쪽으로 레이블 위치 조정
        },
        showInLegend: false, // 범례 표시 안 함
      },
    },
    series: [
      {
        name: "지자체",
        data: data02,
      },
    ],
    legend: {
      enabled: false, // 범례 비활성화
    },
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom",
            },
          },
        },
      ],
    },
    exporting: {
      enabled: false,
    },
  };

  // 그래프 생성 함수
  const createChart02 = () => {
    const chart02 = Highcharts.chart("graph-02", chartOptions02);

    // 애니메이션 함수
    const animateChart02 = () => {
      const targetData = data02.map((item) => item.y); // 실제 데이터
      chart02.series[0].data.forEach((point, index) => {
        setTimeout(() => {
          point.update(targetData[index], true, { duration: 900 });
        }, index * 180); // 180ms 간격으로 애니메이션 진행
      });
    };

    // 애니메이션을 한 번만 실행하도록 변수 초기화
    let hasAnimated02 = false;

    // 스크롤 이벤트 핸들러
    const onScroll02 = () => {
      const section = document.querySelector(".white-03"); // 섹션 클래스 수정
      const sectionTop = section.getBoundingClientRect().top;

      // 섹션이 화면에 완전히 보일 때 애니메이션 실행
      if (sectionTop < window.innerHeight && !hasAnimated02) {
        hasAnimated02 = true; // 애니메이션이 실행되었음을 표시
        animateChart02(); // 애니메이션 실행
        window.removeEventListener("scroll", onScroll02); // 스크롤 이벤트 리스너 제거 (한 번만 실행)
      }
    };

    // 스크롤 이벤트 리스너 추가
    window.addEventListener("scroll", onScroll02);
  };

  // 그래프 생성
  createChart02();

  document.addEventListener("scroll", function () {
    const highlightSection = document.querySelector(".highlight-section");
    const sectionTop = highlightSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight) {
      highlightSection.classList.add("active");
    }
  });

  // 모든 태그 선택
  const tags = document.querySelectorAll(".tag");

  // 클릭 이벤트 추가
  tags.forEach((tag) => {
    tag.addEventListener("click", () => {
      // 모든 태그에서 'selected' 클래스를 제거
      tags.forEach((t) => t.classList.remove("selected"));

      // 클릭한 태그를 'selected' 상태로 변경
      tag.classList.add("selected");
    });
  });
});
