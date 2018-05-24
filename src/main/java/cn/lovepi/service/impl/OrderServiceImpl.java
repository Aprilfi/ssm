package cn.lovepi.service.impl;

import cn.lovepi.mapper.OrderMapper;
import cn.lovepi.pojo.Order;
import cn.lovepi.service.OrderService;
import com.github.pagehelper.PageHelper;
import org.apache.log4j.BasicConfigurator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    public void addOrder(Order order) {
        orderMapper.addOrder(order);
    }

    @Override
    public boolean deleteOrder(String orderid) {
        return orderMapper.deleteOrder(orderid);
    }

    @Override
    public void updateOrder(Order order) {
        orderMapper.updateOrder(order);
    }


}
