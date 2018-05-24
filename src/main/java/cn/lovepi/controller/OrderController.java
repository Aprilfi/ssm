package cn.lovepi.controller;

import cn.lovepi.pojo.Order;
import cn.lovepi.service.OrderService;
import com.github.pagehelper.PageHelper;
import net.sf.json.JSONArray;
import net.sf.json.JSONSerializer;
import org.apache.log4j.BasicConfigurator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("")
public class OrderController {

    @Autowired
    OrderService orderService;

    /**
     使用@responseBody将返回结果直接写去responsebody

     Map<String,Object> jsonList = orderService.OrderByPageQuery(pageNumber, pageSize);
     List<Order> orderList = (ArrayList)jsonList.get("rows");
     String jsonStr = JSONArray.fromObject(orderList).toString();
     //组合符合bootable要求格式的数据字符串
     System.out.println(jsonList.get("rows"));
     String json = "{\"total\":"+jsonList.get("total")+",\"rows\":"+jsonStr+"}";
     */
    @ResponseBody
    @RequestMapping("findOrderByPage")
    public Map<String, Object> findByPage(int pageSize, int pageNumber) {
        System.out.println("pagesize:"+pageSize+" pagenumber:"+pageNumber);
        return orderService.OrderByPageQuery(pageNumber, pageSize);
    }

    @RequestMapping("order")
    public String toOrders() {
        return "orders_a";
    }


    @RequestMapping("deleteByOrderid")
    @ResponseBody
    public boolean deleteByOrderid(Integer[] ids) {
        List<String> orderlist = new ArrayList<>();
        for(int i = 0; i < ids.length; i ++) {
            orderlist.add(String.valueOf(ids[i]));
        }
        return orderService.deleteOrder(orderlist);
    }

    @ResponseBody
    @RequestMapping("addOrder")
    public boolean addOrder(Order order) {
        System.out.println(order.toString());
        return orderService.addOrder(order);
    }

    @RequestMapping("updateOrder")
    @ResponseBody
    public boolean updateOrder(Order order) {
        return orderService.updateOrder(order);
    }



/**
 @RequestMapping("allOrder")
 public ModelAndView allOrder() {
 ModelAndView mav = new ModelAndView();
 List<Order> orderList = orderService.AllOrderQuery();
 System.out.println("Orders.count:"+orderList.size());
 mav.addObject("allOrder",orderList);
 mav.setViewName("showAllOrder");
 return mav;
 }
 */

}
