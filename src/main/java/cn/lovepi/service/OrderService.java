package cn.lovepi.service;

import cn.lovepi.pojo.Order;

import java.util.List;
import java.util.Map;

public interface OrderService {

    List<Order> AllOrderQuery();

    Map<String,Object> OrderByPageQuery(int pageNumber, int pageSize);

    Integer OrderCountQuery();

    boolean addOrder(Order order);

    boolean deleteOrder(List<String> orders);

    boolean updateOrder(Order order);

    List<Order> conditionOrderQuery(Map<String, Object> map);


}
