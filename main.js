
const name = document.querySelector("#name");
const form = document.querySelector('form');
const description = document.querySelector("#description");
const tbody = document.querySelector('tbody');
const filter = document.querySelector("#filter");
let data = [];
let isUpdating = false;
let updateIndex = -1;

form.addEventListener('submit', e => {
    e.preventDefault();

    if (!name.value || !description.value) {
        if (!name.value) {
            name.classList.add('is-invalid');
        } else {
            name.classList.remove('is-invalid');
        }

        if (!description.value) {
            description.classList.add('is-invalid');
        } else {
            description.classList.remove('is-invalid');
        }
    } else {  
        if (isUpdating) {
            data[updateIndex].name = name.value;
            data[updateIndex].description = description.value;
            data[updateIndex].updateAt = dayjs(new Date()).format('DD.MM.YYYY HH:mm');
            isUpdating = false;
            updateIndex = -1;
        } else {
            data.push({
                id: data.length + 1,
                name: name.value,
                description: description.value,
                time: dayjs(new Date()).format('DD.MM.YYYY HH:mm'),
                updateAt: null
            });
        }

        updateTable(data);

        name.value = ''; 
        description.value = '';
    }
});

filter.addEventListener('input', e => {
    const searchInp = e.target.value.toLowerCase();
    const filteredData = data.filter(item => 
        item.name.toLowerCase().includes(searchInp) || 
        item.description.toLowerCase().includes(searchInp)
    );
    updateTable(filteredData);
});

function updateTable(items) {
    let innerHTML = '';

    items.forEach((item, index) => {
        item.id = index + 1;
        innerHTML += `<tr>
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.description}</td>
            <td>${item.time}</td>
            <td>${item.updateAt ? item.updateAt : ''}</td>
            <td>
                <button class="btn btn-primary btn-update" data-index="${index}">Update</button>
                <button class="btn btn-danger btn-delete" data-index="${index}">Delete</button>
            </td>
        </tr>`;
    });

    tbody.innerHTML = innerHTML;

    document.querySelectorAll('.btn-delete').forEach(button => {
        button.addEventListener('click', deleteItem);
    });

    document.querySelectorAll('.btn-update').forEach(button => {
        button.addEventListener('click', updateItem);
    });
}

function deleteItem(e) {
    const index = e.target.dataset.index;
    data.splice(index, 1);
    updateTable(data);
}

function updateItem(e) {
    const index = e.target.dataset.index;
    const item = data[index];

    name.value = item.name;
    description.value = item.description;
    isUpdating = true;
    updateIndex = index;
}

























































































