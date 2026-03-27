// 스크롤 스파이 네비게이션
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY + 100;
  sections.forEach((section) => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute('id');
    if (scrollPos >= top && scrollPos < bottom) {
      navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
});

// 포트폴리오 슬라이더
const slides = document.querySelectorAll('.slide');
let slideIndex = 0;
const showSlide = (index) => {
  slides.forEach((slide, idx) => {
    slide.classList.toggle('active', idx === index);
  });
};

const nextSlide = () => {
  slideIndex = (slideIndex + 1) % slides.length;
  showSlide(slideIndex);
};

const prevSlide = () => {
  slideIndex = (slideIndex - 1 + slides.length) % slides.length;
  showSlide(slideIndex);
};

document.getElementById('nextSlide').addEventListener('click', nextSlide);
document.getElementById('prevSlide').addEventListener('click', prevSlide);

setInterval(nextSlide, 7000);

// 모달 열기/닫기
const modal = document.getElementById('modal');
const openModalBtn = document.getElementById('openModal');
const closeModalBtn = document.getElementById('closeModal');

openModalBtn.addEventListener('click', () => {
  modal.classList.remove('hidden');
});

closeModalBtn.addEventListener('click', () => {
  modal.classList.add('hidden');
});

modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.classList.add('hidden');
  }
});

// 문의 폼 제출 처리
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData.entries());

  if (!data.name || !data.email || !data.message) {
    alert('모든 필드를 채워주세요.');
    return;
  }

  // 실제 서버 전송은 API 엔드포인트 연결 시 처리
  alert(`${data.name}님, 문의가 접수되었습니다. 곧 답변드리겠습니다.`);
  contactForm.reset();
});

// 블로그 검색 필터
const blogSearch = document.getElementById('blogSearch');
const blogList = document.getElementById('blogList');

const filterBlog = () => {
  const q = blogSearch.value.trim().toLowerCase();
  const cards = blogList.querySelectorAll('.blog-card');

  cards.forEach((card) => {
    const title = card.querySelector('h3').textContent.toLowerCase();
    const tags = card.dataset.tags.toLowerCase();
    const match = q === '' || title.includes(q) || tags.includes(q);
    card.style.display = match ? 'grid' : 'none';
  });
};

blogSearch.addEventListener('input', filterBlog);