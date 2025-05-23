let highlightMode = false;
let lastClassScoreData = null;
let currentPage = 1;
let totalPages = 1;

// 自定义日志类
class FrontendLogger {
    constructor() {
        this.logs = [];
        this.logElement = document.createElement('div');
        this.logElement.id = 'frontend-logs';
        this.logElement.style.maxHeight = '200px';
        this.logElement.style.overflowY = 'auto';
        this.logElement.style.border = '1px solid #ccc';
        this.logElement.style.padding = '10px';
        document.body.appendChild(this.logElement);
    }

    log(message) {
        const timestamp = new Date().toLocaleString();
        const logEntry = `${timestamp}: ${message}`;
        this.logs.push(logEntry);
        this.updateLogDisplay();
        console.log(logEntry);
    }

    updateLogDisplay() {
        this.logElement.innerHTML = this.logs.map(log => `<p>${log}</p>`).join('');
    }
}

// 移除或注释日志实例初始化
// const frontendLogger = new FrontendLogger();

function loadAllClasses() {
    // 移除或注释日志调用处
    // frontendLogger.log('开始加载所有班级信息');
    fetch('/ssm-demo/user/classList')
      .then(res => res.json())
      .then(data => {
            let html = '<option value="">全部</option>' + data.map(c => `<option value="${c}">${c}</option>`).join('');
            document.getElementById('classSelect').innerHTML = html;
            frontendLogger.log('所有班级信息加载完成');
        });
}

function loadScores(page = 1) {
    const classSelectElement = document.getElementById('classSelect');
    const pageSizeElement = document.getElementById('pageSize');
    const className = classSelectElement ? classSelectElement.value : '';
    const pageSize = pageSizeElement ? pageSizeElement.value : '10';
    currentPage = page;
    fetch(`/ssm-demo/score/classList?className=${encodeURIComponent(className)}&pageSize=${pageSize}&page=${page}`)
      .then(res => {
            if (res.status === 304) {
                frontendLogger.log('收到 304 状态码，重新发起请求');
                return fetch(`/ssm-demo/score/classList?className=${encodeURIComponent(className)}&pageSize=${pageSize}&page=${page}`, { cache: 'no-cache' });
            }
            return res.json();
        })
      .then(data => {
            lastClassScoreData = data;
            renderClassScoreTable(data);
            totalPages = Math.ceil(data.total / pageSize);
            renderPaginationElement();
            frontendLogger.log(`第 ${page} 页的成绩信息加载完成`);
        });
}

import { renderPagination } from './pagination.js';

// 定义分页回调函数
window.paginationCallback = function(page) {
    const className = document.getElementById('classSelect').value;
    const pageSize = document.getElementById('pageSize').value;
    currentPage = page;
    fetch(`/ssm-demo/score/classList?className=${encodeURIComponent(className)}&pageSize=${pageSize}&page=${page}`)
      .then(res => res.json())
      .then(data => {
            lastClassScoreData = data;
            renderClassScoreTable(data);
            totalPages = Math.ceil(data.total / pageSize);
            renderPaginationElement();
        });
};

function renderPaginationElement() {
    const paginationHtml = renderPagination(currentPage, totalPages, window.paginationCallback);
    const paginationDiv = document.getElementById('pagination');
    if (paginationDiv) {
        paginationDiv.innerHTML = `<span>共${lastClassScoreData.total}人</span>` + paginationHtml; // 假设这是第 90 行的操作
    } else {
        console.error('未找到分页 DOM 元素');
    }
}

function renderClassScoreTable(data) {
    const subjects = data.subjects;
    const students = data.students;
    const subjectAvg = data.subjectAvg;
    const classAvg = data.classAvg;
    const totalStudents = data.total; // 获取总人数

    // 表头添加排序功能
    let headHtml = '<tr><th onclick="sortStudents(\'username\')">姓名</th>';
    subjects.forEach(sub => {
        headHtml += `<th onclick="sortStudents('${sub.name}')">${sub.name}</th>`;
    });
    headHtml += '<th onclick="sortStudents(\'total\')">总分</th><th onclick="sortStudents(\'avg\')">平均分</th></tr>';
    document.getElementById('scoreTableHead').innerHTML = headHtml;

    let bodyHtml = '';
    // 表体
    students.forEach(stu => {
        let rowCls = '';
        if (highlightMode && (stu.total >= classAvg || stu.total === 0)) {
            rowCls = 'score-high';
        }
        bodyHtml += `<tr class="${rowCls}"><td class="${highlightMode && (stu.total >= classAvg || stu.total === 0) ? 'score-high' : ''}">${stu.username}</td>`;
        subjects.forEach(sub => {
            const val = stu.scores[sub.name];
            let cls = '';
            if (val === 0) {
                cls = 'score-zero';
            } else if (highlightMode && val !== null && val !== undefined) {
                if (val >= subjectAvg[sub.name]) {
                    cls = 'score-high';
                } else {
                    cls = 'score-low';
                }
            }
            bodyHtml += `<td class="${cls.trim()}">${val !== null && val !== undefined ? val : 0}</td>`;
        });
        // 将成绩为 0 的总分和平均分设置高亮
        const totalCls = highlightMode && (stu.total >= classAvg || stu.total === 0) ? 'score-high' : '';
        const avgCls = highlightMode && (stu.avg >= classAvg || stu.avg === 0) ? 'score-high' : '';
        bodyHtml += `<td class="${totalCls}">${stu.total}</td><td class="${avgCls}">${stu.avg.toFixed(2)}</td></tr>`;
    });

    document.getElementById('scoreTableBody').innerHTML = bodyHtml;
}

function toggleHighlight() {
    highlightMode = !highlightMode;
    if (lastClassScoreData) {
        renderClassScoreTable(lastClassScoreData);
    }
}

function sortStudents(sortBy) {
    const className = document.getElementById('classSelect').value;
    const pageSize = document.getElementById('pageSize').value;
    // 重新加载数据并传递排序参数
    fetch(`/ssm-demo/score/classList?className=${encodeURIComponent(className)}&pageSize=${pageSize}&page=1&sortBy=${sortBy}`)
      .then(res => res.json())
      .then(data => {
            lastClassScoreData = data;
            renderClassScoreTable(data);
            totalPages = Math.ceil(data.total / pageSize);
            renderPagination();
        });
}

document.addEventListener('DOMContentLoaded', function() {
    loadAllClasses();
    loadScores(1);
});
const someElement = document.getElementById('someElement');
if (someElement) {
    someElement.innerHTML = 'new content';
}