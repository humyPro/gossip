package com.gossip.sso.mapper;

import com.gossip.common.mapper.MyMapper;
import com.gossip.sso.pojo.User;

import java.util.Map;

/**
 * @author humy
 * @date 2018/8/4 - 23:32
 */
public interface UserMapper extends MyMapper<User> {
    int check(Map<String, String> map);
}
