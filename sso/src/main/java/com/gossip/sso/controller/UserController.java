package com.gossip.sso.controller;

import com.gossip.common.vo.SysResult;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;

/**
 * @author humy
 * @date 2018/8/5 - 0:04
 */
@Controller
public class UserController {

    @PostMapping("user/register")
    public SysResult register(){

        return null;
    }
}
