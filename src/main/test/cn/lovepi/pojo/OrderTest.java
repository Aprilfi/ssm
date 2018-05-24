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

import java.util.List;

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

}
