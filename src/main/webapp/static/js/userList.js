let pageSize = 10;
let editingUserId = null;

function loadUsers(page = 1, className = '') {
    const loading = document.getElementById('loading');
    const userList = document.getElementById('userList');
    loading.style.display = 'block';
    userList.innerHTML = '';

    fetch(`/ssm-demo/user/list?className=${encodeURIComponent(className)}&page=${page}&size=${pageSize}`)
      .then(response => response.json())
      .then(data => {
            loading.style.display = 'none';
            const users = data.users;
            const totalUsers = data.total;

            if (users.length === 0) {
                userList.innerHTML = '<tr><td colspan="5" style="text-align: center;">暂无用户数据</td></tr>';
                renderPagination(1, 1);
                return;
            }

            users.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.username}</td>
                    <td>${user.age}</td>
                    <td>${user.className || ''}</td>
                    <td>
                        <button class="action-btn edit-btn" onclick="openEditModal(${user.id})">编辑</button>
                        <button class="action-btn delete-btn" onclick="openDeleteModal(${user.id})">删除</button>
                        <a class="action-btn" style="background:#8bc34a" href="scoreList.html?userId=${user.id}">成绩单</a>
                    </td>
                `;
                userList.appendChild(row);
            });

            renderPagination(page, Math.ceil(totalUsers / pageSize));
        })
      .catch(error => {
            loading.style.display = 'none';
            showGlobalMessage(error.message, false);
        });
}

// 移除以下重复代码
// function renderPagination(current, total) {
//     const pagination = document.getElementById('pagination');
//     pagination.innerHTML = '';
//     for (let i = 1; i <= total; i++) {
//         const btn = document.createElement('button');
//         btn.textContent = i;
//         btn.className = i === current ? 'active' : '';
//         btn.disabled = i === current;
//         btn.onclick = () => loadUsers(i);
//         pagination.appendChild(btn);
//     }
// }

function loadAllClassesForUser() {
    fetch('/ssm-demo/user/classList')
      .then(res => res.json())
      .then(data => {
            let html = data.map(c => `<option value="${c}">${c}</option>`).join('');
            document.getElementById('modalClass').innerHTML = html;
        });
}

function openAddModal() {
    editingUserId = null;
    document.getElementById('modalTitle').textContent = '添加用户';
    document.getElementById('modalUsername').value = '';
    document.getElementById('modalPassword').value = '';
    document.getElementById('modalAge').value = '';
    loadAllClassesForUser();
    document.getElementById('modalClass').value = '';
    document.getElementById('userModal').style.display = 'block';
}

function openEditModal(id) {
    editingUserId = id;
    document.getElementById('modalTitle').textContent = '编辑用户';
    fetch(`/ssm-demo/user/${id}`)
      .then(response => response.json())
      .then(user => {
            document.getElementById('modalUsername').value = user.username;
            document.getElementById('modalPassword').value = '';
            document.getElementById('modalAge').value = user.age;
            loadAllClassesForUser();
            setTimeout(() => {
                document.getElementById('modalClass').value = user.className || '';
            }, 100);
            document.getElementById('userModal').style.display = 'block';
        });
}

function closeUserModal() {
    document.getElementById('userModal').style.display = 'none';
}

function saveUser() {
    const username = document.getElementById('modalUsername').value.trim();
    const password = document.getElementById('modalPassword').value;
    const age = document.getElementById('modalAge').value;
    const className = document.getElementById('modalClass').value;
    if (!username || !age || !className || (!editingUserId && !password)) {
        showMessage('请填写所有字段', false);
        return;
    }
    const data = {
        username: username,
        password: password,
        age: age,
        className: className
    };

    const method = editingUserId ? 'PUT' : 'POST';
    const url = editingUserId ? `/ssm-demo/user/${editingUserId}` : '/ssm-demo/user';

    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(result => {
            if (result.success) {
                showMessage('保存成功', true);
                closeUserModal();
                loadUsers();
            } else {
                showMessage('保存失败: ' + result.message, false);
            }
        })
      .catch(error => {
            showMessage('保存失败: ' + error.message, false);
        });
}

function showMessage(message, isSuccess) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = message;
    messageDiv.style.display = 'block';
    messageDiv.className = 'message ' + (isSuccess ? 'success' : 'error');
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 3000);
}

function changePageSize() {
    pageSize = parseInt(document.getElementById('pageSizeSelect').value);
    loadUsers(1);
}

function showGlobalMessage(message, isSuccess) {
    const msg = document.getElementById('globalMessage');
    msg.textContent = message;
    msg.className = 'global-message' + (isSuccess ? '' : ' error');
    msg.style.display = 'block';
    setTimeout(() => { msg.style.display = 'none'; }, 2000);
}

function loadAllClassesForFilter() {
    fetch('/ssm-demo/user/classList')
      .then(res => res.json())
      .then(data => {
            let html = '<option value="">全部</option>' + data.map(c => `<option value="${c}">${c}</option>`).join('');
            document.getElementById('classFilterSelect').innerHTML = html;
        });
}

function filterByClass() {
    const className = document.getElementById('classFilterSelect').value;
    loadUsers(1, className);
}

function resetClassFilter() {
    document.getElementById('classFilterSelect').value = '';
    loadUsers(1);
}

// 点击弹窗外部关闭弹窗
window.onclick = function(event) {
    if (event.target === document.getElementById('userModal')) {
        closeUserModal();
    }
    if (event.target === document.getElementById('deleteModal')) {
        closeDeleteModal();
    }
};

document.addEventListener('DOMContentLoaded', function() {
    loadUsers(1);
    loadAllClassesForFilter();
});