<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" import="java.util.*"%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<table align="center" border="1px solid lightgrey">
    <tr>
        <td>orderid</td>
        <td>ordertime</td>
        <td>orderprice</td>
        <td>orderuser</td>
        <td>orderdescribe</td>
    </tr>
    <c:forEach items="${allOrder}" var="order" varStatus="st">
    <tr>
        <td>${order.orderid}</td>
        <td>${order.ordertime}</td>
        <td>${order.orderprice}</td>
        <td>${order.orderuser}</td>
        <td>${order.orderdescribe}</td>
    </tr>
    </c:forEach>
</table>