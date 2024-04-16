 // DOM 함수 객체 //////////////
 export default function topBar(){
    

    // 스크롤 시 navbar 색상 바꾸기
    const navbar = document.querySelector(".top-area"); //from HTML
    const navbarHeight = navbar.getBoundingClientRect().height;
    
    const ham = document.querySelector(".ham");

    document.addEventListener("scroll", () => {
      const scrollY = window.scrollY;
    
      //navbar의 높이가 현재까지 스크롤 된 Y값보다 작다면 navbar에 fixed라는 클래스를 넣어라.
      //1) 삼항연산자 사용
      navbarHeight < scrollY ? navbar.classList.add("get") : navbar.classList.remove("get");
      
      //2) if문 사용
      if (window.scrollY > navbarHeight) {
        navbar.classList.add("get");
      } else {
        navbar.classList.remove("get");
      }
    


      
     
    });
}