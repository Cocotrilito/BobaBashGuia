const levelButtons = [...document.querySelectorAll('[data-level]')];
const panels = [...document.querySelectorAll('.level-panel')];
const tasks = [...document.querySelectorAll('[data-task]')];
const toast = document.getElementById('toast');
const progressText = document.getElementById('progressText');

levelButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const target = `level-${button.dataset.level}`;
    levelButtons.forEach((item) => {
      const selected = item === button;
      item.classList.toggle('active', selected);
      item.setAttribute('aria-selected', String(selected));
    });
    panels.forEach((panel) => {
      const selected = panel.id === target;
      panel.classList.toggle('active', selected);
      panel.hidden = !selected;
    });
  });
});

function updateProgress() {
  const completed = tasks.filter((task) => task.checked).length;
  const percent = Math.round((completed / tasks.length) * 100);
  progressText.textContent = `${percent}%`;
}

tasks.forEach((task) => {
  const key = `boba-task-${task.dataset.task}`;
  task.checked = localStorage.getItem(key) === 'true';
  task.addEventListener('change', () => {
    localStorage.setItem(key, String(task.checked));
    updateProgress();
  });
});
updateProgress();

document.querySelectorAll('[data-copy]').forEach((button) => {
  button.addEventListener('click', async () => {
    const content = document.getElementById(button.dataset.copy).textContent;
    try {
      await navigator.clipboard.writeText(content);
      const old = button.textContent;
      button.textContent = 'Copiado ✓';
      toast.classList.add('show');
      setTimeout(() => { button.textContent = old; toast.classList.remove('show'); }, 1700);
    } catch {
      button.textContent = 'Selecciona y copia';
    }
  });
});
