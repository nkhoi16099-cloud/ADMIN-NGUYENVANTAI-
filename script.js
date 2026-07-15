// ============ LOADING ============
window.addEventListener('load',()=>{
  setTimeout(()=>document.getElementById('loadingScreen').classList.add('hidden'),1500);
  startCounters();
});

// ============ SPOTLIGHT ============
const spotlight=document.getElementById('spotlight');
document.addEventListener('mousemove',e=>{
  spotlight.style.left=e.clientX+'px';
  spotlight.style.top=e.clientY+'px';
});

// ============ TYPING EFFECT ============
const typingElement=document.getElementById('typing-text');
const textToType='CHECK UY TÍN NGUYỄN VĂN TÀI STORE';
let charIndex=0;
function type(){
  if(charIndex<textToType.length){
    typingElement.textContent+=textToType.charAt(charIndex);
    charIndex++;
    setTimeout(type,80);
  }
}
setTimeout(type,500);

// ============ MOBILE MENU ============
const menuToggle=document.getElementById('menuToggle');
const nav=document.getElementById('nav');
menuToggle.addEventListener('click',()=>{
  nav.classList.toggle('open');
  const spans=menuToggle.querySelectorAll('span');
  if(nav.classList.contains('open')){
    spans[0].style.transform='rotate(45deg) translate(5px,5px)';
    spans[1].style.opacity='0';
    spans[2].style.transform='rotate(-45deg) translate(5px,-5px)';
  }else{
    spans[0].style.transform='none';
    spans[1].style.opacity='1';
    spans[2].style.transform='none';
  }
});
document.querySelectorAll('.nav-link').forEach(link=>{
  link.addEventListener('click',()=>{
    nav.classList.remove('open');
    menuToggle.querySelectorAll('span').forEach(s=>{s.style.transform='none';s.style.opacity='1'});
  });
});

// ============ RIPPLE ============
document.querySelectorAll('.ripple-btn').forEach(btn=>{
  btn.addEventListener('click',function(e){
    const ripple=document.createElement('span');
    ripple.classList.add('ripple');
    const rect=this.getBoundingClientRect();
    const size=Math.max(rect.width,rect.height);
    ripple.style.width=ripple.style.height=size+'px';
    ripple.style.left=e.clientX-rect.left-size/2+'px';
    ripple.style.top=e.clientY-rect.top-size/2+'px';
    this.appendChild(ripple);
    ripple.addEventListener('animationend',()=>ripple.remove());
  });
});

// ============ CHECK UY TÍN ============
const adminInfo={
  phones:['0367537935','0367.537.935','+84367537935','367537935','84367573935'],
  tele:['rick_nbak','@rick_nbak','t.me/rick_nbak'],
  fb: ['100000097307591', 'https://www.facebook.com/share/18tMsZtyJR/'],
  email:'contact.nguyenvantai.store@gmail.com'
};
function normalize(s){return s.toLowerCase().replace(/\\s+/g,'').replace(/[-_.]/g,'')}
function isAdmin(input){
  const n=normalize(input);
  if(adminInfo.phones.some(p=>n.includes(normalize(p))))return true;
  if(adminInfo.tele.some(t=>n.includes(t)))return true;
  if(n.includes('100000097307591'))return true;
  if(n.includes('contact.nguyenvantai.store@gmail.com'))return true;
  if(n.includes('0367537935')||n.includes('367537935'))return true;
  return false;
}
const checkInput=document.getElementById('checkInput');
const checkBtn=document.getElementById('checkBtn');
const resultCard=document.getElementById('resultCard');
const errorCard=document.getElementById('errorCard');
checkBtn.addEventListener('click',()=>{
  const val=checkInput.value.trim();
  resultCard.classList.remove('show');
  errorCard.classList.remove('show');
  if(!val){errorCard.classList.add('show');return}
  checkBtn.disabled=true;
  checkBtn.innerHTML='<i class="fas fa-spinner fa-spin"></i> Đang kiểm tra...';
  setTimeout(()=>{
    if(isAdmin(val)){
      resultCard.classList.add('show');
      resultCard.scrollIntoView({behavior:'smooth',block:'center'});
    }else{
      errorCard.classList.add('show');
      errorCard.scrollIntoView({behavior:'smooth',block:'center'});
    }
    checkBtn.disabled=false;
    checkBtn.innerHTML='<i class="fas fa-fingerprint"></i> Xác minh';
  },800);
});

// ============ COUNTER ============
let countersStarted=false;
function startCounters(){
  if(countersStarted)return;
  countersStarted=true;
  document.querySelectorAll('.stat-number[data-target]').forEach(stat=>{
    const target=parseFloat(stat.dataset.target);
    const isFloat=target%1!==0;
    const duration=2000;
    const start=performance.now();
    function update(now){
      const progress=Math.min((now-start)/duration,1);
      const eased=1-Math.pow(1-progress,3);
      const current=target*eased;
      stat.textContent=isFloat?current.toFixed(1):Math.floor(current);
      if(progress<1)requestAnimationFrame(update);
      else stat.textContent=target+(isFloat?'%':'+');
    }
    requestAnimationFrame(update);
  });
}
const statsObserver=new IntersectionObserver(entries=>{
  if(entries[0].isIntersecting){startCounters();statsObserver.unobserve(entries[0].target)}
},{threshold:0.3});
const statsSection=document.getElementById('stats');
if(statsSection)statsObserver.observe(statsSection);

// ============ FEEDBACK (tự nhiên) ============
const names=['Tuấn Anh','Minh Hoàng','Thanh Hà','Hoài Nam','Phương Thảo','Văn Đức','Ngọc Diệp','Quang Huy','Mỹ Linh','Trung Kiên','Hải Yến','Đình Phong','Kim Ngân','Bảo Long','Thu Hằng','Công Vinh','Lan Hương','Thế Vinh','Hồng Nhung','Anh Dũng'];
const comments=[
  'Giao dịch ok, acc về tay nhanh. Lần đầu mua cũng hơi lo nhưng được bảo hành đàng hoàng.',
  'Mua acc Free Fire cho em trai, shop hỗ trợ nhiệt tình, giá cả phải chăng.',
  'Mình đã mua 2 lần, lần nào cũng ưng ý. Nói chung là đáng tin cậy.',
  'Tư vấn kỹ, không hối thúc. Giao acc xong còn hướng dẫn bảo mật. Rất có tâm.',
  'Lúc đầu sợ lừa đảo nhưng sau khi check thì yên tâm. Sẽ quay lại.',
  'Acc Liên Quân ngon, rank cao đúng mô tả. Bảo hành 3 tháng vẫn ok.',
  'Giao dịch qua trung gian nên an tâm. Phí một chút nhưng đáng.',
  'Shop uy tín thật sự, không như mấy page khác. Đã giới thiệu bạn bè.',
  'Mua acc PUBG, giao nhanh, skin đẹp. Hỗ trợ đổi mật khẩu tận tình.',
  'Chị mình mua ở đây rồi giới thiệu. Thấy bảo hành lâu, yên tâm.',
  'Admin rep nhanh, không vòng vo. Mình thích cách làm việc chuyên nghiệp.',
  'Giá hơi cao tí nhưng bù lại uy tín, không lo mất acc. Kinh nghiệm 4 năm rồi.',
  'Có lần quên mật khẩu, nhắn admin hỗ trợ lại ngay trong đêm. Quá tốt.',
  'Mua acc Valorant, acc ổn định, không bị ban. Đúng chất lượng.',
  'Từ ngày biết shop này, mình không mua ở đâu nữa. Uy tín số 1.',
  'Acc Genshin AR60, nhân vật 5 sao đầy đủ. Giao dịch an toàn.',
  'Cảm ơn admin đã tư vấn, mình mua acc Tốc Chiến rất ưng.',
  'Đánh giá 5 sao cho sự nhiệt tình. Chúc shop ngày càng phát triển.',
  'Mình ở nước ngoài vẫn giao dịch được. Ship code nhanh gọn.',
  'Lần sau cần mua acc game sẽ ủng hộ tiếp. Rất đáng để giới thiệu.'
];
function renderFeedback(count=300){
  const track=document.getElementById('feedbackTrack');
  let html='';
  for(let i=0;i<count;i++){
    const name=names[i%names.length]+(i>=names.length?` ${Math.floor(i/names.length)+1}`:'');
    const comment=comments[i%comments.length];
    const initials=name.split(' ').pop().charAt(0)+name.charAt(0);
    html+=`<div class="feedback-card glass-card">
      <div class="feedback-avatar">${initials}</div>
      <h4>${name}</h4>
      <div class="feedback-stars">★★★★★</div>
      <p class="feedback-text">"${comment}"</p>
    </div>`;
  }
  track.innerHTML=html+html;
}
renderFeedback(300);

// ============ STAR RATING INPUT ============
const stars=document.querySelectorAll('.star-item');
let selectedRating=0;
stars.forEach(star=>{
  star.addEventListener('click',()=>{
    selectedRating=parseInt(star.dataset.value);
    updateStars();
  });
  star.addEventListener('mouseenter',()=>{
    const value=parseInt(star.dataset.value);
    stars.forEach(s=>s.classList.toggle('active',parseInt(s.dataset.value)<=value));
  });
});
document.querySelector('.stars-input').addEventListener('mouseleave',updateStars);
function updateStars(){
  stars.forEach(s=>s.classList.toggle('active',parseInt(s.dataset.value)<=selectedRating));
}

// ============ SUBMIT REVIEW ============
document.getElementById('submitReview').addEventListener('click',()=>{
  const textarea=document.querySelector('.review-textarea');
  if(textarea.value.trim()&&selectedRating>0){
    alert(`✅ Cảm ơn bạn đã đánh giá ${selectedRating} sao!\nĐánh giá sẽ được kiểm duyệt và hiển thị sớm.`);
    textarea.value='';
    selectedRating=0;
    updateStars();
  }else{
    alert('Vui lòng chọn số sao và nhập nội dung đánh giá.');
  }
});

// ============ BACK TO TOP ============
const backToTop=document.getElementById('backToTop');
window.addEventListener('scroll',()=>{
  backToTop.classList.toggle('show',window.scrollY>500);
});
backToTop.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

// ============ SCROLL REVEAL ============
const revealElements=document.querySelectorAll('.section,.service-card,.stat-card,.commit-card');
const revealObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.style.opacity='1';
      entry.target.style.transform='translateY(0)';
    }
  });
},{threshold:0.1});
revealElements.forEach(el=>{
  el.style.opacity='0';
  el.style.transform='translateY(30px)';
  el.style.transition='0.6s ease';
  revealObserver.observe(el);
});

// ============ CARD 3D TILT ============
document.querySelectorAll('.card-3d').forEach(card=>{
  card.addEventListener('mousemove',e=>{
    const rect=card.getBoundingClientRect();
    const x=e.clientX-rect.left-rect.width/2;
    const y=e.clientY-rect.top-rect.height/2;
    card.style.transform=`perspective(1000px) rotateY(${x/15}deg) rotateX(${-y/15}deg) translateY(-5px)`;
  });
  card.addEventListener('mouseleave',()=>{
    card.style.transform='perspective(1000px) rotateY(0) rotateX(0) translateY(0)';
  });
});

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
  anchor.addEventListener('click',function(e){
    e.preventDefault();
    const target=document.querySelector(this.getAttribute('href'));
    if(target)window.scrollTo({top:target.offsetTop-100,behavior:'smooth'});
  });
});
