package cn.lovepi.service;

import cn.lovepi.pojo.Order;

import java.util.List;
import java.util.Map;

public interface OrderService {

    List<Order> AllOrderQuery();

    Map<String,Object> OrderByPageQuery(int pageNumber, int pageSize);

    Integer OrderCountQuery();

    void addOrder(Order order);

    boolean deleteOrder(String orderid);

    void updateOrder(Order order);

}
