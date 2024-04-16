export default function letterAni() {
    // DOM 함수 객체 //////////////

    // DOM 선택함수
    const qs = (x) => document.querySelector(x);
    const qsa = (x) => document.querySelectorAll(x);

    // addEvent 함수
    // ele - 요소, evt - 이벤트, fn - 함수
    const addEvt = (ele, evt, fn) => ele.addEventListener(evt, fn);

    // HTML태그 로딩후 loadFn함수 호출! ///
    addEvt(window, "DOMContentLoaded", loadFn);

    function loadFn() {
        console.log("로딩완료!");

        // 1. 구현 요구사항 :
        // - 글자를 박스에 넣고 하나씩 일어나면서 등장(.style3)

        // 2-1. 대상선정 : .txt-banner'
        let stage = qs(".txt-banner");
        console.log("대상:", stage);

        // 2-2 이동버튼
        const abtn = qsa(".abtn");

        // // 룰렛 버튼 구역
        // let botBox = qs("")

        // 2-3 블릿버튼
        let indic = qs(".indic");

        // 블릿,슬라이드 개수
        const SLIDE_CNT = 4;

        // 슬라이드 트랜지션 시간 상수
        const SLIDE_TRANS_TIME = 600;

        // 광클금지변수
        let stop = false;

        // 슬라이드 순번 전역변수
        let snum = 0;

        //3. 글자데이터 할당하기
        const banText = ["Exciting PIC", "Kid Friendly PIC", "Romantic PIC", "Relaxing PIC"];

        const introText=[
          "상상, 그 이상의 즐거움이 펼쳐지는 곳",
          "아이와 가족 모두에게 충만한 행복을 선사합니다",
          "로맨틱하고 아름다운 휴가로 사랑하는 연인과 특별한 추억을 남기세요",
          "몸도 마음도 풍요로워지는 진정한 휴식과 충만한 재충전의 시간을 경험하세요",
        ]

        const bulText = ["Exciting", "Kid Friendly", "Romantic", "Relaxing"];

        // html태그 변수
        let hcode = "";
        // 지연시간 계산을 위한 순번변수
        let seqNum = 0;

        // 초기 셋팅하기
        // 슬라이드 배너 표시
        // 블릿 영역 표시
        for (let i = 0; i < SLIDE_CNT; i++) {
            // 슬라이드 넣기
            stage.innerHTML += `
    <ul>
      <li>${bulText[i]}
        &nbsp;&nbsp;
        <span>PIC</span>
        <p>${introText[i]}</p>
        </li>
    </ul>
    `;
            // 블릿 넣기
            indic.innerHTML += `<li><span>${bulText[i]}</span></li>`;
        } ////for//////

        // ul를 생성한 후 그 ul다시 수집한다!
        // (1) 슬라이드의 ul까지 수집! stage 변수
        stage = qsa(".txt-banner ul");

        // (2) 블릿의 li까지 수집! indic 변수
        indic = qsa(".indic li");

        // 1. 이벤트 연결 설정하기
        // 대상: .abtn
        // addEvt(대상,이벤트,함수)
        abtn.forEach((ele) => {
            addEvt(ele, "click", goSlide);
        });

        // 2. 이벤트 처리 함수 만들기
        function goSlide() {
            // 광클 금지 설정
            if (stop) return; // 막기!
            stop = true; // 잠금!
            setTimeout(() => {
                stop = false; // 해제!
            }, SLIDE_TRANS_TIME);
            /////////////////////////////

            // 0. 인터발 지우기 함수 호출
            clearAuto();
            // 1. 오른쪽버튼 여부
            let isRbtn = this.classList.contains("ab2");
            console.log("오른쪽버튼", isRbtn, this);

            // 2. 버튼에 따른 전역슬라이드 번호 증감하기
            // (1) 오른쪽버튼일 경우 증가
            // -> 한계설정: snum이 개수와 같으면 첫번호 0
            if (isRbtn) snum === SLIDE_CNT - 1 ? (snum = 0) : snum++;
            // (2) 왼쪽버튼일 경우 감소
            // -> 한계설정: snum이 0보다 작으면 마지막순번
            else snum === 0 ? (snum = SLIDE_CNT - 1) : snum--;

            console.log("snum:" + snum);

            // 3. 슬라이드 순번 클래스 제어함수 호출하기
            setClass(stage, "on", snum);
            // 4. 블릿 순번 클래스 제어함수 호출하기
            setClass(indic, "on", snum);
        } // goSlide 함수

        // 3. 클래스 제어함수 만들기
        function setClass(target, className, seq) {
            // target - 변경할 요소대상
            // className - 변경할 클래스명
            // seq - 클래스가 들어갈 순번
            // console.log("대상:", target, "/클래스명:", className, "/순번:", seq);

            // 1. 타겟은 HTML 컬렉션이므로 forEach메서드로 순회함
            target.forEach((ele, idx) => {
                // 1-1. seq와 idx가 일치할 경우 클래스 넣기
                if (seq === idx) ele.classList.add(className);
                // 1-2. 기타의 경우 클래스 제거하기
                else ele.classList.remove(className);
            }); // forEach
        } ////// setClass 함수 ////////

        /// [ 블릿 클릭 이벤트 셋팅 구역 ] /////////

        indic.forEach((ele, idx) => {
            // ele - 요소 / idx - 순번
            addEvt(ele, "click", () => indicSlide(idx));
        }); //// forEach ////

        // 2. 이벤트 처리함수 만들기
        function indicSlide(seq) {
            ///seq - 변경할 순번
            console.log("블릿클릭!", seq);

            // 0. 인터발 지우기 함수 호출
            clearAuto();

            // 1. 현재 슬라이드 순번 블릿 순번으로 업데이트
            snum = seq;
            // 2. 슬라이드 순번 클래스 제어함수 호출
            setClass(stage, "on", snum);
            // 3. 블릿 순번 클래스 제어함수 호출
            setClass(indic, "on", snum);
        } ///// indicSlide함수 ///////
         // [ 자동넘김 셋팅 구역 ] /////////////////
        // 인터발용 변수(지울목적)
        let autoI;
        // 타임아웃용 변수(지울목적)
        let autoT;
        // 자동넘김호출함수 최초호출하기
        autoSlide();

        // [ 자동넘김호출함수 ] /////
    function autoSlide() {
      // setInterval(함수,시간)
      // - 일정시간간격으로 함수를 호출
      // clearInterval(인터발변수)
      // - 변수에 담긴 인터발을 지움(멈춤)
      autoI = setInterval(() => {
          // 1. 현재 슬라이드 순번 증가
          snum === SLIDE_CNT - 1 ? (snum = 0) : snum++;
          // 2. 슬라이드 순번 클래스 제어함수 호출
          setClass(stage, "on", snum);
          // 3. 블릿 순번 클래스 제어함수 호출
          setClass(indic, "on", snum);
      }, 5000);
  } /////// autoSlide 함수 /////////////
  /// [ 인터발 지우기함수 : 버튼조작시 호출함! ] ///////
  function clearAuto() {
    // 지우기 확인!
    console.log("인터발 지워!");
    // 1.인터발 지우기
    clearInterval(autoI);
    // 2.타임아웃 지우기 : 실행쓰나미 방지!!!
    clearTimeout(autoT);
    // 3.5초후 아무작동도 안하면 다시 인터발호출
    autoT = setTimeout(() => {
        autoSlide();
    }, 8000);
} ////////// clearAuto ////////////



    }// loadFn
} 
