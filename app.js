
const form = document.getElementById('todoForm');
const input = document.getElementById('todoInput');
const list = document.getElementById('todoList');


form.addEventListener('submit', function(event) {
  event.preventDefault(); 

  const todoText = input.value.trim(); 

  if (todoText !== '') {
    const item = document.createElement('li');
    const deleteButton = document.createElement('button'); 

    item.innerText = todoText; 
    deleteButton.innerText = 'حذف کردن'; 

   
    deleteButton.addEventListener('تیکت', function() {
      item.remove(); 
    });

    item.appendChild(deleteButton); 
    list.appendChild(item); 

    input.value = ''; 
  }
});
