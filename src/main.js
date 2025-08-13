const todos = [
  {
    title: 'Finish project report',
    description: 'Summarize results and finalize the draft',
    dueDate: '2024-05-30',
    completed: false,
    tags: ['Work', 'Writing']
  },
  {
    title: 'Buy groceries',
    description: 'Milk, eggs and bread',
    dueDate: '2024-05-20',
    completed: true,
    tags: ['Personal']
  },
  {
    title: 'Call plumber',
    description: 'Fix the leaking kitchen sink',
    dueDate: '2024-05-25',
    completed: false,
    tags: ['Home']
  },
  {
    title: 'Read book',
    description: 'Finish reading the novel',
    dueDate: '2024-06-01',
    completed: false,
    tags: []
  }
];

const tagColors = [
  'bg-blue-100 text-blue-800',
  'bg-green-100 text-green-800',
  'bg-purple-100 text-purple-800',
  'bg-yellow-100 text-yellow-800'
];

const topicFilter = document.getElementById('topicFilter');
const sortSelect = document.getElementById('sortSelect');
const todoList = document.getElementById('todoList');

function populateFilters() {
  const topics = Array.from(new Set(todos.flatMap(t => t.tags)));
  topics.forEach(tag => {
    const option = document.createElement('option');
    option.value = tag;
    option.textContent = tag;
    topicFilter.appendChild(option);
  });
}

function renderTodos() {
  let items = todos.filter(t => {
    return topicFilter.value === 'all' || t.tags.includes(topicFilter.value);
  });

  if (sortSelect.value === 'dueDate') {
    items.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  } else if (sortSelect.value === 'topic') {
    items.sort((a, b) => {
      const aTag = a.tags[0] || '';
      const bTag = b.tags[0] || '';
      return aTag.localeCompare(bTag);
    });
  }

  todoList.innerHTML = items
    .map((t) => {
      const tags = t.tags
        .map((tag, idx) => `<span class="inline-block rounded px-2 py-0.5 text-xs font-medium ${tagColors[idx % tagColors.length]}">${tag}</span>`)
        .join('');

      return `
        <li class="bg-white p-4 rounded-lg shadow flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div class="flex items-start gap-4">
            <input type="checkbox" class="size-4 rounded border-gray-300" ${t.completed ? 'checked' : ''} />
            <div>
              <h2 class="text-lg font-medium">${t.title}</h2>
              <p class="text-sm text-gray-600">${t.description}</p>
              <div class="flex flex-wrap gap-2 mt-2">${tags}</div>
            </div>
          </div>
          <div class="text-sm text-gray-500">Due: ${t.dueDate}</div>
        </li>
      `;
    })
    .join('');
}

populateFilters();
renderTodos();

topicFilter.addEventListener('change', renderTodos);
sortSelect.addEventListener('change', renderTodos);
