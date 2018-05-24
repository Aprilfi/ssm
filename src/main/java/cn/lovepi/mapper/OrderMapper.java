package cn.lovepi.mapper;

import cn.lovepi.pojo.Order;

import java.util.List;
import java.util.Map;

public interface OrderMapper {

    Integer getOrderCount();

    void addOrder(Order order);

    boolean deleteOrder(String orderid);

    void updateOrder(Order order);

    List<Order> selectOrderByPage();

    List<Order> selectAllOrder();

    List<Order> conditionSelectOrder(Map<String, Object> map);

}
