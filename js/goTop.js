// goTop 전체함수

export default function goTop(){

// 스크롤 이벤트 리스너
window.addEventListener('scroll', () => {
    // 스크롤 위치가 100px 이상일 때 위로 가기 버튼을 보이게 함
    if (
      document.body.scrollTop > 100 ||
      document.documentElement.scrollTop > 20
    ) {
      document.getElementById('btn-back-to-top').style.display = 'block';
      
    } else {
      document.getElementById('btn-back-to-top').style.display = 'none';
      
    }
  });
  
  let rollUpBtn = document.querySelector('#btn-back-to-top');

  const scroll = () => {
      if (window.scrollY !== 0) {
          setTimeout(() => {
              window.scrollTo(0, window.scrollY - 50);
              scroll();
          }, 15);
      }
  }
  
  rollUpBtn.addEventListener('click', scroll);
}

