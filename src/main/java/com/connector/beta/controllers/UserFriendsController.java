package com.connector.beta.controllers;

import com.connector.beta.Pojos.UserFriendsDto;
import com.connector.beta.entities.MyUser;
import com.connector.beta.entities.UserFriends;
import com.connector.beta.repos.UserFriendsRepo;
import com.connector.beta.repos.UserRelationshipRepo;
import com.connector.beta.repos.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UserFriendsController {

    @Autowired
    UserRepo userRepo;
    @Autowired
    UserFriendsRepo userFriendsRepo;
    @Autowired
    UserRelationshipRepo userRelationshipRepo;



    @GetMapping("/user")
    public ResponseEntity<List<UserFriendsDto>> CurrentUserInfo() {

//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        String currentPrincipalName = authentication.getName();
//
//        System.out.println(authentication.getName());
//        System.out.println(authentication.getPrincipal().getClass());

        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        System.out.println(user.getUsername());

//        MyUser myUser = userRepo.findByEmailNotOptional(user.getUsername());

        int userSecondId = 1;


        List<UserFriendsDto> friendsDto = userRelationshipRepo.getAllFriendsWithNames(userSecondId);


        return ResponseEntity.status(HttpStatus.OK)
                .body(friendsDto);
    }


}
