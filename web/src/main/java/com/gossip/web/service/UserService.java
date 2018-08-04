package com.gossip.web.service;

import com.gossip.common.service.HttpClientService;
import com.gossip.web.pojo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


/**
 * @author humy
 * @date 2018/8/4 - 23:12
 */
@Service
public class UserService {

    @Autowired
    private HttpClientService client;

    public void register(User user) {
    }
}
