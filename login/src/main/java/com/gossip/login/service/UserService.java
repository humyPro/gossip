package com.gossip.login.service;

import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;

/**
 * @Author humy
 * @Date 2018/8/4 - 10:17
 */
@Service
public class UserService {
    public String changeHeadPic(String ticket, MultipartFile picture) {

        if (picture == null || picture.isEmpty()) {
            return null;
        }
        String image = "";
        String realPath = "";
        try {
            realPath = ResourceUtils.getURL("classpath:").getPath();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
        image = "/head/" + picture.getOriginalFilename();
        realPath = realPath + "static/head/";
        System.out.println(new File(realPath).getAbsolutePath());
        File file = new File(realPath);
        //System.out.println(file.getAbsolutePath());
        if (!file.exists()) {
            file.mkdirs();
        }


        String picName = picture.getOriginalFilename();
        File picFile = new File(realPath, picName);
        try {
            picture.transferTo(picFile);
        } catch (IOException e) {
            e.printStackTrace();
        }
        System.out.println(image);
        return image;
    }
}
