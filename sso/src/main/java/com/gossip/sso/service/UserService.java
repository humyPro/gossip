package com.gossip.sso.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gossip.sso.mapper.UserMapper;
import com.gossip.sso.pojo.User;
import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.annotation.Resource;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * @author humy
 * @date 2018/8/5 - 11:27
 */
@Service
public class UserService {
    @Resource
    private UserMapper userMapper;
    /*@Autowired
    private RedisService redis;*/
    private static final ObjectMapper MAPPER = new ObjectMapper();

    public Boolean check(String param, Integer type) {
        Map<String, String> map = new HashMap<>();
        if (type == 1) {
            map.put("param", "username");
        } else if (type == 2) {
            map.put("param", "phone");
        } else {
            map.put("param", "email");
        }
        map.put("value", param);
        int count = userMapper.check(map);
        if (count > 0) {
            return true;
        } else {
            return false;
        }
    }

    public int register(User user) {
        user.setCreated(new Date());
        user.setUpdated(user.getCreated());
        System.out.println(user);
        try {

            return userMapper.insert(user);

        }catch (Exception e){
            return 0;
        }

    }

    public String login(User user) {
        String ticket="";
        String userKey="";
        if(!StringUtils.isEmpty(user.getUsername())){
            userKey=DigestUtils.md5Hex(user.getUsername());
        }else if(!StringUtils.isEmpty(user.getPhone())){
            userKey=DigestUtils.md5Hex(user.getPhone());
        }else if(!StringUtils.isEmpty(user.getEmail())){
            userKey=DigestUtils.md5Hex(user.getEmail());
        }

        /*
        * 先用userKey去redis上去找，找到了就直接返回，找不到就重新登录，修改密码后要删除redis上的key-value
        * */
        user.setPassword(DigestUtils.md5Hex(user.getPassword()));
        if(StringUtils.isEmpty(user.getUsername()))
            user.setUsername(null);
        if(StringUtils.isEmpty(user.getPhone()))
            user.setPhone(null);
        if(StringUtils.isEmpty(user.getEmail()))
            user.setEmail(null);
        User _user = userMapper.selectOne(user);
        if(_user!=null){
            ticket=userKey;
        }else{
            ticket=null;
        }
        return ticket;
    }
}
