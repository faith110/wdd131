// main.js
// All dynamic features for WellNest - uses localStorage, template literals only for output strings.

// Utility / DOM helpers
function qs(sel){ return document.querySelector(sel) }
function qsa(sel){ return Array.from(document.querySelectorAll(sel)) }

// 1) Simple UI enhancements
function setCurrentYear(){
  const y = new Date().getFullYear();
  const years = qsa('#year, #year-about, #year-habits');
  years.forEach(el => { if(el) el.textContent = `${y}` });
}

// 2) Mobile nav toggle
function bindNavToggle(){
  const btn = qs('#nav-toggle');
  const nav = qs('#main-nav');
  if(!btn || !nav) return;
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    nav.style.display = expanded ? '' : 'block';
  });
}

// 3) Habit tracker functionality (objects, arrays, array methods, localStorage)
const STORAGE_KEY = 'wellnest.habits';
function loadHabits(){
  const raw = localStorage.getItem(STORAGE_KEY);
  try{
    return raw ? JSON.parse(raw) : [];
  }catch(e){
    console.error('Could not parse habits', e);
    return [];
  }
}

function saveHabits(habits){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
}

function renderHabits(){
  const list = qs('#habit-list');
  if(!list) return;
  const habits = loadHabits();
  if(habits.length === 0){
    list.innerHTML = `<li class="card">No habits yet — add one above.</li>`;
    return;
  }
  // use template literals exclusively to build UI strings
  list.innerHTML = habits.map((h, idx) => {
    return `<li class="card" data-idx="${idx}">
      <strong>${h.name}</strong>
      <p>Target: ${h.frequency} / day — Category: ${h.category}</p>
      <div>
        <button class="mark-done" data-idx="${idx}">Mark once</button>
        <button class="delete-habit" data-idx="${idx}">Delete</button>
      </div>
      <small>Completed today: ${h.todayCount || 0}</small>
    </li>`;
  }).join('');
}

function addHabitFromForm(e){
  e.preventDefault();
  const form = e.target;
  const name = form.querySelector('#habit-name').value.trim();
  const freq = parseInt(form.querySelector('#habit-frequency').value, 10) || 1;
  const category = form.querySelector('input[name="category"]:checked').value || 'physical';

  // validation + branching
  if(name.length < 2){
    alert('Please enter a longer habit name.');
    return;
  }

  const habits = loadHabits();
  // create object
  const habit = { id: Date.now(), name, frequency: freq, category, created: new Date().toISOString(), todayCount: 0 };
  habits.push(habit);
  saveHabits(habits);
  renderHabits();
  form.reset();
}

// mark once (demonstrates selecting an element, modifying, conditional branching)
function bindHabitListButtons(){
  const list = qs('#habit-list');
  if(!list) return;
  list.addEventListener('click', (ev) => {
    const btn = ev.target.closest('button');
    if(!btn) return;
    const idx = Number(btn.dataset.idx);
    let habits = loadHabits();
    const h = habits[idx];
    if(!h) return;

    if(btn.classList.contains('mark-done')){
      // conditional: only increment if not reached target
      if((h.todayCount || 0) >= h.frequency){
        alert(`You've already reached the daily goal for "${h.name}".`);
      } else {
        h.todayCount = (h.todayCount || 0) + 1;
        saveHabits(habits);
        renderHabits();
      }
    } else if(btn.classList.contains('delete-habit')){
      // remove using filter (array method)
      habits = habits.filter((_, i) => i !== idx);
      saveHabits(habits);
      renderHabits();
    }
  });
}

// 4) Mood logger (uses arrays, objects, localStorage)
const MOOD_KEY = 'wellnest.moods';
function saveMood(value){
  const all = JSON.parse(localStorage.getItem(MOOD_KEY) || '[]');
  const entry = { id: Date.now(), mood: Number(value), at: new Date().toISOString() };
  all.push(entry);
  localStorage.setItem(MOOD_KEY, JSON.stringify(all));
  renderMoodHistory();
}

function renderMoodHistory(){
  const node = qs('#mood-history');
  if(!node) return;
  const items = JSON.parse(localStorage.getItem(MOOD_KEY) || '[]');
  if(items.length === 0){
    node.innerHTML = '<p>No mood entries yet.</p>';
    return;
  }
  node.innerHTML = `<ul>${items.slice().reverse().map(i => `<li>${new Date(i.at).toLocaleString()}: Mood ${i.mood}</li>`).join('')}</ul>`;
}

// 5) Accessibility: ensure keyboard nav for habit form submit
function bindForms(){
  const habitForm = qs('#habit-form');
  if(habitForm) habitForm.addEventListener('submit', addHabitFromForm);

  const moodForm = qs('#mood-form');
  if(moodForm){
    moodForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const moodSelect = qs('#mood');
      if(!moodSelect.value) { alert('Please choose a mood'); return; }
      saveMood(moodSelect.value);
      moodSelect.value = '';
    });
  }
}

// 6) Progressive image enhancement example (IntersectionObserver) + lazy fallback
function progressiveImages(){
  const imgs = qsa('img[loading="lazy"]');
  if('IntersectionObserver' in window){
    const obs = new IntersectionObserver((entries, o) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          const img = entry.target;
          // add a class or effect - here simply ensure the image is loaded (native loading lazy already set)
          img.classList.add('visible');
          o.unobserve(img);
        }
      });
    }, {rootMargin: '200px'});
    imgs.forEach(i => obs.observe(i));
  }
}

// 7) Reset daily counts at midnight (simple check on load; could be improved)
function resetDailyIfNeeded(){
  const lastResetKey = 'wellnest.lastReset';
  const last = localStorage.getItem(lastResetKey);
  const today = new Date().toDateString();
  if(last === today) return;
  const habits = loadHabits();
  habits.forEach(h => h.todayCount = 0);
  saveHabits(habits);
  localStorage.setItem(lastResetKey, today);
}

// init
function init(){
  setCurrentYear();
  bindNavToggle();
  bindForms();
  bindHabitListButtons();
  renderHabits();
  renderMoodHistory();
  progressiveImages();
  resetDailyIfNeeded();
  // expose some helpers to window for debugging (optional)
  window.__wellnest = { loadHabits, saveHabits, renderHabits };
}

document.addEventListener('DOMContentLoaded', init);
