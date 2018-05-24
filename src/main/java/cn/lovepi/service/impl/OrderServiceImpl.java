package cn.lovepi.service.impl;

import cn.lovepi.mapper.OrderMapper;
import cn.lovepi.pojo.Order;
import cn.lovepi.service.OrderService;
import com.github.pagehelper.PageHelper;
import org.apache.log4j.BasicConfigurator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    OrderMapper orderMapper;

    @Override
    public List<Order> AllOrderQuery() {
        return orderMapper.selectAllOrder();
    }

    @Override
    public Map<String, Object> OrderByPageQuery(int pageNumber, int pageSize) {
        BasicConfigurator.configure();
        Map<String,Object> result = new HashMap<String,Object>();
        int total=orderMapper.getOrderCount();
        //分页查询
        PageHelper.startPage(pageNumber, pageSize);
        List<Order> rows = orderMapper.selectOrderByPage();
        result.put("total",total);
        result.put("rows",rows);
        return result;
    }

    @Override
    public Integer OrderCountQuery() {
        return orderMapper.getOrderCount();
    }

    @Override
    public boolean addOrder(Order order) {

        Map<String, Object> map = new HashMap<>();
        List<String> orderid = new ArrayList<>();
        orderid.add(order.getOrderid());
        map.put("orderidList", orderid);
        boolean state = false;
        if(orderMapper.conditionSelectOrder(map).size() != 1) {
            state = true;
        }
        if(state) {
            orderMapper.addOrder(order);
        }
        return state;
    }

    @Override
    public boolean deleteOrder(List<String> orders) {
        Map<String, Object> map = new HashMap<>();
        map.put("orderidList",orders);
        boolean state = false;
        if(orderMapper.conditionSelectOrder(map).size() == orders.size()) {
            state = true;
            System.out.println("false");
        }
        if(state) {
            orderMapper.deleteOrder(orders);
            System.out.println("true");
        }
        return state;
    }

    @Override
    public boolean updateOrder(Order order) {
        Map<String, Object> map = new HashMap<>();
        List<String> orderid = new ArrayList<>();
        orderid.add(order.getOrderid());
        map.put("orderidList", orderid);
        boolean state = false;
        if(orderMapper.conditionSelectOrder(map).size() == 1) {
            state = true;
            System.out.println("不存在");
        }
        if(state) {
            int result = orderMapper.updateOrder(order);
            state = false;
            if(result == 1) {
                state = true;
            }
        }
        return state;
    }

    @Override
    public List<Order> conditionOrderQuery(Map<String, Object> map) {
        return orderMapper.conditionSelectOrder(map);
    }


}
