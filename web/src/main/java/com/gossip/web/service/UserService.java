package com.gossip.web.service;

import com.gossip.common.service.HttpClientService;
import com.gossip.common.util.CookieUtils;
import com.gossip.common.vo.HttpResult;
import com.gossip.common.vo.SysResult;
import com.gossip.web.pojo.User;
import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;


/**
 * @author humy
 * @date 2018/8/4 - 23:12
 */
@Service
public class UserService {

    @Autowired
    private HttpClientService client;

    @PostMapping("/user/register")
    public int register(User user) throws Exception {
        user.setPassword(DigestUtils.md5Hex(user.getPassword()));
        Map<String, Object> param = userToMap(user);
        String url = "http://sso.gossip.com/user/register";
        //执行请求，如果执行不成功则抛出异常
        HttpResult httpResult = client.doPost(url, param);
        String body = httpResult.getBody();
        return Integer.parseInt(body);

    }

    public SysResult login(User user, HttpServletRequest request,HttpServletResponse response){
//因为client.doPost(url, param)中要遍历map中的所有元素toString，所以不能有null;在后端要把值从新设置为null，不然通用mapper不能使用
        if(user.getUsername()==null)
            user.setUsername("");
        if(user.getPhone()==null)
            user.setPhone("");
        if(user.getEmail()==null)
            user.setEmail("");

        Map<String, Object> param = userToMap(user);
        String url="http://sso.gossip.com/user/login";

        try {
            HttpResult httpResult = client.doPost(url, param);
            String ticket=httpResult.getBody();
            if(!StringUtils.isEmpty(ticket)){
                //如果返回的ticket不是空，就添加到cookie中，并返回OK
                CookieUtils.setCookie(request,response,"USER_TICKET",ticket);
                return SysResult.oK(user);
            }else {
                return SysResult.build(201,"帐号或密码错误");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return SysResult.build(201,"服务器异常,请稍后重试");
        }
    }


    public Map<String, Object> userToMap(User user) {
        Map<String, Object> param = new HashMap<>();
        param.put("username", user.getUsername());
        param.put("password", user.getPassword());
        param.put("phone", user.getPhone());
        param.put("email", user.getEmail());
        return param;
    }
}
