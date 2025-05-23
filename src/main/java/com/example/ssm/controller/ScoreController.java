package com.example.ssm.controller;
import com.example.ssm.service.ScoreService;
import com.example.ssm.service.UserService;
import com.example.ssm.entity.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/score")
@CrossOrigin(origins = "*")
public class ScoreController {
    @Autowired
    private ScoreService scoreService;
    @Autowired
    private UserService userService;
    @GetMapping("/list")
    public List<Map<String, Object>> getScoreList(@RequestParam Integer userId) {
        return scoreService.getScoreListByUserId(userId);
    }

    /**
     * 按班级查询成绩横向表格
     */
    @GetMapping("/classList")
    public Map<String, Object> getScoreListByClass(@RequestParam(required = false) String className) {
        List<Subject> subjects = scoreService.getAllSubjects();
        List<Map<String, Object>> raw;
        List<com.example.ssm.entity.User> users;
        if (className == null || className.isEmpty()) {
            users = userService.getAllUsers();
            raw = scoreService.getScoreListByClass(null);
        } else {
            users = userService.getUsersByClass(className);
            raw = scoreService.getScoreListByClass(className);
        }
        // 组装横向表格
        Map<Integer, Map<String, Object>> userMap = new LinkedHashMap<>();
        Map<String, List<Double>> subjectScoreMap = new LinkedHashMap<>();
        for (Subject sub : subjects) subjectScoreMap.put(sub.getName(), new ArrayList<>());
        for (com.example.ssm.entity.User u : users) {
            Map<String, Object> m = new LinkedHashMap<>();
            m.put("userId", u.getId());
            m.put("username", u.getUsername());
            m.put("scores", new LinkedHashMap<String, Double>());
            userMap.put(u.getId(), m);
        }
        for (Map<String, Object> row : raw) {
            Integer userId = (Integer) row.get("userId");
            String subjectName = (String) row.get("subjectName");
            Double score = row.get("score") == null ? null : Double.valueOf(row.get("score").toString());
            Map<String, Object> user = userMap.get(userId);
            if (user != null) {
                ((Map<String, Double>)user.get("scores")).put(subjectName, score);
                subjectScoreMap.get(subjectName).add(score);
            }
        }
        // 补全未考科目为0
        for (Map<String, Object> user : userMap.values()) {
            Map<String, Double> scores = (Map<String, Double>)user.get("scores");
            double total = 0; int cnt = 0;
            for (Subject sub : subjects) {
                Double s = scores.get(sub.getName());
                if (s != null) { total += s; cnt++; }
                else { scores.put(sub.getName(), 0.0); }
            }
            user.put("total", total);
            user.put("avg", subjects.size() > 0 ? total/subjects.size() : 0);
        }
        // 计算科目均分、班级均分
        Map<String, Double> subjectAvg = new LinkedHashMap<>();
        double classTotal = 0; int classCnt = 0;
        for (Subject sub : subjects) {
            List<Double> list = subjectScoreMap.get(sub.getName());
            double sum = 0; int c = 0;
            for (Double d : list) { if (d != null) { sum += d; c++; } }
            subjectAvg.put(sub.getName(), c > 0 ? sum/c : 0);
            classTotal += sum; classCnt += c;
        }
        double classAvg = classCnt > 0 ? classTotal/classCnt : 0;
        Map<String, Object> result = new HashMap<>();
        result.put("subjects", subjects);
        result.put("students", new ArrayList<>(userMap.values()));
        result.put("subjectAvg", subjectAvg);
        result.put("classAvg", classAvg);
        return result;
    }
} 