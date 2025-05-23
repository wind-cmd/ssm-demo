<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>用户列表</title>
</head>
<body>
    <h2>用户列表</h2>
    <table border="1">
        <tr>
            <th>ID</th>
            <th>用户名</th>
            <th>年龄</th>
            <th>操作</th>
        </tr>
        <c:forEach items="${users}" var="user">
            <tr>
                <td>${user.id}</td>
                <td>${user.username}</td>
                <td>${user.age}</td>
                <td>
                    <a href="${pageContext.request.contextPath}/user/edit/${user.id}">编辑</a>
                    <a href="${pageContext.request.contextPath}/user/delete/${user.id}" onclick="return confirm('确定要删除吗？')">删除</a>
                </td>
            </tr>
        </c:forEach>
    </table>
    <p>
        <a href="${pageContext.request.contextPath}/user/add">添加新用户</a>
    </p>
</body>
</html> 