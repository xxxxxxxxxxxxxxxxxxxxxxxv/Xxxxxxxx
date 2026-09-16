const grid=document.querySelector("#pathGrid"), modal=document.querySelector("#modal"), content=document.querySelector("#modalContent");
const groups=["لغات البرمجة","التخصصات","أدوات وتقنيات"];
const icons={HTML:"</>",CSS3:"CSS",JS:"JS",PY:"PY",WEB:"WEB","UI/UX":"UI",API:"API",GIT:"git",GH:"GH",DB:"DB"};
function card(c){return `<article class="card"><div><div class="logo">${icons[c.tag]||c.tag}</div><h3>${c.title}</h3><p>${c.desc}</p></div><button onclick="openCourse('${c.id}')">عرض المنهج</button></article>`}
grid.innerHTML=groups.map(g=>`<div style="grid-column:1/-1;margin-top:22px"><h2>${g}</h2></div>`+window.COURSES.courses.filter(c=>c.group===g).map(card).join("")).join("");
function openCourse(id){
 const c=window.COURSES.courses.find(x=>x.id===id);
 content.innerHTML=`<div class="course-header"><button class="back" onclick="closeCourse()">← العودة للمسارات</button><p class="eyebrow">${c.group}</p><h2>${c.title}</h2><p>${c.desc}</p></div>`+
 c.lessons.map((l,i)=>`<article class="lesson"><h4>${i+1}. ${l[0]}</h4><p>${l[1]}</p><code>// مثال سريع مرتبط بالدرس
// طبّق بنفسك بعد المشاهدة</code><a class="btn primary" style="margin-top:12px" target="_blank" rel="noopener" href="${l[2]}">مشاهدة الشرح</a></article>`).join("");
 modal.classList.add("show"); modal.setAttribute("aria-hidden","false");
}
function closeCourse(){modal.classList.remove("show");modal.setAttribute("aria-hidden","true")}
document.querySelector("#closeModal").onclick=closeCourse;
modal.addEventListener("click",e=>{if(e.target===modal)closeCourse()});
document.querySelectorAll(".contact-numbers button").forEach(b=>b.onclick=()=>{document.querySelector("#contactNumber").value=b.dataset.number.includes("1")?"رقم التواصل الأول":"رقم التواصل الثاني";document.querySelector("#message").focus()});
document.querySelector("#contactForm").addEventListener("submit",e=>{
 e.preventDefault();
 const cfg=window.FRONT_ACADEMY_CONFIG?.whatsappNumbers||{};
 const chosen=document.querySelector("#contactNumber").value;
 const number=chosen==="رقم التواصل الأول"?cfg.first:chosen==="رقم التواصل الثاني"?cfg.second:"";
 if(!number){alert("اختر رقم التواصل أولاً.");return}
 const text=`الاسم: ${document.querySelector("#name").value}\nالهاتف: ${document.querySelector("#phone").value}\nالرسالة: ${document.querySelector("#message").value}`;
 window.open(`https://wa.me/${number}?text=${encodeURIComponent(text)}`,"_blank");
});
document.querySelector("#year").textContent=new Date().getFullYear();
