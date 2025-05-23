package com.example.ssm.controller;

import com.example.ssm.entity.User;
import com.example.ssm.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*")
public class UserController {
    
    @Autowired
    private UserService userService;

    @GetMapping(value = "/list", produces = MediaType.APPLICATION_JSON_VALUE)
    public java.util.Map<String, Object> list(@RequestParam(value = "className", required = false) String className,
                                              @RequestParam(value = "page", required = false, defaultValue = "1") int page,
                                              @RequestParam(value = "size", required = false, defaultValue = "10") int size) {
        List<User> allUsers;
        if (className != null && !className.isEmpty()) {
            allUsers = userService.getUsersByClass(className);
        } else {
            allUsers = userService.getAllUsers();
        }
        int total = allUsers.size();
        int fromIndex = (page - 1) * size;
        int toIndex = Math.min(fromIndex + size, total);
        List<User> pageList = fromIndex >= total ? new java.util.ArrayList<>() : allUsers.subList(fromIndex, toIndex);
        java.util.Map<String, Object> result = new java.util.HashMap<>();
        result.put("users", pageList);
        result.put("total", total);
        return result;
    }

    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public User getUser(@PathVariable Integer id) {
        return userService.getUserById(id);
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> addUser(@RequestBody User user) {
        try {
            userService.addUser(user);
            return ResponseEntity.ok("添加成功");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("添加失败：" + e.getMessage());
        }
    }

    @PutMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> updateUser(@PathVariable Integer id, @RequestBody User user) {
        try {
            user.setId(id);
            userService.updateUser(user);
            return ResponseEntity.ok("更新成功");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("更新失败：" + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Integer id) {
        try {
            userService.deleteUser(id);
            return ResponseEntity.ok("删除成功");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("删除失败：" + e.getMessage());
        }
    }

    @GetMapping("/classList")
    public List<String> getClassList() {
        Set<String> set = new LinkedHashSet<>();
        for (User u : userService.getAllUsers()) {
            if (u.getClassName() != null && !u.getClassName().isEmpty()) set.add(u.getClassName());
        }
        return new ArrayList<>(set);
    }
}    