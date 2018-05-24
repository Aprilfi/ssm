package cn.lovepi.pojo;

import java.io.Serializable;
import java.util.Objects;

public class Order implements Serializable {

    private String orderid;

    private String ordertime;

    private Float orderprice;

    private String orderuser;

    private String orderdescribe;

    public Order() {}

    public Order(String orderid, String ordertime, Float orderprice, String orderuser, String orderdescribe) {
        this.orderid = orderid;
        this.ordertime = ordertime;
        this.orderprice = orderprice;
        this.orderuser = orderuser;
        this.orderdescribe = orderdescribe;
    }

    public String getOrderid() {
        return orderid;
    }

    public void setOrderid(String orderid) {
        this.orderid = orderid;
    }

    public String getOrdertime() {
        return ordertime;
    }

    public void setOrdertime(String ordertime) {
        this.ordertime = ordertime;
    }

    public Float getOrderprice() {
        return orderprice;
    }

    public void setOrderprice(Float orderprice) {
        this.orderprice = orderprice;
    }

    public String getOrderuser() {
        return orderuser;
    }

    public void setOrderuser(String orderuser) {
        this.orderuser = orderuser;
    }

    public String getOrderdescribe() {
        return orderdescribe;
    }

    public void setOrderdescribe(String orderdescribe) {
        this.orderdescribe = orderdescribe;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Order order = (Order) o;
        return Objects.equals(orderid, order.orderid) &&
                Objects.equals(ordertime, order.ordertime) &&
                Objects.equals(orderprice, order.orderprice) &&
                Objects.equals(orderuser, order.orderuser) &&
                Objects.equals(orderdescribe, order.orderdescribe);
    }

    @Override
    public int hashCode() {

        return Objects.hash(orderid, ordertime, orderprice, orderuser, orderdescribe);
    }

    @Override
    public String toString() {
        return "Order{" +
                "orderid='" + orderid + '\'' +
                ", ordertime='" + ordertime + '\'' +
                ", orderprice=" + orderprice +
                ", orderuser='" + orderuser + '\'' +
                ", orderdescribe='" + orderdescribe + '\'' +
                '}';
    }
}
