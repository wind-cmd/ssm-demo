/**
 * 渲染分页组件
 * @param {number} currentPage 当前页码
 * @param {number} totalPages 总页数
 * @param {function} callback 页码点击回调函数
 */
export function renderPagination(currentPage, totalPages, callback) {
    let paginationHtml = '<button onclick="paginationCallback(1)" ' + (currentPage === 1 ? 'disabled' : '') + '>首页</button>';
    paginationHtml += '<button onclick="paginationCallback(' + Math.max(1, currentPage - 1) + ')" ' + (currentPage === 1 ? 'disabled' : '') + '>上一页</button>';

    // 控制显示的页码数量
    const visiblePages = 5; 
    let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    let endPage = Math.min(totalPages, startPage + visiblePages - 1);

    // 调整起始页码，确保显示足够的页码
    if (endPage - startPage + 1 < visiblePages) {
        startPage = Math.max(1, endPage - visiblePages + 1);
    }

    // 显示省略号
    if (startPage > 1) {
        paginationHtml += '<span>...</span>';
    }

    for (let i = startPage; i <= endPage; i++) {
        paginationHtml += '<button onclick="paginationCallback(' + i + ')" ' + (i === currentPage ? 'disabled' : '') + '>' + i + '</button>';
    }

    if (endPage < totalPages) {
        paginationHtml += '<span>...</span>';
    }

    paginationHtml += '<button onclick="paginationCallback(' + Math.min(totalPages, currentPage + 1) + ')" ' + (currentPage === totalPages ? 'disabled' : '') + '>下一页</button>';
    paginationHtml += '<button onclick="paginationCallback(' + totalPages + ')" ' + (currentPage === totalPages ? 'disabled' : '') + '>尾页</button>';

    return paginationHtml;
}

// 全局回调函数，需要在调用页面中定义
window.paginationCallback = function(page) {
    console.warn('请在调用页面中实现 paginationCallback 函数');
};