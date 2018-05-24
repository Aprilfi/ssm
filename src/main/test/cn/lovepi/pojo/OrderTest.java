package cn.lovepi.pojo;

import cn.lovepi.mapper.OrderMapper;
import cn.lovepi.service.OrderService;
import cn.lovepi.service.impl.OrderServiceImpl;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.apache.log4j.BasicConfigurator;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.stereotype.Controller;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath:spring/applicationContext.xml")
public class OrderTest {



    @Autowired
    private OrderMapper orderMapper;

    @Test
    public void findAllOrder() {
        BasicConfigurator.configure();
        List<Order> orderList = orderMapper.selectAllOrder();

        for(Order order : orderList) {
            System.out.println(order.toString());
        }
    }

    @Test
    public void findOrderByPage() {
        BasicConfigurator.configure();

        PageHelper.startPage(3,3);
        List<Order> orderList = orderMapper.selectOrderByPage();
        for(Order order : orderList) {
            System.out.println(order.toString());
        }
    }

    @Test
    public void getOrderCount() {
        BasicConfigurator.configure();

        int total = orderMapper.getOrderCount();
        System.out.println(total);
    }

    @Test
    public void selectSomeOrders(){
        BasicConfigurator.configure();

        List<String> orderidList = new ArrayList<>();
        orderidList.add("123123");
        orderidList.add("234234");
        Map<String, Object> map = new HashMap<>();

        map.put("orderidList",orderidList);
        orderMapper.conditionSelectOrder(map);
        List<Order> orders = orderMapper.conditionSelectOrder(map);

        for(Order order : orders){
            System.out.println(order.toString());
        }
    }

    @Test
    public void deleteOrders(){
        BasicConfigurator.configure();
        List<String> orderidList = new ArrayList<>();
        orderidList.add("73554");
        Map<String, Object> map = new HashMap<>();
        map.put("orderidList",orderidList);
        boolean state = false;
        if(orderMapper.conditionSelectOrder(map).size() == orderidList.size()) {
            state = true;
        }
        if(state){
            orderMapper.deleteOrder(orderidList);
            System.out.println("数据："+state+",已删除");
            return;
        }
        System.out.println("数据："+state+",未删除");

    }

    @Test
    public void insertOrder() {
        BasicConfigurator.configure();
        Order order = new Order("111888","2017-04-06 20:20:12",new Float(2000),"USER","test");
        Map<String, Object> map = new HashMap<>();
        List<String> orderid = new ArrayList<>();
        orderid.add(order.getOrderid());
        map.put("orderidList", orderid);
        boolean state = false;
        if(orderMapper.conditionSelectOrder(map).size() != 1) {
            state = true;
            System.out.println("不存在");
        }
        System.out.println("已存在");
        if(state) {
            orderMapper.addOrder(order);
        }
    }

    @Test
    public void updateOrder() {
        BasicConfigurator.configure();
        Order order = new Order("111888","2017-04-06 20:20:12",new Float(3000),"USER","test");
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
                System.out.println("已修改"+result);
                state = true;
            }
        }
        System.out.println();
    }

}
