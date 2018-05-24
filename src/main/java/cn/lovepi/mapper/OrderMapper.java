package cn.lovepi.mapper;

import cn.lovepi.pojo.Order;

import java.util.List;
import java.util.Map;

public interface OrderMapper {

    Integer getOrderCount();

    int addOrder(Order order);

    void deleteOrder(List<String> orders);

    int updateOrder(Order order);

    List<Order> selectOrderByPage();

    List<Order> selectAllOrder();

    List<Order> conditionSelectOrder(Map<String, Object> map);

}
